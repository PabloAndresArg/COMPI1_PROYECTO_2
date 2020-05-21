import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import {GraficaArbolAts} from '../ManejoErrores/GraficaArbolAts'; 
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class DeclaracionGlobales extends Node {

    type: Type;
    identificadores: Array<Node>;
    value: Node;

    /**
      TIPO id DECLARACION_ADENTRO_DE_METODOS_FUNCIONESP
     */
    constructor(type: Type, ids:Array<Node>, value: Node , line: Number, column: Number) {
        super(type, line, column);
        this.identificadores = ids;
        this.value = value;
    }

    execute(table: Table, tree: Tree):any {
        console.log("DECLARACION GLOBAL ");
        console.log(this.identificadores);
  
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>DeclaracionGlobal"); 
        // PRIMITIVOS Y ESAS ONDAS 
        if(this.identificadores.length == 1){
            GraficaArbolAts.add("<ul>\n"); 
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID </li>\n"); 
            GraficaArbolAts.add("</ul>\n");
        }else{
            GraficaArbolAts.add("<ul>\n"); 
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>LISTA IDS"); 
            GraficaArbolAts.add("<ul>\n"); 
            for(let x = 0 ; x < this.identificadores.length; x++){
                GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID </li>\n"); 
            }
            GraficaArbolAts.add("\n</ul></li>\n</ul>\n");

        }


        GraficaArbolAts.add("</li>\n");
        return null; 
    }
}