//  tsc app.ts       para ejecutar el tyscript
var filestring = "ESTE TEXTAREA ES SOLO PARA LEER ARCHIVOS , NO MODIFICAR";
var file;
var unlocown;
function fileChanged(e) {
    console.log("leyendo un archivo");
    this.file = e.target.files[0];
    this.uploadDocument();
    var cadena__html;
}
function uploadDocument() {
    var _this = this;
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
        console.log(fileReader.result);
        _this.filestring = fileReader.result;
        console.log(filestring);
    };
    fileReader.readAsText(this.file);
}
function imprimir() {
    console.log("HOLA");
}
