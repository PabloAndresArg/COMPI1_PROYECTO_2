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
export class Do_while extends Node {
    condition: Node;
    List: Array<Node>;

    /**
     * @constructor 
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column Columna de la sentencia while
     */
    constructor(condition: Node, List: Array<Node>, line: Number, column: Number) {
        super(null, line, column);
        this.condition = condition;
        this.List = List;
    }

    execute(table: Table, tree: Tree) {
    }
}