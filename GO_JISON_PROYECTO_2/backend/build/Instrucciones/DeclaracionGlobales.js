"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
class DeclaracionGlobales extends Node_1.Node {
    /**
      TIPO id DECLARACION_ADENTRO_DE_METODOS_FUNCIONESP
     */
    constructor(type, ids, value, line, column) {
        super(type, line, column);
        this.identificadores = ids;
        this.value = value;
    }
    execute(table, tree) {
    }
}
exports.DeclaracionGlobales = DeclaracionGlobales;
