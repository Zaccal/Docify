package internal

import (
	"archive/zip"
	"bytes"
	"fmt"
	"os"
	"path/filepath"

	"github.com/xuri/excelize/v2"
)

const xansha = "XANSHA"
const nomadDocs = "NomadDocs"

type excelTemplate struct {
	templateName string
	outputName   string
}

var excelTemplates = []excelTemplate{
	{
		templateName: "Tax Invoice.xlsx",
		outputName:   "Счет фактура",
	},
	{
		templateName: "Completed Work Certificates.xlsx",
		outputName:   "Акт выполненых работ",
	},
	{
		templateName: "Cash Receipt Order.xlsx",
		outputName:   "Накладная",
	},
}

func GenerateExcelDocumentsArchive(org string, data Payload) ([]byte, error) {
	if org == "" || org != xansha && org != nomadDocs {
		return nil, fmt.Errorf("org is missing or invalid")
	}

	var archive bytes.Buffer
	zipWriter := zip.NewWriter(&archive)

	for _, template := range excelTemplates {
		if err := addGeneratedWorkbook(zipWriter, org, template, data); err != nil {
			_ = zipWriter.Close()
			return nil, err
		}
	}

	if err := zipWriter.Close(); err != nil {
		return nil, fmt.Errorf("close excel documents archive: %w", err)
	}

	return archive.Bytes(), nil
}

func addGeneratedWorkbook(zipWriter *zip.Writer, org string, template excelTemplate, data Payload) error {
	f, err := openTemplateWorkbook(org, template.templateName)
	if err != nil {
		return err
	}
	defer func() {
		_ = f.Close()
	}()

	formattedPayload, err := FormatPayload(data)
	if err != nil {
		return fmt.Errorf("format payload: %w", err)
	}

	for _, sheet := range f.GetSheetList() {
		if err := fillGap(f, sheet, formattedPayload); err != nil {
			return fmt.Errorf("fill workbook %s sheet %s: %w", template.templateName, sheet, err)
		}
	}

	workbookBuffer, err := f.WriteToBuffer()
	if err != nil {
		return fmt.Errorf("write workbook %s: %w", template.templateName, err)
	}

	archiveFile, err := zipWriter.Create(template.outputName + " " + data.Customer.FullnameClient + " " + data.CreatedAt.Format("02-01-2006") + ".xlsx")
	if err != nil {
		return fmt.Errorf("create archive file %s: %w", template.outputName, err)
	}

	if _, err := archiveFile.Write(workbookBuffer.Bytes()); err != nil {
		return fmt.Errorf("write archive file %s: %w", template.outputName, err)
	}

	return nil
}

func openTemplateWorkbook(org string, templateName string) (*excelize.File, error) {
	templatePathRoot := os.Getenv("TEMPLATE_PATH")
	if templatePathRoot == "" {
		return nil, fmt.Errorf("TEMPLATE_PATH is missing")
	}

	templatePath := filepath.Join(templatePathRoot, org, templateName)
	f, err := excelize.OpenFile(templatePath)
	if err != nil {
		return nil, fmt.Errorf("open template %s: %w", templatePath, err)
	}

	return f, nil
}
