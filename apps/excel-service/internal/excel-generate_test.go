package internal

import (
	"archive/zip"
	"bytes"
	"encoding/json"
	"io"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/xuri/excelize/v2"
)

func TestGenerateExcelDocumentsArchive(t *testing.T) {
	cases := []struct {
		name        string
		org         string
		pointOfSale string
		template    string
		directory   string
	}{
		{"Karaganda apartment", xansha, "Караганда", "APARTMENT", "XANSHA/karaganda"},
		{"Karaganda hotel", xansha, "Караганда", "HOTEL", "XANSHA/karaganda/HOTEL"},
		{"Zhanaarka apartment", xansha, "Жанаарка", "APARTMENT", "XANSHA/zhanaarka"},
		{"Zhanaarka hotel", xansha, "Жанаарка", "HOTEL", "XANSHA/zhanaarka/HOTEL"},
		{"Legacy apartment", xansha, "", "APARTMENT", "XANSHA/zhanaarka"},
		{"Legacy hotel", xansha, "", "HOTEL", "XANSHA/zhanaarka/HOTEL"},
		{"NomadDocs Karaganda", nomadDocs, "Караганда", "APARTMENT", "NomadDocs"},
		{"NomadDocs Zhanaarka", nomadDocs, "Жанаарка", "APARTMENT", "NomadDocs"},
	}

	templateRoot := t.TempDir()
	for _, directory := range []string{"XANSHA/karaganda", "XANSHA/karaganda/HOTEL", "XANSHA/zhanaarka", "XANSHA/zhanaarka/HOTEL", "NomadDocs"} {
		templateDir := filepath.Join(templateRoot, directory)
		if err := os.MkdirAll(templateDir, 0o755); err != nil {
			t.Fatal(err)
		}
		for _, template := range excelTemplates {
			createTestWorkbook(t, filepath.Join(templateDir, template.templateName), directory)
		}
	}
	t.Setenv("TEMPLATE_PATH", templateRoot)

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			// Decode the same nested field sent by the web app.
			body, err := json.Marshal(map[string]any{"customer": map[string]string{"pointOfSale": tc.pointOfSale}})
			if err != nil {
				t.Fatal(err)
			}
			var payload Payload
			if err := json.Unmarshal(body, &payload); err != nil {
				t.Fatal(err)
			}
			payload.DocumentDate = []string{"10-06-2026", "13-06-2026"}
			payload.Customer.Organization.CostPerDay = 10000

			archive, err := GenerateExcelDocumentsArchive(tc.org, payload, tc.template)
			if err != nil {
				t.Fatal(err)
			}

			zipReader, err := zip.NewReader(bytes.NewReader(archive), int64(len(archive)))
			if err != nil {
				t.Fatal(err)
			}
			if len(zipReader.File) != len(excelTemplates) {
				t.Fatalf("expected %d workbooks, got %d", len(excelTemplates), len(zipReader.File))
			}

			files := make(map[string]bool, len(zipReader.File))
			for _, file := range zipReader.File {
				files[file.Name] = true
				reader, err := file.Open()
				if err != nil {
					t.Fatal(err)
				}
				content, err := io.ReadAll(reader)
				_ = reader.Close()
				if err != nil {
					t.Fatal(err)
				}
				workbook, err := excelize.OpenReader(bytes.NewReader(content))
				if err != nil {
					t.Fatal(err)
				}
				value, err := workbook.GetCellValue("Sheet1", "A1")
				_ = workbook.Close()
				if err != nil {
					t.Fatal(err)
				}
				if value != tc.directory {
					t.Fatalf("%s used template %q, want %q", file.Name, value, tc.directory)
				}
			}

			for _, template := range excelTemplates {
				if !hasArchiveFile(files, template.outputName, ".xlsx") {
					t.Fatalf("expected archive to contain file starting with %q and ending with .xlsx", template.outputName)
				}
			}
		})
	}
}

func TestOpenTemplateWorkbookRejectsInvalidPointOfSale(t *testing.T) {
	t.Setenv("TEMPLATE_PATH", t.TempDir())
	_, err := openTemplateWorkbook(xansha, "Tax Invoice.xlsx", "APARTMENT", "../NomadDocs")
	if err == nil || !strings.Contains(err.Error(), "invalid pointOfSale") {
		t.Fatalf("expected invalid pointOfSale error, got %v", err)
	}
}

func hasArchiveFile(files map[string]bool, prefix string, suffix string) bool {
	for file := range files {
		if strings.HasPrefix(file, prefix) && strings.HasSuffix(file, suffix) {
			return true
		}
	}

	return false
}

func createTestWorkbook(t *testing.T, path string, marker string) {
	t.Helper()

	f := excelize.NewFile()
	defer func() {
		if err := f.Close(); err != nil {
			t.Fatal(err)
		}
	}()

	if err := f.SetCellValue("Sheet1", "A1", marker); err != nil {
		t.Fatal(err)
	}
	if err := f.SaveAs(path); err != nil {
		t.Fatal(err)
	}
}
