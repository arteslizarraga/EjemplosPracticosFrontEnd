import { CargaVista } from "../cargaVista.js";
import { mostrarLoadingSpinner, ocultarLoadingSpinner } from "../../funciones/funcionesGenericas.js";
import { configuracionesProyecto } from '../../configuraciones/configuracionesProyecto.js';


export class MaestroEnvioEmail extends CargaVista
{
    constructor()
    {
        super();

        this.maestroEnvioEmail = {};          
        this.operacion = "";       
        this.paginaActual = 0;    // Atributo opcional en caso de usar Paginación 
        this.totalPaginas = 0;    // Atributo opcional en caso de usar Paginación 

        this.bearerToken = "Bearer " + localStorage.getItem(configuracionesProyecto.nombreToken);

        for (var prop in this) { window[prop] = this[prop]; }                                          // Coloca los atributos de la clase para que esten disponibles desde el html
        Object.getOwnPropertyNames(this.constructor.prototype).forEach(c=> { window[c] = this[c]; });  // Coloca los metodos de la clase para que esten disponibles desde el html

        mostrarLoadingSpinner();
        this.cargarVista();
    }

    destructor() {
        for (var prop in this) { delete window[prop]; }                                             // Remueve los atributos de la clase para que no queden en la ventana
        Object.getOwnPropertyNames(this.constructor.prototype).forEach(c=> { delete window[c]; });  // Remueve los metodos de la clase para que no queden en la ventana
    }

    cargarVista()
    {
        this.cargarHtml({ 
            rutaArchivo: "maestroEnvioEmail/index.html",
            onload: () => { 
                this.obtenerListaPrincipal();
            } 
        }); 

        //this.cargarHtml({textoHtml: "<h1> MaestroEnvioEmail </h1>"});
    }


    obtenerListaPrincipal()  // Obtener lista de MaestroEnvioEmail de la Web Api 
    { 
        mostrarLoadingSpinner(); 
        let cantidad = 5;

        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cantidad}`, { method: "GET" }) 
        .then(response => 
        { 
            if(response.ok) 
            { 
                response.json().then(data => 
                { 
                    let tabla = document.getElementById("tablaPrincipal").getElementsByTagName("tbody")[0]; 
                    tabla.innerHTML = "";   // Limpia la tabla 

                    data.results.forEach((x, index) => 
                    { 
                        let id = x.url.split("/").reverse()[1];
                        let dato = { id, emailEnvio: x.name, puertoEmailEnvio: 1234, hostEmailEnvio: "BBBB" };

                        let fila = tabla.insertRow(0); 
                        fila.insertCell(0).innerHTML = dato.id; 
                        fila.insertCell(1).innerHTML = dato.emailEnvio; 
                        fila.insertCell(2).innerHTML = dato.puertoEmailEnvio; 
                        fila.insertCell(3).innerHTML = dato.hostEmailEnvio; 
                        fila.insertCell(4).innerHTML = "<a href='' onclick='editar(event, " + dato.id + ")'> Editar </a>"; 
                    }); 
                }); 
            } 
            else { 
                response.text().then(textoError => alert(textoError)); 
            } 
        }) 
        .catch(error => { 
            alert(JSON.stringify(error)); 
        }) 
        .finally(c=> { 
            ocultarLoadingSpinner(); 
        }); 
    } 

    construirObjeto()  // Colocar los valores del objeto de tipo MaestroEnvioEmail en el html 
    { 
        Array.from(document.getElementsByClassName("maestroEnvioEmail")).forEach(c => 
        { 
            if (c.name != undefined) 
            { 
                c.value = maestroEnvioEmail[c.name];  // Coloca los valores del objeto en cada elemento del form 
            } 
        }); 

    } 

    guardar(evento)  // Guardar y Actualizar MaestroEnvioEmail en la Web Api 
    { 
        evento.preventDefault(); 
        var validacion = validar(maestroEnvioEmail); 
        if (validacion != "") return alert(validacion); 

        mostrarLoadingSpinner(); 

        fetch("https://jsonplaceholder.typicode.com/posts", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" },  
            body: JSON.stringify(maestroEnvioEmail) 
        }) 
        .then(response => 
        { 
            if(response.ok) 
            { 
                // localStorage.setItem("email_envio_cartas", maestroEnvioEmail.emailEnvio);  // Actualiza el email de envio en local storage

                obtenerListaPrincipal();               // Se actualiza la lista de MaestroEnvioEmail llamando la Web Api 
                $("#modalCrearEditar").modal("hide");  // Cierra el modal 
            } 
            else { 
                response.text().then(textoError => alert(textoError)); 
            } 
        }) 
        .catch(error => { 
            alert(JSON.stringify(error)); 
        }) 
        .finally(c=> { 
            ocultarLoadingSpinner(); 
        }); 
    } 

    validar(maestroEnvioEmail)  // Validar MaestroEnvioEmail 
    { 
        // Se validan los atributos de la entidad 

        if (["", null].includes(maestroEnvioEmail.passwordEmailEnvio)) return "El campo passwordEmailEnvio no posee un valor"; 
        if (["", null].includes(maestroEnvioEmail.emailEnvio)) return "El campo emailEnvio no posee un valor"; 
        if (["", null].includes(maestroEnvioEmail.puertoEmailEnvio)) return "El campo puertoEmailEnvio no posee un valor"; 
        if (["", null].includes(maestroEnvioEmail.hostEmailEnvio)) return "El campo hostEmailEnvio no posee un valor"; 

        return ""; 
    } 

    editar(evento, id)  // Obtener MaestroEnvioEmail de la Web Api por su id 
    { 
        evento.preventDefault(); 

        mostrarLoadingSpinner(); 

        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, { 
            method: "GET", 
            headers: {"Authorization": bearerToken} 
        }) 
        .then(response => 
        { 
            if(response.ok) 
            { 
                response.json().then(data => 
                { 
                    operacion = "editar"; 

                    maestroEnvioEmail = { id, emailEnvio: data.name, passwordEmailEnvio: "123456", puertoEmailEnvio: 1234, hostEmailEnvio: "BBBB" };
                    // maestroEnvioEmail = data; 

                    construirObjeto(); 
                    $("#modalCrearEditar").modal("show"); 
                }); 
            } 
            else { 
                response.text().then(textoError => alert(textoError)); 
            } 
        }) 
        .catch(error => { 
            alert(JSON.stringify(error)); 
        }) 
        .finally(c=> { 
            ocultarLoadingSpinner(); 
        }); 
    } 

    
};

