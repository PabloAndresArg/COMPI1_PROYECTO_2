import {Node} from "../Abstract/Node";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utils/Type";
import {types} from "../utils/Type";
import { Importe } from "./Importe";
/**
 * Permite imprimir expresiones en la consola
 */
export class Inicio extends Node{
    Lista_importes_clases:any = [];
   
    /**
     * @constructor Retorna el objeto Print
     * @param expression Expresion que se va a mostrar en consola
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(l_imports: Array<Node>, l_clases: Array<Node>){
        super(null, 0, 0);
        l_imports.map((m: any) => {
                 this.Lista_importes_clases.push(m);
        });     

        l_clases.map((m: any) => {
            
            this.Lista_importes_clases.push(m);
        });        
    }
 
    execute(table: Table, tree: Tree): any {

    }
}