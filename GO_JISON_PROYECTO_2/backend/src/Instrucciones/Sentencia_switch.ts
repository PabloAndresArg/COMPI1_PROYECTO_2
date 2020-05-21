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
import { GraficaArbolAts } from "../ManejoErrores/GraficaArbolAts";
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
  
    execute(table: Table, tree: Tree):any {
        const newtable = new Table(table);
  
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>SENTENCIA_SWITCH \n");
        GraficaArbolAts.add("<ul>\n");

        // AHORA LA CARPETA EXPRESSION 
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Expresion\n");
        GraficaArbolAts.add("<ul>");
        this.EXPRESION.execute(table, tree);
        GraficaArbolAts.add("</ul>");
        GraficaArbolAts.add("</li>");



        let res:Node; 
         if(this.cases.line != undefined ){


            res = this.cases.execute(newtable,tree); 
            if(res instanceof Break){
             // no hay clavo sale y cierra hasta abajo 
             }else if(res instanceof Continue){
                GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts.add("</li>\n");
                 return res;
             }else if(res instanceof Return_metodo){
                GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts.add("</li>\n");
                 return res;
             }else if(res instanceof Return_funcion){
                GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts.add("</li>\n");
                 return res;
             }


         }


         GraficaArbolAts.add("</ul>\n");
         GraficaArbolAts.add("</li>\n");
         return null;
    }
}