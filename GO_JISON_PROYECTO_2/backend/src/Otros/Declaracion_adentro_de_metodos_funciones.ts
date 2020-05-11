import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";

/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class Declaracion_adentro_de_metodos_funciones extends Node {
    type: Type;
    identifier: String;
    value: Node;

    /**
      TIPO id DECLARACION_ADENTRO_DE_METODOS_FUNCIONESP
     */
    constructor(type: Type, identifier: String, value: Node , line: Number, column: Number) {
        super(type, line, column);
        this.identifier = identifier;
        this.value = value;
    }

    execute(table: Table, tree: Tree) {
 
    }
}