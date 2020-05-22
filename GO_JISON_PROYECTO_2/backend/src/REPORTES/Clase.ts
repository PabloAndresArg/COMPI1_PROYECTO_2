import {Node} from "../Abstract/Node";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utils/Type";
import {types} from "../utils/Type";
import {Metodo} from '../REPORTES/Metodo';
export class Clase {
  
    id:string;
    metodos:Array<Metodo> = [];

    constructor(nom:string){
      this.id = nom; 
    }

    public addMetodo( m :Metodo){
        this.metodos.push(m);
    }

    public printMetodos(){
        console.log("------------- metodos ------------");
        for(let i = 0 ; i < this.metodos.length ; i++){
            if(this.metodos[i].id != undefined){
                console.log(this.metodos[i]);
            }
            
        }
        console.log("----------------------------------");
    }

    public getMetodos(){
        return this.metodos; 
    }

    public getMETODO(id:string):any{
        for(let i = 0 ; i < this.metodos.length ; i++){
            if(this.metodos[i].id != undefined){
               if(this.metodos[i].id == id){
                return this.metodos[i];
               }
            }
        }
    }



    


}