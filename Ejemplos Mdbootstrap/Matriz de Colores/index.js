
this.grillaDinamica = {};
let registrosPorPagina = 10;
let paginaActual = 0;
this.indexDetalle = 0;

//======================>>>>>

this.nivelesMctp = obtenerNivelesMctp();
this.listaObjetos = obtenerListaObjetos();
this.coloresDescripcion = obtenerColoresDescripcion();

$(document).ready(function() 
{
    // Activar selects
    $(".chosen-select").chosen({ disable_search_threshold: 10, no_results_text: "Sin Resultados para: ", width: "100%" });
    $(".mdb-select").material_select();

    //construirAcordeonNiveles();
    construirGrilla();
});

function construirGrilla() 
{
    let limitarTextoCelda = (descripcion, size = 40) =>
    {
        if (descripcion != null && typeof descripcion === "string")
        {
            if (descripcion.includes("\\n")) descripcion = descripcion.split("\\n").join("\n");   // Reemplaza saltos de línea con doble backslash por uno normal

            if (descripcion.length > size)
            {
                let titulo = descripcion;   // El título sí puede contener <br>
                if (titulo.includes("\"")) titulo = titulo.replaceAll("\"", "&quot;");  // Reemplaza comillas dobles por &quot;
                if (titulo.includes("\n")) titulo = titulo.split("\n").join("<br/>");

                return `<container data-html="true" data-toggle="tooltip" data-placement="top" title="${titulo}" style="cursor: pointer">${descripcion.slice(0, size)} ...</container>`;
            }
        }

        return descripcion
    };

    let obtenerListaObjetosFiltrada = (lista) =>
    {
        /*
        let modalFiltrar = $("#ModalFiltrarTablaAnalisis");

        let filtro = {
            defNivelMctpNcorr: modalFiltrar.find("[name='defNivelMctpNcorr']").val()
        };

        if (validarNuloVacio(filtro.defNivelMctpNcorr))
            lista = lista.filter(x => x.def_nmctp_ncorr == filtro.defNivelMctpNcorr);
        */

        return lista;
    };

    this.grillaDinamica = {
        thead: [
            { valor: "Prelación" },
            { valor: "Tipo Asignatura" },
            { valor: "Tipo Orden Asignatura" }
        ], 
        tbody: []
    };


    // Agrega niveles
    this.nivelesMctp.forEach(x => this.grillaDinamica.thead.push({
        valor: x.descripcion
    }));

    // this.grillaDinamica.thead.push({ valor: "Estado" });
    this.grillaDinamica.thead.push({ html: "Acciones" });   // Si no tiene valor, no se despliega en el Excel

    let listaObjetosFiltrada = obtenerListaObjetosFiltrada(this.listaObjetos);  // Aplicar filtros en caso de que existan

    this.listaObjetos.forEach((row, index) =>
    {
        if (listaObjetosFiltrada.includes(row))
        {
            let arreglo = [
                { valor: row.prelacion, atributo: "prelacion" },
                { valor: row.tipoAsignatura, atributo: "tipoAsignatura" },
                { valor: row.tipoOrdenAsignatura, atributo: "tipoOrdenAsignatura" } 
            ];

            this.nivelesMctp.forEach(nivel =>
            {
                // console.log(nivel);

                if (row.niveles.length > 0)
                {
                    let r = row.niveles.find(x => x.def_nmctp_ncorr == nivel.def_nmctp_ncorr);

                    if (r != null)
                    {
                        // arreglo.push({ html: limitarTextoCelda(r.descripcion), valor: r.descripcion });

                        arreglo.push({
                            html: `
                            <div class="d-flex justify-content-start">
                                <div class="pt-1">
                                    <div class="color" style="background-color: ${r.color}"></div>
                                </div>
                                <div class="txt-nvl ml-2">
                                    <span>${limitarTextoCelda(r.descripcion)}</span>
                                </div>
                            </div>`,
                            valor: r.descripcion
                        });
                    }
                }
                else {
                    arreglo.push({ html: "", valor: "" });  // Si en la fila recorrida, el nivel no tiene contenido, deja en blanco
                }
            });

            //arreglo.push({ valor: row.estado });

            arreglo.push({  // Si no tiene valor, no se despliega en el Excel
                html: `
                <div class="d-flex justify-content-between">

                    <button type="button" onclick="desplegarCardEditar(${index})" class="btnEditFila mr-0 mr-md-4 d-flex align-items-center float-left">
                        <i class="material-icons mr-1 icon-lg grey-text">edit</i>
                        <span class="d-none d-md-inline">Editar</span>
                    </button>

                    <button type="button" onclick="abrirModalEliminar(${index})" class="mr-0 mr-md-4 d-flex align-items-center float-left">
                        <i class="material-icons mr-1 icon-lg grey-text">assignment</i>
                        <span class="d-none d-md-inline">Eliminar</span>
                    </button>
                </div>`
            });

            this.grillaDinamica.tbody.push(arreglo);
        }
    });

    let cadena = `
    <table id="TablaResultados" class="datatables table table-hover table-striped table-bordered m-0">
        <thead>
            <tr> ${this.grillaDinamica.thead.map(x => `
                <th data-orderable="${x.esOrdenable != null ? "true" :"false"}">
                    ${x.valor != null ? limitarTextoCelda(x.valor) : x.html}
                </th>`).join("")}
            </tr>
        </thead>
        <tbody>
            ${this.grillaDinamica.tbody.map(x =>
            {
                return `<tr> ${x.map(y => `<td class="text-nowrap">
                    ${y.html ?? y.valor ?? "DATO DESCONOCIDO"}</td>`).join("")}
                </tr>`;
            }).join("")}
        </tbody>
    </table>
    `;

    document.querySelector("#TablaResultados").innerHTML = cadena;


    $("#TablaResultados").DataTable({
        destroy: true,
        pageLength: registrosPorPagina,
        dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
        scrollY: "40vh",
        scrollX: true,  // Si la tabla tiene poco tamaño hacia el lado, esto hace que se vea pequeña
        //lengthMenu: [[10, 20, 30], [10, 20, 30]],
        bLengthChange: false, // Oculta el select de registros por página
        columnDefs: [],
        aaSorting: [],
        processing: true,
        //serverSide: true, 
        filter: true,
        orderMulti: false,
        responsive: true
    })
    .on("page.dt", () => {
        paginaActual = $("#TablaResultados").DataTable().page.info().page;
    })
    .page(paginaActual).draw(false);

    //$("#TablaResultados_wrapper .top").append(`
    //    <div class="dataTables_custom-buttons">
    //    <button type="button" class="btn btn-rounded btn-default waves-effect" data-toggle="modal" data-target="#ModalFiltrarTablaAnalisis">
    //        <span class="d-flex align-items-center">
    //            <span class="material-icons mr-2">filter_list</span>
    //            <span>Filtros</span>
    //        </span>
    //    </button>
    //    </div>
    //`);

    $("#TablaResultados_wrapper .dataTables_actions").append(`<div class="dataTables_actions-buttons">
        <button type="button" onclick="descargarExcel()" class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="Descargar Excel">
            <i class="material-icons icon-1x">arrow_downward</i>
        </button>
    </div >`);

    // $('#TablaResultados').css('width', '100%');

}

