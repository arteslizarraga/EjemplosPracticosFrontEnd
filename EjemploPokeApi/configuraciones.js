
this.objeto = {};  

let filtroAplicado = {};

// Activar selects
$(".chosen-select").chosen({ disable_search_threshold: 10, no_results_text: "Sin Resultados para: ", width: "100%" });
$(".mdb-select").material_select();

$("#formCrear [name='fechaEfectiva']").datepicker({ language: "es", autoClose: true });
$("#formFiltrar [name='fechaEfectiva']").datepicker({ language: "es", autoClose: true });
$("#formEditar [name='fechaEfectiva']").datepicker({ language: "es", autoClose: true });

$("#formCambiarEstado [name='estado']").on("change", () =>  // Al seleccionar un option en em modal para cambiar estado
{   
    if ($("#formCambiarEstado [name='estado']").val() != this.objeto.estado)
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

    if (!validarNuloVacio(filtroAplicado.cantidad))
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
        //serverSide: true, 
        filter: true,
        orderMulti: false,
        responsive: true,
        fnDrawCallback: () =>
        {
            let recordsTotal = $("#TablaPrincipal").DataTable().page.info().recordsDisplay      // Al usar paginacion front

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
            {
                "data": "descripcion", "name": "descripcion", "className": "text-nowrap", "autoWidth": true, "render": (data, type, row, meta) => {
                    let descripcion = row.descripcion;
                    if (descripcion.length > 70) return descripcion.slice(0, 70) + " ...";
                    return descripcion;
                }
            },
            { "data": "fechaEfectiva", "name": "fechaEfectiva", "className": "text-nowrap", "autoWidth": true },
            {
                "data": "codigo", "name": "codigo", "className": "text-nowrap", "autoWidth": true, "searchable": false, "sortable": false, "render": (data, type, row, meta) => {
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

function validar()
{
    let errores = [];

    if (!validarNuloVacio(this.objeto.nombre))
        errores.push("El nombre es requerido");

    if (!validarNuloVacio(this.objeto.fechaEfectiva))
        errores.push("La fecha efectiva es requerida")

    if (!validarNuloVacio(this.objeto.descripcion))
        errores.push("La descripción es requerida");

    errores.reverse().forEach(error => toastr.error(error));

    return (errores.length == 0);
}

function agregarNuevo()
{
    $("#formCrear").serializeArray().forEach(c => this.objeto[c.name] = c.value);

    if (!validar()) return;

    showLoading();

    setTimeout(() => 
    {
        toastr.success(`Se ha insertado con exito`);
        limpiarFormulario("#formCrear");
        this.objeto = {};     
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
    this.objeto = {};  // Limpia el objeto

    obtener(ncorr).then(o =>
    {
        this.objeto = {
            ncorr: ncorr,
            nombre: o.nombre,
            fechaEfectiva: (validarNuloVacio(o.fechaEfectiva)) ? o.fechaEfectiva.substring(0, 10).replaceAll("-", "/") : "",
            descripcion: o.descripcion,
            estado: o.estado
        };

        $("#formEditar [name='nombre']").val(this.objeto.nombre);
        $("#formEditar [name='descripcion']").val(this.objeto.descripcion);
        $("#formEditar [name='estado']").val(this.objeto.estado).trigger("chosen:updated");
        $("#formEditar [name='fechaEfectiva']").val(this.objeto.fechaEfectiva);

        $("#ModalEditar").modal("show");
    });
}

function actualizar()
{
    $("#formEditar").serializeArray().forEach(c => this.objeto[c.name] = c.value);  // Asigna al objeto los valores del formulario

    if (!validar()) return;

    showLoading();

    setTimeout(() => 
    {
        cerrarModal("#ModalEditar");
        toastr.success(`Actualizado correctamente`);
        this.objeto = {}; 
        limpiarFormulario("#formEditar");

        $('#TablaPrincipal').DataTable().ajax.reload();
    }, 500);
}

function abrirModalCambiarEstado(ncorr)
{
    obtener(ncorr).then(o =>
    {
        this.objeto = { ncorr: ncorr, estado: o.estado };

        $("#formCambiarEstado [name='estado']").val(this.objeto.estado).trigger("chosen:updated");
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
        this.objeto = {};                  
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

    let data = [
        ["Nombre", "Estado", "Descripción", "Fecha Efectiva"]
    ];

    Array.from($("#TablaPrincipal").DataTable().rows({ filter: "applied" }).data()).forEach(x =>
    {
        data.push([
            x.nombre,
            x.estado,
            x.descripcion,
            x.fechaEfectiva
        ]);
    });

    cerrarModal("#ModalDescargar");
    let nombreArchivo = formatearNombreArchivo("Probando_Excel");
    generarExcel(data, nombreArchivo);
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

    // console.log(`${dia}/${mes}/${anio} ${hora}:${minuto}:${segundo}`);

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