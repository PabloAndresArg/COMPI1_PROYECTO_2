import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";

/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class DeclaracionGlobales extends Node {

    type: Type;
    identificadores: any;
    value: Node;

    /**
      TIPO id DECLARACION_ADENTRO_DE_METODOS_FUNCIONESP
     */
    constructor(type: Type, ids:any, value: Node , line: Number, column: Number) {
        super(type, line, column);
        this.identificadores = ids;
        this.value = value;
    }

    execute(table: Table, tree: Tree) {
 
    }
}