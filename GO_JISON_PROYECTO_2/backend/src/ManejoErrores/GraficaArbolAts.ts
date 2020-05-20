import {Node} from '../Abstract/Node';
import {Tree} from '../Simbols/Tree';
import {Table} from '../Simbols/Table';

class GraficaArbolAts{
    public static cadena:string = ""; 
    constructor(){
      
    }

    public static initHtml(){
        GraficaArbolAts.cadena += "<!DOCTYPE html>"+"\n";
        GraficaArbolAts.cadena += "<html lang=\"en\">"+"\n";
        GraficaArbolAts.cadena += "<head>"+"\n";
        GraficaArbolAts.cadena += "<meta charset=\"UTF-8\">"+"\n";
        GraficaArbolAts.cadena += "<title>Ejemplo - JSTree</title>"+"\n";
        GraficaArbolAts.cadena += "<style>"+"\n";
        GraficaArbolAts.cadena += ".demo { overflow:auto; border:1px solid silver; min-height:100px; }"+"\n";
        GraficaArbolAts.cadena += "</style>"+"\n";
        GraficaArbolAts.cadena += "<link rel=\"stylesheet\" href=\"./jstree/dist//themes//default/style.min.css\"/>"+"\n";
        GraficaArbolAts.cadena += "</head>"+"\n";
        GraficaArbolAts.cadena += "<body>"+"\n";
        GraficaArbolAts.cadena += "<h1 style=\"color: azure;\">Reporte AST</h1>"+"\n";
        GraficaArbolAts.cadena += "<div id=\"arbol\" class=\"demo\"  style=\"background-color: azure;\">"+"\n";
        GraficaArbolAts.cadena += "<ul>"+
       " <li data-jstree='{ \"opened\" : true }'>Raiz"+
           "<ul>" +
             "<li data-jstree='{ \"opened\" : true }'>Lista Espresion"+
                "<ul>"+
                   "<li data-jstree='{ \"opened\" : true }'>Expresion"+
                    "<ul>"+
                        "<li data-jstree='{ \"opened\" : true }'>Aritmetica"+
                            "<ul>"+
                        "<li>Primitivo</li>"+
                        "<li>Primitivo</li>"+
                    "</ul>"+
                        "</li>"+
                    "</ul>"+
                    "</li>"+
                "</ul>"+
                "</li>"+
            "</ul>"+
            "<ul>"+
                "<li data-jstree='{ \"opened\" : true }'>Lista Instruccion"+
                "<ul>"+
                    "<li data-jstree='{ \"opened\" : true }'>Instruccion"+
                    "<ul>"+
                        "<li data-jstree='{ \"opened\" : true }'>Imprimir"+
                            "<ul>"+
                                "<li data-jstree='{ \"opened\" : true }'>Lista Espresion"+
                                "<ul>"+
                                    "<li data-jstree='{ \"opened\" : true }'>Expresion"+
                                    "<ul>"+
                                        "<li data-jstree='{ \"opened\" : true }'>Aritmetica"+
                                            "<ul>"+
                                        "<li>Primitivo</li>"+
                                        "<li>Primitivo</li>"+
                                    "</ul>"+
                                        "</li>"+
                                    "</ul>"+
                                    "</li>"+
                                "</ul>"+
                                "</li>"+
                            "</ul>"+
                        "</li>"+
                    "</ul>"+
                    "</li>"+
                "</ul>"+
                "</li>"+
            "</ul>"+
        "</li>"+
    "</ul>"+"\n";
        
    
    }

    public static endHTML(){
       
 
        GraficaArbolAts.cadena += "</div>"+"\n";
        GraficaArbolAts.cadena += "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>"+"\n";
        GraficaArbolAts.cadena += "<script src=\"./jstree/dist/jstree.min.js\"></script>"+"\n";
        GraficaArbolAts.cadena += "<script> $('#arbol').jstree();</script>"+"\n";
        GraficaArbolAts.cadena += "</body>"+"\n";
        GraficaArbolAts.cadena += "</html>"+"\n";  
    }

    public static clear(){
        GraficaArbolAts.cadena = ""; 
    }

    public static getCadena():string{ 

        return GraficaArbolAts.cadena;
    }

    public static add(cadena:string):any{
        console.log("**********ADD in reporte ATS***************");
        GraficaArbolAts.cadena+= cadena; 
    }



}
export{GraficaArbolAts};