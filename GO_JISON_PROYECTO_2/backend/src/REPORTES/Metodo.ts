import {Node} from "../Abstract/Node";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utils/Type";
import {types} from "../utils/Type";
import { isRegExp } from "util";
import { Variable } from "./Variable";

export class Metodo {
    tipo:string;
    id:string; 
    listaParametros:Array<Node> = []; // mismo tipo y el mismo orden los parametros 
    tipoDeRetorno:any;
    listVariables:Array<Variable> = [];
/*
mostrará el tipo de retorno del método y/o función, nombre del mismo, listado de sus
parámetros con tipo y nombre, nombre de la clase al que pertenece.
*/ 
    constructor(id:string , tipo:string){
        this.id = id; 
        this.tipo = tipo; 
        this.tipoDeRetorno = "no hay"; 
    }

    public ParametrostoStringVERIFICACION():string{
        let parametros:string = "";

        
        if(this.listaParametros.length != 0 ){
            for(let i = 0 ; i < this.listaParametros.length ; i++){
                // solo necesito los tipo con eso vere el orden y la cantidad si es la misma pues ok es copia 
               parametros += this.listaParametros[i].type.toString()+",";
            }
        }

        
        return parametros;
    }
    
    public toReportCopiaFuncion(){

        let parametros:string = "";

        

        if(this.listaParametros.length != 0 ){
            for(let i = 0 ; i < this.listaParametros.length ; i++){
                // solo necesito los tipo con eso vere el orden y la cantidad si es la misma pues ok es copia 
               parametros += this.listaParametros[i].type.toString()+" ID "+"\n";
            }
        }
        
        return parametros;
    }

  

    


}