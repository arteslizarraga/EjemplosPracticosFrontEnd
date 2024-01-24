let estado = null;
let filtroAplicado = {};

// Activar selects
$(".chosen-select").chosen({ disable_search_threshold: 10, no_results_text: "Sin Resultados para: ", width: "100%" });
$(".mdb-select").material_select();

$("#formCrear [name='fechaEfectiva']").datepicker({ language: "es", autoClose: true });
$("#formFiltrar [name='fechaEfectiva']").datepicker({ language: "es", autoClose: true });
$("#formEditar [name='fechaEfectiva']").datepicker({ language: "es", autoClose: true });

$("#formCambiarEstado [name='estado']").on("change", () =>  // Al seleccionar un option en em modal para cambiar estado
{   
    if ($("#formCambiarEstado [name='estado']").val() != estado)
    {
        $("#btnCambiarEstado").removeAttr("disabled");                                       // Habilita botón
        $("#btnCambiarEstado").attr("class", "btn btn-default waves-effect waves-light");    // Oscurece botón
    }
    else {
        $("#btnCambiarEstado").attr("disabled", true);   // Deshabilita botón
        $("#btnCambiarEstado").attr("class", "btn");     // Aclara botón
    }

});

const refrescarPagina = () => window.location.reload();

const getDatosFiltros = () =>
{
    if (Object.entries(filtroAplicado).length == 0)  // Si no se ha aplicado el filtro
    {
        return {
            codigo: $("#formFiltrar [name='codigo']").val(),
            estado: $("#formFiltrar [name='estado']").val(),
            fechaEfectiva: $("#formFiltrar [name='fechaEfectiva']").val(),
            cantidad: $("#formFiltrar [name='entradas']").val()
        };
    }

    return filtroAplicado;  // Retorna el filtro aplicado
};

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


function mostrarGrilla()
{
    filtroAplicado = getDatosFiltros();

    if (filtroAplicado.cantidad == null || filtroAplicado.cantidad == "")
        return toastr.error("La cantidad de entradas a leer es requerida");

    limpiarFormulario("#formCrear");

    let oTable = $("#TablaPrincipal").DataTable({
        pageLength: 10,
        dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
        scrollY: "60vh",
        //"scrollX": true,  // Si la tabla tiene poco tamaño hacia el lado, esto hace que se vea pequeña
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
            let recordsTotal = $("#TablaPrincipal").DataTable().page.info().recordsDisplay      // Al usar paginación front
            // let recordsTotal = this.fnSettings().fnRecordsTotal();                           // Al usar paginación backend

            if (recordsTotal > 0)
            {
                $("#TablaPrincipal_filter").show();            // Muestra search box
                $("#table-search").attr("maxlength", "20");    // Search box maxlength

                $("#TablaPrincipal_info, #TablaPrincipal_paginate, #TablaPrincipal_length, #divDescargaReportes").show();

                if (!$("#divDescargaReportes").length)   // Si no existe, lo crea
                {
                    let divBotonesTabla = `
                            <div id="divDescargaReportes" class="dataTables_actions-buttons">
                                <button type="button" data-toggle="modal" data-target="#ModalDescargar"
                                class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip"
                                data-placement="top" title="Descargar Excel">
                                    <i class="material-icons icon-1x">arrow_downward</i>
                                </button>
                            </div>
                            `;

                    $("#TablaPrincipal_wrapper .dataTables_actions").append(divBotonesTabla);
                }
                else {
                    $("#divDescargaReportes").show();
                }
            }
            else {
                $("#TablaPrincipal_info, #TablaPrincipal_paginate, #TablaPrincipal_length, #divDescargaReportes").hide();
            }
        },
        ajax: {
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon?limit=${filtroAplicado.cantidad}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: () => {
                let info = getDatosFiltros();
                return JSON.stringify(info);
            },
            dataSrc: (res) =>
            {
                let retorno = res.results.map((x, index) => 
                {
                    let activo = (x.name.includes("o")) ? "Activo" : "Inactivo";  // Si tiene la letra o es activo

                    return {
                        codigo: index + 1,
                        nombre: x.name,
                        descripcion: x.name,
                        estado: activo,
                        fechaEfectiva: "25-7-2022"
                    };
                });

                retorno = retorno.filter(x => x.codigo > 0);

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
            { "data": "estado", "name": "estado", "autoWidth": true },
            { "data": "descripcion", "name": "descripcion", "autoWidth": true },
            { "data": "fechaEfectiva", "name": "fechaEfectiva", "className": "text-nowrap", "autoWidth": true },
            {
                "data": "codigo", "name": "codigo", "className": "text-nowrap", "autoWidth": true, "searchable": false, "sortable": false, "render": (data, type, row, meta) => 
                {
                    let cadena = "";

                    if (row.estado.toUpperCase().startsWith("A"))  // Activo
                    {
                        cadena += `
                                <a onclick="abrirModalEditar(${row.codigo})" class="mr-0 mr-md-4 d-flex align-items-center float-left">
                                    <i class="material-icons mr-1 icon-lg grey-text">edit</i>
                                    <span class="d-none d-md-inline">Modificar</span>
                                </a>
                                `;
                    }

                    cadena += `
                            <a onclick="abrirModalCambiarEstado(${row.codigo})" class="mr-0 mr-md-4 d-flex align-items-center float-left">
                                <i class="material-icons mr-1 icon-lg grey-text">assignment</i>
                                <span class="d-none d-md-inline">Cambiar Estado</span>
                            </a>
                            `;

                    return cadena;
                }
            }
        ]
    })
    .on("draw", () => 
    {
        hideLoading();   // Al finalizar el renderizado de la tabla, oculta loading spinner

        document.querySelector("#seccionGrilla").style.display = "block";
        document.querySelector("#seccionInsertar").style.display = "none";
        limpiarFormulario("#formFiltrar");

        //setTimeout(() => {
        //    $("#TablaPrincipal").css("width", "100%");
        //}, 200);
    });
}

