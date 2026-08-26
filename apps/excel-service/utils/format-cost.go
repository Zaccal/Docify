package utils

import "strings"

func FormatCost(price string) string {
	price = strings.TrimSpace(price)
	price = strings.Replace(price, ",", ".", 1)

	parts := strings.SplitN(price, ".", 2)
	integerPart := parts[0]

	n := len(integerPart)

	var result strings.Builder

	firstGroup := n % 3
	if firstGroup == 0 {
		firstGroup = 3
	}

	result.WriteString(integerPart[:firstGroup])

	for i := firstGroup; i < n; i += 3 {
		result.WriteByte(' ')
		result.WriteString(integerPart[i : i+3])
	}

	if len(parts) == 2 {
		result.WriteByte(',')
		result.WriteString(parts[1])
	}

	return result.String()
}
