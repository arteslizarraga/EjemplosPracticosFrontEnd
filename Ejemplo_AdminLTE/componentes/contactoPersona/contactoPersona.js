import { CargaVista } from "../cargaVista.js";
import { mostrarLoadingSpinner, ocultarLoadingSpinner } from "../../funciones/funcionesGenericas.js";
import { configuracionesProyecto } from '../../configuraciones/configuracionesProyecto.js';


export class ContactoPersona extends CargaVista
{
    constructor()
    {
        super();

        this.paginaActual = 0;    // Atributo opcional en caso de usar Paginación 
        this.totalPaginas = 0;    // Atributo opcional en caso de usar Paginación 

        for (var prop in this) { window[prop] = this[prop]; }                                          // Coloca los atributos de la clase para que esten disponibles desde el html
        Object.getOwnPropertyNames(this.constructor.prototype).forEach(c=> { window[c] = this[c]; });  // Coloca los metodos de la clase para que esten disponibles desde el html


        this.cargarVista();
    }

    destructor() {
        for (var prop in this) { delete window[prop]; }                                             // Remueve los atributos de la clase para que no queden en la ventana
        Object.getOwnPropertyNames(this.constructor.prototype).forEach(c=> { delete window[c]; });  // Remueve los metodos de la clase para que no queden en la ventana
    }

    cargarVista()
    {
        this.cargarHtml({ 
            rutaArchivo: "contactoPersona/index.html",
            onload: () => { 
                this.cargarDatePickers();
                this.obtenerListaPrincipal();
            } 
        }); 

        //this.cargarHtml({textoHtml: "<h1> ContactoPersona </h1>"});
    }

    cargarDatePickers()
    {
        cargarDatePicker({
            querySelector: "#ultimaFechaEnvioCorreoDesdeId", 
              placeholder: "Escriba una fecha",
              onSelect: function () {  resetearPaginacion(); 	obtenerListaPrincipal();  },
              onClear: function () {   resetearPaginacion(); 	obtenerListaPrincipal();  }
        });
        
        cargarDatePicker({
            querySelector: "#ultimaFechaEnvioCorreoHastaId", 
            placeholder: "Escriba una fecha",
            onSelect: function () {  resetearPaginacion(); 	obtenerListaPrincipal();  },
            onClear: function () {   resetearPaginacion(); 	obtenerListaPrincipal();  }
        });
        
        cargarDatePicker({
            querySelector: "input[name='ultimaFechaRespuesta'].contactoPersona", 
            placeholder: "Escriba una fecha",
            onSelect: function () {  	
                let txt = document.querySelector(this.querySelector);
                contactoPersona[txt.name] = txt.getAttribute("fecha");
                //console.log(txt.name + ": " + contactoPersona[txt.name]);
            },
            onClear: function () {   
                let txt = document.querySelector(this.querySelector);
                contactoPersona[txt.name] = txt.getAttribute("fecha");
                //console.log(txt.name + ": " + contactoPersona[txt.name]);
            }
        });
        
        cargarDatePicker({
            querySelector: "input[name='ultimaFechaEnvioCorreo'].contactoPersona", 
            placeholder: "Escriba una fecha",
            onSelect: function () {  	
                let txt = document.querySelector(this.querySelector);
                contactoPersona[txt.name] = txt.getAttribute("fecha");
                //console.log(txt.name + ": " + contactoPersona[txt.name]);
            },
            onClear: function () {   
                let txt = document.querySelector(this.querySelector);
                contactoPersona[txt.name] = txt.getAttribute("fecha");
                //console.log(txt.name + ": " + contactoPersona[txt.name]);
            }
        });
    }
 
    //==============================================================================>>>>>>

    inicializarSelectBuscador(evento)  // Convertir select normal en un select buscador con paginacion  
    { 
        var objetoHTML = evento.target; 

        if (objetoHTML.localName == "select" && objetoHTML.getAttribute("pagina") == null && objetoHTML.size <= 1)   // Si aun no ha sido inicializado el select buscador 
        { 
            selectBuscador({ 
                objetoHTML: objetoHTML, 
                url: this.url + objetoHTML.getAttribute("rutaWebApi"), 
                params: { clase: objetoHTML.getAttribute("entidad"), atributoBuscado: objetoHTML.getAttribute("atributoBuscado") }, 
                registrosPorPagina: {nombre: "registrosPorPagina", valor: 10}, 
                nombrePagina: "numeroPagina", nombreBusqueda: "busqueda", mensajeBuscando: "buscando resultados ..." 
            }); 
            objetoHTML.click();  // Abre el select  
        } 
    } 

