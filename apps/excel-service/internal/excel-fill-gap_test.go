package internal

import (
	"testing"

	"github.com/xuri/excelize/v2"
)

func TestFillGapReplacesTemplateValues(t *testing.T) {
	f := excelize.NewFile()
	defer func() {
		if err := f.Close(); err != nil {
			t.Fatal(err)
		}
	}()

	if err := f.SetCellValue("Sheet1", "A1", "Client: {fullnameClient}"); err != nil {
		t.Fatal(err)
	}
	if err := f.SetCellValue("Sheet1", "B1", "{iin} - {missing}"); err != nil {
		t.Fatal(err)
	}

	err := fillGap(f, "Sheet1", map[string]string{
		"fullnameClient": "Adil",
		"iin":            "123456789012",
	})
	if err != nil {
		t.Fatal(err)
	}

	assertCellValue(t, f, "Sheet1", "A1", "Client: Adil")
	assertCellValue(t, f, "Sheet1", "B1", "123456789012 - {missing}")
}

func TestFillGapReplacesNestedPayloadValues(t *testing.T) {
	f := excelize.NewFile()
	defer func() {
		if err := f.Close(); err != nil {
			t.Fatal(err)
		}
	}()

	if err := f.SetCellValue("Sheet1", "A1", "{customer.fullnameClient}"); err != nil {
		t.Fatal(err)
	}
	if err := f.SetCellValue("Sheet1", "A2", "{fullnameClient}"); err != nil {
		t.Fatal(err)
	}
	if err := f.SetCellValue("Sheet1", "A3", "{customPrice}"); err != nil {
		t.Fatal(err)
	}

	var payload Payload
	payload.Customer.FullnameClient = "Adil"
	payload.CellsLine = map[string]string{
		"customPrice": "1000",
	}

	if err := fillGap(f, "Sheet1", payload); err != nil {
		t.Fatal(err)
	}

	assertCellValue(t, f, "Sheet1", "A1", "Adil")
	assertCellValue(t, f, "Sheet1", "A2", "Adil")
	assertCellValue(t, f, "Sheet1", "A3", "1000")
}

func TestReplaceExcelGaps(t *testing.T) {
	got := replaceExcelGaps("{first} {last}", map[string]string{
		"first": "Ada",
		"last":  "Lovelace",
	})
	if got != "Ada Lovelace" {
		t.Fatalf("expected Ada Lovelace, got %q", got)
	}
}

func assertCellValue(t *testing.T, f *excelize.File, sheet string, cell string, want string) {
	t.Helper()

	got, err := f.GetCellValue(sheet, cell)
	if err != nil {
		t.Fatal(err)
	}
	if got != want {
		t.Fatalf("expected %s to be %q, got %q", cell, want, got)
	}
}
