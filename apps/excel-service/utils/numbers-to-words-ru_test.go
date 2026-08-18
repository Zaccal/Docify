package utils

import "testing"

func TestNumbersToWordsRuSupportsLargeInt64Values(t *testing.T) {
	tests := []struct {
		name  string
		value any
		want  string
	}{
		{
			name:  "million",
			value: int64(1_000_000),
			want:  "один миллион",
		},
		{
			name:  "millions with thousands and remainder",
			value: int64(1_234_567),
			want:  "один миллион двести тридцать четыре тысячи пятьсот шестьдесят семь",
		},
		{
			name:  "billions",
			value: int64(2_345_678_901),
			want:  "два миллиарда триста сорок пять миллионов шестьсот семьдесят восемь тысяч девятьсот один",
		},
		{
			name:  "large string",
			value: "9223372",
			want:  "девять миллионов двести двадцать три тысячи триста семьдесят два",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := NumbersToWordsRu(tt.value)
			if err != nil {
				t.Fatal(err)
			}
			if got != tt.want {
				t.Fatalf("expected %q, got %q", tt.want, got)
			}
		})
	}
}
