import {Node} from "../Abstract/Node";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";

export class Bloque_cases extends Node{
    lista_cases:any = [];
  
    constructor(casos: Array<Node>, defa: Node){
        super(null, 0, 0);


        
       casos.map((m: any) => {
                 this.lista_cases.push(m);
        });
        
        this.lista_cases.push(defa);
        console.log("||||||||||||||||||||||| BLOQUE     |||||||||||||||||||||||");
        console.log(this.lista_cases);
        console.log("||||||||||||||||||||||| BLOQUE  |||||||||||||||||||||||");

             
    }

    execute(table: Table, tree: Tree): any {

    }
}