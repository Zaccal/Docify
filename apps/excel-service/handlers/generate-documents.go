package handlers

import (
	"net/http"

	"github.com/Zaccal/Docify/apps/excel-service/internal"
	"github.com/Zaccal/Docify/apps/excel-service/utils"
)

type ErrResponse struct {
	Error string `json:"error"`
}

func GenerateDocumentsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", "POST")
		utils.WriteJSONResponse(w, ErrResponse{Error: "method not allowed"}, http.StatusMethodNotAllowed)
		return
	}

	defer r.Body.Close()
	var payload internal.Payload
	if err := utils.ParseJSONBody(r, &payload); err != nil {
		utils.WriteJSONResponse(w, ErrResponse{Error: err.Error()}, http.StatusBadRequest)
		return
	}

	org := r.URL.Query().Get("org")
	if org == "" {
		utils.WriteJSONResponse(w, ErrResponse{Error: "org is missing"}, http.StatusBadRequest)
		return
	}

	archive, err := internal.GenerateExcelDocumentsArchive(org, payload)
	if err != nil {
		utils.WriteJSONResponse(w, ErrResponse{Error: err.Error()}, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/zip")
	w.Header().Set("Content-Disposition", `attachment; filename="documents.zip"`)

	if _, err := w.Write(archive); err != nil {
		utils.WriteJSONResponse(w, ErrResponse{Error: err.Error()}, http.StatusInternalServerError)
		return
	}
}
