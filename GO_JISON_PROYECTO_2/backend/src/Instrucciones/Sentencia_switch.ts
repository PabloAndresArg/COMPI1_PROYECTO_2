import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";

export class Sentencia_switch extends Node {
    EXPRESION: Node;
    Cases: Array<Node>;
    constructor(exp: Node, cases: Array<Node>, line: Number, column: Number) {
        super(null, line, column);
        this.EXPRESION = exp;
        this.Cases = cases;
    }

    execute(table: Table, tree: Tree) {
    }
}