package internal

import (
	"encoding/json"
	"testing"

	"github.com/xuri/excelize/v2"
)

func TestCellLinesUnmarshalPreservesJSONObjectOrder(t *testing.T) {
	var payload Payload
	if err := json.Unmarshal([]byte(`{"cellsLine":{"first":"1","second":"2","third":"3"}}`), &payload); err != nil {
		t.Fatal(err)
	}

	assertCellLine(t, payload.CellsLine, 0, "first", "1")
	assertCellLine(t, payload.CellsLine, 1, "second", "2")
	assertCellLine(t, payload.CellsLine, 2, "third", "3")
}

func TestCreateKeyValueRowUsesCellLineOrder(t *testing.T) {
	f := excelize.NewFile()
	defer func() {
		if err := f.Close(); err != nil {
			t.Fatal(err)
		}
	}()

	if err := f.SetCellValue("Sheet1", "A24", "template row"); err != nil {
		t.Fatal(err)
	}

	err := CreateKeyValueRow(f, "Sheet1", "APARTMENT", xansha, CellLines{
		{Key: "first", Value: "1"},
		{Key: "second", Value: "2"},
		{Key: "third", Value: "3"},
	})
	if err != nil {
		t.Fatal(err)
	}

	assertCellValue(t, f, "Sheet1", "A25", "first: 1")
	assertCellValue(t, f, "Sheet1", "A26", "second: 2")
	assertCellValue(t, f, "Sheet1", "A27", "third: 3")
}

func assertCellLine(t *testing.T, lines CellLines, index int, key string, value string) {
	t.Helper()

	if len(lines) <= index {
		t.Fatalf("expected cellsLine[%d], got length %d", index, len(lines))
	}

	if lines[index].Key != key || lines[index].Value != value {
		t.Fatalf(
			"expected cellsLine[%d] to be %q:%q, got %q:%q",
			index,
			key,
			value,
			lines[index].Key,
			lines[index].Value,
		)
	}
}
