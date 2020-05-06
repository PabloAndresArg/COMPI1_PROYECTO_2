package main

import (
	"fmt"
	"log"
	"net/http"

	rice "github.com/GeertJohan/go.rice"

	"github.com/gorilla/mux"
)

func main() {
	fmt.Printf("El servidor esta a la escucha en el puerto 12345 \n")
	fmt.Println("iniciar aqui copia esa ruta:  http://localhost:12345/")
	router := mux.NewRouter()
	router.PathPrefix("/").Handler(http.FileServer(rice.MustFindBox("website").HTTPBox()))
	http.ListenAndServe(":7070", router)
	//nil: corresponde a la representación de un valor no inicializado
	log.Fatal(http.ListenAndServe(":7070", nil))
	// ejecutar 3 comandos en consola
	//echo $PATH
	// rice embed-go
	// go build
}
