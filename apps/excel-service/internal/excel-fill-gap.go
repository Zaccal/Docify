package internal

import (
	"encoding/json"
	"fmt"
	"regexp"
	"strings"

	"github.com/xuri/excelize/v2"
)

var excelGapPattern = regexp.MustCompile(`\{([^{}]+)\}`)

func fillGap(f *excelize.File, sheet string, data any) error {
	replacements, err := buildGapReplacements(data)
	if err != nil {
		return err
	}

	rows, err := f.GetRows(sheet)
	if err != nil {
		return err
	}

	for rowIndex, row := range rows {
		for colIndex, value := range row {
			nextValue := replaceExcelGaps(value, replacements)
			if nextValue == value {
				continue
			}

			cell, err := excelize.CoordinatesToCellName(colIndex+1, rowIndex+1)
			if err != nil {
				return err
			}
			if err := f.SetCellValue(sheet, cell, nextValue); err != nil {
				return err
			}
		}
	}

	return nil
}

func replaceExcelGaps(value string, data map[string]string) string {
	return excelGapPattern.ReplaceAllStringFunc(value, func(match string) string {
		key := match[1 : len(match)-1]
		replacement, ok := data[key]
		if !ok {
			return match
		}
		return replacement
	})
}

func buildGapReplacements(data any) (map[string]string, error) {
	if replacements, ok := data.(map[string]string); ok {
		return replacements, nil
	}

	raw, err := json.Marshal(data)
	if err != nil {
		return nil, fmt.Errorf("marshal template data: %w", err)
	}

	var decoded any
	if err := json.Unmarshal(raw, &decoded); err != nil {
		return nil, fmt.Errorf("decode template data: %w", err)
	}

	replacements := make(map[string]string)
	flattenGapValue(replacements, "", decoded)

	return replacements, nil
}

func flattenGapValue(replacements map[string]string, prefix string, value any) {
	switch typedValue := value.(type) {
	case map[string]any:
		for key, nestedValue := range typedValue {
			nextPrefix := key
			if prefix != "" {
				nextPrefix = prefix + "." + key
			}

			flattenGapValue(replacements, nextPrefix, nestedValue)

			if key == "cellsLine" {
				flattenGapValue(replacements, "", nestedValue)
			}
		}
	case []any:
		values := make([]string, 0, len(typedValue))
		for _, item := range typedValue {
			values = append(values, fmt.Sprint(item))
		}
		setReplacement(replacements, prefix, strings.Join(values, ", "))
	case nil:
		setReplacement(replacements, prefix, "")
	default:
		setReplacement(replacements, prefix, fmt.Sprint(typedValue))
	}
}

func setReplacement(replacements map[string]string, key string, value string) {
	if key == "" {
		return
	}

	replacements[key] = value

	separatorIndex := strings.LastIndex(key, ".")
	if separatorIndex == -1 {
		return
	}

	leafKey := key[separatorIndex+1:]
	if leafKey != "" {
		if _, exists := replacements[leafKey]; !exists {
			replacements[leafKey] = value
		}
	}
}
