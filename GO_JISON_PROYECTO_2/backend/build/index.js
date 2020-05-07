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
const cors = require('cors');
const app = express_1.default();
const port = 4200;
app.use(cors());
app.use(express_1.default.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
// llama 
app.listen(port, err => {
    console.log("BEGIN SERVER::");
    return console.log(`server is listening on ${port}`);
});
app.get('/', (req, res) => {
    res.render('views/index', {
        entrada: '',
        consola: [],
        errores: []
    });
}).get('/analizar', (req, res) => {
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
    const tree = parser.parse(entrada);
    console.log(entrada);
    consola.loog("se termino de llamar a al arbol");
    const tabla = new Table_1.Table(null);
    tree.instructions.map((m) => {
        const res = m.execute(tabla, tree);
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
    });
    res.render('views/index', {
        entrada,
        consola: tree.console,
        errores: tree.excepciones
    });
});
