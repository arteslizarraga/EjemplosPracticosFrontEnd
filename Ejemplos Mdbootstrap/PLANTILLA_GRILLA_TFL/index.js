
this.listaObjetos = []; 
this.listaObjetosFiltrada = [];
this.indexDetalle = 0;

this.nextIndex = 0;
this.nextIndexFiltrado = 0;

this.registrosPorPagina = 5;
this.paginaActual = 0;

$(document).ready(function ()
{
    // Activar selects
    $(".chosen-select").chosen({ disable_search_threshold: 10, no_results_text: "Sin Resultados para: ", width: "100%" });
    $(".mdb-select").material_select();

    $('[data-toggle="tooltip"]').tooltip();   // Activar tooltips

    construirGrilla();
});

(async () => 
{
    showLoading();

    try {
        this.listaObjetos = await obtenerDatos();
        construirGrilla();
    }
    catch (ex) {
        if (ex.errores != null) mostrarErroresRespuestaBackend(ex);
        else toastr.error(ex);
    }
    finally { hideLoading() }
})();

function agregarRegistro()
{
    let prelacion = (this.listaObjetos.length > 0) ? (Math.max(...this.listaObjetos.map(o => o.prelacion)) + 1) : 1;
    let fechaHoy = new Date().toJSON().slice(0,10).split("-").reverse().join("-");  // "28-12-2022"
    this.listaObjetos.push({ ncorr: null, prelacion, nombre: `Probando ${prelacion}`, descripcion: `Probando descripción ${prelacion}`, fecha: fechaHoy, estado: "Activo" });

    construirGrilla();
}

function resetearPaginacion()
{
    this.indexDetalle = 0;
    this.nextIndex = 0;
    this.registrosPorPagina = 5;
    this.paginaActual = 0;
}

function construirGrilla()
{
    showLoading();

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

    //================>>>>

    this.listaObjetosFiltrada = this.listaObjetos.map((x, index) => {
        x.indexReal = index;    // Le agrega el index real, para que al filtrar, este index no se pierda    
        return x;
    });

    let modalFiltrar = $("#ModalFiltrarTablaPrincipal");

    let filtro = {
        estado: modalFiltrar.find("[name='estado']").val()
    };

    if (validarNuloVacio(filtro.estado))
        this.listaObjetosFiltrada = this.listaObjetosFiltrada.filter(x => x.estado == filtro.estado);

    // this.listaObjetosFiltrada.sort((a, b) => b.prelacion - a.prelacion);   // Ordena por prelacion desc    (AL HACER ESTO, EL BOTÓN GUARDA Y CONTINUAR CAMBIA SU FUNCIONAMIENTO POR EL this.nextIndex)

    //================>>>>

    $("#TablaPrincipal").DataTable({
        data: this.listaObjetosFiltrada,
        destroy: true,
        pageLength: this.registrosPorPagina,
        dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
        //scrollY: "60vh",
        //"scrollX": true,  // Si la tabla tiene poco tamaño hacia el lado, esto hace que se vea pequeña
        //lengthMenu: [[10, 20, 30], [10, 20, 30]],
        bLengthChange: false, // Oculta el select de registros por página
        columnDefs: [
            //{ "width": "260px", "targets": 4 }  // Ancho de la columna acciones
        ],
        aaSorting: [],
        processing: true,
        //serverSide: true, 
        filter: true,
        orderMulti: false,
        responsive: true,
        fnDrawCallback: () => 
        {
            hideLoading();

            setTimeout(() => {
                $('[data-toggle="tooltip"]').tooltip();  // Activar tooltips
            }, 200);   
        },
        columns: [
            { "className": "text-nowrap", "render": (data, type, row, meta) => row.prelacion },     
            { "className": "text-nowrap", "render": (data, type, row, meta) => limitarTextoCelda(row.nombre) },
            { "className": "text-nowrap", "render": (data, type, row, meta) => limitarTextoCelda(row.descripcion) },
            { "className": "text-nowrap", "render": (data, type, row, meta) => row.fecha },
            { "className": "text-nowrap", "render": (data, type, row, meta) => row.estado },
            {
                "data": "ncorr", "name": "ncorr", "className": "text-nowrap", "sortable": false, "render": (data, type, row, meta) => 
                {
                    return `<div class="d-flex justify-content-between">
                        
                        <button type="button" onclick="abrirModalEditar(${row.indexReal})" class="btnEditFila mr-0 mr-md-4 d-flex align-items-center float-left">
                            <i class="material-icons mr-1 icon-lg grey-text">edit</i>
                            <span class="d-none d-md-inline">Editar</span>
                        </button>
                            
                        <button type="button" onclick="abrirModalEliminarDetalle(${row.indexReal})" class="mr-0 mr-md-4 d-flex align-items-center float-left">
                            <i class="material-icons mr-1 icon-lg grey-text">assignment</i>
                            <span class="d-none d-md-inline">Eliminar</span>
                        </button>
                    </div>`;
                }
            }
        ]
    })
    .on("page.dt", () =>   // Al cambiar de página
    {  
        this.paginaActual = $("#TablaPrincipal").DataTable().page.info().page;
    })
    .page(this.paginaActual).draw(false);     

    $("#TablaPrincipal_wrapper .top").append(`
        <div class="dataTables_custom-buttons">
        <button type="button" class="btn btn-rounded btn-default waves-effect" data-toggle="modal" data-target="#ModalFiltrarTablaPrincipal">
            <span class="d-flex align-items-center">
                <span class="material-icons mr-2">filter_list</span>
                <span>Filtros</span>
            </span>
        </button>
        </div>
    `);

    $("#TablaPrincipal_wrapper .dataTables_actions").append(`<div class="dataTables_actions-buttons">
        <button type="button" onclick="descargarExcel()" class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="Descargar Excel">
            <i class="material-icons icon-1x">arrow_downward</i>
        </button>
        <!--
        <button type="button" class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="Descargar PDF">
            <i class="material-icons icon-1x">picture_as_pdf</i>
        </button>
        -->
    </div >`);
}

