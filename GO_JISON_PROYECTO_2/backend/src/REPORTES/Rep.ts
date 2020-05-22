import { report } from "process";
import { Clase } from './Clase';
import { Metodo } from "./Metodo";
import { ClaseCopia } from "./ClaseCopia";


class Rep {
  public static ListaClases1: Array<Clase> = [];
  public static ListaClases2: Array<Clase> = [];
  public static claseActual: string = "";
  public static t1 = false;
  public static t2 = false;
  public static ListaClasesCopia: Array<ClaseCopia> = [];
  public static ListaFuncionesCopia:Array<Metodo> = [];
  constructor() {

  }

  public static addClase(c: Clase): any {
    if (Rep.t1 == true) {
      Rep.ListaClases1.push(c);
    }
    if (Rep.t2 == true) {
      Rep.ListaClases2.push(c);
    }
  }

  public static addMetodo(key: string, m: Metodo): any {
    if (Rep.t1 == true) {
      for (let i = 0; i < Rep.ListaClases1.length; i++) {
        if (key == Rep.ListaClases1[i].id) {
          Rep.ListaClases1[i].addMetodo(m);
          break;
        }
      }
    }

    if (Rep.t2 == true) {
      for (let i = 0; i < Rep.ListaClases2.length; i++) {
        if (key == Rep.ListaClases2[i].id) {
          Rep.ListaClases2[i].addMetodo(m);
          break;
        }
      }

    }




  }



  public static clear() {
    // CUIADO CON LOS PUNTEROS  QUE SE PUEDE APUNTAR A LA MISMA LISTA 
    let vacio: any = [];
    Rep.ListaClases1 = vacio;
    let vacio2: any = [];
    Rep.ListaClases2 = vacio2;
    this.t1 = false;
    this.t2 = false;
    let vacio3: any = [];
    Rep.ListaClasesCopia = vacio3;
    let vacio4: any = [];
    Rep.ListaFuncionesCopia = vacio4;
  }
  public static get2() {
    return Rep.ListaClases2;
  }
  public static get1() {
    return Rep.ListaClases1;
  }


  public static printClases1() {
    console.log("************ARCHIVO 1****************");
    for (let i = 0; i < Rep.ListaClases1.length; i++) {
      console.log("||| CLASE " + Rep.ListaClases1[i].id + "|||")
      Rep.ListaClases1[i].printMetodos();
    }
    console.log("*************************************");
  }

  public static printClases2() {
    console.log("************ARCHIVO 2****************");
    for (let i = 0; i < Rep.ListaClases2.length; i++) {
      console.log("||| CLASE " + Rep.ListaClases2[i].id + "|||")
      Rep.ListaClases2[i].printMetodos();
    }
    console.log("*************************************");
  }



  public static DeterminarCopiaClases() {
    console.log("BUSCANDO CALSES COPIA......");

    if (this.ListaClases1.length != 0 && this.ListaClases2.length != 0) {
      for (let i = 0; i < this.ListaClases1.length; i++) {
        // cada clase del  1 la comparo con la clase  del 2 
        for (let j = 0; j < this.ListaClases2.length; j++) {
          if (this.ListaClases1[i].id == this.ListaClases2[j].id) {
            
            /* COINCIDE EL NOMBRE SOSPECHOSO ENTONCES MIRAMOS EL NOMBRE DE LOS METODOS SI COINCIDEN */
            console.log("sospechoso el nombre es igual : "+this.ListaClases1[i].id);
            // ESTOY EN LA MISMA CLASE ENTONCES DEBO DE BUSCAR SI HAY UNA MISMA FUNCION 
            this.buscarFucionesMetodosCopia(this.ListaClases1[i].getMetodos(), this.ListaClases2[j].getMetodos());

            let res: any = this.comparaMetodos(this.ListaClases1[i].getMetodos(), this.ListaClases2[j].getMetodos());// para clases copia


            if (res[0] == true) {// si es copia
              console.log("encontro una clase copia");
              this.toCopiaClase(this.ListaClases1[i].id, res[1]); // metodo que agrega a una lista 
            }

          }
        }

      }

    } else {

      console.log("no hay elementos :( ");
    }
  }

  private static comparaMetodos(metodos1: Array<Metodo>, metodos2: Array<Metodo>): any {
    let res: any = [];
    let cont = 0;
    if (metodos1.length == 0 && metodos2.length == 0) {
      // si es copia porque solo tienen los nombres 
      res.push(true); // si es copia 
      res.push(0); // metodos repetidos 0 
      return res;
    }


    if (metodos1.length != metodos2.length) {
      // si no tienen la misma cantidad de metodos se descarta de una vez 
      console.log("descartado por no tener la misma cantidad de metodos/funciones");
      res.push(false);
      res.push(0);
    }



    for (let i = 0; i < metodos1.length; i++) {
      for (let j = 0; j < metodos2.length; j++) {
        // tengo que ver que los nombres sean los mismos 
        if (metodos1[i].id == metodos2[j].id) {
          cont++;
        }
        
      }
    }








    // tiene que coincidir la longitud del vector con el contador para determinar que es copia 
    if (cont == metodos1.length) {
      res.push(true); // si es copia 
      res.push(cont); // metodos repetidos 
      return res;
    } else {
      res.push(false); // si es copia 
      res.push(cont); // metodos repetidos  
      return res;
    }

  }



  public static toCopiaClase(nombre: string, cantidad: any) {
    Rep.ListaClasesCopia.push(new ClaseCopia(nombre, cantidad));
  }


  public static getCopiasClases(): string {
    var cad: string = "";
    if (this.ListaClasesCopia.length != 0) {



      cad += "<body class=\"MIfondo\">\n";
      cad += "<div align=\"center\"  class=\"MIfondo\"> \n";
      cad += "<h1 class = \"tituloTb\">REPORTE DE CLASES COPIA </h1>\n";
      cad += "<table border=\"2\" align=\"center\" class=\"tabl\">\n";
      cad += "<tr>\n";
      cad += "<th>#</th><th> NOMBRE DE LA CLASE </th><th> CANTIDAD DE METODOS</th>\n";
      cad += "</tr>\n";
      for (var i = 0; i < this.ListaClasesCopia.length; i++) {
        cad += "<tr>\n";
        cad += "<td>" + (i + 1) + "</td><td>" +
          "  " + this.ListaClasesCopia[i].id + "  </td><td>" +
          this.ListaClasesCopia[i].cantidaMetodos + "</td>\n";
        cad += "</tr>\n";
      }
      cad += "</table>\n";
      cad += "</div>\n";
      cad += "</body>\n";


    } else {
      console.log("no hay clases copia");
    }
    return cad;
  }



  public static buscarFucionesMetodosCopia(metodos1: Array<Metodo>, metodos2: Array<Metodo>){

    if(metodos1.length == 0 || metodos2.length == 0){
      console.log("NO TIENE METODOS una de esas clases entonces no puedo comparar metodos asi ");
    }else{

      for (let i = 0; i < metodos1.length; i++) {
        for (let j = 0; j < metodos2.length; j++) {
          // tengo que ver que los nombres sean los mismos 
          if (metodos1[i].id == metodos2[j].id) {
          
          }
          
        }
      }


    }



  }













}// END ARCHIVO 
export { Rep };