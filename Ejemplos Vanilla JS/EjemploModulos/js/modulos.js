
// Todo lo que no mandamos a llamar por default, se tiene que hacer con destructuracion     {cosa1, cosa2, cosa3}

import saludar, { IVA, PI, usuario } from "./constantes.js";
// import jsonClientes from "../assets/clientes.json" assert { type: "json" };
// import { Cliente } from "./clases/cliente.js";
import { ClienteService } from "./service/clienteService.js";


saludar();

console.log(`El porcentaje del IVA es ${IVA}% | el valor de PI es ${PI} y el usuario es ${JSON.stringify(usuario)}`);

ClienteService.obtener().then(clientes => 
{
    clientes.forEach(x => console.log(x));
});



