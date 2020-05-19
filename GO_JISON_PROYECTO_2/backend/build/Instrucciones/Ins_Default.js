"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
class Ins_Default extends Node_1.Node {
    constructor(ins, ins_break, line, column) {
        super(null, line, column);
        this.INSTRUCCIONES = ins;
        this.Ins_break = ins_break;
    }
    execute(table, tree) {
    }
}
exports.Ins_Default = Ins_Default;
