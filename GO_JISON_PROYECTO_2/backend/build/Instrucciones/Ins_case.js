"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
class Ins_case extends Node_1.Node {
    constructor(n, ins, ins_break, line, column) {
        super(null, line, column);
        this.EXPRESION = n;
        this.INSTRUCCIONES = ins; /* GENERA UN VECTOR */
        this.Ins_break = ins_break;
    }
    execute(table, tree) {
    }
}
exports.Ins_case = Ins_case;