    obtenerConsultaBuscador() 
    { 
        var haRecibidoId = document.getElementById("haRecibidoId"); 
        var haRespondidoId = document.getElementById("haRespondidoId"); 
        var ultimaFechaEnvioCorreoDesdeId = document.getElementById("ultimaFechaEnvioCorreoDesdeId"); 
        var ultimaFechaEnvioCorreoHastaId = document.getElementById("ultimaFechaEnvioCorreoHastaId"); 
        var nombreCompletoId = document.getElementById("nombreCompletoId"); 
        var emailId = document.getElementById("emailId"); 
        var existeId = document.getElementById("existeId"); 

        var consulta = {}; 

        if (haRecibidoId != null && ! ["", null].includes(haRecibidoId["value"]))   // Agregado extra
            consulta["haRecibido"] = haRecibidoId["value"]; 

        if (haRespondidoId != null && ! ["", null].includes(haRespondidoId["value"])) 
            consulta["haRespondido"] = haRespondidoId["value"]; 

        if (nombreCompletoId != null && ! ["", null].includes(nombreCompletoId["value"])) 
            consulta["nombreCompleto"] = nombreCompletoId["value"]; 

        if (emailId != null && ! ["", null].includes(emailId["value"])) 
            consulta["email"] = emailId["value"]; 

        if (existeId != null && ! ["", null].includes(existeId["value"])) 
            consulta["existe"] = existeId["value"]; 

        /*
        if (ultimaFechaEnvioCorreoDesdeId != null && ! ["", null].includes(ultimaFechaEnvioCorreoDesdeId["value"])) 
            consulta["ultimaFechaEnvioCorreoDesde"] = ultimaFechaEnvioCorreoDesdeId["value"]; 
        if (ultimaFechaEnvioCorreoHastaId != null && ! ["", null].includes(ultimaFechaEnvioCorreoHastaId["value"])) 
            consulta["ultimaFechaEnvioCorreoHasta"] = ultimaFechaEnvioCorreoHastaId["value"]; 
        */

        if (ultimaFechaEnvioCorreoDesdeId != null && ultimaFechaEnvioCorreoDesdeId.hasAttribute("fecha")) 
            consulta["ultimaFechaEnvioCorreoDesde"] = ultimaFechaEnvioCorreoDesdeId.getAttribute("fecha"); 

        if (ultimaFechaEnvioCorreoHastaId != null && ultimaFechaEnvioCorreoHastaId.hasAttribute("fecha")) 
            consulta["ultimaFechaEnvioCorreoHasta"] = ultimaFechaEnvioCorreoHastaId.getAttribute("fecha"); 

        return consulta; 
    } 

