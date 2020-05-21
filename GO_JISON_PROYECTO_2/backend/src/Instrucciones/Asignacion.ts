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
 * @class Reasigna el valor de una variable existente
 */
export class Asignacion extends Node {
    identifier: String;
    value: Node;

    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier: String, value: Node, line: Number, column: Number) {
        super(null, line, column);
        this.identifier = identifier;
        this.value = value;
    }

    execute(table: Table, tree: Tree):any {

        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ASIGNACION\n");
        GraficaArbolAts.add("<ul>\n");
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID ("+this.identifier+")</li>\n");
        
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>VALOR_Expresion\n");
        GraficaArbolAts.add("<ul>\n");
        this.value.execute(table , tree);
        GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts.add("</li>");
        
        GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts.add("</li>");
        /*
        const result = this.value.execute(table, tree);
        if (result instanceof Exception) {
            return result;
        }

        let variable: Simbol;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Exception('Semantico',
                'No se ha encontrado la variable ' + this.identifier,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }


        if (this.value.type.type != variable.type.type) {
            const error = new Exception('Semantico',
                `No se puede asignar la variable porque los tipos no coinciden.`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }

        variable.value = result;
        return null;
        */

        return null ; 
    }
}