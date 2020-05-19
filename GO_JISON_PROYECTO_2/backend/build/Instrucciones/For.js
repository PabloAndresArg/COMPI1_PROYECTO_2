"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
/**
 * @class
 */
class For extends Node_1.Node {
    /**
     * @constructor
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column
     */
    constructor(Dec_for, condition, Incre_decre, List, line, column) {
        super(null, line, column);
        this.Dec_for = Dec_for;
        this.Incre_decre = Incre_decre;
        this.condition = condition;
        this.List = List;
    }
    execute(table, tree) {
    }
}
exports.For = For;
