package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func main() {
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css/"))))
	http.Handle("/codemirror/", http.StripPrefix("/codemirror/", http.FileServer(http.Dir("codemirror/"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js/"))))
	http.Handle("/MisScripts/", http.StripPrefix("/MisScripts/", http.FileServer(http.Dir("MisScripts/"))))
	
	http.HandleFunc("/", index)

	fmt.Printf("Servidor escuchando en: http://localhost:7000/")
	http.ListenAndServe(":7000", nil)
}
