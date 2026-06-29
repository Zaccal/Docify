package utils

func FormatCost(price string) string {
	n := len(price)
	if n <= 3 {
		return price
	}

	result := make([]byte, 0, n+2)

	firstGroup := n % 3
	if firstGroup == 0 {
		firstGroup = 3
	}

	result = append(result, price[:firstGroup]...)

	for i := firstGroup; i < n; i += 3 {
		result = append(result, ' ')
		result = append(result, price[i:i+3]...)
	}

	return string(result)
}
