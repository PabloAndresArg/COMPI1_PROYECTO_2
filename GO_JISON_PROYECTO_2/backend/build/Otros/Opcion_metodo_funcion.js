"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
/**
 * @class Reasigna el valor de una variable existente
 */
class Opcion_metodo_funcion extends Node_1.Node {
    /**
     * RECIBE LISTA DE INTRUCCIONES
     * TIPO
     * ID
     * LISTA_PARAMETROS_CON_TIPO
     * FILA
     */
    constructor(listaParams, contenido, line) {
        super(null, line, null);
        this.contenido = contenido;
        this.listaParams = listaParams;
    }
    execute(table, tree) {
    }
}
exports.Opcion_metodo_funcion = Opcion_metodo_funcion;
