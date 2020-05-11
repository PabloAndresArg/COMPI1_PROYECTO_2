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
}