function descargarExcel()
{
    let data = [this.grillaDinamica.thead.filter(x => x.valor != null).map(x => x.valor)];

    this.grillaDinamica.tbody.forEach(x =>
    {
        data.push(x.filter(y => y.valor != null).map(y => {
            return y.valor;
        }));
    });

    let nombreArchivo = formatearNombreArchivo("DEF_TASIG_MC");
    generarExcel(data, nombreArchivo);
}


function abrirModalAgregarNuevaFila()
{
    //==============================>>>>
    // Llenar selector de prelación

    let obtenerArregloPrelaciones = () => 
    {
        let arregloPrelaciones = [];
        let numero = 0;

	    this.listaObjetos.forEach((x, index) => {
		    numero = index + 1;
		    arregloPrelaciones.push({ codigo: numero, descripcion: numero });
	    });

	    numero ++;
	    arregloPrelaciones.push({ codigo: numero, descripcion: numero });

	    return arregloPrelaciones;
    };

    let arregloPrelaciones = obtenerArregloPrelaciones();

    if (arregloPrelaciones.length == 0)
        arregloPrelaciones = [{ codigo: 1, descripcion: 1 }];
    
    llenarCombobox("#ModalAgregarNuevaFila [name='prelacion']", arregloPrelaciones);

    //==============================>>>>

    this.objeto = {
        prelacion: 0,
        tipoAsignatura: "",
        tipoOrdenAsignatura: "",
        niveles: this.nivelesMctp.map(x =>
        {
            return { def_nmctp_ncorr: x.def_nmctp_ncorr, descripcion: "", color: null };
        })
    };

    let cadena = `
    <div class="acordeon-niveles accordion md-accordion" id="acordeon-niveles-descripcion-crear" role="tablist" aria-multiselectable="true">

        ${this.objeto.niveles.map((nivel, indexNivel) => 
        {
            return `
            <div class="accordion-item">
    
                <div class="accordion-header grey lighten-3" role="tab" id="heading-nivel-${nivel.def_nmctp_ncorr}">
                    <a data-toggle="collapse" data-parent="#acordeon-niveles-descripcion-crear" href="#collapse-nivel-${nivel.def_nmctp_ncorr}" aria-expanded="false" aria-controls="collapse-nivel-${nivel.def_nmctp_ncorr}">
                    <h5 class="mb-0 pl-3 pr-3">
                        Nivel ${nivel.def_nmctp_ncorr}
                        <span class="accordion-arrow"><i class="material-icons rotate-icon float-right">keyboard_arrow_down</i></span>
                    </h5>
                    </a>
                </div>
                <div id="collapse-nivel-${nivel.def_nmctp_ncorr}" class="collapse ${indexNivel == 0 ? "show" : ""}" role="tabpanel" aria-labelledby="heading-nivel-${nivel.def_nmctp_ncorr}" data-parent="#acordeon-niveles-descripcion-crear">
    
                    <div class="accordion-body p-3 pt-3 pb-2">
    
                        <div class="row mb-4">

                            <div class="col-12 col-md-6">
                                <div class="md-form mb-3">
                                    <textarea onkeyup="objeto.niveles[${indexNivel}].descripcion = this.value" 
                                    name="descripcion" rows="3" placeholder="Ingrese Descripción" class="form-control md-textarea">${nivel.descripcion}</textarea>

                                    <label class="active">Nivel ${nivel.def_nmctp_ncorr}</label>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
    
                                <div class="md-form">
                                    <label class="active">Color</label>
                                </div>
                                <div name="colorNivel" class="dropdown">
                                    <button class="dropdown-toggle d-flex col drop-color text-left p-1 pl-0" type="button" data-toggle="dropdown" aria-expanded="false">Seleccione color</button>
                                    <div class="dropdown-menu col">
                                        
                                        ${this.coloresDescripcion.map(x => 
                                        {
                                            return `
                                            <a codigo="${x.codigo}" onclick="seleccionarColorDescripcion(this, ${indexNivel}, '${x.codigo}')" class="dropdown-item d-flex">
                                                <div class="d-flex">
                                                    <div class="circle pt-1">
                                                        <div class="color" style="background-color: ${x.codigo}"></div>
                                                    </div>
                                                    <span class="ml-2">${x.descripcion}</span>
                                                </div>
                                            </a>
                                            `;
                                        }).join("")}

                                    </div>
                                </div>
    
                            </div>
    
                        </div>  <!-- Fin div row mb-4 -->
    
                    </div>  <!-- Fin div accordion-body -->
    
                </div>   <!-- Fin div collapse-nivel-${nivel.def_nmctp_ncorr} -->
    
            </div>  <!-- Fin div accordion-item -->
            `;
        })
        .join("")}

    </div>
    `;

    document.querySelector("#acordeon-niveles-descripcion-crear").innerHTML = cadena;

    //============================================================>>>>

    $("#ModalAgregarNuevaFila").modal("show");
}

