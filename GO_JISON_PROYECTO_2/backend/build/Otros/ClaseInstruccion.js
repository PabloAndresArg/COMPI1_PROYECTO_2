"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
/**
 * @class Reasigna el valor de una variable existente
 */
class ClaseInstruccion extends Node_1.Node {
    /**
     * @constructor
     * @param identifier
     * @param value valor de la variable
     * @param line
     * @param column
     */
    constructor(identifier, value, line, column) {
        super(null, line, column);
        this.identifier = identifier;
        this.contenido = value;
        ;
    }
    execute(table, tree) {
    }
}
exports.ClaseInstruccion = ClaseInstruccion;
