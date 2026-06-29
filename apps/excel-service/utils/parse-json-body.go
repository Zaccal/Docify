package utils

import (
	"encoding/json"
	"net/http"
)

func ParseJSONBody(r *http.Request, v any) error {
	decoder := json.NewDecoder(r.Body)
	return decoder.Decode(v)
}
