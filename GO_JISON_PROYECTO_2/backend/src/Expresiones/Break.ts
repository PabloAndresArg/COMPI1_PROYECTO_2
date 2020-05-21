import { Node } from "../Abstract/Node";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { GraficaArbolAts } from "../ManejoErrores/GraficaArbolAts";

/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
export class Break extends Node {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     */
    constructor(line: Number, column: Number) {
        console.log("linea break" + line);
        super(null, line, column);
    }

    execute(table: Table, tree: Tree){
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Sentencia_break</li>\n");
          return this;
    }
}