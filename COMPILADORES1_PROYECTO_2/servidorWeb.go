package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

func index(res http.ResponseWriter, req *http.Request) {
	template, err := template.ParseFiles("public/vista/main.html")
	if err != nil {
		fmt.Fprint(res, "pagina no encontrada")
	} else {
		template.Execute(res, nil)
	}
}

func main() {
	// archivos staticos
	fileServer := http.FileServer(http.Dir("public"))
	http.Handle("/public", http.StripPrefix("/public", fileServer))
	// el striprefix solo le quita public
	http.HandleFunc("/", index)
	fmt.Printf("El servidor esta a la escucha en el puerto 5000 \n")
	fmt.Println("iniciar aqui copia esa ruta:  http://localhost:5000/")
	//nil: corresponde a la representación de un valor no inicializado
	log.Fatal(http.ListenAndServe(":5000", nil))
}

// para ejecutar un archivo GO poner     go run nombre.go
// go build main.go         compila
