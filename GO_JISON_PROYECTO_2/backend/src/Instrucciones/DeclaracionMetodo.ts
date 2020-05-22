import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";
import { Return_funcion } from "./Return_funcion";
import { Console } from "console";
let CNodoError=require('../ManejoErrores/NodoError');
let CErrores=require('../ManejoErrores/Errores');





import {GraficaArbolAts} from '../ManejoErrores/GraficaArbolAts'; 


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
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>DeclaracionMetodos\n"); 





        let res: Node;
        GraficaArbolAts.add("<ul>\n");


        
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID("+this.identifier+")</li>\n");
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>TIPO("+this.type.toString()+")</li>\n");

        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>INSTRUCCIONES\n");
        GraficaArbolAts.add("<ul>\n");
        res =this.value.execute(table,tree);
        GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts.add("</li>\n");
        
        
        GraficaArbolAts.add("</ul>\n");
   
       if(res instanceof Return_funcion){
        console.log("ERROR RETURN DE FUNCION ADENTRO DE UN METODO ");
        CErrores.Errores.add(new CNodoError.NodoError("Semantico"," RETURN DE FUNCION ADENTRO DE UN METODO"+" Columna:"+ res.column ,res.line));
        GraficaArbolAts.add("</li>\n");
        return res;
       }

 



       GraficaArbolAts.add("</li>\n");
        return null;
    }
}