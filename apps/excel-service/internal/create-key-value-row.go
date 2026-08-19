package internal

import (
	"fmt"

	"github.com/xuri/excelize/v2"
)

var rowIndex = map[string]int{
	"XANSHA:APARTMENT":    24,
	"XANSHA:HOTEL":        21,
	"NomadDocs:APARTMENT": 22,
}

func CreateKeyValueRow(f *excelize.File, sheet string, templateType string, org string, data CellLines) error {
	index, ok := rowIndex[fmt.Sprintf("%s:%s", org, templateType)]
	if !ok {
		return fmt.Errorf("unknown template: %s:%s", org, templateType)
	}

	templateRow := index

	for _, row := range data {
		newRow := index + 1

		if err := f.DuplicateRowTo(sheet, templateRow, newRow); err != nil {
			return err
		}

		if err := f.SetCellValue(sheet, fmt.Sprintf("A%d", newRow), fmt.Sprintf("%s: %s", row.Key, row.Value)); err != nil {
			return err
		}

		index++
	}

	return nil
}
