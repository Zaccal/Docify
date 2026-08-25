package internal

import (
	"fmt"
	"math"
	"strconv"
	"strings"

	"github.com/Zaccal/Docify/apps/excel-service/utils"
)

type FormattedPayload struct {
	Payload
	Generated map[string]string `json:"generated"`
}

func FormatPayload(data Payload) (result FormattedPayload, err error) {
	totalCost, totalCostFracPart := math.Modf(data.Customer.Organization.TotalCost)

	totalCostCents := int64(math.Round(totalCostFracPart * 100))

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

	totalCostCentsRu, err := utils.NumbersToWordsRu(int64(totalCostCents))
	if err != nil {
		return result, err
	}

	costPerDayRaw := normalizeNumericString(data.Customer.Organization.CostPerDay)

	costPerDay, _ := math.Modf(data.Customer.Organization.CostPerDay)
	costPerDayWords, err := utils.NumbersToWordsRu(int64(costPerDay))
	if err != nil {
		return result, err
	}

	totalCostRu, err := utils.NumbersToWordsRu(int64(totalCost))
	if err != nil {
		return result, err
	}

	if totalCostCentsRu == "ноль" {
		totalCostCentsRu = ", 00"
	} else {
		totalCostCentsRu = ", " + totalCostCentsRu
	}

	var totalCostResult string
	if totalCostCents == 0 {
		totalCostResult = "00"
	} else {
		totalCostResult = strconv.Itoa(int(totalCostCents))
	}

	result.Generated = make(map[string]string)

	result.Generated["totalCost"] = utils.FormatCost(strconv.FormatInt(int64(totalCost), 10))
	result.Generated["totalCostRu"] = utils.Capitalize(totalCostRu)

	result.Generated["totalCostCentsRu"] = totalCostCentsRu
	result.Generated["totalCostCents"] = totalCostResult

	result.Generated["nights"] = strconv.Itoa(nights)

	result.Generated["formattedDateFrom"] = formattedDateFrom
	result.Generated["formattedDateTo"] = formattedDateTo

	result.Generated["costPerDayFormatted"] = utils.FormatCost(costPerDayRaw)
	result.Generated["costPerDayRu"] = utils.Capitalize(costPerDayWords)

	if data.Customer.Organization.Knp != "" {
		result.Customer.Organization.Knp = "КНП: " + data.Customer.Organization.Knp
	}

	if data.Customer.Organization.Kbe != "" {
		result.Customer.Organization.Kbe = "КБЕ: " + data.Customer.Organization.Kbe
	}

	if data.Customer.Organization.Index != "" {
		result.Customer.Organization.Index = data.Customer.Organization.Index + ","
	}

	return result, nil
}

func normalizeNumericString(data float64) string {
	value := strconv.FormatFloat(data, 'f', -1, 64)

	replacer := strings.NewReplacer(" ", "", "\u00a0", "", "\u202f", "")
	return replacer.Replace(value)
}
