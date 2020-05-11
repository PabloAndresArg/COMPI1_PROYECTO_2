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



export class Opcion_metodo_funcion extends Node {
    identifier: any;
    contenido: Node;
    listaParams:any;

    /**
     * RECIBE LISTA DE INTRUCCIONES 
     * TIPO
     * ID
     * LISTA_PARAMETROS_CON_TIPO
     * FILA
     */
    constructor(value: Node , type:any , identifier: any,listaParams:any , line: Number) {
        super(null, line, null);
        this.identifier = identifier;
        this.contenido = value;
        this.listaParams = listaParams;
        
    }

    execute(table: Table, tree: Tree) {

    }
}