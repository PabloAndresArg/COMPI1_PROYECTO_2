import {Tree} from '../Simbols/Tree';
import {Table} from '../Simbols/Table';
export class NodoError {

    private tipo:string;
    private descripcion:string;
    private linea:number;

    constructor(tipo:string,descripcion:string,linea:number){
        this.tipo=tipo;
        this.descripcion=descripcion;
        this.linea=(linea);
    }

    public gettipo():string{
        return this.tipo;
    }

    public getdescripcion():string{
        return this.descripcion;
    }

    public getlinea():number{
        return this.linea;
    }

    public execute(tabla:Table , tree:Tree){

    }
}