import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";
import { Return_metodo } from "./Return_metodo";
import { Return_funcion } from "./Return_funcion";
let CNodoError=require('../ManejoErrores/NodoError');
let CErrores=require('../ManejoErrores/Errores');
export class Sentencia_switch extends Node {
    EXPRESION: Node;
    cases: Node;
    constructor(exp: Node, cases: Node, line: Number, column: Number) {
        super(null, line, column);
        this.EXPRESION = exp;
        this.cases = cases;
    }
      /*UL */
    execute(table: Table, tree: Tree):any {
        console.log("<ul>se ejecuto UN SWITCH");
        const newtable = new Table(table);
        let res:Node; 
        res = this.cases.execute(newtable,tree); 
        if(res instanceof Break){
            // se acepta 
         }else if(res instanceof Continue){
             console.log("ERROR  CONTINUE "); // ACA EN ESTE CASO PUEDE VENIR UN BREAK Y SE TOMA EN CUENTA QUE PUEDE SER ERROR 
             CErrores.Errores.add(new CNodoError.NodoError("Semantico","CONTINUE fuera de un ciclo"+" Columna:"+ res.column ,res.line));
             return res;
         }else if(res instanceof Return_metodo){
             console.log("RETURN METODO sw");
             return res;
         }else if(res instanceof Return_funcion){
             console.log("RETURN FUNCION");
             return res;
         }

        console.log("</ul>");
        return null; 
    }
}