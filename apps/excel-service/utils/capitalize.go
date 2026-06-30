package utils

import (
	"strings"
	"unicode"
)

func Capitalize(text string) string {
	if text == "" {
		return  text
	}

	arr := []rune(strings.ToLower(text))
	arr[0] = unicode.ToUpper(arr[0])

	return string(arr)
}
