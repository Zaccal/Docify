package internal

import (
	"fmt"
	"strconv"

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

	totalCostCents := utils.ToCents(data.Customer.Organization.TotalCost)
	totalCost := totalCostCents / 100
	totalCostFraction := totalCostCents % 100

	costPerDayCents := utils.ToCents(data.Customer.Organization.CostPerDay)
	costPerDay := costPerDayCents / 100

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

	totalCostRu, err := utils.NumbersToWordsRu(totalCost)
	if err != nil {
		return result, err
	}

	totalCostCentsRu, err := utils.NumbersToWordsRu(totalCostFraction)
	if err != nil {
		return result, err
	}

	costPerDayWords, err := utils.NumbersToWordsRu(costPerDay)
	if err != nil {
		return result, err
	}

	if totalCostFraction == 0 {
		totalCostCentsRu = ", 00"
	} else {
		totalCostCentsRu = ", " + totalCostCentsRu
	}

	totalCostCentsResult := fmt.Sprintf("%02d", totalCostFraction)

	result.Generated = make(map[string]string)

	result.Generated["totalCost"] = utils.FormatCents(totalCostCents)
	result.Generated["totalCostRu"] = utils.Capitalize(totalCostRu)

	result.Generated["totalCostCentsRu"] = totalCostCentsRu
	result.Generated["totalCostCents"] = totalCostCentsResult

	result.Generated["nights"] = strconv.Itoa(nights)

	result.Generated["formattedDateFrom"] = formattedDateFrom
	result.Generated["formattedDateTo"] = formattedDateTo

	result.Generated["costPerDayFormatted"] = utils.FormatCents(costPerDayCents)
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
