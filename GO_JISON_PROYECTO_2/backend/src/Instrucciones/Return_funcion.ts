import { Node } from "../Abstract/Node";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { GraficaArbolAts } from "../ManejoErrores/GraficaArbolAts";
import { Rep } from "../REPORTES/Rep";

/**
 * @class RETURN PARA LAS FUNCIONES 
 */
export class Return_funcion extends Node {
    nombre:string; 
    expresion:Node;
    /**
     * @constructor Retorna el objeto continue creado
     * @param line Linea del continue
     * @param column Columna del continue
     */
    constructor(nombre:string,exp: Node,line: Number, column: Number) {
        super(null, line, column);
        this.nombre = nombre; 
        this.expresion = exp; 
    }

    execute(table: Table, tree: Tree){
        if(Rep.t1 == true || Rep.t2 == true){
            Rep.addTIPO_RETORNO(Rep.nombreMetodoActual , "retorno de funcion (return EXPRESION;)");
        }


        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Return_Metodo\n");
        GraficaArbolAts.add("<ul>\n"); 
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>EXPRESION\n");
        GraficaArbolAts.add("<ul>\n"); 
        this.expresion.execute(table , tree);
        GraficaArbolAts.add("</ul>\n"); 
        GraficaArbolAts.add("</li>\n");
        GraficaArbolAts.add("</ul>\n"); 
        GraficaArbolAts.add("</li>\n"); 
        return this;
    }
}