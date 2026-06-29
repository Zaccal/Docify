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
	if err := f.SetCellValue("Sheet1", "A4", "{totalPrice} / {generated.totalPrice}"); err != nil {
		t.Fatal(err)
	}

	var payload Payload
	payload.Customer.FullnameClient = "Adil"
	payload.CellsLine = map[string]string{
		"customPrice": "1000",
	}
	formattedPayload := FormattedPayload{
		Payload: payload,
		Generated: map[string]string{
			"totalPrice": "30 000",
		},
	}

	if err := fillGap(f, "Sheet1", formattedPayload); err != nil {
		t.Fatal(err)
	}

	assertCellValue(t, f, "Sheet1", "A1", "Adil")
	assertCellValue(t, f, "Sheet1", "A2", "Adil")
	assertCellValue(t, f, "Sheet1", "A3", "1000")
	assertCellValue(t, f, "Sheet1", "A4", "30 000 / 30 000")
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

func TestBuildGapReplacementsSupportsArrayIndexes(t *testing.T) {
	replacements, err := buildGapReplacements(Payload{
		DocumentDate: []string{"10.06.2026", "13.06.2026"},
	})
	if err != nil {
		t.Fatal(err)
	}

	if replacements["documentDate"] != "10.06.2026, 13.06.2026" {
		t.Fatalf("expected joined documentDate, got %q", replacements["documentDate"])
	}
	if replacements["documentDate.0"] != "10.06.2026" {
		t.Fatalf("expected first documentDate, got %q", replacements["documentDate.0"])
	}
	if replacements["documentDate.1"] != "13.06.2026" {
		t.Fatalf("expected second documentDate, got %q", replacements["documentDate.1"])
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
