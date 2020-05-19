"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
/**
 * Permite imprimir expresiones en la consola
 */
class Inicio extends Node_1.Node {
    /**
     * @constructor Retorna el objeto Print
     * @param expression Expresion que se va a mostrar en consola
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(l_imports, l_clases) {
        super(null, 0, 0);
        this.Lista_importes_clases = [];
        l_imports.map((m) => {
            this.Lista_importes_clases.push(m);
        });
        l_clases.map((m) => {
            this.Lista_importes_clases.push(m);
        });
    }
    execute(table, tree) {
    }
}
exports.Inicio = Inicio;
