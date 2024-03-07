
let arregloColumnasOcultas = [];

function mostrarGrilla()
{
    let minRegistrosPorPagina = 10;

    let oTable = $("#TablaPrincipal").DataTable({

      // Input de búsqueda y botones de descarga y configurar
      // dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',  // Alineado a la izquierda
      dom: '<"top top-grey justify-content-end"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
        
      scrollY: "60vh",
      scrollX: true,
      lengthMenu: [[minRegistrosPorPagina, 20, 30, 40, 50], [minRegistrosPorPagina, 20, 30, 40, 50]],
      // lengthMenu: [[minRegistrosPorPagina, 10, 15, -1], [minRegistrosPorPagina, 10, 15, "Todas"]],
      bAutoWidth: false,
      aoColumnDefs: [
        { "bSortable": false, "aTargets": [ 0 ] },  // Remueve el sorting
        //{ "sWidth": "1%", "aTargets": [0] }
      ],
      processing: true,             // for show progress bar
      serverSide: true,             // for process server side
      filter: true,                 // this is for disable filter (search box)
      orderMulti: false,            // for disable multiple column at once
      fnDrawCallback: function () 
      {
        let recordsTotal = $('#TablaPrincipal').DataTable().data().length;
        //let recordsTotal = this.fnSettings().fnRecordsTotal();  // Al usar paginación backend
        //console.log("recordsTotal:", recordsTotal);

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

                    <button type="button" onclick="" 
                    class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" 
                    data-toggle="tooltip" data-placement="top" title="Descargar PDF" data-original-title="Descargar PDF">
                        <i class="material-icons icon-1x">picture_as_pdf</i>
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

        /*
        if (recordsTotal > 0) 
        {
          $("#TablaPrincipal_filter").show();            // Muestra search box
          $("#table-search").attr("maxlength", "20");     // Search box maxlength

          if (recordsTotal > minRegistrosPorPagina)  // Si la tabla tiene más de una pagina de informacion, Muestra/Oculta la paginacion 
          {   
            $("#TablaPrincipal_info, #TablaPrincipal_paginate, #TablaPrincipal_length").show();

            if (this.api().page.info().length == minRegistrosPorPagina)  // Si es la primera pagina cargada, remueve las paginas del select y coloca las que corresponden
            {
              $('.datatable-entries-select option').remove().end();   
              let paginasValores = this.fnSettings().aLengthMenu[0];    // [5, 10, 15, -1]
              let paginasTextos = this.fnSettings().aLengthMenu[1];     // [5, 10, 15, "Todas"]     

              paginasValores.filter(c => c <= recordsTotal)
                .forEach((c, index) => $('.datatable-entries-select').append(`<option value="${c}">${paginasTextos[index]}</option>`));
            }
          }
          else {
            $("#TablaPrincipal_info, #TablaPrincipal_paginate, #TablaPrincipal_length").hide();
          }

          if (!$("#divDescargaReportes").length)   // Si no existe, lo crea
          {
            let divBotonesTabla =
            '<div id="divDescargaReportes" class="dataTables_actions-buttons">' +
              '<button type="button" ' +
              'onclick="window.fn.zone.run(() => { window.fn.descargarExcel(); })" ' +
              'class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="Descargar Excel">' +
              '<i class="material-icons icon-1x">arrow_downward</i>' +
              '</button>' +
            '</div >'
            ;

            $("#TablaPrincipal_wrapper .dataTables_actions").append(divBotonesTabla);
          }
          else {
            $("#divDescargaReportes").show();
          }
        }
        else 
        {
          if ($("#table-search").val() != "")     // Si se estaba buscando en el search box y no se encontraron resultados
            $("#TablaPrincipal_filter").show();
          else 
            $("#TablaPrincipal_filter").hide();

          $("#TablaPrincipal_info, #TablaPrincipal_paginate, #TablaPrincipal_length, #divDescargaReportes").hide();
        }
        */
      },
      "ajax": {
          url: `https://pokeapi.co/api/v2/pokemon`,
          // type: "post",
          type: "get",
          datatype: "json",
          beforeSend: () => {
            showLoading();
          },
          data: (d) => 
          {
            let parametros = { offset: d.start, limit: d.length, cualquiercosa: "Hola" }; 

            if (d.search.value != "")
                parametros.busqueda = d.search.value;

            let queryString = Object.entries(parametros).map(c=> c.join("=")).join("&");
            return queryString

            // console.log(d);
            // return JSON.stringify( d );
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

              return retorno;
          },
          /*
          success: function(res) 
          {
            let retorno = {
                draw: 1,
                recordsFiltered: res.count,
                recordsTotal: res.count,
                data: res.results.map((x, index) => 
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
                })
            };

            console.log(retorno);
            return retorno;
          },
          */
          error: () => {
            toastr.error("Se encontró un error al realizar la consulta");
            hideLoading();
          }
      },
      "columns": [
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
      ],
      "order": [[2, 'desc']]    // Ordena por codigo desc
    })
    .on("draw", () => 
    {
      hideLoading();   // Al finalizar el renderizado de la tabla, oculta loading spinner
      document.querySelector("#seccionGrilla").style.display = "block";

    //   setTimeout(() => {
    //     $("#TablaPrincipal").css("width", "100%");
    //   }, 200);
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
			    <input id="checkbox_show_hide_${index}" type="checkbox" class="form-check-input" checked="checked">
			    <label onclick="mostrarOcultarColumna(${index})" for="checkbox_show_hide_${index}" class="form-check-label">${x.textContent}</label>
		    </fieldset>
		    `;
	    }
    }).join("");

    document.querySelector("#divMostrarOcultarColumnas").innerHTML = cadena;
}

function mostrarOcultarColumna(numeroColumna)
{
    if ($(`#checkbox_show_hide_${numeroColumna}`).is(":checked")) 
    {
        arregloColumnasOcultas.push(numeroColumna);
        $("#checkbox_seleccionarTodo").prop("checked", false);
    }
    else 
    {
        arregloColumnasOcultas = arregloColumnasOcultas.filter(x => x != numeroColumna);

        if (arregloColumnasOcultas.length == 0)
            $("#checkbox_seleccionarTodo").prop("checked", true);
    }
}

function seleccionarTodoColumnasGrilla() 
{
    let seleccionarTodo = !$("#checkbox_seleccionarTodo").is(":checked");
    if (seleccionarTodo) arregloColumnasOcultas = [];
	
    Array.from($("#TablaPrincipal").DataTable().columns().header()).forEach((x, index) =>
    {
        if (!x.getAttribute("class").includes("no-ocultar")) 
        {
            $(`#checkbox_show_hide_${index}`).prop("checked", seleccionarTodo);    // Marcar/Desmarcar Checkbox
            if (!seleccionarTodo) arregloColumnasOcultas.push(index);
        }
    });
}

function aplicarCambiosColumnasGrilla() 
{
    let tabla = $("#TablaPrincipal").DataTable();
    let columnas = Array.from(tabla.columns().header());

    if (columnas.filter(x => !x.getAttribute("class").includes("no-ocultar")).length == arregloColumnasOcultas.length) {
        return toastr.error("Debe existir al menos una columna visible");
    }

    columnas.forEach((x, index) =>
    {
        let column = tabla.column(index);
        let estaOculta = arregloColumnasOcultas.includes(index); 
        column.visible(!estaOculta);
    });

    $("#ModalMostrarOcultarColumnas").modal("hide");
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
