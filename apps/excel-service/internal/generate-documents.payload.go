package internal

import "time"

type Payload struct {
	ID           string    `json:"id"`
	Enumeration  string    `json:"enumeration"`
	DocumentDate []string  `json:"documentDate"`
	UpdatedAt    time.Time `json:"updatedAt"`
	CreatedAt    time.Time `json:"createdAt"`
	CellsLine    map[string]string `json:"cellsLine"`
	CustomerID     string `json:"customerId"`
	OrganizationID string `json:"organizationId"`
	Customer       struct {
		ID               string `json:"id"`
		FullnameClient   string `json:"fullnameClient"`
		ClientIDNumber   string `json:"clientIdNumber"`
		ClientIDDateFrom string `json:"clientIdDateFrom"`
		ClientIDType     string `json:"clientIdType"`
		Iin              string `json:"iin"`
		OrganizationID   string `json:"organizationId"`
	} `json:"customer"`
	Organization struct {
		ID           string `json:"id"`
		Organization string `json:"organization"`
		Bin          string `json:"bin"`
		City         string `json:"city"`
		Index        string `json:"index"`
		Address      string `json:"address"`
		CostPerDay   string `json:"costPerDay"`
		Iik          string `json:"iik"`
		Bik          string `json:"bik"`
		Bank         string `json:"bank"`
		Knp          string `json:"knp"`
		Kbe          string `json:"kbe"`
	} `json:"organization"`

}
