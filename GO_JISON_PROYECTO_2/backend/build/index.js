"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Table_1 = require("./Simbols/Table");
const Break_1 = require("./Expresiones/Break");
const Continue_1 = require("./Expresiones/Continue");
const Exception_1 = require("./utils/Exception");
const parser = require('./Grammar/Grammar.js');
const MyParser_300445 = require('./Grammar/graProyecto.js'); // ESTO ME SIRVE PARA LLAMAR A AL ARCHIVO.JISON 
const cors = require('cors');
const app = express_1.default();
const port = 3000;
app.use(cors());
app.use(express_1.default.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.listen(port, err => {
    return console.log(`server is listening on ${port}`);
});
app.get('/', (req, res) => {
    res.render('views/index', {
        entrada: '',
        consola: [],
        errores: []
    });
}).get('/analizarYO', (req, res) => {
    res.render('views/index', {
        entrada: '',
        consola: [],
        errores: []
    });
});
app.post('/analizar', (req, res) => {
    const { entrada, consola } = req.body;
    if (!entrada) {
        return res.redirect('/');
    }
    //const tree = MyParser_300445.parse(entrada);
    const tree = parser.parse(entrada);
    console.log("entra al arbol:" + entrada);
    const tabla = new Table_1.Table(null);
    var contador_de_sentencias = 0;
    tree.instructions.map((m) => {
        const res = m.execute(tabla, tree);
        contador_de_sentencias++;
        if (res instanceof Break_1.Break) {
            const error = new Exception_1.Exception('Semantico', `Sentencia break fuera de un ciclo XD`, res.line, res.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
        }
        else if (res instanceof Continue_1.Continue) {
            const error = new Exception_1.Exception('Semantico', `Sentencia continue fuera de un ciclo`, res.line, res.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
        }
        console.log("# de sentencias: " + contador_de_sentencias);
    });
    res.render('views/index', {
        entrada,
        consola: tree.console,
        errores: tree.excepciones
    });
});
app.post('/analizarYO', (req, res) => {
    const { entrada, consola } = req.body;
    if (!entrada) {
        return res.redirect('/');
    }
    const tree = MyParser_300445.parse(entrada);
    // console.log("entra al arbol:"+ entrada);
    const tabla = new Table_1.Table(null);
    console.log("-------------INICIA EL ARBOL----------------");
    console.log(tree);
    console.log("------------------- FIN -------------------");
    console.log("Elementos:------------");
    /*tree.instructions.map((m: any) => {
      console.log(m);
      /*
      const res = m.execute(tabla, tree);
   
      if (res instanceof Break) {
        const error = new Exception('Semantico',
          `Sentencia break fuera de un ciclo XD`,
          res.line, res.column);
        tree.excepciones.push(error);
        tree.console.push(error.toString());
      } else if (res instanceof Continue) {
        const error = new Exception('Semantico',
          `Sentencia continue fuera de un ciclo`,
          res.line, res.column);
        tree.excepciones.push(error);
        tree.console.push(error.toString());
      }*/
    //});
    console.log("end------------");
    console.log(".");
    res.render('views/index', {
        entrada,
        consola: tree.console,
        errores: tree.excepciones
    });
});
app.post('/comunicar/', function (req, res) {
    Exception_1.Exception.errArray = []; // limpio mi lista de errores 
    Exception_1.Exception.errArray.push(new Exception_1.Exception("LEXICO", " POR QUE SI :v ", 0, 0));
    console.log(Exception_1.Exception.errArray[0].type + " " + Exception_1.Exception.errArray[0].description);
    Exception_1.Exception.errArray.push(new Exception_1.Exception("d3", " ño :v ", 0, 0));
    console.log(Exception_1.Exception.errArray[1].type + " " + Exception_1.Exception.errArray[0].description);
    var entrada1 = req.body.text1;
    var entrada2 = req.body.text2;
    const tree = MyParser_300445.parse(entrada1);
    // console.log("entra al arbol:"+ entrada);
    const tabla = new Table_1.Table(null);
    console.log(tree);
    res.send(Exception_1.Exception.errArray);
});
