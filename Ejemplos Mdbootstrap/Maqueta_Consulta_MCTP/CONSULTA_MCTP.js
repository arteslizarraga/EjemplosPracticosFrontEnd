// Activar selects
$(".chosen-select").chosen({ disable_search_threshold: 10, no_results_text: "Sin Resultados para: ", width: "100%" });
$(".mdb-select").material_select();

let paginaActual = 0; 
let registrosPorPagina = 4; 
let totalPaginas = 0; 

$("body").tooltip({ selector: "[data-toggle=tooltip]", trigger: "hover" });  // Habilitar tooltips

let arregloRutas = [];
buscar();

function buscar()
{
    resetearPaginacion();
    arregloRutas = obtenerDatos_1();
    generarTabla();

    $("#sectionBuscar").hide();
    limpiarFormulario("#formFiltrar");
    $("#resultados").show();
}

function generarTabla()
{
    //==================================================>>>>
    // Aplicar Paginación

    let arregloFiltrado = arregloRutas;
    totalPaginas = Math.ceil( arregloFiltrado.length / registrosPorPagina ) - 1;

    desplegarPaginacionBootstrap({
		querySelector: "#numeros-paginacion", 
		paginaActual: paginaActual,
		totalRegistros: arregloFiltrado.length,		// res.objeto.recordsTotal,
		totalPaginas: totalPaginas,
		registrosPorPagina: registrosPorPagina,
		pasoAtras: () => { paginaActual --; generarTabla() },  
		pasoAdelante: () => { paginaActual ++; generarTabla() },
		seleccionarPagina: e => { 
			paginaActual = parseInt(e.target.getAttribute("numeroPagina"));
			generarTabla();
		}
	});

    arregloFiltrado = arregloFiltrado.filter((c, index) => {  // Aplica paginacion 
		return (index >= paginaActual * registrosPorPagina && index < (paginaActual + 1) * registrosPorPagina) 
	});

    //==================================================>>>>

    let cadena = "";

    arregloFiltrado.forEach(ruta => 
    {
        cadena += `<tr valign="top">`;
        // console.log(`nombreRuta: ${ruta.nombreRuta}`);

        cadena += `
        <td class="ruta p-2">
            <div class="card title h-100 align-items-center justify-content-center">
                ${ruta.nombreRuta}
            </div>
        </td>
        `;
    
        ruta.infoNiveles.forEach(infoNivel => 
        {
            cadena += `<td class="ruta p-2">`;
                cadena += `<div class="card-container d-flex flex-row flex-wrap justify-content-between">`;
                
                // console.log(`   numeroNivel: ${infoNivel.numeroNivel}`);
    
                infoNivel.elementos.forEach(x => 
                {
                    let clasesCssAsociacion = x.asociadoCon.map(x => `me-asocio-con-${x}`).join(" ");
    
                    //============================>>>
    
                    let textoDesplegado = x.texto;
                    let infoTooltip = "";
    
                    if (textoDesplegado.length > 20) {
                        textoDesplegado = `${textoDesplegado.slice(0, 20)} ...`;
                        infoTooltip = `data-toggle="tooltip" data-placement="top" title="${x.texto}"`;
                    }
    
                    let arregloString = (x.asociadoCon != null && x.asociadoCon.length > 0) ?
                        x.asociadoCon.join("|") : "";

                    // <div class="f-card m-1" style="max-width: 7em">

                    cadena += `
                    <div class="col-6 p-0">
                        <div class="f-card m-1">
                            <div class="card sm cards-ruta text-center ${clasesCssAsociacion}" id="${x.correlativo}"
                            asociado-con="${arregloString}"
                            onmouseenter="focalizarCard(this)"
                            onmouseleave="desFocalizarCard(this)"
                            onclick="clickCard(this)">
                                <p ${infoTooltip}>
                                    ${textoDesplegado}
                                </p>
                            </div>
                            <div class="d-flex p-2 justify-content-between section-action">

                                <button onclick="abrirModalPerfiles('${x.correlativo}')">
                                    <i class="material-icons icon-lg" data-toggle="tooltip" data-placement="top" title="Ver perfiles">person</i>
                                </button>

                                <button onclick="abrirModalDetalle('${x.correlativo}')">
                                    <i class="material-icons icon-lg blue-text" data-toggle="tooltip" data-placement="top" title="Ver detalle">visibility</i>
                                </button>

                            </div>
                        </div>
                    </div>

                    <!--
                    <div class="col-6 p-0">
                        <div class="card sm cards-ruta m-1 text-center ${clasesCssAsociacion}" id="${x.correlativo}">
                        <p ${infoTooltip}>${textoDesplegado}</p>
                        <div class="d-flex justify-content-between section-action">
                            <a><i class="material-icons icon-lg" data-toggle="tooltip" data-placement="top" title="Ver perfiles">person</i></a>
                            <a data-toggle="modal" data-target="#ModalDetalle"><i class="material-icons icon-lg blue-text" data-toggle="tooltip" data-placement="top" title="Ver detalle">visibility</i></a>
                        </div>
                        </div>
                    </div>
                    -->
                    `;
                });
    
                cadena += `</div>`;
            cadena += `</td>`;
        });
    
        cadena += `</tr>`;
    });
    
    document.querySelector("#table-tfl tbody").innerHTML = cadena;
}

function resetearPaginacion()
{
    paginaActual = 0;
    totalPaginas = 0;
}

function abrirModalPerfiles(idCualificacion) { alert("abrirModalPerfiles"); }

function abrirModalDetalle(idCualificacion) { alert("abrirModalDetalle"); }

function hacerNuevaBusqueda()
{
    $("#sectionBuscar").show();
    $("#resultados").hide();
}






