"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
/**
 * @class
 */
class Llamada_metodo extends Node_1.Node {
    /**
     * @constructor
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column
     */
    constructor(id, List, line, column) {
        super(null, line, column);
        this.Parametros = List;
        this.id = id;
    }
    execute(table, tree) {
    }
}
exports.Llamada_metodo = Llamada_metodo;
