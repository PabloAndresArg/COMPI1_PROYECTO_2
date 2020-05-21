import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types } from "../utils/Type";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Primitive } from "../Expresiones/Primitive";
import { Type } from "../utils/Type";
import { Return_funcion } from "./Return_funcion";
import { Return_metodo } from "./Return_metodo";
/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */

import { GraficaArbolAts } from '../ManejoErrores/GraficaArbolAts';
export class If extends Node {
    condition: Node;
    IfList: Array<Node>;
    ElseList: Array<Node>;

    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condition Condicion que debe ser tipo boolean
     * @param IfList Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param ElseList Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */


    constructor(condition: Node, IfList: Array<Node>, ElseList: Array<Node>, line: Number, column: Number) {
        super(null, line, column);
        this.condition = condition;
        this.IfList = IfList;
        this.ElseList = ElseList;
    }

    execute(table: Table, tree: Tree) {


        const newtable = new Table(table);
        let result: Node;
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>SENTENCIA_IF (linea:"+this.line+")\n");
        GraficaArbolAts.add("<ul>\n");
        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>CONDICION\n");
        GraficaArbolAts.add("<ul>\n");
        result = this.condition.execute(newtable, tree);
        GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts.add("</li>\n");



        result = new Primitive(new Type(types.BOOLEAN), true, null, null); // SIEMPRE SE EJECUTA 

            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>sentencia_if (linea:"+this.line+")\n");
            GraficaArbolAts.add("<ul>\n");
                for (let i = 0; i < this.IfList.length; i++) {
                    const res = this.IfList[i].execute(newtable, tree);
                    if (res instanceof Continue || res instanceof Break || res instanceof Return_funcion || res instanceof Return_metodo) {
                        GraficaArbolAts.add("</ul>\n");
                        GraficaArbolAts.add("</li>\n");
                        return res;
                    }
                }
                GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts.add("</li>\n");




    

            for (let i = 0; i < this.ElseList.length; i++) {
                GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>Sentencia_Else (linea:"+this.line+")\n");
                GraficaArbolAts.add("<ul>\n");


                const res = this.ElseList[i].execute(newtable, tree);
                if (res instanceof Continue || res instanceof Break || res instanceof Return_funcion || res instanceof Return_metodo) {

                    GraficaArbolAts.add("</ul>\n");
                    GraficaArbolAts.add("</li>\n");
                    return res;
                }

                GraficaArbolAts.add("</ul>\n");
                GraficaArbolAts.add("</li>\n");

            }




        GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts.add("</li>\n");
        return null;
    }
}