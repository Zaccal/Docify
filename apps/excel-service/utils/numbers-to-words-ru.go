package utils

import (
	"fmt"
	"strconv"
	"strings"
)

var onesMale = []string{
	"", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять",
}

var onesFemale = []string{
	"", "одна", "две", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять",
}

var teens = []string{
	"десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать",
	"пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать",
}

var tens = []string{
	"", "", "двадцать", "тридцать", "сорок", "пятьдесят",
	"шестьдесят", "семьдесят", "восемьдесят", "девяносто",
}

var hundreds = []string{
	"", "сто", "двести", "триста", "четыреста", "пятьсот",
	"шестьсот", "семьсот", "восемьсот", "девятьсот",
}

func NumbersToWordsRu(value any) (string, error) {
	var n int

	switch v := value.(type) {
	case int:
		n = v
	case string:
		parsed, err := strconv.Atoi(v)
		if err != nil {
			return "", err
		}
		n = parsed
	default:
		return "", fmt.Errorf("unsupported type")
	}

	if n == 0 {
		return "ноль", nil
	}

	if n < 0 {
		return "", fmt.Errorf("negative numbers are not supported")
	}

	if n > 999999 {
		return "", fmt.Errorf("number is too large")
	}

	var parts []string

	thousands := n / 1000
	remainder := n % 1000

	if thousands > 0 {
		parts = append(parts, convertThreeDigits(thousands, true))
		parts = append(parts, plural(thousands, "тысяча", "тысячи", "тысяч"))
	}

	if remainder > 0 {
		parts = append(parts, convertThreeDigits(remainder, false))
	}

	return strings.Join(parts, " "), nil
}

func convertThreeDigits(n int, female bool) string {
	var parts []string

	if n >= 100 {
		parts = append(parts, hundreds[n/100])
		n %= 100
	}

	if n >= 10 && n <= 19 {
		parts = append(parts, teens[n-10])
		return strings.Join(parts, " ")
	}

	if n >= 20 {
		parts = append(parts, tens[n/10])
		n %= 10
	}

	if n > 0 {
		if female {
			parts = append(parts, onesFemale[n])
		} else {
			parts = append(parts, onesMale[n])
		}
	}

	return strings.Join(parts, " ")
}

func plural(n int, one, few, many string) string {
	n %= 100
	if n >= 11 && n <= 19 {
		return many
	}

	switch n % 10 {
	case 1:
		return one
	case 2, 3, 4:
		return few
	default:
		return many
	}
}