function agregarNuevaFila()
{
    let modal = $("#ModalAgregarNuevaFila");
    let prelacion = modal.find("[name='prelacion']").val();
    let errores = [];

    if (!validarNuloVacio(prelacion))
        errores.push("La prelación es requerida");

    if (this.objeto.niveles.some(x => !validarNuloVacio(x.descripcion)))
        errores.push("Todos los niveles deben poseer una descripción");

    if (this.objeto.niveles.some(x => !validarNuloVacio(x.color)))
        errores.push("Todos los niveles deben poseer un color");

    if (errores.length > 0) {
        errores.reverse().forEach(error => toastr.error(error));
        return;
    }

    this.objeto.prelacion = prelacion;

    this.listaObjetos.push(this.objeto);
    cerrarModal("#ModalAgregarNuevaFila");
    construirGrilla();
}

function desplegarCardEditar(index)
{
    showLoading();
    this.indexDetalle = index;
    document.querySelector("#editar").style.display = "block";
    document.querySelector("#resultados").style.display = "none";

    this.objeto = JSON.parse(JSON.stringify(this.listaObjetos[index]));   // Hace una copia del detalle

    //=====================================>>>>>
    // Llenar selector de prelación
    llenarCombobox(
        "#editar [name='prelacion']",
        this.listaObjetos.map((x, index) => {
            let numero = index + 1;
            return { codigo: numero, descripcion: numero };
        })
    );

    setTimeout(() => {
        $("#editar [name='prelacion']").val(this.objeto.prelacion).trigger("chosen:updated");
    }, 200);

    //=====================================>>>>>

    let cadena = `
    <div class="acordeon-niveles accordion md-accordion" id="acordeon-niveles-descripcion-editar" role="tablist" aria-multiselectable="true">

        ${this.objeto.niveles.map((nivel, indexNivel) => 
        {
            return `
            <div class="accordion-item">
    
                <div class="accordion-header grey lighten-3" role="tab" id="heading-nivel-${nivel.def_nmctp_ncorr}">
                    <a data-toggle="collapse" data-parent="#acordeon-niveles-descripcion-editar" href="#collapse-nivel-${nivel.def_nmctp_ncorr}" aria-expanded="false" aria-controls="collapse-nivel-${nivel.def_nmctp_ncorr}">
                    <h5 class="mb-0 pl-3 pr-3">
                        Nivel ${nivel.def_nmctp_ncorr}
                        <span class="accordion-arrow"><i class="material-icons rotate-icon float-right">keyboard_arrow_down</i></span>
                    </h5>
                    </a>
                </div>
                <div id="collapse-nivel-${nivel.def_nmctp_ncorr}" class="collapse ${indexNivel == 0 ? "show" : ""}" role="tabpanel" aria-labelledby="heading-nivel-${nivel.def_nmctp_ncorr}" data-parent="#acordeon-niveles-descripcion-editar">
    
                    <div class="accordion-body p-3 pt-3 pb-2">
    
                        <div class="row mb-4">

                            <div class="col-12 col-md-6">
                                <div class="md-form mb-3">
                                    <textarea onkeyup="objeto.niveles[${indexNivel}].descripcion = this.value" 
                                    name="descripcion" rows="3" placeholder="Ingrese Descripción" class="form-control md-textarea">${nivel.descripcion}</textarea>

                                    <label class="active">Nivel ${nivel.def_nmctp_ncorr}</label>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
    
                                <div class="md-form">
                                    <label class="active">Color</label>
                                </div>
                                <div name="colorNivel" class="dropdown">
                                    <button class="dropdown-toggle d-flex col drop-color text-left p-1 pl-0" type="button" data-toggle="dropdown" aria-expanded="false">Seleccione color</button>
                                    <div class="dropdown-menu col">
                                        
                                        ${this.coloresDescripcion.map(x => 
                                        {
                                            return `
                                            <a codigo="${x.codigo}" onclick="seleccionarColorDescripcion(this, ${indexNivel}, '${x.codigo}')" class="dropdown-item d-flex">
                                                <div class="d-flex">
                                                    <div class="circle pt-1">
                                                        <div class="color" style="background-color: ${x.codigo}"></div>
                                                    </div>
                                                    <span class="ml-2">${x.descripcion}</span>
                                                </div>
                                            </a>
                                            `;
                                        }).join("")}

                                    </div>
                                </div>
    
                            </div>
    
                        </div>  <!-- Fin div row mb-4 -->
    
                    </div>  <!-- Fin div accordion-body -->
    
                </div>   <!-- Fin div collapse-nivel-${nivel.def_nmctp_ncorr} -->
    
            </div>  <!-- Fin div accordion-item -->
            `;
        })
        .join("")}

    </div>
    `;

    document.querySelector("#acordeon-niveles-descripcion-editar").innerHTML = cadena;

    setTimeout(() => 
    {
        this.objeto.niveles.forEach(x => 
        {
            let a = Array.from(document.querySelectorAll(`#acordeon-niveles-descripcion-editar #collapse-nivel-${x.def_nmctp_ncorr} [name='colorNivel'] a`))
            .find(y => y.getAttribute("codigo") == x.color);

            if (a != null) {
                a.click()
            }    
        });

        hideLoading();
    }, 200);
}

