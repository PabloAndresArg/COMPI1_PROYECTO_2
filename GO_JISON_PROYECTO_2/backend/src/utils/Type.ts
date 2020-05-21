import { GraficaArbolAts } from "../ManejoErrores/GraficaArbolAts";

export enum types {
    INT,
    STRING,
    BOOLEAN,
    VOID,
    DOUBLE,
    CHAR
}

/**
 * 
 * @class Permite llevar el control de los tipos del lenguaje
 */
export class Type{
    type : types;
    typeString: string; 

    /**
     * 
     * @constructor Crea un nuevo tipo con el tipo primitivo indicado en el enum
     * @param type Tipo seleccionado para la variable o funcion
     * 
     */
    constructor(type: types){
        this.type = type;
        this.typeString = this.toString(); 
    }

    toString(){
        if(this.type === types.BOOLEAN){
            return 'boolean';
        }else if(this.type === types.INT){
            return 'int';
        }else if(this.type === types.STRING){
            return 'string';
        }else if(this.type === types.DOUBLE){
            return 'double';
        }else if(this.type == types.VOID){
            return 'void';
        }else if(this.type == types.CHAR){
            return 'char';
        }
    }

    toAts(){

        GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>TIPO\n");
        GraficaArbolAts.add("<ul>\n");
        

        if(this.type === types.BOOLEAN){
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>boolean</li>\n");
        }else if(this.type === types.INT){
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>int</li>\n");
        }else if(this.type === types.STRING){
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>String</li>\n");
        }else if(this.type === types.DOUBLE){
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>double</li>\n");
        }else if(this.type == types.VOID){
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>void</li>\n");
        }else if(this.type == types.CHAR){
            GraficaArbolAts.add("<li data-jstree='{ \"opened\" : true }'>char</li>\n");
        }



        GraficaArbolAts.add("</ul>\n");
        GraficaArbolAts.add("</li>");
    }
}