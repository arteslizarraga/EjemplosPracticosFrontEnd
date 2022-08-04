

let arregloJson = [ 
	{ 
		nombre: "Asignacion", 
		nombreTabla: "asignacion", 
		nombrePrimaryKeyTabla: "Id",
		atributos: [ 
			{nombre: "Id", nombreCampo: "id", esLlavePrimaria: true, tipoAtributo: "int", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Estudiante", nombreCampo: "estudiante_id", esLlavePrimaria: false, tipoAtributo: "Estudiante", clasePadre: "Estudiante", idTablaPadre: "Id"}, 
			{nombre: "Sala", nombreCampo: "sala_id", esLlavePrimaria: false, tipoAtributo: "Sala", clasePadre: "Sala", idTablaPadre: "Id"}, 
			{nombre: "ParteReunion", nombreCampo: "parte_reunion_id", esLlavePrimaria: false, tipoAtributo: "ParteReunion", clasePadre: "ParteReunion", idTablaPadre: "Id"}, 
			{nombre: "LeccionLibro", nombreCampo: "leccion_libro_id", esLlavePrimaria: false, tipoAtributo: "LeccionLibro", clasePadre: "LeccionLibro", idTablaPadre: "Id"}, 
			{nombre: "ProgramaSemanal", nombreCampo: "programa_semanal_id", esLlavePrimaria: false, tipoAtributo: "ProgramaSemanal", clasePadre: "ProgramaSemanal", idTablaPadre: "Id"}, 
			{nombre: "Encargado", nombreCampo: "encargado", esLlavePrimaria: false, tipoAtributo: "bool", clasePadre: null, idTablaPadre: ""} 
		]
	}, 
	{ 
		nombre: "Estudiante", 
		nombreTabla: "estudiante", 
		nombrePrimaryKeyTabla: "Id", 
		atributos: [ 
			{nombre: "Id", nombreCampo: "id", esLlavePrimaria: true, tipoAtributo: "int", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "NombreCompleto", nombreCampo: "nombre_completo", esLlavePrimaria: false, tipoAtributo: "string", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Sexo", nombreCampo: "sexo", esLlavePrimaria: false, tipoAtributo: "string", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Habilitado", nombreCampo: "habilitado", esLlavePrimaria: false, tipoAtributo: "bool", clasePadre: null, idTablaPadre: ""} 
		]
	}, 
	{ 
		nombre: "LeccionLibro", 
		nombreTabla: "leccion_libro", 
		nombrePrimaryKeyTabla: "Id",
		atributos: [ 
			{nombre: "Id", nombreCampo: "id", esLlavePrimaria: true, tipoAtributo: "int", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "NumeroLeccion", nombreCampo: "numero_leccion", esLlavePrimaria: false, tipoAtributo: "int", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Nombre", nombreCampo: "nombre", esLlavePrimaria: false, tipoAtributo: "string", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Libro", nombreCampo: "libro_id", esLlavePrimaria: false, tipoAtributo: "Libro", clasePadre: "Libro", idTablaPadre: "Id"} 
		]
	}, 
	{ 
		nombre: "Libro", 
		nombreTabla: "libro", 
		nombrePrimaryKeyTabla: "Id",
		atributos: [ 
			{nombre: "Id", nombreCampo: "id", esLlavePrimaria: true, tipoAtributo: "int", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Nombre", nombreCampo: "nombre", esLlavePrimaria: false, tipoAtributo: "string", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Sigla", nombreCampo: "sigla", esLlavePrimaria: false, tipoAtributo: "string", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Activo", nombreCampo: "activo", esLlavePrimaria: false, tipoAtributo: "bool", clasePadre: null, idTablaPadre: ""} 
		]
	}, 
	{ 
		nombre: "Log", 
		nombreTabla: "log", 
		nombrePrimaryKeyTabla: "",
		atributos: [ 
			{nombre: "Correlativo", nombreCampo: "correlativo", esLlavePrimaria: false, tipoAtributo: "int", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "NombreTabla", nombreCampo: "nombre_tabla", esLlavePrimaria: false, tipoAtributo: "string", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Operacion", nombreCampo: "operacion", esLlavePrimaria: false, tipoAtributo: "string", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Descripcion", nombreCampo: "descripcion", esLlavePrimaria: false, tipoAtributo: "string", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "EsError", nombreCampo: "es_error", esLlavePrimaria: false, tipoAtributo: "bool", clasePadre: null, idTablaPadre: ""} 
		]
	}, 
	{ 
		nombre: "ParteReunion", 
		nombreTabla: "parte_reunion", 
		nombrePrimaryKeyTabla: "Id",
		atributos: [ 
			{nombre: "Id", nombreCampo: "id", esLlavePrimaria: true, tipoAtributo: "int", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Nombre", nombreCampo: "nombre", esLlavePrimaria: false, tipoAtributo: "string", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "NumeroOrden", nombreCampo: "numero_orden", esLlavePrimaria: false, tipoAtributo: "int", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Activo", nombreCampo: "activo", esLlavePrimaria: false, tipoAtributo: "bool", clasePadre: null, idTablaPadre: ""} 
		] 
	}, 
	{ 
		nombre: "ProgramaSemanal", 
		nombreTabla: "programa_semanal", 
		nombrePrimaryKeyTabla: "Id",
		atributos: [ 
			{nombre: "Id", nombreCampo: "id", esLlavePrimaria: true, tipoAtributo: "int", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "FechaInicio", nombreCampo: "fecha_inicio", esLlavePrimaria: false, tipoAtributo: "DateTime", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "FechaTermino", nombreCampo: "fecha_termino", esLlavePrimaria: false, tipoAtributo: "DateTime", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Descripcion", nombreCampo: "descripcion", esLlavePrimaria: false, tipoAtributo: "string", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Completo", nombreCampo: "completo", esLlavePrimaria: false, tipoAtributo: "bool", clasePadre: null, idTablaPadre: ""} 
		]
	}, 
	{ 
		nombre: "Sala", 
		nombreTabla: "sala", 
		nombrePrimaryKeyTabla: "Id",
		atributos: [ 
			{nombre: "Id", nombreCampo: "id", esLlavePrimaria: true, tipoAtributo: "int", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Nombre", nombreCampo: "nombre", esLlavePrimaria: false, tipoAtributo: "string", clasePadre: null, idTablaPadre: ""}, 
			{nombre: "Activo", nombreCampo: "activo", esLlavePrimaria: false, tipoAtributo: "bool", clasePadre: null, idTablaPadre: ""} 
		]
	} 
]; 


let paginaActual = 0; 
let registrosPorPagina = 2; 
let totalPaginas = 0; 

const resetearPaginacion = () => 
{ 
	paginaActual = 0; 
	totalPaginas = 0; 
} 

const generarTabla = (evento = null) => 
{ 
	let arregloFiltrado = arregloJson.filter(c => // Aplica criterios de busqueda 
	( 
		c.nombre.toLowerCase().includes((evento != null ? 
			document.querySelector("#filtro-busqueda [nombre='nombreEntidad']").value : 
			c.nombre).toLowerCase()) 
	)); 

	totalPaginas = Math.ceil( arregloFiltrado.length / registrosPorPagina ) - 1; 

	arregloFiltrado = arregloFiltrado.filter((c, index) => {  // Aplica paginacion 
		return (index >= paginaActual * registrosPorPagina && index < (paginaActual + 1) * registrosPorPagina) 
	}); 

	//====================================================>>>>>

	let navPaginacion = `
	${totalPaginas > 0 ? ` 
		<button onclick="paginaActual --; generarTabla(event)" type="button" 
		${paginaActual == 0 ? "disabled" : ""}> < Anterior </button> 

		<button onclick="paginaActual ++; generarTabla(event)" type="button" 
		${paginaActual >= totalPaginas ? "disabled" : ""}> Siguiente > </button> 
	` : ""} 
	`;

	document.querySelector("#navPaginacion").innerHTML = navPaginacion; 

	//====================================================>>>>>

	let tabla = ` 
	<table border="3" width="100%"> 
		<thead> 
			<tr style="background-color: #3c2929; color: #e3dada; font-weight: bold;"> 
				<th colspan="2"> Entidad </th> 
				<th colspan="5"> Atributos </th> 
			</tr> 
			<tr style="background-color: #b39393;"> 
				<th> Nombre </th> <th> Tabla </th> 
				<th> Nombre </th> 
				<th> Campo </th> 
				<th> Tipo </th> 
				<th> Es llave primaria </th> 
				<th> Clase padre </th> 
			</tr> 
		</thead> 
		<tbody> 

			${arregloFiltrado.map((entidad, index) => 
			{ 
				let cont = 1; 
				let cantidadAtributos = entidad.atributos.length; 

				return ` 
					${entidad.atributos.map(atributo => 
					{ 
						return `<tr style="background-color: ${index % 2 == 0 ? "#eee4e4;" : "#dbc4c2;"}"> 

							${cont ++ == 1 ? ` 
								<td rowspan="${cantidadAtributos}"> ${entidad.nombre} </td> 
								<td rowspan="${cantidadAtributos}"> ${entidad.nombreTabla} </td> 
							` : ""} 
							<td> ${atributo.nombre} </td> 
							<td> ${atributo.nombreCampo} </td> 
							<td> ${atributo.tipoAtributo} </td> 
							<td> ${atributo.esLlavePrimaria ? "si" : ""} </td> 
							<td> ${atributo.clasePadre != null ? atributo.clasePadre : ""} </td> 
						</tr> 
						` 
					}).join("")} 
				` 
			}).join("")} 

		</tbody> 
	</table>`; 

	document.querySelector("#TablaPrincipal").innerHTML = tabla; 
} 

generarTabla(); 


