package internal

import (
	"github.com/xuri/excelize/v2"
)

func GenerateExcelDocument() *excelize.File {
	f := excelize.NewFile()

	f.SetCellValue("Sheet1", "A1", "Hello World!")

	return f
}
