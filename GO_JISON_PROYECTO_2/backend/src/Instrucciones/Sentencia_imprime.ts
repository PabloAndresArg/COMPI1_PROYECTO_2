import {Node} from "../Abstract/Node";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utils/Type";
import {types} from "../utils/Type";
/**
 * Permite imprimir expresiones en la consola
 */
export class Sentencia_imprime extends Node{
    expression : Node;
    estilo:string; 
    /**
     * @constructor Retorna el objeto Print
     * @param expression Expresion que se va a mostrar en consola
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(nombre:string,expression: Node, line: Number, column: Number){
        super(new Type(types.VOID), line, column);
        this.expression = expression;
        this.estilo = nombre; 
    }

    execute(table: Table, tree: Tree): any {
        console.log("se ejecuto  imprimir");
        return null;
    }
}