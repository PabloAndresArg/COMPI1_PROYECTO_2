import {Node} from "../Abstract/Node";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utils/Type";
import {types} from "../utils/Type";

export class Metodo {
    tipo:string;
    id:string; 
    listaParametros:any[] = []; // mismo tipo y el mismo orden los parametros 
    tipoDeRetorno:any;
    variables:any[] = [];
/*
mostrará el tipo de retorno del método y/o función, nombre del mismo, listado de sus
parámetros con tipo y nombre, nombre de la clase al que pertenece.
*/ 
    constructor(id:string , tipo:string){
        this.id = id; 
        this.tipo = tipo; 
    }

    public setListaParametros(lista:any){
        this.listaParametros = lista; 
    }
    public setTipoDeRetorno(po:any){
    this.tipoDeRetorno= po;
    }

  

    


}