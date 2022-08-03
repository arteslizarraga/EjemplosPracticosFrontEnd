let minRegistrosPorPagina = 5;

let table = $("#TablaPrincipal").DataTable({
    "dom": '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
    "scrollY": "60vh",
    "scrollX": true,
    "lengthMenu": [[minRegistrosPorPagina, 10, 15, 20, -1], [minRegistrosPorPagina, 10, 15, 20, "Todas"]],
    "columnDefs": [
        { "orderable": false, "targets": 0 },
        { "width": "20px", "targets": 0 }
    ],
    "aaSorting": [],
    "fnDrawCallback": function () 
    {
        let cantidadFilasTabla = $('#TablaPrincipal').DataTable().page.info().recordsDisplay       // Al usar paginacion front
        //let cantidadFilasTabla = this.fnSettings().fnRecordsTotal();                              // Al usar ajax
        //console.log("cantidadFilasTabla:", cantidadFilasTabla);

        if (this.fnSettings().fnRecordsTotal())     // Si la tabla tiene información inicial en el tbody
            $("#TablaPrincipal_filter").show();    // Muestra el searchbox
        else 
            $("#TablaPrincipal_filter").hide();

        if (cantidadFilasTabla > 0) 
        {
            $("#TablaPrincipal_filter").show();            // Muestra search box
            $("#table-search").attr("maxlength", "20");     // Search box maxlength

            if (cantidadFilasTabla > minRegistrosPorPagina) {   // Si la tabla tiene más de una pagina de informacion, Muestra/Oculta la paginacion 
                $("#TablaPrincipal_info, #TablaPrincipal_paginate, #TablaPrincipal_length").show();
            }
            else {
                $("#TablaPrincipal_info, #TablaPrincipal_paginate, #TablaPrincipal_length").hide();
            }

            if (!$("#btnDescargarExcel").length)   // Si no existe, lo crea
            {
                var tableActionsButtonsReporteAdm =
                    '<div id="btnDescargarExcel" class="dataTables_actions-buttons">' +
                    '<button type="button" ' +
                    'onclick="alert(`Descargar Excel`)" ' +
                    'class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="Descargar Excel">' +
                    '<i class="material-icons icon-1x">arrow_downward</i>' +
                    '</button>' +
                    '</div >'
                    ;

                $('#TablaPrincipal_wrapper .dataTables_actions').append(tableActionsButtonsReporteAdm);
            }
            else {
                $("#btnDescargarExcel").show();
            }
        }
        else {
            $("#TablaPrincipal_info, #TablaPrincipal_paginate, #TablaPrincipal_length, #btnDescargarExcel").hide();
        }
    }
});



// Boton filtrar de la tabla
var tableCustomButtonsReporteAdm =
    '<div class="dataTables_custom-buttons">' +
    '<button type="button" class="btn btn-rounded btn-default waves-effect" data-toggle="modal" data-target="#ModalFiltrarTablaPrincipal">' +
    '<span class="d-flex align-items-center">' +
    '<span class="material-icons mr-2">' +
    'filter_list' +
    '</span>' +
    '<span>Filtros</span>' +
    '</span>' +
    '</button>' +
    '</div>'
    ;

$('#TablaPrincipal_wrapper .top').append(tableCustomButtonsReporteAdm);

//====================================================>>>>
// Mostrar / Ocultar Columnas

let cadena = "<ul>";

Array.from(table.columns().header()).forEach((x, index) => 
{
	if (!x.getAttribute("class").includes("no-ocultar")) 
    {
		//console.log(`En la posicion ${index} el nombre es ${x.textContent}`);
        cadena += `<li> <a class="show-hide-column" numero-columna="${index}">${x.textContent}</a> </li>`;
	}
});

cadena += "</ul>";
document.querySelector("#divMostrarOcultarColumnas").innerHTML = cadena;

$("a.show-hide-column").on("click", function (e) 
{
    e.preventDefault();

    let numeroColumna = e.target.getAttribute("numero-columna");
    let column = table.column(numeroColumna);   // Get the column 
    column.visible(!column.visible());          // Toggle the visibility
});

//====================================================>>>>

/*
setTimeout(() => { 
    $("#TablaPrincipal").DataTable().columns.adjust();
}, 1);
*/

function seleccionarTodo()
{
	let seleccionarTodo = $("#checkbox_seleccionarTodo").is(":checked");
	$("#TablaPrincipal tbody .form-check-input.table-check").prop("checked", !seleccionarTodo);  // true false

	// Funciona
	/*
	Array.from($("#TablaPrincipal tbody .form-check-input.table-check")).forEach(x => {
		//console.log(x);
		x.click();
	}); 
	*/	
}


