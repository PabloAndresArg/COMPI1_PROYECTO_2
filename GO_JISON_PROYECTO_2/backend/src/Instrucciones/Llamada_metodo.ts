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
export class Llamada_metodo extends Node {
    id:string; 
    Parametros: Node;

    /**
     * @constructor 
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column 
     */
    constructor(id:string , List: Node, line: Number, column: Number) {
        super(null, line, column);
        this.Parametros = List; 
        this.id = id; 
    }

    execute(table: Table, tree: Tree):any {
        return null; 
    }
}