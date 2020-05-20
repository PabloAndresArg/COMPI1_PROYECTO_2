import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";
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
        console.log("se ejecuto opcion metodo");
        /* UNA CLASE POSEE SU PROPIO AMBITO DE VARIABLES POR ESO LE CREO UNA TABLE */
        const newtable = new Table(table);
        for (let i = 0; i < this.contenido.length; i++) {
            const res = this.contenido[i].execute(newtable, tree);
            if(res instanceof Continue || res instanceof Break){
                console.log(res);
                console.log("ERROR TIENE UN BREAK ADENTRO :v"); // ACA EN ESTE CASO PUEDE VENIR UN BREAK Y SE TOMA EN CUENTA QUE PUEDE SER ERROR 
                CErrores.Errores.add(new CNodoError.NodoError("Semantico","El error : "+"break"+" Columna:"+ res.column ,res.line));
                console.log(res);
                return res;
            }


        }
        return null; 
    }
}