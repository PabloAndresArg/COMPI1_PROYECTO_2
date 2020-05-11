"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
class tacos extends Node_1.Node {
    /**
     * @constructor Devuelve un nodo que internamente sera una expresion por tener un tipo
     * @param type Tipo del valor, puede ser numero, cadena o booleano
     * @param value Valor primitivo que crear
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(type, value, line, column) {
        super(type, line, column);
        this.value = value;
        console.log("CONSTRUCTOR DE TACOS");
    }
    /**
     * Devuelve el valor inicial e.g. 4
     * @param table Tabla de simbolos
     * @param tree Arbol de instrucciones y excepciones
     */
    execute(table, tree) {
        console.log("MY EXECUTE TACOS " + this.value);
        return this.value;
    }
}
exports.tacos = tacos;
