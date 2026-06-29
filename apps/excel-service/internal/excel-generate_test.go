package internal

import (
	"archive/zip"
	"bytes"
	"os"
	"path/filepath"
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

	archive, err := GenerateExcelDocumentsArchive(xansha, Payload{})
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
		if !files[template.outputName] {
			t.Fatalf("expected archive to contain %q", template.outputName)
		}
	}
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
