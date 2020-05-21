import {Node} from "../Abstract/Node";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import { Break } from "../Expresiones/Break";
import { Continue } from "../Expresiones/Continue";
import { Return_metodo } from "./Return_metodo";
import { Return_funcion } from "./Return_funcion";
import { GraficaArbolAts } from "../ManejoErrores/GraficaArbolAts";

let CNodoError=require('../ManejoErrores/NodoError');
let CErrores=require('../ManejoErrores/Errores');
export class Bloque_cases extends Node{
    lista_cases:any = [];
  
    constructor(casos: Array<Node>, defa: Node){
        super(null, 0, 0);


        
       casos.map((m: any) => {
                 this.lista_cases.push(m);
        });
 
        this.lista_cases.push(defa);

             
    }

    execute(table: Table, tree: Tree): any {
        console.log("ejecutando sentencias de un case en BLOQUE_CASES   son: " + this.lista_cases.length);
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>BLOQUE_CASES\n");
        GraficaArbolAts.add("<ul>\n");

        const newtable = new Table(table);
        for (let i = 0; i < this.lista_cases.length; i++) {
            if(this.lista_cases[i].line != undefined){

                const res = this.lista_cases[i].execute(newtable, tree);
  

                if(res instanceof Break){
                   // se acepta , no hay clavo 
                   console.log("un break se acepta adentro de un case :) ");
                }else if(res instanceof Continue){
                    console.log("viene un continue sera que esta adentro de un ciclo ?");
                    GraficaArbolAts.add("</ul>\n");
                    GraficaArbolAts.add("</li>\n");
                    return res;
                }else if(res instanceof Return_metodo){
                    console.log("RETURN METODO");
                    GraficaArbolAts.add("</ul>\n");
                    GraficaArbolAts.add("</li>\n");
                    return res;
                }else if(res instanceof Return_funcion){
                    console.log("RETURN FUNCION");
                    GraficaArbolAts.add("</ul>\n");
                    GraficaArbolAts.add("</li>\n");
                    return res;
                }
    
    
            }






        }


        GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts.add("</li>\n");
        return null; 

    }
}