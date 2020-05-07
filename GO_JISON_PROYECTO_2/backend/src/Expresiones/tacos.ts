import { Node } from "../Abstract/Node";
import { Type } from "../utils/Type";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";

export class tacos extends Node{
    value: Object;

    /**
     * @constructor Devuelve un nodo que internamente sera una expresion por tener un tipo
     * @param type Tipo del valor, puede ser numero, cadena o booleano
     * @param value Valor primitivo que crear
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(type:Type, value: Object, line: Number, column: Number){
        super(type, line, column);
        this.value = value;
        console.log("CONSTRUCTOR DE TACOS");
    }

    /**
     * Devuelve el valor inicial e.g. 4
     * @param table Tabla de simbolos
     * @param tree Arbol de instrucciones y excepciones
     */
    execute(table: Table, tree: Tree) {
        console.log("MY EXECUTE TACOS " + this.value);
        return this.value;
    }
}