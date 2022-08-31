
let filtroAplicado = {};

$("#formFiltrarVerificacionDatosCargaMasiva [name='fecha']").datepicker({ language: "es", autoClose: true });

$("#formFiltrarVerificacionDatosCargaMasiva [name='sectorProductivoNcorr']").on("change", () =>  // Al seleccionar un option para filtrar por sector productivo
{
    let sectorProductivoNcorr = $("#formFiltrarVerificacionDatosCargaMasiva [name='sectorProductivoNcorr']").val();
    limpiarCombobox('#formFiltrarVerificacionDatosCargaMasiva [name="subSectorProductivoNcorr"]');

    if (validarNuloVacio(sectorProductivoNcorr))
    {
        $.ajax({
            method: "GET", url: "https://pokeapi.co/api/v2/pokemon?limit=10",
            //method: "POST", url: "DEF_SSPRODUCTIVOS.aspx/GetCboSubSectorProductivo",
            data: JSON.stringify({ sectorProductivoNcorr: sectorProductivoNcorr }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: () => showLoading(),
            success: (res) =>
            {
                let cboSubSectoresProductivos = res.results.map(x => {
                    return { codigo: x.url, descripcion: x.name };
                });

                llenarCombobox(`#formFiltrarVerificacionDatosCargaMasiva [name="subSectorProductivoNcorr"]`, cboSubSectoresProductivos);
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                toastr.error("Ocurrió un error al obtener los sub sectores productivos por sector productivo");
                hideLoading();
            },
            complete: (res) => hideLoading()
        });
    }
});

const getDatosFiltroVerificacionDatosCargaMasiva = () =>
{
    var formulario = $("#formFiltrarVerificacionDatosCargaMasiva");
		
    var res = {
        codigo: formulario.find("[name='codigo']").val(),
        sectorProductivoNcorr: formulario.find("[name='sectorProductivoNcorr']").val(),
        subSectorProductivoNcorr: formulario.find("[name='subSectorProductivoNcorr']").val(),
        fecha: formulario.find("[name='fecha']").val(),
        codigo_cualificacion: formulario.find("[name='codigo_cualificacion']").val()
    };

    return res;

    /*
    if (Object.entries(filtroAplicado).length == 0)  // Si no se ha aplicado el filtro
    {
        return {
			codigo: $("#formFiltrarVerificacionDatosCargaMasiva [name='codigo']").val(),
			sectorProductivoNcorr: $("#formFiltrarVerificacionDatosCargaMasiva [name='sectorProductivoNcorr']").val(), 
            subSectorProductivoNcorr: $("#formFiltrarVerificacionDatosCargaMasiva [name='subSectorProductivoNcorr']").val(),
			fecha: $("#formFiltrarVerificacionDatosCargaMasiva [name='fecha']").val(),
			codigo_cualificacion: $("#formFiltrarVerificacionDatosCargaMasiva [name='codigo_cualificacion']").val()
        };
    }

    return filtroAplicado;  // Retorna el filtro aplicado
    */
};

function abrirModalFiltrarTabla() 
{
    limpiarFormulario("#formFiltrarVerificacionDatosCargaMasiva");
    // quitarSeleccionCombobox('#formFiltrarVerificacionDatosCargaMasiva [name="sectorProductivoNcorr"]')
    limpiarCombobox('#formFiltrarVerificacionDatosCargaMasiva [name="subSectorProductivoNcorr"]');

    $("#ModalFiltrarTabla").modal("show");
}

function abrirModalAprobarCarga(codigoCarga) 
{
    $("#ModalAprobarCarga [name='codigo']").val(codigoCarga);
    $("#ModalAprobarCarga").modal("show");
}

function aprobarCarga() 
{
    let codigo = $("#ModalAprobarCarga [name='codigo']").val();
    showLoading();

    setTimeout(() => 
    {
        console.log(`El código aprobado es ${codigo}`);
        cerrarModal("#ModalAprobarCarga");
        hideLoading();
        toastr.success("Carga aprobada correctamente");
    }, 1000);
}

function abrirModalDetalleCarga(codigoCarga) 
{
    console.log(`El código para ver el detalle es ${codigoCarga}`);
    $("#ModalDetalleCarga").modal("show");
}

function abrirModalEliminarCarga(codigoCarga) 
{
    $("#ModalEliminarCarga [name='codigo']").val(codigoCarga);
    $("#ModalEliminarCarga").modal("show");
}

function eliminarCarga() 
{
    let codigo = $("#ModalEliminarCarga [name='codigo']").val();
    showLoading();

    setTimeout(() => 
    {
        console.log(`El código del elemento eliminado es ${codigo}`);
        cerrarModal("#ModalEliminarCarga");
        hideLoading();
        toastr.success("Eliminado correctamente");
    }, 1000);
}

function cargarArchivo(thisCard) 
{
    //showLoading();

    $('#verificacion-carga').show();

    if ($('.step1').hasClass('active')) {
        $('.step1').removeClass('active')
        $('.step1').addClass('completed');
        $('.step2').addClass('active');
    }

    toggleExpandCard(thisCard, 'verificacion-carga');
    //actualizarAncho();
    //hideLoading();
    toastr.success('&iexcl;Archivo cargado correctamente&excl;');
    construirTablaVerificacionDatosCargaMasiva();
}


function cargarOtroArchivo(thisCard) 
{    
    //showLoading();

    $('#carga-archivo-masivo').show();

    if ($('.step2').hasClass('active')) {
        $('.step2').removeClass('active')
        $('.step1').addClass('active');
    }

    toggleExpandCard(thisCard, 'carga-archivo-masivo');
    //actualizarAncho();
    //hideLoading();
}

function validarDatos(thisCard) 
{
    //showLoading();

    $('#repositorio-carga').show();

    if ($('.step2').hasClass('active')) {
        $('.step2').removeClass('active')
        $('.step2').addClass('completed');
        $('.step3').addClass('active');
    }
    toggleExpandCard(thisCard, 'repositorio-carga');
    //actualizarAncho();
    // hideLoading();
    construirTablaResultadosRepoCargaMasiva();
}

function volverRepoMasiva(thisCard) 
{
    //showLoading();

    $('#verificacion-carga').show();

    if ($('.step2').hasClass('completed')) {
        $('.step2').removeClass('completed')
        $('.step2').addClass('active');
        $('.step3').removeClass('active');
    }
    toggleExpandCard(thisCard, 'verificacion-carga');
    //actualizarAncho();
    //hideLoading();
}

//==============================================================================================================>>>>>

function construirTablaVerificacionDatosCargaMasiva()
{
    filtroAplicado = getDatosFiltroVerificacionDatosCargaMasiva();

    //console.log(filtroAplicado);

    let oTable = $("#TablaResultadosCargaMasiva").DataTable({
        destroy: true,  // ESTO ES MUY IMPORTANTE, YA QUE NO SE PUEDE CREAR UNA TABLA QUE YA EXISTE
        pageLength: 10,
        dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
        scrollY: "60vh",
        scrollX: true,  // Si la tabla tiene poco tamaño hacia el lado, esto hace que se vea pequeña
        //lengthMenu: [[10, 20, 30], [10, 20, 30]],
        bLengthChange: false, // Oculta el select de registros por página
        columnDefs: [
            { "width": "260px", "targets": 4 }  // Ancho de la columna acciones
        ],
        aaSorting: [],
        processing: true,
        //serverSide: true,    // Esto es en caso de usar paginación backend
        filter: true,
        orderMulti: false,
        responsive: true,
        fnDrawCallback: () =>
        {
            let recordsTotal = $("#TablaResultadosCargaMasiva").DataTable().page.info().recordsDisplay      // Al usar paginación front
            // let recordsTotal = this.fnSettings().fnRecordsTotal();                           // Al usar paginación backend

            if (recordsTotal > 0)
            {
                $("#TablaResultadosCargaMasiva_filter").show();            // Muestra search box
                $("#table-search").attr("maxlength", "20");    // Search box maxlength

                $("#TablaResultadosCargaMasiva_info, #TablaResultadosCargaMasiva_paginate, #TablaResultadosCargaMasiva_length, #divDescargaReportes").show();

                if (!$("#divDescargaReportes").length)   // Si no existe, lo crea
                {
                    /*
                    let divBotonesTabla = `
                    <div id="divDescargaReportes" class="dataTables_actions-buttons">
                        <button type="button" data-toggle="modal" data-target="#ModalDescargar"
                        class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip"
                        data-placement="top" title="Descargar Excel">
                            <i class="material-icons icon-1x">arrow_downward</i>
                        </button>
                    </div>
                    `;
                    */
                    let divBotonesTabla = `
                    <div id="divDescargaReportes" class="dataTables_actions-buttons">
                        <button type="button" onclick="descargarExcelResultadosCargaMasiva()"
                        class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip"
                        data-placement="top" title="Descargar Excel">
                            <i class="material-icons icon-1x">arrow_downward</i>
                        </button>
                    </div>
                    `;

                    $("#TablaResultadosCargaMasiva_wrapper .dataTables_actions").append(divBotonesTabla);
                }
                else {
                    $("#divDescargaReportes").show();
                }
            }
            else {
                $("#TablaResultadosCargaMasiva_info, #TablaResultadosCargaMasiva_paginate, #TablaResultadosCargaMasiva_length, #divDescargaReportes").hide();
            }
        },
        ajax: {
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon?limit=10`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: () => {
                let info = getDatosFiltroVerificacionDatosCargaMasiva();
                return JSON.stringify(info);
            },
            dataSrc: (res) =>
            {
                let retorno = res.results.map((x, index) => 
                {
                    return {
                        nombre: x.name, descripcion: x.name
                    };
                });

                return retorno;
            },
            beforeSend: () => {
                showLoading();
            },
            error: () => {
                toastr.error("Se encontró un error al obtener la información de la grilla");
                hideLoading();
            }
        },
        columns: [
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true }
        ]
    })
    .on("draw", () => 
    {
        hideLoading();
    });

    // Botón filtrar al lado superior izquierdo de la grilla
    var tableCustomButtons = `
    <div class="dataTables_custom-buttons">
        <button type="button" class="btn btn-rounded btn-default waves-effect" onclick="abrirModalFiltrarTabla()" >
            <span class="d-flex align-items-center">
                <span class="material-icons mr-2">filter_list</span>
                <span>Filtros</span>
            </span>
        </button>
    </div>`;

    $('#TablaResultadosCargaMasiva_wrapper .top').append(tableCustomButtons);
}

function descargarExcelResultadosCargaMasiva() {
    alert("Descargar Excel Resultados Carga Masiva");
}

function construirTablaResultadosRepoCargaMasiva()
{
    let oTable = $("#TablaResultadosRepoCargaMasiva").DataTable({
        destroy: true,  // ESTO ES MUY IMPORTANTE, YA QUE NO SE PUEDE CREAR UNA TABLA QUE YA EXISTE
        pageLength: 10,
        //dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
        dom: '<"top top-grey justify-content-end"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
        scrollY: "60vh",
        //scrollX: true,  // Si la tabla tiene poco tamaño hacia el lado, esto hace que se vea pequeña
        //lengthMenu: [[10, 20, 30], [10, 20, 30]],
        bLengthChange: false, // Oculta el select de registros por página
        columnDefs: [
            { "width": "260px", "targets": 4 }  // Ancho de la columna acciones
        ],
        aaSorting: [],
        processing: true,
        //serverSide: true,    // Esto es en caso de usar paginación backend
        filter: true,
        orderMulti: false,
        responsive: true,
        fnDrawCallback: () =>
        {
            let recordsTotal = $("#TablaResultadosRepoCargaMasiva").DataTable().page.info().recordsDisplay      // Al usar paginación front
            // let recordsTotal = this.fnSettings().fnRecordsTotal();                           // Al usar paginación backend

            if (recordsTotal > 0)
            {
                $("#TablaResultadosRepoCargaMasiva_filter").show();            // Muestra search box
                $("#table-search").attr("maxlength", "20");    // Search box maxlength

                $("#TablaResultadosRepoCargaMasiva_info, #TablaResultadosRepoCargaMasiva_paginate, #TablaResultadosRepoCargaMasiva_length, #divDescargaReportes_RepoCargaMasiva").show();

                if (!$("#divDescargaReportes_RepoCargaMasiva").length)   // Si no existe, lo crea
                {
                    let divBotonesTabla = `
                    <div id="divDescargaReportes_RepoCargaMasiva" class="dataTables_actions-buttons">
                        <button type="button" onclick="descargarExcelRepoCargaMasiva()"
                        class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip"
                        data-placement="top" title="Descargar Excel">
                            <i class="material-icons icon-1x">arrow_downward</i>
                        </button>
                    </div>
                    `;

                    $("#TablaResultadosRepoCargaMasiva_wrapper .dataTables_actions").append(divBotonesTabla);
                }
                else {
                    $("#divDescargaReportes_RepoCargaMasiva").show();
                }
            }
            else {
                $("#TablaResultadosRepoCargaMasiva_info, #TablaResultadosRepoCargaMasiva_paginate, #TablaResultadosRepoCargaMasiva_length, #divDescargaReportes_RepoCargaMasiva").hide();
            }
        },
        ajax: {
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon?limit=10`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: () => {
                // let info = getDatosFiltros();
                let info = {};                      // Probando

                return JSON.stringify(info);
            },
            dataSrc: (res) =>
            {
                let retorno = res.results.map((x, index) => 
                {
                    let e = (index % 2 == 0) ? 
                    "Aprobado" : (index % 3 == 0) ?
                        "Aprobación Pendiente" : "Eliminado";

                    return {
                        codigo: index, nombre: x.name, descripcion: x.name, estado: e
                    };
                });

                return retorno;
            },
            beforeSend: () => {
                showLoading();
            },
            error: () => {
                toastr.error("Se encontró un error al obtener la información de la grilla");
                hideLoading();
            }
        },
        columns: [
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            { "data": "nombre", "name": "nombre", "autoWidth": true },
            {
                "data": "estado", "name": "estado", "className": "text-nowrap", "autoWidth": true, "searchable": false, "sortable": false, "render": (data, type, row, meta) => 
                {
                    if (row.estado == "Aprobado") {
                        return `<span class="success-text">${row.estado}</span>`;
                    }
                    if (row.estado == "Aprobación Pendiente") {
                        return `<span class="warning-text">${row.estado}</span>`;
                    }
                    if (row.estado == "Eliminado") {
                        return `<span class="danger-text">${row.estado}</span>`;
                    }
                }  
            },
            {
                "data": "codigo", "name": "codigo", "className": "text-nowrap", "autoWidth": true, "searchable": false, "sortable": false, "render": (data, type, row, meta) => 
                {
                    let cadena = "";

                    if (row.estado == "Aprobado" || row.estado == "Eliminado")  
                    {
                        return `
                        <a href="javascript:;" onclick="abrirModalDetalleCarga('${row.codigo}')" 
                        class="mr-0 mr-md-4 d-flex align-items-center float-left">
                            <i class="material-icons mr-1 icon-lg grey-text">visibility</i>
                            <span class="d-none d-md-inline">Ver Detalle</span>
                        </a>
                        `;
                    }
                    if (row.estado == "Aprobación Pendiente")  
                    {
                        return `
                        <a href="javascript:;" onclick="abrirModalAprobarCarga('${row.codigo}')" 
                        class="mr-0 mr-md-4 d-flex align-items-center float-left">
                            <i class="material-icons mr-1 icon-lg grey-text">done</i>
                            <span class="d-none d-md-inline">Aprobar Carga</span>
                        </a>

                        <a href="javascript:;" onclick="abrirModalEliminarCarga('${row.codigo}')" 
                        class="mr-0 mr-md-4 d-flex align-items-center float-left">
                            <i class="material-icons mr-1 icon-lg grey-text">delete</i>
                            <span class="d-none d-md-inline">Eliminar Carga</span>
                        </a>
                        `;
                    }

                    return cadena;
                }
            }
        ]
    })
    .on("draw", () => 
    {
        hideLoading();   // Al finalizar el renderizado de la tabla, oculta loading spinner

        // document.querySelector("#seccionGrilla").style.display = "block";
        // document.querySelector("#seccionInsertar").style.display = "none";
        // limpiarFormulario("#formFiltrar");

        //setTimeout(() => {
        //    $("#TablaResultadosRepoCargaMasiva").css("width", "100%");
        //}, 200);
    });
}

function descargarExcelRepoCargaMasiva() {
    alert("Descargar Excel Repo Carga Masiva");
}

function filtrarVerificacionDatosCargaMasiva() 
{
    filtroAplicado = getDatosFiltroVerificacionDatosCargaMasiva();
    console.log(filtroAplicado);

    showLoading();

    setTimeout(() => {
        hideLoading();
    }, 1000);
}

//=====================================================================================================================>>>>>
//=====================================================================================================================>>>>>

//#region Funciones Generales

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

function quitarSeleccionCombobox(querySelector) {
    $(querySelector).find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
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

//#endregion Funciones Generales