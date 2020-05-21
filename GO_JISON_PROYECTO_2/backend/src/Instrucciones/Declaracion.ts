import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";
import { GraficaArbolAts } from "../ManejoErrores/GraficaArbolAts";

/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class Declaracion extends Node {
    type: Type;
    identifier: String;
    value: Node;

    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(type: Type, identifier: String, value: Node, line: Number, column: Number) {
        super(type, line, column);
        this.identifier = identifier;
        this.value = value;
    }

    execute(table: Table, tree: Tree):any {
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>DECLARACION\n");
        GraficaArbolAts.add("<ul>\n");
        this.type.toAts(); 
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID ("+this.identifier+")</li>\n");

        if(this.value.line != undefined){
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>VALOR_Expresion\n");
            GraficaArbolAts.add("<ul>\n");
            this.value.execute(table , tree);
            GraficaArbolAts.add("</ul>\n");
            GraficaArbolAts.add("</li>");
        }


        



        GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts.add("</li>");
        return null; 
    }
}