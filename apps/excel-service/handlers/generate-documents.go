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
	f := internal.GenerateExcelDocument()
	defer func() {
		if err := f.Close(); err != nil {
			utils.WriteJSONResponse(w, ErrResponse{ Error: err.Error() }, http.StatusInternalServerError)
			return
		}
	}()

	w.Header().Set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	w.Header().Set("Content-Disposition", `attachment; filename="document.xlsx`)

	if err := f.Write(w); err != nil {
		utils.WriteJSONResponse(w, ErrResponse{ Error: err.Error() }, http.StatusInternalServerError)
		return
	}
}
