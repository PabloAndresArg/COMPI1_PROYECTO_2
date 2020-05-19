"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
class Declaracion extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(type, identifier, nodo1, line, column) {
        super(type, line, column);
        this.identifier = identifier;
        // this.value = value;
    }
    execute(table, tree) {
    }
}
exports.Declaracion = Declaracion;
