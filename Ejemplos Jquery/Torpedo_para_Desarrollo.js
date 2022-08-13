
// Obtener parametros backend a partir de un formulario

$("#formEditar").serializeArray().map(x => `string ${x.name}`).join(", ");   // string nombre, string apellido, string edad

//================================================================================================================================>>>>>
// Construir objeto {} a partir de un formulario

let data = {};
$("#formEditar").serializeArray().forEach(c => data[c.name] = c.value);
console.log(data); 

$("#formEditar").trigger("reset");  // Limpia el formulario

//================================================================================================================================>>>>>
// Construir objeto {} a partir de un formulario

let data = {
	nombre: $("#formEditar [name='nombre']").val(),
	apellido: $("#formEditar [name='apellido']").val()
};

//================================================================================================================================>>>>>
// Select  (Si 		class="mdb-select"  entonces no va a funcionar. Tiene que ser 	class="chosen-select"  )

/*
<div class="col-12 col-md-4">
	<div class="md-form">
		<select id="probandoSelect" class="chosen-select" required>
			<option value="" disabled selected>Seleccione</option>
			<option value="true">Si</option>
			<option value="false">No</option>
		</select>
		<label class="active">Probando</label>
	</div>
	 <div class="red-text"> <p>Probando mensaje error</p> </div> 
</div>
*/

// Seleccionar option 

$("#probandoSelect").val("true").trigger("chosen:updated"); 

$("#formEditar [name='activo']").val("A").trigger("chosen:updated");   // Así tambien se puede

// Desmarcar options seleccionados
$("#formEditar [name='activo']").find("option:first-child").prop("selected", true).trigger("chosen:updated");

// Quitar todos los options de un select, incluyendo los option - Seleccione -
$(`#formEditar [name="subSectorProductivoNcorr"]`).find("option").remove().end().trigger("chosen:updated"); 

// Desmarcar options seleccionados de todo un formulario

Array.from($("#formFiltrar").find("select")).forEach(x => {
    $(`#formFiltrar [name='${x.name}']`).find("option:first-child").prop("selected", true).trigger("chosen:updated");
});

//================================================================================================================================>>>>>
// Llenar formulario 

this.objeto = {"ccod":"DEF-PROSP-INDICADOR-1","defClaseIndicadoresNcorr":"1","defGrupoIndicadoresNcorr":"4","formato":"6","fechaEfectiva":"12/08/2022","nprelacion":"1","ndecimales":"1","unidad":"1","nlikert":"5","vlikert1":"1","vlikert2":"2","vlikert3":"3","vlikert4":"4","vlikert5":"5","ifuente":"Si","iperiodicidad":"Si","descripcion":"Ejemplo Descripción","observacion":"Ejemplo Observación"};

Object.entries(this.objeto).forEach(x => 
{
    //console.log(` ${x[0]} = ${x[1]} `);
	var nombre = x[0];
	var valor = x[1];
	var elemento = $(`#formCrear [name='${nombre}']`);
	console.log(elemento);
	
	if(elemento.is("select")) {
		console.log("Es un select");
		elemento.val(valor).trigger("chosen:updated");
	}
	else {
		console.log("No es un select");
		elemento.val(valor);
	}
	
	console.log("===========================>>>>>");
});