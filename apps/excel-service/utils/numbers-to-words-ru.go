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

var scales = []struct {
	one    string
	few    string
	many   string
	female bool
}{
	{},
	{one: "тысяча", few: "тысячи", many: "тысяч", female: true},
	{one: "миллион", few: "миллиона", many: "миллионов"},
	{one: "миллиард", few: "миллиарда", many: "миллиардов"},
	{one: "триллион", few: "триллиона", many: "триллионов"},
	{one: "квадриллион", few: "квадриллиона", many: "квадриллионов"},
	{one: "квинтиллион", few: "квинтиллиона", many: "квинтиллионов"},
}

func NumbersToWordsRu(value any) (string, error) {
	var n int64

	switch v := value.(type) {
	case int:
		n = int64(v)
	case int64:
		n = v
	case string:
		parsed, err := strconv.ParseInt(v, 10, 64)
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

	groups := make([]int64, 0, len(scales))
	for n > 0 {
		groups = append(groups, n%1000)
		n /= 1000
	}

	if len(groups) > len(scales) {
		return "", fmt.Errorf("number is too large")
	}

	var parts []string
	for scaleIndex := len(groups) - 1; scaleIndex >= 0; scaleIndex-- {
		group := groups[scaleIndex]
		if group == 0 {
			continue
		}

		scale := scales[scaleIndex]
		parts = append(parts, convertThreeDigits(group, scale.female))
		if scaleIndex > 0 {
			parts = append(parts, plural(group, scale.one, scale.few, scale.many))
		}
	}

	return strings.Join(parts, " "), nil
}

func convertThreeDigits(n int64, female bool) string {
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

func plural(n int64, one, few, many string) string {
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