function agregarNuevo()
{
    showLoading();

    setTimeout(() => 
    {
        toastr.success(`Se ha insertado con exito`);
        limpiarFormulario("#formCrear");
        hideLoading();
    }, 500);
};

function obtener(ncorr)
{
    return new Promise((resolve, reject) =>
    {
        $.ajax({
            method: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${ncorr}/`,
            data: JSON.stringify({ ncorr }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: () => {
                showLoading();
            },
            success: (x) =>
            {
                let activo = (x.name.includes("o")) ? "A" : "I";  // Si tiene la letra o es activo

                let retorno = {
                    codigo: ncorr,
                    nombre: x.name,
                    descripcion: x.name,
                    estado: activo,
                    fechaEfectiva: "25-7-2022"
                };

                resolve(retorno);  
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                toastr.error("Ocurrió un error obtener el sector productivo");
                reject(false);
            },
            complete: (res) => hideLoading()
        });
    });
}

function abrirModalEditar(ncorr)
{
    obtener(ncorr).then(o =>
    {
        let objeto = {
            ncorr: ncorr,
            nombre: o.nombre,
            fechaEfectiva: o.fechaEfectiva,
            descripcion: o.descripcion,
            estado: o.estado
        };

        $("#formEditar [name='nombre']").val(objeto.nombre);
        $("#formEditar [name='descripcion']").val(objeto.descripcion);
        $("#formEditar [name='estado']").val(objeto.estado).trigger("chosen:updated");
        $("#formEditar [name='fechaEfectiva']").val(objeto.fechaEfectiva);

        $("#ModalEditar").modal("show");
    });
}

function actualizar()
{
    showLoading();

    setTimeout(() => 
    {
        cerrarModal("#ModalEditar");
        toastr.success(`Actualizado correctamente`);
        limpiarFormulario("#formEditar");

        $('#TablaPrincipal').DataTable().ajax.reload();
    }, 500);
}

function abrirModalCambiarEstado(ncorr)
{
    obtener(ncorr).then(o =>
    {
        estado = o.estado;

        $("#formCambiarEstado [name='estado']").val(estado).trigger("chosen:updated");
        $("#ModalCambiarEstado").modal("show");

        $("#btnCambiarEstado").attr("disabled", true);   // Deshabilita botón
        $("#btnCambiarEstado").attr("class", "btn");     // Aclara color del botón
    });
}

function cambiarEstado()
{
    showLoading();

    setTimeout(() => 
    {                
        cerrarModal("#ModalCambiarEstado");
        toastr.success("El estado fue cambiado con exito");

        // hideLoading()  // Del hideLoading() se encarga la grilla

        $("#TablaPrincipal").DataTable().ajax.reload();
    }, 500);
}

function obtenerFiltros()
{
    if (document.querySelector("#collapseFiltrar").className.includes("show"))  // No consulta filtros si el item del acordeon está abierto
        return;

    $.ajax({
        method: "get",
        url: "https://pokeapi.co/api/v2/pokemon?limit=30",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: () => {
            showLoading();
            $("#formFiltrar").css("display", "none");
        },
        success: (res) =>
        {
            let cboSectoresProductivos = res.results.map(x => {
                return { codigo: x.url, descripcion: x.name };
            });

            llenarCombobox(`#formFiltrar [name="codigo"]`, cboSectoresProductivos);
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            toastr.error("Ocurrió un error al obtener los filtros de búsqueda");
            hideLoading();
        },
        complete: (res) => {
            hideLoading();
            $("#formFiltrar").css("display", "block");
        }
    });
}

function descargarExcel(evento)
{
    evento.preventDefault();
    showLoading();

    setTimeout(() => 
    {                
        toastr.success("El archivo fue descargado con exito");
        hideLoading()  // Del hideLoading() se encarga la grilla
        cerrarModal("#ModalDescargar");
    }, 500);
}

function llenarCombobox(querySelector, arreglo)  // El arreglo debe tener los elementos codigo y descripcion
{
    if (!Array.isArray(arreglo)) 
        return console.log("La función llenarCombobox debe recibir un arreglo");
    
    let select = $(querySelector);
    select.find("option[value!='']").remove().end();
    arreglo.forEach(x => select.append(`<option value="${x.codigo}">${x.descripcion}</option>`))
    select.trigger("chosen:updated");
}

function showLoading()
{
    $('#loadingOverlay').show();
}

function hideLoading()
{
    $('#loadingOverlay').hide();
}

function cerrarModal(querySelector)
{
    $(querySelector).modal("toggle");   // Cierra el modal
    $(".modal-backdrop").hide();        // Agregado para que el fondo del modal desaparezca
}