import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";
import { GraficaArbolAts } from "../ManejoErrores/GraficaArbolAts";
import { Rep } from "../REPORTES/Rep";

/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class Declaracion_adentro_de_metodos_funciones extends Node {
    type: Type;
    Lista_ids: Array<Node>;
    value: Node;

    /**
      TIPO id DECLARACION_ADENTRO_DE_METODOS_FUNCIONESP
     */
    constructor(type: Type, identifier: Array<Node>, value: Node , line: Number, column: Number) {
        super(type, line, column);
        this.Lista_ids = identifier;
        this.value = value;
    }

    execute(table: Table, tree: Tree): any {
       
        if(Rep.t1 == true || Rep.t2 == true){
            if(this.Lista_ids.length != 0 ){
                for(let i = 0 ; i < this.Lista_ids.length ; i++){
                    Rep.addVariable(Rep.nombreMetodoActual ,  this.Lista_ids[i] ,this.type.toString());
                }
            }//if2
        }






        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Declaracion_adentro_de_Metodo/Funcion");
       
        if (this.Lista_ids.length == 1) {
            GraficaArbolAts.add("<ul>\n");
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID (" + this.Lista_ids[0] + ")</li>\n");
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
            for (let x = 0; x < this.Lista_ids.length; x++) {
                GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>ID (" + this.Lista_ids[x] + ")</li>\n");
            }



            /*EMPAQUETANDO EL VALOR DE LA EXPRESION */
           if(this.value.line != undefined){
                GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>VALOR EXPRESION\n");
                GraficaArbolAts.add("<ul>\n");
                this.value.execute(table ,tree); 
                GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts.add("</li>\n");
            }

            this.type.toAts();




            GraficaArbolAts.add("\n</ul></li>\n</ul>\n");

        }





        GraficaArbolAts.add("</li>\n");
        return null; 

    }
}