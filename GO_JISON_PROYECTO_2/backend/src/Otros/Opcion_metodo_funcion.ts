import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";
import { Return_funcion } from "../Instrucciones/Return_funcion";
import { Return_metodo } from "../Instrucciones/Return_metodo";
import { GraficaArbolAts } from "../ManejoErrores/GraficaArbolAts";
let CNodoError=require('../ManejoErrores/NodoError');
let CErrores=require('../ManejoErrores/Errores');
/**
 * @class Reasigna el valor de una variable existente
 */



export class Opcion_metodo_funcion extends Node {
    contenido: Array<Node>;
    listaParams:any;

    /**
     * RECIBE LISTA DE INTRUCCIONES 
     * TIPO
     * ID
     * LISTA_PARAMETROS_CON_TIPO
     * FILA
     */
    constructor(listaParams:any , contenido:Array<Node> , line: Number) {
        super(null, line, null);
        
        this.contenido = contenido;
        this.listaParams = listaParams;
        
    }

    execute(table: Table, tree: Tree):any {
        /* UNA CLASE POSEE SU PROPIO AMBITO DE VARIABLES POR ESO LE CREO UNA TABLE */
        console.log("PARAMETROS........................."); 
     
        console.log(this.listaParams); 
        if(this.listaParams.length != 0){
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>LISTA DE PARAMETROS\n"); 
            GraficaArbolAts.add("<ul>");
            for(let i = 0 ; i < this.listaParams.length ; i++){
                this.listaParams[i].execute(table , tree);
            }
            GraficaArbolAts.add("</ul>"); 
            GraficaArbolAts.add("</li>"); 
        }
        console.log("PARAMETROS........................."); 

        const newtable = new Table(table);
        for (let i = 0; i < this.contenido.length; i++) {
            const res = this.contenido[i].execute(newtable, tree);
            if(res instanceof Break){
                console.log("ERROR  BREAK "); // ACA EN ESTE CASO PUEDE VENIR UN BREAK Y SE TOMA EN CUENTA QUE PUEDE SER ERROR 
                CErrores.Errores.add(new CNodoError.NodoError("Semantico","BREAK fuera de un ciclo"+""+" Columna:"+ res.column ,res.line));
                return res;
            }else if(res instanceof Continue){
                console.log("ERROR  CONTINUE "); // ACA EN ESTE CASO PUEDE VENIR UN BREAK Y SE TOMA EN CUENTA QUE PUEDE SER ERROR 
                CErrores.Errores.add(new CNodoError.NodoError("Semantico","CONTINUE fuera de un ciclo"+" Columna:"+ res.column ,res.line));
                return res;
            }else if(res instanceof Return_metodo){
                console.log("RETURN METODO op/metFun");
                return res;
            }else if(res instanceof Return_funcion){
                console.log("RETURN FUNCION  op/metFun");
                return res;
            }


        }
        return null; 
    }
}