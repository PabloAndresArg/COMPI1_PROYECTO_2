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
export class For extends Node {
    condition: Node;
    List: Array<Node>;
    Dec_for : Node;
    Incre_decre: Node; 
    /**
     * @constructor 
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column 
     */
    constructor(Dec_for:Node ,  condition: Node , Incre_decre :Node , List: Array<Node>, line: Number, column: Number) {
        super(null, line, column);
        this.Dec_for = Dec_for; 
        this.Incre_decre = Incre_decre; 
        this.condition = condition;
        this.List = List;
    }

    execute(table: Table, tree: Tree) {
    }
}