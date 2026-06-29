package internal

import (
	"archive/zip"
	"bytes"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/xuri/excelize/v2"
)

func TestGenerateExcelDocumentsArchive(t *testing.T) {
	templateRoot := t.TempDir()
	templateDir := filepath.Join(templateRoot, xansha)
	if err := os.MkdirAll(templateDir, 0o755); err != nil {
		t.Fatal(err)
	}

	for _, template := range excelTemplates {
		createTestWorkbook(t, filepath.Join(templateDir, template.templateName))
	}

	t.Setenv("TEMPLATE_PATH", templateRoot)

	var payload Payload
	payload.DocumentDate = []string{"10-06-2026", "13-06-2026"}
	payload.Organization.CostPerDay = "10000"

	archive, err := GenerateExcelDocumentsArchive(xansha, payload)
	if err != nil {
		t.Fatal(err)
	}

	zipReader, err := zip.NewReader(bytes.NewReader(archive), int64(len(archive)))
	if err != nil {
		t.Fatal(err)
	}

	files := make(map[string]bool, len(zipReader.File))
	for _, file := range zipReader.File {
		files[file.Name] = true
	}

	for _, template := range excelTemplates {
		if !hasArchiveFile(files, template.outputName, ".xlsx") {
			t.Fatalf("expected archive to contain file starting with %q and ending with .xlsx", template.outputName)
		}
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

func createTestWorkbook(t *testing.T, path string) {
	t.Helper()

	f := excelize.NewFile()
	defer func() {
		if err := f.Close(); err != nil {
			t.Fatal(err)
		}
	}()

	if err := f.SetCellValue("Sheet1", "A1", "test"); err != nil {
		t.Fatal(err)
	}
	if err := f.SaveAs(path); err != nil {
		t.Fatal(err)
	}
}
