"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
class Bloque_cases extends Node_1.Node {
    constructor(casos, defa) {
        super(null, 0, 0);
        this.lista_cases = [];
        casos.map((m) => {
            this.lista_cases.push(m);
        });
        this.lista_cases.push(defa);
        console.log("||||||||||||||||||||||| BLOQUE     |||||||||||||||||||||||");
        console.log(this.lista_cases);
        console.log("||||||||||||||||||||||| BLOQUE  |||||||||||||||||||||||");
    }
    execute(table, tree) {
    }
}
exports.Bloque_cases = Bloque_cases;
