package utils

import "time"

func CountNights(dateFrom, dateTo string) (int, error) {
	t1, err := parseDocumentDate(dateFrom)
	if err != nil {
		return 0, err
	}
	t2, err := parseDocumentDate(dateTo)
	if err != nil {
		return 0, err
	}

	nights := int(t2.Sub(t1).Hours() / 24)
	return nights, nil
}

func parseDocumentDate(date string) (time.Time, error) {
	for _, layout := range []string{"02-01-2006", "02.01.2006", "2006-01-02"} {
		parsed, err := time.Parse(layout, date)
		if err == nil {
			return parsed, nil
		}
	}

	return time.Parse("02-01-2006", date)
}