    obtenerListaPrincipal()  // Obtener lista de ContactoPersona de la Web Api 
    { 
        let registrosPorPagina = 10; 
        let inicio = paginaActual * registrosPorPagina; 

        // var consulta = obtenerConsultaBuscador(); 
        // consulta["start"] = inicio;                 // Datos para paginacion 
        // consulta["length"] = registrosPorPagina;    // Datos para paginacion 
        // var parametros = Object.entries(consulta).map(c=> c.join("=")).join("&"); 

        mostrarLoadingSpinner(); 

        // fetch(url + "/ContactoPersona/llenarDataTable?" + parametros, { method: "GET" })

        // https://pokeapi.co/api/v2/pokemon?offset=0&limit=10
        // https://pokeapi.co/api/v2/pokemon?offset=10&limit=10

        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${inicio}&limit=${registrosPorPagina}`, { method: "GET" }) 
        .then(response => 
        { 
            if(response.ok) 
            { 
                response.json().then(data => 
                { 
                    totalPaginas = Math.ceil( parseInt(data["count"]) / registrosPorPagina ) - 1; 

                    if (totalPaginas > 0) { 
                        // Habilitar o desabilitar botones de navegacion para la paginacion 
                        document.getElementById("nav_paginacion").style.display = "block"; 
                        document.getElementById("btn_pagina_anterior").disabled = (paginaActual == 0) ? true : false; 
                        document.getElementById("btn_pagina_siguiente").disabled = (paginaActual >= totalPaginas) ? true : false; 
                    } 
                    else { 
                        document.getElementById("nav_paginacion").style.display = "none"; 
                    } 

                    var tabla = document.getElementById("tablaPrincipal").getElementsByTagName("tbody")[0]; 
                    tabla.innerHTML = "";   // Limpia la tabla 

                    data["results"].reverse().forEach((x, index) => 
                    { 
                        let id = x.url.split("/").reverse()[1];
                        let dato = { id, email: x.name, puertoEmailEnvio: 1234, hostEmailEnvio: "BBBB" };

                        var fila = tabla.insertRow(0); 
                        fila.insertCell(0).innerHTML = dato.id; 
                        fila.insertCell(1).innerHTML = dato.email; 

                        fila.insertCell(2).innerHTML = "Nada"; 

                        fila.insertCell(3).innerHTML = "Nada";
                        
                        fila.insertCell(4).innerHTML = "Nada";
                        fila.insertCell(5).innerHTML = "Nada"; 

                        fila.insertCell(6).innerHTML = "Nada"; 
                        
                        fila.insertCell(7).innerHTML = "Nada"; 
                        fila.insertCell(8).innerHTML = "<a href='' onclick='editar(event, " + dato.id + ")'> Editar </a>"; 
                        fila.insertCell(9).innerHTML = "<a href='javascript:;' onclick='eliminar(" + dato.id + ")'> Eliminar </a>"; 

                    }); 
                }); 
            } 
            else { 
                response.text().then(textoError => alert(textoError)); 
                //throw new Error("Se encontro un error"); 
            } 
        }) 
        .catch(error => { 
            alert(JSON.stringify(error)); 
        }) 
        .finally(c=> { 
            ocultarLoadingSpinner(); 
        }); 
    } 

    resetearPaginacion() 
    { 
        paginaActual = 0; 
        totalPaginas = 0; 
    } 

    validarEmail(email)
    {
        mostrarLoadingSpinner(); 

        fetch(url + "/ContactoPersona/validarEmail/" + email, { 
            method: "POST", 
            headers: {"Authorization": bearerToken}
        }) 
        .then(response => 
        { 
            if(response.ok) 
            { 
                if(response.ok) 
                { 
                    response.text().then(mensaje => { 
                        alert(mensaje);
                        obtenerListaPrincipal();
                    }); 
                } 
            } 
            else { 	
                response.text().then(mensaje => alert(mensaje)); 
            } 
        }) 
        .finally(c=> { 
            ocultarLoadingSpinner(); 
        }); 
    }

    construirObjeto()  // Colocar los valores del objeto de tipo ContactoPersona en el html 
    { 
        Array.from(document.getElementsByClassName("contactoPersona")).forEach(c => 
        { 
            if (c.name != undefined) 
            { 
                // Coloca los valores del objeto en cada elemento del form 
                
                if (["ultimaFechaEnvioCorreo", "ultimaFechaRespuesta"].includes(c.name) && contactoPersona[c.name] != null) {
                    c.value = contactoPersona[c.name].split("-").reverse().join("-");
                }
                else {
                    c.value = contactoPersona[c.name]; 
                } 
            } 
        }); 
    } 

    subirExcel(evento)
    {
        evento.preventDefault(); 
        
        let archivo = document.getElementById("archivoExcel");
        
        if (archivo.files.length == 0) return alert("Faltan datos"); 
        var formData = new FormData(); 
        formData.append("archivo", archivo.files[0], archivo.files[0]["name"]); 
        
        mostrarLoadingSpinner();
        
        fetch(url + "/ContactoPersona/importarExcel", { 
            method: "POST", 
            headers: {"Authorization": bearerToken},
            body: formData
        }) 
        .then(response => 
        { 
            if(response.ok) 
            { 
                obtenerListaPrincipal();               // Se actualiza la lista de ContactoPersona llamando la Web Api 
                $("#modalSubirExcel").modal("hide");  // Cierra el modal 
                alert("La subida del archivo ha sido realizada con exito");
            } 
            else { 
                response.text().then(textoError => alert(textoError)); 
                //throw new Error("Se encontro un error"); 
            } 
        }) 
        .catch(error => { 
            alert(JSON.stringify(error)); 
        }) 
        .finally(c=> { 
            ocultarLoadingSpinner(); 
        }); 
    }

    crearNuevo()  // Iniciar creación de nuevo ContactoPersona 
    { 
        contactoPersona = { 
            haRespondido: "", 
            ultimaFechaRespuesta: "", 
            ultimaFechaEnvioCorreo: "", 
            nombreCompleto: "", 
            email: "", 
            existe: true, 
            listaEnvioCorreoContactoPersona: [], 
        }; 

        operacion = "crear"; 
        construirObjeto(); 
    } 

    guardar(evento)  // Guardar y Actualizar ContactoPersona en la Web Api 
    { 
        evento.preventDefault(); 
        var validacion = validar(contactoPersona); 
        if (validacion != "") return alert(validacion); 

        var metodoEnvio = (operacion == "crear") ? "POST" : "PUT"; 

        //====================================================>>>>>>

        if (["", null].includes(contactoPersona.haRespondido)) contactoPersona.haRespondido = false; 
        if (["", null].includes(contactoPersona.ultimaFechaRespuesta)) contactoPersona.ultimaFechaRespuesta = null; 
        if (["", null].includes(contactoPersona.ultimaFechaEnvioCorreo)) contactoPersona.ultimaFechaEnvioCorreo = null; 
        if (["", null].includes(contactoPersona.nombreCompleto)) contactoPersona.nombreCompleto = ""; 
        if (["", null].includes(contactoPersona.existe)) contactoPersona.existe = true; 

        //====================================================>>>>>>

        mostrarLoadingSpinner(); 

        fetch(url + "/ContactoPersona", { 
            method: metodoEnvio, 
            headers: {"Content-Type": "application/json", "Authorization": bearerToken},     
            body: JSON.stringify(contactoPersona) 
        }) 
        .then(response => 
        { 
            if(response.ok) 
            { 
                obtenerListaPrincipal();               // Se actualiza la lista de ContactoPersona llamando la Web Api 
                $("#modalCrearEditar").modal("hide");  // Cierra el modal 
            } 
            else { 
                response.text().then(textoError => alert(textoError)); 
                //throw new Error("Se encontro un error"); 
            } 
        }) 
        .catch(error => { 
            alert(JSON.stringify(error)); 
        }) 
        .finally(c=> { 
            ocultarLoadingSpinner(); 
        }); 
    } 

    validar(contactoPersona)  // Validar ContactoPersona 
    { 
        // Se validan los atributos de la entidad 
        if (["", null].includes(contactoPersona.email)) return "El campo email no posee un valor"; 

        return ""; 
    } 

    editar(evento, id)  // Obtener ContactoPersona de la Web Api por su id 
    { 
        evento.preventDefault(); 

        mostrarLoadingSpinner(); 

        fetch(url + "/ContactoPersona/" + id, { 
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
                    contactoPersona = data; 

                    // Asignar atributo toString a objeto(s) hijos(s) que pertenecen a otra entidad 

                    // this.contactoPersona["listaEnvioCorreoContactoPersona"].forEach(c=> {  // Recorre los elementos de tipo EnvioCorreoContactoPersona que pertenecen a ContactoPersona 
                    // 	var envioMasivoCorreo = c["envioMasivoCorreo"]; 
                    // 	c["envioMasivoCorreo"]["toString"] = JSON.stringify(envioMasivoCorreo["id"]);  // En su objeto padre de tipo EnvioMasivoCorreo coloca el atributo toString 
                    // }); 

                    construirObjeto(); 
                    $("#modalCrearEditar").modal("show"); 
                }); 
            } 
            else { 
                response.text().then(textoError => alert(textoError)); 
                //throw new Error("Se encontro un error"); 
            } 
        }) 
        .catch(error => { 
            alert(JSON.stringify(error)); 
        }) 
        .finally(c=> { 
            ocultarLoadingSpinner(); 
        }); 
    } 

    eliminar(id)  // Eliminar ContactoPersona por su id 
    { 
        var opcionConfirm = confirm("Desea realmente eliminar este registro"); 
        if (opcionConfirm == true) 
        { 
            mostrarLoadingSpinner(); 

            fetch(url + "/ContactoPersona/" + id, { 
                method: "DELETE", 
                headers: {"Authorization": bearerToken} 
            }) 
            .then(response => 
            { 
                if(response.ok) 
                { 
                    obtenerListaPrincipal();  // Se actualiza la lista de ContactoPersona llamando la Web Api 
                } 
                else { 
                    response.text().then(textoError => alert(textoError)); 
                    //throw new Error("Se encontro un error"); 
                } 
            }) 
            .catch(error => { 
                alert(JSON.stringify(error)); 
            }) 
            .finally(c=> { 
                ocultarLoadingSpinner(); 
            }); 
        } 
    } 
    
    exportarListaPrincipal(tipoArchivo)  // Exportar a PDF o Excel los elementos que aparecen en la tabla de busquedas 
	{ 
		var registrosPorPagina = 10; 
		var inicio = paginaActual * registrosPorPagina; 
		var metodo = ""; 

		if (tipoArchivo == "excel")  metodo = "generarExcel"; 
		if (tipoArchivo == "pdf")    metodo = "generarPDF"; 

		var consulta = obtenerConsultaBuscador(); 
		consulta["start"] = inicio;                 // Datos para paginacion 
		consulta["length"] = registrosPorPagina;    // Datos para paginacion 
		var parametros = Object.entries(consulta).map(c=> c.join("=")).join("&"); 
        
        mostrarLoadingSpinner(); 

        fetch(url + "/ContactoPersona/" + metodo + "?" + parametros, { 
            method: "GET", 
            headers: {"Authorization": bearerToken} 
        })
        .then( res => res.blob() )
        .then( blob => {
          var file = window.URL.createObjectURL(blob);
          //window.location.assign(file);   // Redirige a una nueva ventana
          window.open(file);                // Abre una nueva ventana
        })
        .catch(error => { 
            alert(JSON.stringify(error)); 
        }) 
        .finally(c=> { 
            ocultarLoadingSpinner(); 
        }); 
	} 
};