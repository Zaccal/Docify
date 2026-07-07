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


	totalCostRu, err := utils.NumbersToWordsRu(data.Organization.TotalCost)
	if err != nil {
		return result, err
	}

	result.Generated = make(map[string]string)

	result.Generated["totalCost"] = utils.FormatCost(strconv.Itoa(data.Organization.TotalCost))
	result.Generated["totalCostRu"] = utils.Capitalize(totalCostRu)
	result.Generated["nights"] = strconv.Itoa(nights)

	result.Generated["formattedDateFrom"] = formattedDateFrom
	result.Generated["formattedDateTo"] = formattedDateTo

	result.Generated["costPerDayFormatted"] = utils.FormatCost(costPerDayRaw)
	result.Generated["costPerDayRu"] = utils.Capitalize(costPerDayWords)

	if data.Organization.Knp != "" {
		result.Organization.Knp = "КНП: " + data.Organization.Knp
	}

	if data.Organization.Kbe != "" {
		result.Organization.Kbe = "КБЕ: " + data.Organization.Kbe
	}

	return result, nil
}

func normalizeNumericString(data int) string {
	value := strconv.Itoa(data)

	replacer := strings.NewReplacer(" ", "", "\u00a0", "", "\u202f", "")
	return replacer.Replace(value)
}
