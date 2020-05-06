//  tsc app.ts       para ejecutar el tyscript

    var filestring:any = "ESTE TEXTAREA ES SOLO PARA LEER ARCHIVOS , NO MODIFICAR"; 
    var  file:any; 
    var unlocown:any; 
    
    function fileChanged(e) {
    console.log("leyendo un archivo");
    this.file = e.target.files[0];
    this.uploadDocument();
    let cadena__html:any; 
    }
    function uploadDocument(){
    let fileReader = new FileReader(); 
    fileReader.onload = (e) =>{
    console.log(fileReader.result);
    this.filestring = fileReader.result;
    console.log(filestring);

    }
    fileReader.readAsText(this.file);
    }

    function imprimir(){
        console.log("HOLA");
    }


