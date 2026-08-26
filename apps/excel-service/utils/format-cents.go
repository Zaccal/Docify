package utils

import (
	"fmt"
	"strings"
)

func FormatCents(cents int64) string {
	whole := cents / 100
	fraction := cents % 100

	wholeStr := fmt.Sprintf("%d", whole)

	var result strings.Builder

	for i, digit := range wholeStr {
		if i > 0 && (len(wholeStr)-i)%3 == 0 {
			result.WriteByte(' ')
		}

		result.WriteRune(digit)
	}

	fmt.Fprintf(&result, ",%02d", fraction)

	return result.String()
}
