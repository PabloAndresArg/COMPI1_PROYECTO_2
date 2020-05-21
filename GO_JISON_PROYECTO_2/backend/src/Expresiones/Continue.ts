import { Node } from "../Abstract/Node";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { GraficaArbolAts } from "../ManejoErrores/GraficaArbolAts";

/**
 * @class Nodo expresion continue, nos indica saltar iteraciones
 */
export class Continue extends Node {
    nombre:string; 
    /**
     * @constructor Retorna el objeto continue creado
     * @param line Linea del continue
     * @param column Columna del continue
     */
    constructor(nombre:string,line: Number, column: Number) {
        super(null, line, column);
        this.nombre = nombre; 
    }

    execute(table: Table, tree: Tree){
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Sentencia_continue</li>\n");
        return this;
    
    }
}