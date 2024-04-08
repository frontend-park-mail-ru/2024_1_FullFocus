package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		fmt.Println(path)

		p := "./public/index.html"
		http.ServeFile(w, r, p)

	})

	log.Printf("server is running...")
	if err := http.ListenAndServe("0.0.0.0:80", nil); err != nil {
		log.Printf("HTTP server ListenAndServe Error: %s", err.Error())
	}
}
