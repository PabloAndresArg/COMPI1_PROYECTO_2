"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
class DeclaracionMetodo extends Node_1.Node {
    constructor(type, identifier, value, line, column) {
        super(type, line, column);
        this.identifier = identifier;
        this.value = value;
    }
    execute(table, tree) {
    }
}
exports.DeclaracionMetodo = DeclaracionMetodo;
