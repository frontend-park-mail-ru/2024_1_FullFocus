package main

import (
	"fmt"
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

	fmt.Println("starting server at :8080")
	http.ListenAndServe(":8080", nil)
}
