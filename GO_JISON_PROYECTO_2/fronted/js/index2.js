
var contador2=0;

function get_cont2(){
    return contador2++;
}

var vent_focus2="pestana2";

function get_vent2(){
    return vent_focus2;
}

function set_vent2(vent){
    vent_focus2=vent;
}

var lista2=new Array();


function linkedlist2(pestana2,nombre2) {
    var obj=new Object();
    obj.pestana2=pestana2;
    obj.nombre2=nombre2;
    lista2.push(obj);
}


function deletepes2(pestana2){
    for(var i=0;i<lista2.length;i++){
        if(lista2[i].pestana2==pestana2){
            delete lista2[i];
        }
    }
}

/*--------------------------------------Funcion Al Cambiar Ventana---------------------------------------*/
function index2(pestanias2, pestania2) {
    var id=pestania2.replace('pestana2','');
    set_vent2('textarea'+id);

    var pestanna12 = document.getElementById(pestania2);
    var listaPestannas2 = document.getElementById(pestanias2);
    var cpestanna2 = document.getElementById('c'+pestania2);
    var listacPestannas2 = document.getElementById('contenido2'+pestanias2);

    var i=0;
    while (typeof listacPestannas2.getElementsByTagName('div')[i] != 'undefined'){
        $(document).ready(function(){
            $(listacPestannas2.getElementsByTagName('div')[i]).css('display','none');
            $(listaPestannas2.getElementsByTagName('li')[i]).css('background','');
            $(listaPestannas2.getElementsByTagName('li')[i]).css('padding-bottom','');
        });
        i += 1;
    }

    $(document).ready(function(){
        $(cpestanna2).css('display','');
        $(pestanna12).css('background','dimgray');
        $(pestanna12).css('padding-bottom','2px');
    });

    try {
        var act2=document.getElementById('cpestana2'+id);
        var tact2=document.getElementById('textarea'+id);

        while (act2.firstChild) {
            act2.removeChild(act2.firstChild);
        }

        act2.appendChild(tact2);
        var editor2=CodeMirror(act2, {
            lineNumbers: true,
            value: tact2.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "eclipse",
            mode: "text/x-java"
        }).on('change', editor2 => {
            tact2.value=editor2.getValue();
        });
    }catch(error) {}
}




/*---------------------------------------Funcion Agregar Pestania----------------------------------------*/
function agregar2() {
    /*-  var x2=get_cont2();  --*/
    var lu2=document.getElementById("lista2");
    var li=document.createElement("li");
    li.setAttribute('id','codigo');
    var a2=document.createElement("a");
    a2.setAttribute('id','a');
  /*-  a2.setAttribute('href', 'javascript:index2("pestanas2","pestana2'+x2+'")');  -*/
    a2.text='Texto';
    li.appendChild(a2);
    lu2.appendChild(li);
    //index2("pestanas2","pestana2"+x2);

    var contenido2=document.getElementById("contenidopestanas2");
    var divp2=document.createElement("div");
    divp2.setAttribute('id','consola2');

    var ta2=document.createElement("textarea");
    ta2.setAttribute('id','textarea');
    ta2.setAttribute('name','textarea');
    ta2.setAttribute('class','ta2');
    ta2.setAttribute('style','display:none');
    ta2.cols=123;
    ta2.rows=30;
    divp2.appendChild(ta2);
    contenido2.appendChild(divp2);

    var act2=document.getElementById('consola2');
    var tact2=document.getElementById('textarea');
    var editor2=CodeMirror(act2, {
        lineNumbers: true,
        value: tact2.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "dracula",
        mode: "text/x-java"
    }).on('change', editor2 => {
        tact2.value=editor2.getValue();
    });
}





function quitar2(){
    try{
        var lu2=document.getElementById("lista2");
        lu2.innerHTML="";
        var contenido2=document.getElementById("contenidopestanas2");
        contenido2.innerHTML="";
           }catch(error){}
}


/*-----------------------------------------------File---------------------------------------------------*/
function AbrirArchivo2(files){
    var file = files[0];
    var reader = new FileReader();
 

    reader.onload = function (e) {
       var act=document.getElementById("contenidopestanas2");
       var act2=document.getElementById('consola2');
       act2.innerHTML="";
       var ta2=document.createElement("textarea");
       ta2.setAttribute('id','textarea');
       ta2.setAttribute('name','textarea');
       ta2.setAttribute('class','ta2');
       ta2.setAttribute('style','display:none');
       ta2.cols=123;
       ta2.rows=30;
       act2.appendChild(ta2);    
       var tact2=document.getElementById('textarea');
           tact2.value = e.target.result;
   
  /*- var editor2=CodeMirror(act2, {  -*/
       CodeMirror.fromTextArea(tact2, {   

            lineNumbers: true,
            value: tact2.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "dracula",
            mode: "text/x-java"
        }).on('change', editor2 => {
            act2.value=editor2.getValue();
        });
        
    };
    
   reader.readAsText(file);
    file.clear;

    var file_input=document.getElementById("fileInput2");
    document.getElementById('fileInput2').value="";
}















function errores2() {
/*   aca es el texto del codemirror        */   
  var ventana_present=document.getElementById("textarea");
  var texto=ventana_present.value;
  alert("ENTRADA: "+ texto);
  var url = 'http://localhost:3000/errores/';
      var divError = document.getElementById("erroresConsola2");
  $.post(url, { text1: texto }, function (data, status) {
      if (status.toString() == "success") {
          console.log(data)
          alert("El resultado es: " + data.toString());
 
/*                    ACA inyecto el html recibido desde el NodeJs         */     
divError.innerHTML = data.toString();

      } else {
          alert("Error estado de conexion:" + status);
      }
  });
  console.log("OK LLAMANDO AL METODO");    
}







function ats2() {
      /*            esta ventana es una porque es la segunada consola         */    
    var ventana_actual=document.getElementById("textarea");
     var texto=ventana_actual.value;
     alert("ENTRADA: "+ texto);
     var url = 'http://localhost:3000/ats/';
     var rep = document.getElementById("ats2");
     var tituloast = document.getElementById("tituloAST2");
     $.post(url, { text1: texto }, function (data, status) {
         if (status.toString() == "success") {
             console.log(data)
             alert("reporte generado");
   /*                   ACA inyecto el html recibido desde el NodeJs         */     
   tituloast.innerHTML ="Reporte consola 2 AST"; 
   rep.setAttribute('style','background-color: azure;');
   rep.setAttribute('class',"demo");
   rep.innerHTML = data;
   
   
    /*      en siguiente codigo es como mandarlo a graficar         */    
            $('#ats2').jstree(); 
   
         } else {
             alert("Error estado de conexion:" + status);
         }
     });
   
   }





   

   