function seleccionarColorDescripcion(e, indexNivel, color)
{
    // console.log(e);
    e.parentElement.previousElementSibling.innerHTML  = e.innerHTML;
    //console.log(color);

    let elemento = this.objeto.niveles[indexNivel];
    elemento.color = color;
}

function actualizarDetalle()
{
    let card = $("#editar");
    let prelacion = card.find("[name='prelacion']").val();

    let errores = [];

    if (!validarNuloVacio(prelacion))
        errores.push("La prelación es requerida");

    if (this.objeto.niveles.some(x => !validarNuloVacio(x.descripcion)))
        errores.push("Todos los niveles deben poseer una descripción");

    if (this.objeto.niveles.some(x => !validarNuloVacio(x.color)))
        errores.push("Todos los niveles deben poseer un color");

    if (errores.length > 0) {
        errores.reverse().forEach(error => toastr.error(error));
        return;
    }

    let elemento = this.listaObjetos[this.indexDetalle];
    elemento.prelacion = prelacion;

    elemento.niveles.forEach((x, index) =>
    {
        x.descripcion = this.objeto.niveles[index].descripcion;
        x.color = this.objeto.niveles[index].color;
    });

    document.querySelector("#editar").style.display = "none";
    document.querySelector("#resultados").style.display = "block";
    construirGrilla();
}

