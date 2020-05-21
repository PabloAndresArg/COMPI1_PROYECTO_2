import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";
import {GraficaArbolAts} from '../ManejoErrores/GraficaArbolAts'; 
/**
 * @class Reasigna el valor de una variable existente
 */



export class ClaseInstruccion extends Node {
    identifier: String;
    contenido:  Array<Node>;

    /**
     * @constructor 
     * @param identifier
     * @param value valor de la variable
     * @param line
     * @param column 
     */
    constructor(identifier: String, value:  Array<Node>, line: Number, column: Number) {
        super(null, line, column);
        this.identifier = identifier;
        this.contenido = value;
        ;
    }

    execute(table: Table, tree: Tree) :any{
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>CLASE\n");
       // CIERRA DE UNA VEZ PORQUE NO AVANZA RECURSIVAMENTE 
        GraficaArbolAts.add("<ul>");
        /* UNA CLASE POSEE SU PROPIO AMBITO DE VARIABLES POR ESO LE CREO UNA TABLE */
        const newtable = new Table(table);

        for (let i = 0; i < this.contenido.length; i++) { // RECORRO CADA COSA DE MI CLASE 
            const res = this.contenido[i].execute(newtable, tree);
            
            if (res instanceof Continue) {
            console.log("break en continue =?? ");
            GraficaArbolAts.add("</ul>");
                break;
            } else if (res instanceof Break) {
                console.log("break en clase =?? ");
                GraficaArbolAts.add("</ul>");
                return;
            }
        }
        GraficaArbolAts.add("</ul>");
        GraficaArbolAts.add("</li>");
        return null;     
    }
}