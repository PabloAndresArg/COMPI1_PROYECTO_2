import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";
import { Return_metodo } from "./Return_metodo";
let CNodoError=require('../ManejoErrores/NodoError');
let CErrores=require('../ManejoErrores/Errores');
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class DeclaracionFuncion extends Node {
    type: Type;
    identifier: String;
    value: Node;
    
    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(type: Type, identifier: String, parametros: Node, line: Number, column: Number) {
        super(type, line, column);
        this.identifier = identifier;
        this.value = parametros;
    }

    execute(table: Table, tree: Tree) :any{
        
        console.log("EJECUTE UNA FUNCION");


        let res: Node;
        res =this.value.execute(table,tree);
   
       if(res instanceof Return_metodo){
        console.log("ERROR RETURN DE METODO ADENTRO DE UNA FUNCION ");
        CErrores.Errores.add(new CNodoError.NodoError("Semantico"," RETURN DE METODO ADENTRO DE UNA FUNCION"+" Columna:"+ res.column ,res.line));
        return res;
       }
        return null;     
    }
}