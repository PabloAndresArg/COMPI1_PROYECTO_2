function COMUNICAR_NODE() {
    // comunicar        http://localhost:3000/comunicar/
    
    var texto = document.getElementById("entrada_copia").value;
    console.log(texto);

    var url = 'http://localhost:3000/comunicar/';

    $.post(url, { text1: texto  , text2: "QUE TAL"}, function (data, status) {
        if (status.toString() == "success") {
            alert("El resultado es: " + data.toString());
        } else {
            alert("Error estado de conexion:" + status);
        }
    });
    console.log("OK LLAMANDO AL METODO");
}

function SALUDAR(){
alert("HOLAA");
}