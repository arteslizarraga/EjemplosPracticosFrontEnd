
import { Persona } from "./persona.js";

export class Cliente extends Persona   // Clase Concreta
{
    constructor(rut, nombreCompleto) {
        super(rut, nombreCompleto)
    }

    toString() {
        return `El rut del cliente es ${this.rut} y su nombre completo es ${this.nombreCompleto}`
    }
}