
export class Persona   // Clase Abstracta     https://codesandbox.io/s/abstract-class-and-method-clvze
{
    #rut 
    #nombreCompleto

    constructor(rut, nombreCompleto) {
        if (this.constructor === Persona) {
            throw new Error("La clase Persona no puede ser instanciada")
        }

        this.#rut = rut
        this.#nombreCompleto = nombreCompleto
    }

    get rut() { return this.#rut }
    get nombreCompleto() { return this.#nombreCompleto }

    toString() { throw new Error("El método toString debe ser implementado") }
}