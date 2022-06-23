
//import jsonClientes from "../../assets/clientes.json" assert { type: "json" };
import { Cliente } from "../../js/clases/cliente.js";

export class ClienteService
{
    /*
    static obtener() {
        let listaClientes = [];
        jsonClientes.forEach(x => listaClientes.push(new Cliente(x.rut, x.nombreCompleto)));
        return listaClientes;
    }
    */
    
    static async obtener()
    {
        const { default: clientes } = await import("../../assets/clientes.json", {
            assert: { type: "json" }
        });
        
        return clientes.map(x => new Cliente(x.rut, x.nombreCompleto));  // Retorna una promesa
    }
}