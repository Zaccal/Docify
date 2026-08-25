package internal

import (
	"bytes"
	"encoding/json"
	"fmt"
	"time"
)

type CellLine struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type CellLines []CellLine

func (lines CellLines) AsMap() map[string]string {
	result := make(map[string]string, len(lines))
	for _, line := range lines {
		result[line.Key] = line.Value
	}
	return result
}

func (lines CellLines) MarshalJSON() ([]byte, error) {
	var buffer bytes.Buffer
	buffer.WriteByte('{')

	for index, line := range lines {
		if index > 0 {
			buffer.WriteByte(',')
		}

		key, err := json.Marshal(line.Key)
		if err != nil {
			return nil, fmt.Errorf("marshal cellsLine key: %w", err)
		}

		value, err := json.Marshal(line.Value)
		if err != nil {
			return nil, fmt.Errorf("marshal cellsLine value: %w", err)
		}

		buffer.Write(key)
		buffer.WriteByte(':')
		buffer.Write(value)
	}

	buffer.WriteByte('}')
	return buffer.Bytes(), nil
}

func (lines *CellLines) UnmarshalJSON(data []byte) error {
	trimmed := bytes.TrimSpace(data)
	if bytes.Equal(trimmed, []byte("null")) {
		*lines = nil
		return nil
	}

	if len(trimmed) == 0 {
		*lines = nil
		return nil
	}

	switch trimmed[0] {
	case '{':
		return lines.unmarshalJSONObject(trimmed)
	case '[':
		var decoded []CellLine
		if err := json.Unmarshal(trimmed, &decoded); err != nil {
			return fmt.Errorf("unmarshal cellsLine array: %w", err)
		}
		*lines = decoded
		return nil
	default:
		return fmt.Errorf("cellsLine must be object or array")
	}
}

func (lines *CellLines) unmarshalJSONObject(data []byte) error {
	decoder := json.NewDecoder(bytes.NewReader(data))

	token, err := decoder.Token()
	if err != nil {
		return fmt.Errorf("read cellsLine object: %w", err)
	}

	if delimiter, ok := token.(json.Delim); !ok || delimiter != '{' {
		return fmt.Errorf("cellsLine must be object")
	}

	var decoded CellLines
	for decoder.More() {
		keyToken, err := decoder.Token()
		if err != nil {
			return fmt.Errorf("read cellsLine key: %w", err)
		}

		key, ok := keyToken.(string)
		if !ok {
			return fmt.Errorf("cellsLine key must be string")
		}

		var value string
		if err := decoder.Decode(&value); err != nil {
			return fmt.Errorf("read cellsLine value for %q: %w", key, err)
		}

		decoded = append(decoded, CellLine{Key: key, Value: value})
	}

	token, err = decoder.Token()
	if err != nil {
		return fmt.Errorf("close cellsLine object: %w", err)
	}

	if delimiter, ok := token.(json.Delim); !ok || delimiter != '}' {
		return fmt.Errorf("cellsLine object is not closed")
	}

	*lines = decoded
	return nil
}

type Payload struct {
	ID             string    `json:"id"`
	Enumeration    string    `json:"enumeration"`
	DocumentDate   []string  `json:"documentDate"`
	UpdatedAt      time.Time `json:"updatedAt"`
	CreatedAt      time.Time `json:"createdAt"`
	CellsLine      CellLines `json:"cellsLine"`
	CustomerID     string    `json:"customerId"`
	OrganizationID string    `json:"organizationId"`
	Customer       struct {
		ID               string `json:"id"`
		FullnameClient   string `json:"fullnameClient"`
		ClientIDNumber   string `json:"clientIdNumber"`
		ClientIDDateFrom string `json:"clientIdDateFrom"`
		ClientIDType     string `json:"clientIdType"`
		Iin              string `json:"iin"`
		OrganizationID   string `json:"organizationId"`
		Organization     struct {
			ID           string  `json:"id"`
			Organization string  `json:"organization"`
			Bin          string  `json:"bin"`
			City         string  `json:"city"`
			Index        string  `json:"index"`
			Address      string  `json:"address"`
			CostPerDay   float64 `json:"costPerDay"`
			TotalCost    float64 `json:"totalCost"`
			Iik          string  `json:"iik"`
			Bik          string  `json:"bik"`
			Bank         string  `json:"bank"`
			Knp          string  `json:"knp"`
			Kbe          string  `json:"kbe"`
		} `json:"organization"`
	} `json:"customer"`
}
