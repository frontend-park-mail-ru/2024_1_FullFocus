package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/", fs)
	http.Handle("/signup", http.StripPrefix("/signup", fs))
	http.Handle("/login", http.StripPrefix("/login", fs))
	http.Handle("/logout", http.StripPrefix("/logout", fs))
	http.Handle("/profile", http.StripPrefix("/profile", fs))

	log.Printf("server is running...")
	if err := http.ListenAndServe("0.0.0.0:80", nil); err != nil {
		log.Printf("HTTP server ListenAndServe Error: %s", err.Error())
	}
}
