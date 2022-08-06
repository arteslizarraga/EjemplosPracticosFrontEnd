// file:///C:/Users/josel/Documents/Nodos/template-aplicaciones/html/components/pagination.html

// Activar selects
$(".chosen-select").chosen({ disable_search_threshold: 10, no_results_text: "Sin Resultados para: ", width: "100%" });
$(".mdb-select").material_select();

let datos = obtenerJson();

let arregloJson = datos.results.map(x => {
    return {nombre: x.name, nombreTabla: `${x.name}_ENT`}
});

let paginaActual = 0; 
let registrosPorPagina; 
let totalPaginas = 0; 

$("#filtro-busqueda [name='registrosPorPagina']").on("change", () => { resetearPaginacion(); generarTabla() });  // Al seleccionar la cantidad de registros por página

function resetearPaginacion()
{ 
	paginaActual = 0; 
	totalPaginas = 0; 
} 

function generarTabla() 
{ 
	registrosPorPagina = parseInt($("#filtro-busqueda [name='registrosPorPagina']").val());
	let valorTxt = document.querySelector("#filtro-busqueda [nombre='nombreEntidad']").value;

	let arregloFiltrado = arregloJson.filter(c => c.nombre.toLowerCase().includes(valorTxt.toLowerCase()));  // Aplica criterios de busqueda
	totalPaginas = Math.ceil( arregloFiltrado.length / registrosPorPagina ) - 1; 

	//====================================================>>>>>
	/*
	let navPaginacion = `
	${totalPaginas > 0 ? ` 
		<button onclick="paginaActual --; generarTabla()" type="button" 
		${paginaActual == 0 ? "disabled" : ""}> < Anterior </button> 

		<button onclick="paginaActual ++; generarTabla()" type="button" 
		${paginaActual >= totalPaginas ? "disabled" : ""}> Siguiente > </button> 
	` : ""} 
	`;

	document.querySelector("#navPaginacion").innerHTML = navPaginacion; 
	*/
	//====================================================>>>>>

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

	//====================================================>>>>>

	arregloFiltrado = arregloFiltrado.filter((c, index) => {  // Aplica paginacion 
		return (index >= paginaActual * registrosPorPagina && index < (paginaActual + 1) * registrosPorPagina) 
	}); 

	let tabla = ` 
	<table class="datatables table table-hover table-striped table-bordered m-0"> 
		<thead> 
			<tr> 
				<th> Nombre </th> 
				<th> Entidad </th> 
			</tr> 
		</thead> 
		<tbody> 

			${arregloFiltrado.map((entidad, index) => 
			{ 
				return ` 
				<tr> 
					<td> ${entidad.nombre} </td> 
					<td> ${entidad.nombreTabla} </td> 
				</tr> 
				` 
			}).join("")} 

		</tbody> 
	</table>`; 

	document.querySelector("#TablaPrincipal").innerHTML = tabla; 
} 

generarTabla(); 


