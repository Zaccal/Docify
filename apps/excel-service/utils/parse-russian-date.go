package utils

import "fmt"

var months = []string{
	"",
	"Января",
	"Февраля",
	"Марта",
	"Апреля",
	"Мая",
	"Июня",
	"Июля",
	"Августа",
	"Сентября",
	"Октября",
	"Ноября",
	"Декабря",
}

func FormatRussianDate(dateStr string) (string, error) {
	t, err := parseDocumentDate(dateStr)
	if err != nil {
		return "", err
	}

	return fmt.Sprintf(
		"%02d %s %dг",
		t.Day(),
		months[t.Month()],
		t.Year(),
	), nil
}
