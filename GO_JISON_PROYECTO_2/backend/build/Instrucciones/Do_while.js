"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
/**
 * @class
 */
class Do_while extends Node_1.Node {
    /**
     * @constructor
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column Columna de la sentencia while
     */
    constructor(condition, List, line, column) {
        super(null, line, column);
        this.condition = condition;
        this.List = List;
    }
    execute(table, tree) {
    }
}
exports.Do_while = Do_while;
