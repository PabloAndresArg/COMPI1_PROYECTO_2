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
export class Ins_case extends Node {
    EXPRESION: Node;
    INSTRUCCIONES: Array<Node>;
    Ins_break:Node;
    constructor(n: Node, ins: Array<Node>, ins_break:Node, line: Number, column: Number) {
        super(null, line, column);
        this.EXPRESION = n;
        this.INSTRUCCIONES = ins;  /* GENERA UN VECTOR */
        this.Ins_break = ins_break; 
    }

    execute(table: Table, tree: Tree):any {
        console.log(" ejecutando un caso , el cual tiene instrucciones adentro  ");
        const newtable = new Table(table);

        for (let i = 0; i < this.INSTRUCCIONES.length; i++) {
            const res = this.INSTRUCCIONES[i].execute(newtable, tree);
            if(res instanceof Break){
               // se acepta 
               console.log("un break se acepta adentro de un case :) ");
            }else if(res instanceof Continue){
                console.log("ERROR  CONTINUE "); // ACA EN ESTE CASO PUEDE VENIR UN BREAK Y SE TOMA EN CUENTA QUE PUEDE SER ERROR 
                CErrores.Errores.add(new CNodoError.NodoError("Semantico","CONTINUE fuera de un ciclo"+" Columna:"+ res.column ,res.line));
                return res;
            }else if(res instanceof Return_metodo){
                console.log("RETURN METODO"); // NO PUEDO DETERMINAR AUN SI ES ERROR O NO ASI QUE LO DEVUELVO 
                return res;
            }else if(res instanceof Return_funcion){
                console.log("RETURN FUNCION");
                return res;
            }
        }
        return null; 


    }


}