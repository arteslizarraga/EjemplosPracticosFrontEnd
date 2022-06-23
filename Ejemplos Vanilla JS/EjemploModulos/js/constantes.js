
import config from "../assets/config.json" assert { type: "json" };

export const IVA = config.IVA;

export const PI = Math.PI;

export const usuario = {
    nombre: "José", password: "123456"
};

//==========================================================================================>>>>
// Al hacer el import es sin destructuracion:     
// import miConstante, saludar, Animal from "./constantes.js";  

// const miConstante = "Probando";
// export default miConstante;        // En un archivo solo puede haber un export default

export default function saludar() {   // En un archivo solo puede haber un export default
    console.log("Hola módulos");      // Esta es una funcion declarada  
}

// export default class Animal
// {
//     #nombre
// }

//==========================================================================================>>>>

// Una funcion expresada es guardar en una variable el valor de la funcion
