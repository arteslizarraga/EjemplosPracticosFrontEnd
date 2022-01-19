let minRegistrosPorPagina = 5;

let table = $("#TablaReporteAdm").DataTable({
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
        let cantidadFilasTabla = $('#TablaReporteAdm').DataTable().page.info().recordsDisplay       // Al usar paginacion front
        //let cantidadFilasTabla = this.fnSettings().fnRecordsTotal();                              // Al usar ajax
        //console.log("cantidadFilasTabla:", cantidadFilasTabla);

        if (this.fnSettings().fnRecordsTotal())     // Si la tabla tiene información inicial en el tbody
            $("#TablaReporteAdm_filter").show();    // Muestra el searchbox
        else 
            $("#TablaReporteAdm_filter").hide();

        if (cantidadFilasTabla > 0) 
        {
            $("#TablaReporteAdm_filter").show();            // Muestra search box
            $("#table-search").attr("maxlength", "20");     // Search box maxlength

            if (cantidadFilasTabla > minRegistrosPorPagina) {   // Si la tabla tiene más de una pagina de informacion, Muestra/Oculta la paginacion 
                $("#TablaReporteAdm_info, #TablaReporteAdm_paginate, #TablaReporteAdm_length").show();
            }
            else {
                $("#TablaReporteAdm_info, #TablaReporteAdm_paginate, #TablaReporteAdm_length").hide();
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

                $('#TablaReporteAdm_wrapper .dataTables_actions').append(tableActionsButtonsReporteAdm);
            }
            else {
                $("#btnDescargarExcel").show();
            }
        }
        else {
            $("#TablaReporteAdm_info, #TablaReporteAdm_paginate, #TablaReporteAdm_length, #btnDescargarExcel").hide();
        }
    }
});



// Boton filtrar de la tabla
var tableCustomButtonsReporteAdm =
    '<div class="dataTables_custom-buttons">' +
    '<button type="button" class="btn btn-rounded btn-default waves-effect" data-toggle="modal" data-target="#ModalFiltrarTablaReporteAdm">' +
    '<span class="d-flex align-items-center">' +
    '<span class="material-icons mr-2">' +
    'filter_list' +
    '</span>' +
    '<span>Filtros</span>' +
    '</span>' +
    '</button>' +
    '</div>'
    ;

$('#TablaReporteAdm_wrapper .top').append(tableCustomButtonsReporteAdm);



/*
setTimeout(() => { 
    $("#TablaReporteAdm").DataTable().columns.adjust();
}, 1);
*/