function abrirModalEditar(index)
{
    let elemento = this.listaObjetos[index];
    this.indexDetalle = index;                  // Almacena el index para así poder actualizar

    llenarSelect({ 
        selectedValue: elemento.prelacion,
        querySelector: "#ModalEditar [name='prelacion']", 
        data: this.listaObjetos.map((x, index) => {
            let numero = index + 1;
            return { codigo: numero, descripcion: numero };
        })
    });

    let modal = $("#ModalEditar");

    // Coloca textos para orientar al usuario
    modal.find("[name='posicion']").html(index);
    modal.find("[name='fecha']").html(elemento.fecha);

    modal.find("[name='nombre']").val(elemento.nombre); 
    modal.find("[name='descripcion']").val(elemento.descripcion); 

    modal.modal("show"); 

    //=================>>>>>
    // Botón Guardar y continuar

    let siguienteElementoFiltrado = this.listaObjetosFiltrada.find(x => x.indexReal > index);
    this.nextIndexFiltrado = this.listaObjetosFiltrada.findIndex(x => x.indexReal > index);
    this.nextIndex = (siguienteElementoFiltrado != null) ? siguienteElementoFiltrado.indexReal : 0;

    let btnGuardarContinuar = modal.find("[name='btn-guardar-y-continuar']");
    btnGuardarContinuar.attr("disabled", true).attr("class", "btn");  // Deshabilita botón guardar y continuar

    if (this.nextIndex != 0)
        btnGuardarContinuar.removeAttr("disabled").attr("class", "btn btn-default waves-effect waves-light");
    else
        toastr.success("Último registro");

    //=================>>>>>
}

function guardarDatosModalEditar(pasarSiguientePagina = false)
{
    let modal = $("#ModalEditar");
    let prelacion = modal.find("[name='prelacion']").val();
    let nombre = modal.find("[name='nombre']").val();
    let descripcion = modal.find("[name='descripcion']").val();

    //============>>>>

    let errores = [];

    if (!validarNuloVacio(prelacion))
        errores.push("La prelación es requerida");

    if (!validarNuloVacio(nombre))
        errores.push("El nombre es requerido");    

    if (!validarNuloVacio(descripcion))
        errores.push("La descripción es requerida");

    if (errores.length > 0) {
        errores.reverse().forEach(error => toastr.error(error));
        return;
    }

    //============>>>>

    let elemento = this.listaObjetos[this.indexDetalle];
    elemento.prelacion = prelacion;
    elemento.nombre = nombre;
    elemento.descripcion = descripcion;

    modal.modal("hide"); 

    //=====================>>>

    if (pasarSiguientePagina)
    {
        // this.paginaActual = (Math.ceil((this.nextIndex + 1) / this.registrosPorPagina)) - 1;    // Original

        this.paginaActual = (Math.ceil((this.nextIndexFiltrado + 1) / this.registrosPorPagina)) - 1;

        setTimeout(() => {
            abrirModalEditar(this.nextIndex);
            construirGrilla();
        }, 500);
    }
    else {
        construirGrilla();
    }
}

function abrirModalEliminarDetalle(index)
{
    this.index = index;
    $("#ModalEliminarDetalle").modal("show");
}

function eliminarDetalle()
{
    this.listaObjetos.splice(this.index, 1);     // Elimina la posición del arreglo

    // this.listaObjetos.sort((a, b) => a.prelacion - b.prelacion).forEach((x, index) => x.prelacion = index + 1);  // Re asigna prelacion a todos los elementos del arreglo
    
    cerrarModal("#ModalEliminarDetalle");
    construirGrilla();
}