function volverGrilla()
{
    document.querySelector("#editar").style.display = "none";
    document.querySelector("#resultados").style.display = "block";
}

//============================================================================================================================>>>>>

//#region Funciones Generales

const limpiarFormulario = (querySelector) =>
{
    Array.from($(querySelector).find(":input"))
    .filter(x => x.className.includes("form-control") && x.attributes.getNamedItem("no-limpiar") == null).forEach(x => {
        x.value = "";
    });

    Array.from($(querySelector).find("select"))
    .filter(x => x.attributes.getNamedItem("no-limpiar") == null).forEach(x => {
        $(`${querySelector} [name='${x.name}']`).find("option:first-child").prop("selected", true).trigger("chosen:updated");
    });
};

function llenarCombobox(querySelector, arreglo)  
{
    if (!Array.isArray(arreglo))
        return console.log("La función llenarCombobox debe recibir un arreglo");

    let select = $(querySelector);
    select.find("option[value!='']").remove().end();
    arreglo.forEach(x => select.append(`<option value="${x.codigo}">${x.descripcion}</option>`))  // El arreglo debe tener los elementos codigo y descripcion
    select.trigger("chosen:updated");
}

function limpiarCombobox(querySelector) {
    $(querySelector + ' option[value!=""]').remove().end();    // Remueve todos los options excepto el seleccione
    $(querySelector).trigger("chosen:updated");
}

function habilitarDeshabilitarCombobox(datos)
{
    // habilitarDeshabilitarCombobox({ querySelector: "#resultados-busqueda [name='estado']", habilitado: false });

    if (datos.habilitado) 
        $(datos.querySelector).removeAttr("disabled").trigger("chosen:updated");
    else
        $(datos.querySelector).attr("disabled", true).trigger("chosen:updated");
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

function formatearNumeroEntero(cadena)
{
	// formatearNumeroEntero("123456789") 

	if (cadena.charAt(0) == "0")  // Si el primer caracter es un cero
	{
		cadena = cadena.substring(1, cadena.length)   // Remueve Primer caracter

		if (cadena.charAt(1) == "0") return "";  // Si el usuario intenta ingregar puros ceros
		return cadena;
	}

	cadena = cadena.split(".").join("");  // Remueve puntos
	cadena = cadena.replace(/[^0-9.]/g, '');   // Remueve letras

	let arreglo = cadena.split("").reverse().map((x, index) => 
	{ 
		var cont = index + 1;
		return (cont % 3 == 0 && cont != cadena.length) ? `.${x}` : x
	});

	return arreglo.reverse().join("");
}

function habilitarDeshabilitarElementos(datos)
{
    // habilitarDeshabilitarElementos({ querySelector: "#ModalEditar", habilitado: false });

	Array.from($(datos.querySelector).find(":input"))
	.filter(x => x.tagName != null && !x.tagName.toLowerCase().includes("button"))
    .forEach(x => 
    {
        if (x.tagName.toLowerCase() == "textarea") {
            x.readOnly = !datos.habilitado;
        }
        else {
            x.disabled = !datos.habilitado;
        }
    });
	
    Array.from($(datos.querySelector).find("select")).forEach(x => 
	{
        let selector = $(`${datos.querySelector} [name='${x.name}']`);
		
		if (datos.habilitado) 
			selector.removeAttr("disabled");
		else 
			selector.attr("disabled", "disabled");
		
		selector.trigger("chosen:updated");
    });
	
	Array.from($(datos.querySelector).find(":button")).filter(x => x.textContent != null).forEach(x => 
	{
        let texto = x.textContent.toLowerCase();
		
		if (
            texto.includes("guardar") || texto.includes("insertar") || texto.includes("agregar") ||
            texto.includes("actualizar") || texto.includes("cambiar") || texto.includes("editar") ||
            texto.includes("eliminar") || texto.includes("quitar") || texto.includes("remover")
		) 
		{
			if (datos.habilitado) {
				x.disabled = false;
				x.setAttribute("class", "btn btn-default waves-effect waves-light");  // Oscurece botón
			}
			else {
				x.disabled = true; 
				x.setAttribute("class", "btn");  // Aclara botón
			}
		}		
	});
}

//#endregion Funciones Generales
