import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";

export class Ins_Default extends Node {
    INSTRUCCIONES: Node;
    Ins_break:Node;
    constructor(ins: Node, ins_break:Node, line: Number, column: Number) {
        super(null, line, column);
        this.INSTRUCCIONES = ins;
        this.Ins_break = ins_break; 
    }

    execute(table: Table, tree: Tree) {
    }
}