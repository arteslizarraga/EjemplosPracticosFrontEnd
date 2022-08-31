

$('#appBody').adjustFontSize();  //Incrementar Tamaño de Fuente   

// Activar selects
$(".chosen-select").chosen({ disable_search_threshold: 10, no_results_text: "Sin Resultados para: ", width: "100%" });
$(".mdb-select").material_select();

//=======================================================================================================================>>>>>>>

function showLoading() {
    $('#loadingOverlay').show();
}

function hideLoading() {
    $('#loadingOverlay').hide();
}

//=======================================================================================================================>>>>>>>