
let filtroAplicado = {};


function mostrarGrilla()
{
    filtroAplicado.cantidad = 30;

    let oTable = $("#TablaPrincipal").DataTable({
        pageLength: 10,
        dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
        scrollY: "60vh",
        //"scrollX": true,  // Si la tabla tiene poco tamaño hacia el lado, esto hace que se vea pequeña
        //lengthMenu: [[10, 20, 30], [10, 20, 30]],
        bLengthChange: false, // Oculta el select de registros por página
        columnDefs: [
            { "width": "32px", "targets": 0 },
            { "width": "140px", "targets": 6 }  // Ancho de la columna acciones
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

                        <button type="button" onclick=""
                        class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip"
                        data-placement="top" title="Descargar Excel">
                            <i class="material-icons icon-1x">arrow_downward</i>
                        </button>

                        <button type="button" class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light"
                        data-toggle="tooltip" data-placement="top" title="Configurar" onclick="abrirModalMostrarOcultarColumnas()">
                            <i class="material-icons icon-1x">settings</i>
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
                //let info = getDatosFiltros();
                let info = {};
                return JSON.stringify(info);
            },
            dataSrc: (res) =>
            {
                let retorno = res.results.map((x, index) => 
                {
                    let idRegistro = x.url.split("/").reverse()[1];
                    let activo = (x.name.includes("o")) ? "Activo" : "Inactivo";  // Si tiene la letra o es activo

                    let descripcion = (idRegistro == 3) ?
                        `${x.name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.` :
                        x.name;

                    return {
                        codigo: idRegistro,
                        nombre: x.name,
                        descripcion: descripcion,
                        estado: activo,
                        fechaEfectiva: "14-09-2022"
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
            {
                "data": "codigo", "name": "codigo", "searchable": false, "sortable": false, "render": (data, type, row, meta) =>
                {
                    if (row.codigo == 1) 
                        return `<i data-toggle="tooltip" data-placement="left" title="En Borrador" class="material-icons icon-lg info-estado-grilla en-borrador">info</i>`;
                  
                    else if (row.codigo == 2) 
                        return `<i data-toggle="tooltip" data-placement="left" title="Observado" class="material-icons icon-lg info-estado-grilla observado">info</i>`;

                    else if (row.codigo == 3) 
                      return `<i data-toggle="tooltip" data-placement="left" title="Pendiente" class="material-icons icon-lg info-estado-grilla pendiente">info</i>`;
                    
                    else if (row.codigo == 4) 
                      return `<i data-toggle="tooltip" data-placement="left" title="Rechazado" class="material-icons icon-lg info-estado-grilla rechazado">info</i>`;
                    
                    else
                      return `<i data-toggle="tooltip" data-placement="left" title="Aprobado" class="material-icons icon-lg info-estado-grilla aprobado">info</i>`;
                }
            },
            { "data": "codigo", "name": "codigo" },
            { "data": "nombre", "name": "nombre" },
            {
                "data": "descripcion", "name": "descripcion", "className": "text-nowrap", "render": (data, type, row, meta) => {
                    let descripcion = row.descripcion;
                    if (descripcion.length > 50) return descripcion.slice(0, 50) + " ...";
                    return descripcion;
                }
            },
            { "data": "fechaEfectiva", "name": "fechaEfectiva", "className": "text-nowrap" },
            { "data": "estado", "name": "estado" },
            {
                "data": "codigo", "name": "codigo", "className": "text-nowrap", "searchable": false, "sortable": false, "render": (data, type, row, meta) => 
                {
                    let cadena = "";

                    if (row.estado.toUpperCase().startsWith("A"))  // Activo
                    {
                        cadena += `
                        <a href="javascript:;" class="mr-0 mr-md-4 d-flex align-items-center float-left">
                            <i class="material-icons mr-1 icon-lg grey-text">edit</i>
                            <span class="d-none d-md-inline">Modificar</span>
                        </a>
                        `;
                    }

                    cadena += `
                    <a href="javascript:;" class="mr-0 mr-md-4 d-flex align-items-center float-left">
                        <i class="material-icons mr-1 icon-lg grey-text">visibility</i>
                        <span class="d-none d-md-inline">Ver detalle </span>
                    </a>

                    <a href="javascript:;" class="mr-0 mr-md-4 d-flex align-items-center float-left">
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
    });

    desplegarCheckboxMostrarOcultarColumnas();
}

mostrarGrilla(); 

function desplegarCheckboxMostrarOcultarColumnas()
{
    let cadena = Array.from($("#TablaPrincipal").DataTable().columns().header()).map((x, index) =>
    {
	    if (!x.getAttribute("class").includes("no-ocultar"))
	    {
		    return `
		    <fieldset class="form-check">
			    <input class="form-check-input" type="checkbox" id="checkbox_show_hide_${index}" checked="checked">
			    <label onclick="mostrarOcultarColumna(${index})" class="form-check-label" for="checkbox_show_hide_${index}">${x.textContent}</label>
		    </fieldset>
		    `;
	    }
    }).join("");

    document.querySelector("#divMostrarOcultarColumnas").innerHTML = cadena;
}

function mostrarOcultarColumna(numeroColumna)
{
    let column = $("#TablaPrincipal").DataTable().column(numeroColumna);    // Obtener columna
    column.visible(!column.visible());                                      // Administrar visibilidad columna
}

function abrirModalMostrarOcultarColumnas() {
    $("#ModalMostrarOcultarColumnas").modal("show");
}

function showLoading() {
    $('#loadingOverlay').show();
}

function hideLoading() {
    $('#loadingOverlay').hide();
}
