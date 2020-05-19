"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
class Declaracion_adentro_de_metodos_funciones extends Node_1.Node {
    /**
      TIPO id DECLARACION_ADENTRO_DE_METODOS_FUNCIONESP
     */
    constructor(type, identifier, value, line, column) {
        super(type, line, column);
        this.Lista_ids = identifier;
        this.value = value;
    }
    execute(table, tree) {
    }
}
exports.Declaracion_adentro_de_metodos_funciones = Declaracion_adentro_de_metodos_funciones;