function obtenerDatos() 
{
    return new Promise((resolve, reject) => 
    {
        resolve([
            { ncorr: 101, prelacion: 1, nombre: "Probando 1", descripcion: "Probando descripción 1", fecha: "07-11-2022", estado: "Activo" },
            { ncorr: 102, prelacion: 2, nombre: "Probando 2", descripcion: "Probando descripción 2", fecha: "07-11-2022", estado: "Inactivo" },
            { ncorr: 103, prelacion: 3, nombre: "Probando 3", descripcion: "Probando descripción 3", fecha: "07-11-2022", estado: "Activo" },
            { ncorr: 104, prelacion: 4, nombre: "Probando 4", descripcion: "Probando descripción 4", fecha: "07-11-2022", estado: "Inactivo" },
            { ncorr: 105, prelacion: 5, nombre: "Probando 5", descripcion: "Probando descripción 5", fecha: "07-11-2022", estado: "Activo" },
            { ncorr: 106, prelacion: 6, nombre: "Probando 6", descripcion: "Probando descripción 6", fecha: "07-11-2022", estado: "Inactivo" },
            { ncorr: 107, prelacion: 7, nombre: "Probando 7", descripcion: "Probando descripción 7", fecha: "07-11-2022", estado: "Activo" },
            { ncorr: 108, prelacion: 8, nombre: "Probando 8", descripcion: "Probando descripción 8", fecha: "07-11-2022", estado: "Activo" },
            { ncorr: 109, prelacion: 9, nombre: "Probando 9", descripcion: "Probando descripción 9", fecha: "07-11-2022", estado: "Activo" },
            { ncorr: 110, prelacion: 10, nombre: "Probando 10", descripcion: "Probando descripción 10", fecha: "07-11-2022", estado: "Activo" },
            { ncorr: 111, prelacion: 11, nombre: "Probando 11", descripcion: "Probando descripción 11", fecha: "07-11-2022", estado: "Activo" },
            { ncorr: 112, prelacion: 12, nombre: "Probando 12", descripcion: "Probando descripción 12", fecha: "07-11-2022", estado: "Activo" },
            { ncorr: 113, prelacion: 13, nombre: "Probando 13", descripcion: "Probando descripción 13", fecha: "07-11-2022", estado: "Activo" },
            { ncorr: 114, prelacion: 14, nombre: "Probando 14", descripcion: "Probando descripción 14", fecha: "07-11-2022", estado: "Activo" }
        ]);
    });
}

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

function quitarSeleccionSelect(querySelector) 
{
    $(querySelector).find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
}

function limpiarSelect(querySelector) 
{
    $(querySelector + ' option[value!=""]').remove().end();    // Remueve todos los options excepto el seleccione
    $(querySelector).trigger("chosen:updated");
}

function llenarSelect(datos) 
{
    if (Array.from($(datos.querySelector + ' option[value!=""]')).length)   // Si tiene elementos excepto el seleccione
        limpiarSelect(datos.querySelector);                              // Esto sirve al refrescar el combobox con nuevos datos

    quitarSeleccionSelect(datos.querySelector);

    if (datos.data != null) 
    {
        if (datos.selectedValue == null) 
        {
            datos.data.forEach(c => {
                $(datos.querySelector).append('<option value="' + c.codigo + '">' + c.descripcion + '</option>');
            });
        }
        else 
        {
            if (Array.isArray(datos.selectedValue)) {
                var arreglo = datos.selectedValue;

                datos.data.forEach(c => {
                    let selected = (arreglo.includes(c.codigo.toString())) ? "selected" : "";
                    $(datos.querySelector).append('<option value="' + c.codigo + '" ' + selected + '>' + c.descripcion + '</option>');

                });
            }
            else {
                datos.data.forEach(c => {
                    let selected = (c.codigo == datos.selectedValue) ? "selected" : "";
                    $(datos.querySelector).append('<option value="' + c.codigo + '" ' + selected + '>' + c.descripcion + '</option>');
                });
            }
        }

    }

    $(datos.querySelector).on("change", () => {
        if (datos.onchange != null && typeof datos.onchange === "function") datos.onchange();
    });

    $(datos.querySelector).trigger("chosen:updated");   // El select toma los cambios realizados

    if (datos.multiple != null && datos.multiple)   // Si es un select multiple, lo refresca
    {
        $(datos.querySelector).materialSelect("destroy");
        $(datos.querySelector).removeAttr("disabled");
    }
}

function showLoading() {
    $('#loadingOverlay').show();
}

function hideLoading() {
    $('#loadingOverlay').hide();
}

function validarNuloVacio(contenido)
{
    if (contenido == null || contenido == "")
        return false;
    else
        return true;
}

function cerrarModal(querySelector) {
    $(querySelector).modal("toggle");   // Cierra el modal
    $(".modal-backdrop").hide();        // Agregado para que el fondo del modal desaparezca
}