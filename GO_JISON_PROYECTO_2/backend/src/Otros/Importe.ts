import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";

/**
 * @class Reasigna el valor de una variable existente
 */
export class Importe extends Node {
    identifier: String;
    value: Node;

    /**
     * @constructor 
     * @param identifier
     * @param value valor de la variable
     * @param line
     * @param column 
     */
    constructor(identifier: String, value: Node, line: Number, column: Number) {
        super(null, line, column);
        this.identifier = identifier;
        this.value = null;
        ;
    }

    execute(table: Table, tree: Tree) :any{
        return null;     
    }
}