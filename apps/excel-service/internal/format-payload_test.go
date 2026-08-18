package internal

import "testing"

func TestFormatPayloadAddsGeneratedValues(t *testing.T) {
	var payload Payload
	payload.DocumentDate = []string{"2026-06-10", "2026-06-13"}
	payload.Customer.Organization.CostPerDay = 1000000
	payload.Customer.Organization.TotalCost = 3000000
	payload.CellsLine = map[string]string{
		"userValue": "kept",
	}

	result, err := FormatPayload(payload)
	if err != nil {
		t.Fatal(err)
	}

	assertPayloadGeneratedValue(t, result, "formattedDateFrom", "10 Июня 2026г")
	assertPayloadGeneratedValue(t, result, "formattedDateTo", "13 Июня 2026г")
	assertPayloadGeneratedValue(t, result, "nights", "3")
	assertPayloadGeneratedValue(t, result, "totalCost", "3 000 000")
	assertPayloadGeneratedValue(t, result, "totalCostRu", "Три миллиона")
	assertPayloadGeneratedValue(t, result, "costPerDayRu", "Один миллион")

	if result.CellsLine["userValue"] != "kept" {
		t.Fatalf("expected user cellsLine value to be preserved")
	}
	if _, exists := result.CellsLine["totalCost"]; exists {
		t.Fatalf("expected computed values not to be written into cellsLine")
	}

	if result.Customer.Organization.CostPerDay != 1000000 {
		t.Fatalf("expected formatted cost per day, got %d", result.Customer.Organization.CostPerDay)
	}
}

func assertPayloadGeneratedValue(t *testing.T, payload FormattedPayload, key string, want string) {
	t.Helper()

	got := payload.Generated[key]
	if got != want {
		t.Fatalf("expected generated[%q] to be %q, got %q", key, want, got)
	}
}
