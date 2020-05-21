import {Node} from '../Abstract/Node';
import {Tree} from '../Simbols/Tree';
import {Table} from '../Simbols/Table';

class GraficaArbolAts{
    public static cadena:string = ""; 
    constructor(){
      
    }

    public static initHtml(){
    
        GraficaArbolAts.cadena += "<ul>"+
       " <li data-jstree='{ \"opened\" : true }'>Raiz"+
           "<ul>" +
             "<li data-jstree='{ \"opened\" : true }'>F Espresion"+
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

 

    public static clear(){
        GraficaArbolAts.cadena = ""; 
    }

    public static getCadena():string{ 

        return GraficaArbolAts.cadena;
    }

    public static add(cadena:string):any{
        GraficaArbolAts.cadena+= cadena; 
    }



}
export{GraficaArbolAts};