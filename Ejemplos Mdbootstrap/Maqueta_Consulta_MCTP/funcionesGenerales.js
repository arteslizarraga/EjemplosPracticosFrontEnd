//#region Funciones Generales

function llenarCombobox(querySelector, arreglo)  
{
    if (!Array.isArray(arreglo))
        return console.log("La función llenarCombobox debe recibir un arreglo");

    let select = $(querySelector);
    select.find("option[value!='']").remove().end();
    arreglo.forEach(x => select.append(`<option value="${x.codigo}">${x.descripcion}</option>`))  // El arreglo debe tener los elementos codigo y descripcion
    select.trigger("chosen:updated");
}

function limpiarCombobox(querySelector)
{
    $(querySelector + ' option[value!=""]').remove().end();    // Remueve todos los options excepto el seleccione
    $(querySelector).trigger("chosen:updated");
}

function limpiarFormulario(querySelector)
{
    Array.from($(querySelector).find(":input"))
        .filter(x => x.className.includes("form-control") && x.attributes.getNamedItem("no-limpiar") == null).forEach(x => {
            x.value = "";
        });

    Array.from($(querySelector).find("select"))
        .filter(x => x.attributes.getNamedItem("no-limpiar") == null).forEach(x => {
            $(`${querySelector} [name='${x.name}']`).find("option:first-child").prop("selected", true).trigger("chosen:updated");
        });
}

function showLoading() {
    $('#loadingOverlay').show();
}

function hideLoading() {
    $('#loadingOverlay').hide();
}

function cerrarModal(querySelector) {
    $(querySelector).modal("toggle");   // Cierra el modal
    $(".modal-backdrop").hide();        // Agregado para que el fondo del modal desaparezca
}

function mostrarErroresRespuestaBackend(res)
{
    if (res.status == 400)  // Si es Bad Request
    {
        res.errores.forEach(error => toastr.error(error));
    }

    if (res.status == 500)  // Si es Internal Server Error
    {
        if (document.querySelector("#ModalError") != null && document.querySelector("#ModalError [name='mensaje-error']") != null)
        {
            $("#ModalError").modal("show");
            document.querySelector("#ModalError [name='mensaje-error']").innerHTML = ""; 	// Limpia mensajes anteriores

            let cadena = "";

            res.errores.forEach(error => cadena += `${error} <br/>`);
            document.querySelector("#ModalError [name='mensaje-error']").innerHTML = cadena;
        }
        else {
            console.log("No se encontró el modal para desplegar los errores");
            res.errores.forEach(error => toastr.error(error));
        }
    }
}

function validarNuloVacio(contenido)
{
    if (contenido == null || contenido == "")
        return false;
    else
        return true;
}

function formatearNombreArchivo(nombreArchivo)
{
    let agregarCero = (i) => {
        if (i < 10) { i = "0" + i }
        return i;
    }

    let today = new Date();
    let dia = String(today.getDate()).padStart(2, "0");
    let mes = String(today.getMonth() + 1).padStart(2, "0");
    let anio = today.getFullYear();
    let hora = agregarCero(today.getHours());
    let minuto = agregarCero(today.getMinutes());
    let segundo = agregarCero(today.getSeconds());

    return `${nombreArchivo}__${dia}${mes}${anio}_${hora}${minuto}${segundo}`;  // Estandar de nombre archivo usado en Inacap
}

function generarExcel(data, nombreArchivo)
{
    let workbook = XLSX.utils.book_new(),
        worksheet = XLSX.utils.aoa_to_sheet(data);

    workbook.SheetNames.push("Hoja 1");
    workbook.Sheets["Hoja 1"] = worksheet;

    let xlsbin = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary"
    });

    let buffer = new ArrayBuffer(xlsbin.length),
        array = new Uint8Array(buffer);

    for (let i = 0; i < xlsbin.length; i++) {
        array[i] = xlsbin.charCodeAt(i) & 0XFF;
    }

    let xlsblob = new Blob([buffer], { type: "application/octet-stream" });
    delete array; delete buffer; delete xlsbin;

    let url = window.URL.createObjectURL(xlsblob),
        anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${nombreArchivo}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
    delete anchor;
}

