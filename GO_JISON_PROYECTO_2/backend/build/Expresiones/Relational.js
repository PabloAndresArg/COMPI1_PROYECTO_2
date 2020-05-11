"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Abstract/Node");
const Type_1 = require("../utils/Type");
/**
 * @class Genera un nuevo nodo expresion para realizar operaciones relacionales
 */
class Relational extends Node_1.Node {
    /**
     * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
     * @param leftOperator Nodo expresion izquierdo
     * @param rightOperator Nodo expresion derecho
     * @param Operator Operador
     * @param line linea de la operacion
     * @param column columna de la operacion
     */
    constructor(leftOperator, rightOperator, Operator, line, column) {
        super(new Type_1.Type(Type_1.types.BOOLEAN), line, column);
        this.leftOperator = leftOperator;
        this.rightOperator = rightOperator;
        this.Operator = Operator;
    }
    execute(table, tree) {
        /*
        const LeftResult = this.leftOperator.execute(table, tree);
        if (LeftResult instanceof Exception) {
            return LeftResult;
        }
        const RightResult = this.rightOperator.execute(table, tree);
        if (RightResult instanceof Exception) {
            return RightResult;
        }

        if (this.Operator === '<') {
            if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                return LeftResult < RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en MENOR QUE se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '>') {
            if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                return LeftResult > RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en MAYOR QUE se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '>=') {
            if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                return LeftResult >= RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en MAYOR IGUAL se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '<=') {
            if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                return LeftResult <= RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en MENOR IGUAL se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '!=') {
            if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                return LeftResult != RightResult;
            } else if (this.leftOperator.type.type === types.STRING && this.rightOperator.type.type === types.STRING) {
                return LeftResult != RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en DIFERENTE QUE se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '==') {
            if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                return LeftResult == RightResult;
            } else if (this.leftOperator.type.type === types.STRING && this.rightOperator.type.type === types.STRING) {
                return LeftResult == RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en IGUAL IGUAL se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else {
            const error = new Exception('Semantico',
                `Error, Operador desconocido`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        
        }*/
    }
}
exports.Relational = Relational;
