"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
/**
 * @class Reasigna el valor de una variable existente
 */
class Incre_decre extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier, simbolo, line, column) {
        super(null, line, column);
        this.identifier = identifier;
        this.simbolo = simbolo;
    }
    execute(table, tree) {
    }
}
exports.Incre_decre = Incre_decre;
