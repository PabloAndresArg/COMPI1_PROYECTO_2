import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";

/**
 * @class
 */

import {GraficaArbolAts} from '../ManejoErrores/GraficaArbolAts'; 

export class Llamada_metodo extends Node {
    id:string; 
    Parametros: Array<Node>;

    /**
     * @constructor 
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column 
     */
    constructor(id:string , List: Array<Node>, line: Number, column: Number) {
        super(null, line, column);
        this.Parametros = List; 
        this.id = id; 
    }

    execute(table: Table, tree: Tree):any {
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>LLamada_metodo ("+this.id+")\n");
        if(this.Parametros.length != 0 ){
            GraficaArbolAts.add("<ul>\n");
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>LISTA_PARAMETROS\n");
            GraficaArbolAts.add("<ul>\n");
                for(let i = 0 ; i < this.Parametros.length ; i++){
                    this.Parametros[i].execute(table, tree);
                }
                GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts.add("</li>\n");
                GraficaArbolAts.add("</ul>\n");
        }
        GraficaArbolAts.add("</li>\n");
        return null; 
    }
}