import {Node} from "../Abstract/Node";
import {Exception} from "../utils/Exception";
/**
 * @class Almacena el ast y ademas la lista de excepciones
 */
export class Tree {
    instructions: Array<Node>
    constructor(instructions: Array<Node>) {
        this.instructions = instructions;

    }
}
