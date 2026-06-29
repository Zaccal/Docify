package main

import (
	"log"
	"net/http"
	"os"

	"github.com/Zaccal/Docify/apps/excel-service/handlers"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	PORT := os.Getenv("PORT")
	if PORT == "" {
		log.Fatal("The PORT is missing")
	}

	r := http.NewServeMux()

	r.HandleFunc("GET /healthz", handlers.HealthzHandler)
	r.HandleFunc("POST /generate", handlers.GenerateDocumentsHandler)

	log.Println("The server works on :", PORT)
	err := http.ListenAndServe(":"+PORT, r)
	if err != nil {
		log.Fatal(err)
	}
}
