
// Obtener parametros backend a partir de un formulario

$("#formEditar").serializeArray().map(x => `string ${x.name}`).join(", ");   // string nombre, string apellido, string edad

//================================================================================================================================>>>>>
// Construir objeto {} a partir de un formulario

let data = {};
$("#formEditar").serializeArray().forEach(c => data[c.name] = c.value);
console.log(data); 

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

//================================================================================================================================>>>>>