function desplegarPaginacionBootstrap(datos) 
{
    let paginaActual = datos.paginaActual
    let totalRegistros = datos.totalRegistros
    let totalPaginas = datos.totalPaginas
    let registrosPorPagina = datos.registrosPorPagina
    let contarDesdeCero = (datos.contarDesdeCero != null) ? datos.contarDesdeCero : true;

    document.querySelector(datos.querySelector).innerHTML = "";   // Limpia

    let ul = document.createElement("ul");
    ul.setAttribute("class", "pagination");

    let cont = 0;

    let agregarLi = (info) => {
        let li = document.createElement("li");
        li.setAttribute("class", `page-item ${(info.esPaginaActual != null && info.esPaginaActual) ? "active" : ""}`);

        let enlace = document.createElement("a");
        enlace.setAttribute("href", "javascript:void(0)");
        enlace.setAttribute("class", "page-link");
        enlace.innerText = info.texto;
        if (info.numeroPagina != null) enlace.setAttribute("numeroPagina", info.numeroPagina);
        enlace.addEventListener("click", info.onclick);
        li.appendChild(enlace);

        ul.appendChild(li);
        cont++;
    };

    if (totalPaginas > 0 && totalRegistros >= registrosPorPagina) 
    {
        if (paginaActual != (contarDesdeCero ? 0 : 1))    // Ejemplo original java
        {
            agregarLi({ texto: "Anterior", onclick: datos.pasoAtras });
        }

        let maximo_paginas_mostrado = 10; // Total de paginas desplegadas. Ej: paginas del 1 al 10,   del 10 al 19,   del 20 al 29 
        let inicio_paginacion = 0;        // Primer numero de la paginación
        let fin_paginacion = 0;           // Ultimo numero de la paginación

        if (totalPaginas <= maximo_paginas_mostrado) { // Si el numero total de paginas es menor o igual a 10	
            inicio_paginacion = contarDesdeCero ? 0 : 1;
            fin_paginacion = totalPaginas;
        }
        else 
        {
            if (paginaActual > totalPaginas - maximo_paginas_mostrado)  // Esto impide que el numero de la pagina sobrepase el total de paginas
            {
                if (contarDesdeCero)
                    inicio_paginacion = totalPaginas - maximo_paginas_mostrado;
                else
                    inicio_paginacion = (totalPaginas - maximo_paginas_mostrado) + 1;

                fin_paginacion = totalPaginas;
            }
            else 
            {
                if (paginaActual < maximo_paginas_mostrado) {
                    inicio_paginacion = contarDesdeCero ? 0 : 1;
                    fin_paginacion = maximo_paginas_mostrado;
                }
                if (paginaActual >= maximo_paginas_mostrado) // Si la pagina actual es mayor o igual a diez  
                {
                    let finLoop = 0;

                    if (totalPaginas % maximo_paginas_mostrado == 0)   // Si la cantidad de resultados es divisible por el numero de paginas
                        finLoop = Math.ceil((totalPaginas / maximo_paginas_mostrado));
                    else
                        finLoop = Math.ceil((totalPaginas / maximo_paginas_mostrado) + 1);

                    for (let i = 1; i < finLoop; i++)  // Determinar donde empieza y termina la paginacion
                    {
                        if (paginaActual < maximo_paginas_mostrado * i) {
                            inicio_paginacion = maximo_paginas_mostrado * (i - 1);
                            fin_paginacion = (maximo_paginas_mostrado * i) - 1;
                            break;  // Es importante parar aquí el looping del for, sino aparecerá solo el ultimo grupo de paginas
                        }
                    }
                }
            }
        }

        //for(let i=0; i<=totalPaginas; i++)  // DE ESTA FORMA SE IMPRIMIRÍA UNA PAGINACIÓN CON EL TOTAL DE LAS PAGINAS

        for (let i = inicio_paginacion; i <= fin_paginacion; i++)  // LA PAGINACIÓN QUEDA ORDENADA EN GRUPOS DE 10 PAGINAS
        {
            agregarLi({
                texto: contarDesdeCero ? (i + 1) : i,
                numeroPagina: i,
                onclick: (paginaActual != i) ? datos.seleccionarPagina : null,
                esPaginaActual: (paginaActual == i)
            });
        }

        if (paginaActual != totalPaginas)  // Si pagina es diferente de totalPaginas 
        {
            agregarLi({ texto: "Siguiente", onclick: datos.pasoAdelante });
        }

        document.querySelector(datos.querySelector).appendChild(ul);  // NUEVO
    }
}

//#endregion Funciones Generales