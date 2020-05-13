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
func errores(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("errores.html"))
	t.Execute(w, "")
}

func main() {
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js/"))))
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css/"))))
	http.Handle("/codemirror/", http.StripPrefix("/codemirror/", http.FileServer(http.Dir("codemirror/"))))
	http.Handle("/website/", http.StripPrefix("/website/", http.FileServer(http.Dir("website/"))))
	http.Handle("/jstree/", http.StripPrefix("/jstree/", http.FileServer(http.Dir("jstree/"))))
	http.HandleFunc("/", index)
	http.HandleFunc("/errores", errores)

	fmt.Printf("Servidor escuchando en: http://localhost:7000/")
	http.ListenAndServe(":7000", nil)
}
