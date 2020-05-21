import { NodoError } from "./NodoError";

class Errores extends Array<NodoError>{

    constructor(){
        super();
    }

    public static add(err:NodoError){
        this.prototype.push(err);
    }

    public static verificarerror():string{
        if(this.prototype.length>0){
            return "Se Detectaron Errores de Compilacion";
        }
        return "Compilacion Sin Errores";
    }
    
    public static hay_errores():boolean{
        if(this.prototype.length>0){
            return true ; 
        }
        return false;
    }

    public static geterror():string{
        var cad:string="";
            cad+="<body class=\"MIfondo\">\n";
                cad+="<div align=\"center\"  class=\"MIfondo\"> \n";
                    cad+="<h1 class = \"tituloTb\">Reporte de Errores de Compilacion</h1>\n";
                    cad+="<table border=\"2\" align=\"center\" class=\"tabl\">\n";
                        cad+="<tr>\n";
                            cad+="<th>TIPO DE ERROR</th><th>DESCRIPCION</th><th>LINEA</th>\n";
                        cad+="</tr>\n";
                        for(var i=0; i<this.prototype.length;i++){
                            cad+="<tr>\n";
                                cad+="<td>"+this.prototype[i].gettipo()+"</td><td>"+
                                "  "+this.prototype[i].getdescripcion()+"  </td><td>"+
                                this.prototype[i].getlinea()+"</td>\n";
                            cad+="</tr>\n";
                        }
                    cad+="</table>\n";
                cad+="</div>\n";
            cad+="</body>\n";

        return cad;
    }

    public static clear(){
        while(this.prototype.length>0){
            this.prototype.pop();
        }
    }
}
export{Errores};