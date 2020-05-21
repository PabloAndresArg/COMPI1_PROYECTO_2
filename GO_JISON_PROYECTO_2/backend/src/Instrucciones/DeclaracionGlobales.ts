import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { GraficaArbolAts } from '../ManejoErrores/GraficaArbolAts';
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
    constructor(type: Type, ids: Array<Node>, value: Node, line: Number, column: Number) {
        super(type, line, column);
        this.identificadores = ids;
        this.value = value;
    }

    execute(table: Table, tree: Tree): any {

        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>DeclaracionGlobal");
        // PRIMITIVOS Y ESAS ONDAS 
        if (this.identificadores.length == 1) {
            GraficaArbolAts.add("<ul>\n");
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID (" + this.identificadores[0] + ")</li>\n");
            /*EMPAQUETANDO EL VALOR DE LA EXPRESION */
          
            if(this.value.line != undefined){
                GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>VALOR EXPRESION\n");
                GraficaArbolAts.add("<ul>\n");
                this.value.execute(table ,tree); 
                GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts.add("</li>\n");
            }


            this.type.toAts();


            GraficaArbolAts.add("</ul>\n");
        } else {
            GraficaArbolAts.add("<ul>\n");
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>LISTA IDS");
            GraficaArbolAts.add("<ul>\n");
            for (let x = 0; x < this.identificadores.length; x++) {
                GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID (" + this.identificadores[x] + ")</li>\n");
            }


            /*EMPAQUETANDO EL VALOR DE LA EXPRESION */
           if(this.value.line != undefined){
                GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>VALOR EXPRESION\n");
                GraficaArbolAts.add("<ul>\n");
                this.value.execute(table ,tree); 
                GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts.add("</li>\n");
            }

            // BLOQUE DEL TIPO 
            this.type.toAts();


            GraficaArbolAts.add("\n</ul></li>\n</ul>\n");

        }





        GraficaArbolAts.add("</li>\n");
        return null;
    }
}