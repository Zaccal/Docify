package handlers

import (
	"net/http"

	"github.com/Zaccal/Docify/apps/excel-service/utils"
)

func HealthzHandler(w http.ResponseWriter, r *http.Request) {
	utils.WriteJSONResponse(w, map[string]string{"status": "ok"}, http.StatusOK)
}
