package main

import (
	"log"
	"net/http"
	"os"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	htmlFile, err := os.Open("public/index.html")
	defer htmlFile.Close()
	if err != nil {
		panic(err)
	}
	buf := make([]byte, 1024)
	_, err = htmlFile.Read(buf)
	if err != nil {
		panic(err)
	}
	w.Write(buf)
}

func main() {
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/", fs)

	log.Printf("server is running...")
	if err := http.ListenAndServe("0.0.0.0:80", nil); err != nil {
		log.Printf("HTTP server ListenAndServe Error: %s", err.Error())
	}
}
