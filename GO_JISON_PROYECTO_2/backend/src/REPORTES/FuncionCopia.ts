import {Node} from "../Abstract/Node";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utils/Type";
import {types} from "../utils/Type";
import {Metodo} from '../REPORTES/Metodo';

export class FuncionCopia {
    /*
    mostrará el tipo de retorno del método y/o función, nombre del mismo, listado de sus
   parámetros con tipo y nombre, nombre de la clase al que pertenece.
    
    */ 
    tipo: any; 
    tipoDeRetorno:string;
    nombreFuncion:string; 
    nombreClase:string;
    listaDeParametros:string; 

    constructor(nomFuncion:string , tip:any,tipoRe:string , noClse:string , list:string ){
     this.nombreFuncion = nomFuncion; 
     this.tipo = tip;
     this.tipoDeRetorno = tipoRe; 
     this.nombreClase = noClse; 
     this.listaDeParametros = list; 
    }

  

    


}