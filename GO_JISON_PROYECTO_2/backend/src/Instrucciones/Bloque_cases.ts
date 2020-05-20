import {Node} from "../Abstract/Node";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import { Break } from "../Expresiones/Break";
import { Continue } from "../Expresiones/Continue";
import { Return_metodo } from "./Return_metodo";
import { Return_funcion } from "./Return_funcion";

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
        console.log("ejecutando sentencias de un case en BLOQUE_CASES ");

        const newtable = new Table(table);
        for (let i = 0; i < this.lista_cases.length; i++) {
            const res = this.lista_cases[i].execute(newtable, tree);
            if(res instanceof Break){
               // se acepta 
               console.log("un break se acepta adentro de un case :) ");
            }else if(res instanceof Continue){
                console.log("ERROR  CONTINUE "); // ACA EN ESTE CASO PUEDE VENIR UN BREAK Y SE TOMA EN CUENTA QUE PUEDE SER ERROR 
                CErrores.Errores.add(new CNodoError.NodoError("Semantico","CONTINUE fuera de un ciclo"+" Columna:"+ res.column ,res.line));
                return res;
            }else if(res instanceof Return_metodo){
                console.log("RETURN METODO");
                return res;
            }else if(res instanceof Return_funcion){
                console.log("RETURN FUNCION");
                return res;
            }


        }

        return null; 

    }
}