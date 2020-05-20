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
}