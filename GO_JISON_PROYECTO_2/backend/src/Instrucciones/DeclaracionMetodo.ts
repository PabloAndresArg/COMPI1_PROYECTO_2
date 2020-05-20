import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";
import { Return_funcion } from "./Return_funcion";
let CNodoError=require('../ManejoErrores/NodoError');
let CErrores=require('../ManejoErrores/Errores');
export class DeclaracionMetodo extends Node {
    type: Type;
    identifier: String;
    value: Node;

    constructor(type: Type, identifier: String, value: Node , line: Number, column: Number) {
        super(type, line, column);
        this.identifier = identifier;
        this.value = value;
    }

    execute(table: Table, tree: Tree):any {
        console.log("EJECUTE UNA DECLARACION METODO " );
        let res: Node;
        res =this.value.execute(table,tree);
   
       if(res instanceof Return_funcion){
        console.log("ERROR RETURN DE FUNCION ADENTRO DE UN METODO ");
        CErrores.Errores.add(new CNodoError.NodoError("Semantico"," RETURN DE FUNCION ADENTRO DE UN METODO"+" Columna:"+ res.column ,res.line));
        return res;
       }
        return null;
    }
}