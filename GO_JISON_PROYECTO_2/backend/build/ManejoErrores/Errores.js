"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errores extends Array {
    constructor() {
        super();
    }
    static add(err) {
        this.prototype.push(err);
    }
    static verificarerror() {
        if (this.prototype.length > 0) {
            return "Se Detectaron Errores de Compilacion";
        }
        return "Compilacion Sin Errores";
    }
    static geterror() {
        var cad = "";
        cad += "<body class=\"MIfondo\">\n";
        cad += "<div align=\"center\"  class=\"MIfondo\"> \n";
        cad += "<h1 class = \"tituloTb\">Reporte de Errores de Compilacion</h1>\n";
        cad += "<table border=\"2\" align=\"center\" class=\"tabl\">\n";
        cad += "<tr>\n";
        cad += "<th>TIPO DE ERROR</th><th>DESCRIPCION</th><th>LINEA</th>\n";
        cad += "</tr>\n";
        for (var i = 0; i < this.prototype.length; i++) {
            cad += "<tr>\n";
            cad += "<td>" + this.prototype[i].gettipo() + "</td><td>" +
                "  " + this.prototype[i].getdescripcion() + "  </td><td>" +
                this.prototype[i].getlinea() + "</td>\n";
            cad += "</tr>\n";
        }
        cad += "</table>\n";
        cad += "</div>\n";
        cad += "</body>\n";
        return cad;
    }
    static clear() {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    }
}
exports.Errores = Errores;
