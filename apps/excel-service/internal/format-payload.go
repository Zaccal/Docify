package internal

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/Zaccal/Docify/apps/excel-service/utils"
)

type FormattedPayload struct {
	Payload
	Generated map[string]string `json:"generated"`
}

func FormatPayload(data Payload) (result FormattedPayload, err error) {
	result.Payload = data
	if len(data.DocumentDate) < 2 {
		return result, fmt.Errorf("documentDate must contain date from and date to")
	}

	formattedDateFrom, err := utils.FormatRussianDate(data.DocumentDate[0])
	if err != nil {
		return result, err
	}

	formattedDateTo, err := utils.FormatRussianDate(data.DocumentDate[1])
	if err != nil {
		return result, err
	}

	nights, err := utils.CountNights(data.DocumentDate[0], data.DocumentDate[1])
	if err != nil {
		return result, err
	}

	costPerDayRaw := normalizeNumericString(data.Organization.CostPerDay)
	costPerDay, err := strconv.Atoi(costPerDayRaw)
	if err != nil {
		return result, fmt.Errorf("parse costPerDay: %w", err)
	}

	costPerDayWords, err := utils.NumbersToWordsRu(costPerDay)
	if err != nil {
		return result, err
	}

	totalPrice := nights * costPerDay

	totalPriceWords, err := utils.NumbersToWordsRu(totalPrice)
	if err != nil {
		return result, err
	}

	result.Generated = make(map[string]string)

	result.Generated["totalPrice"] = utils.FormatCost(strconv.Itoa(totalPrice))
	result.Generated["totalPriceWords"] = totalPriceWords
	result.Generated["nights"] = strconv.Itoa(nights)

	result.Generated["formattedDateFrom"] = formattedDateFrom
	result.Generated["formattedDateTo"] = formattedDateTo

	result.Organization.CostPerDay = utils.FormatCost(costPerDayRaw)
	result.Generated["costPerDayWords"] = costPerDayWords

	if data.Organization.Knp != "" {
		result.Organization.Knp = "КНП: " + data.Organization.Knp
	}

	return result, nil
}

func normalizeNumericString(value string) string {
	replacer := strings.NewReplacer(" ", "", "\u00a0", "", "\u202f", "")
	return replacer.Replace(value)
}
