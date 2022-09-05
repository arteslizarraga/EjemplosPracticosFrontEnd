

let arreglo = [
    { codigo: "AAA1", nombre: "José", apellido: "Lopez", edad: 33 }, 
    { codigo: "AAA2", nombre: "Juana", apellido: "Henriquez", edad: 21 },
    { codigo: "AAA3", nombre: "Andres", apellido: "Andrade", edad: 28 }
];

let primeraPosicion = arreglo[0];

let propiedadesDesplegadas = [
    { nombre: "codigo", orden: 1 }, { nombre: "nombre", orden: 2 }, { nombre: "apellido", orden: 3 }, { nombre: "edad", orden: 4 }
];

/*
let propiedadesDesplegadas = Object.keys(primeraPosicion).map((x, index) => {
    return { nombre: x, orden: (index + 1) };
});
*/

function insertarNuevaColumna() 
{
    let inputNuevaColumna = document.querySelector("#formAgregarColumna [name='nombreColumna']");
    let nombreNuevaColumna = inputNuevaColumna.value;

    if (nombreNuevaColumna == "") return toastr.error("El nombre de la columna es requerido"); 

    let nuevoArreglo = arreglo.map(x => {
        return {...x, [nombreNuevaColumna]: ""};
    });

    arreglo = nuevoArreglo;

    propiedadesDesplegadas.push({ 
        nombre: nombreNuevaColumna, 
        orden: ((propiedadesDesplegadas.reduce((a, b) => (a.orden > b.orden) ? a : b).orden) + 1) 
    });

    toastr.success("Columna agregada con exito");
    desplegarTabla();
    desplegarFormulario();
    inputNuevaColumna.value = "";
    $("#modalAgregarColumna").modal("toggle");   // Cierra modal  
}

function eliminar(codigo) 
{
    arreglo = arreglo.filter(x => x.codigo != codigo);
    desplegarTabla();
}

function eliminarColumna(orden)
{
    let cont = 1;
    propiedadesDesplegadas = propiedadesDesplegadas.filter(x => x.orden != orden).sort((a, b) => a.orden - b.orden);

    propiedadesDesplegadas.forEach(x => {
        x.orden = cont;
        cont ++;
    });

    desplegarTabla();
    desplegarFormulario();
}

function obtenerPropiedadesDesplegadasEnOrden() {
    return propiedadesDesplegadas.sort((a, b) => a.orden - b.orden);
}

function desplegarTabla()
{
    /*
    <table class="table table-bordered table-striped">
        <thead style="background-color: lightgray;">
    */

    let cadena = `
    <table class="table table-bordered table-striped tabla-info">
        <thead>

            ${(propiedadesDesplegadas.length > 1) ? `
            <tr>
                <th style="width: 15px !important;"></th>

                ${obtenerPropiedadesDesplegadasEnOrden().map((c, index) => 
                {
                    let contenidoTH = "<th>";

                    if (index > 0) {
                        contenidoTH += "<button nombreAtributo='" + c.nombre + "' onclick='cambiarPosicionTablaIndex(this);' class='botonArriba'> &larr; </button>";
                    }    
                    if ((index + 1) < propiedadesDesplegadas.length) {
                        contenidoTH += "<button nombreAtributo='" + c.nombre + "' onclick='cambiarPosicionTablaIndex(this);' class='botonAbajo'> &rarr; </button>";
                    }

                    //contenidoTH += `&nbsp;&nbsp; ${c.orden}`;
                    contenidoTH += "</th>";

                    return contenidoTH;
                })
                .join("")}

                <th style="width: 140px !important;"></th>
            </tr>   
            ` : ""}

            <tr>
                <th style="width: 15px !important;"></th>
                ${obtenerPropiedadesDesplegadasEnOrden().map(x => 
                {
                    let botonEliminarColumna = (x.nombre != "codigo") ? 
                        `&nbsp;&nbsp; <button type="button" onclick="eliminarColumna(${x.orden})"> X </button>` : "";

                    return `<th> ${x.nombre} ${botonEliminarColumna} </th>`;
                }).join("")}

                <th style="width: 140px !important;"> Operaciones </th>
            </tr>
        </thead>
        <tbody>
            ${arreglo.map((elemento, index) => 
            { 
                return `
                <tr>
                    <td style="background-color: lightgray;"> <b> ${index + 1} </b> </td>

                    ${obtenerPropiedadesDesplegadasEnOrden().map(x => `<td>${elemento[x.nombre]}</td>`).join("")}
                    <td> 
                        <!-- <button type="button" onclick="actualizar('${elemento.codigo}')">Actualizar</button> -->

                        <button type="button" onclick="abrirModalEditarRegistro('${elemento.codigo}')">Editar</button>
                        <button type="button" onclick="eliminar('${elemento.codigo}')">Eliminar</button>
                    </td>
                </tr>
                `;
            }).join("")} 
        </tbody>

    </table>
    `;

    document.querySelector("#contenido").innerHTML = cadena;
}

desplegarTabla();

function desplegarFormulario()
{
    let cadena = `
    <table>
        ${propiedadesDesplegadas.map(x => 
        {
            // let botonEliminarColumna = (x.nombre != "codigo") ? `<button type="button" onclick="eliminarColumna(${x.orden})"> X </button>` : "";

            return `
            <div class="col-3">
                <div class="md-form">
                    <input type="text" name="${x.nombre}" placeholder="Ingrese ${x.nombre}" class="form-control"/>
                    <label class="active">${x.nombre}</label>
                </div>
            </div>
            `;
        })
        .join("")}
    </table>
    `;
    
    document.querySelector("#formulario").innerHTML = cadena;
}

desplegarFormulario();

function insertarElementoEnArreglo() 
{
    let elemento = {};
    let errores = [];

    propiedadesDesplegadas.forEach(x => 
    {
        let valor = document.querySelector(`#formularioIngreso [name='${x.nombre}']`)?.value;
        elemento[x.nombre] = valor;

        if (valor == "") errores.push(x.nombre);
    });

    if (errores.length > 0)
        return toastr.error(`Los campos \n ${errores.join(", ")} \n son requeridos`);

    propiedadesDesplegadas.forEach(x => {
        document.querySelector(`#formularioIngreso [name='${x.nombre}']`).value = "";      // Limpia input
    });

    arreglo.push(elemento);
    desplegarTabla();
    $("#modalAgregarNuevo").modal("toggle");
    toastr.success("Registro agregado con exito");
}

function cambiarPosicionTablaIndex(objeto)
{ 
    let elemento = propiedadesDesplegadas.find(c=> c.nombre == objeto.getAttribute("nombreAtributo"));
    let ordenElemento = elemento.orden;

    if (objeto.getAttribute("class").includes("botonAbajo")) 
    {
        let siguienteElemento = propiedadesDesplegadas.filter(c=> c.orden > elemento.orden)[0];
        let ordenSiguienteElemento = siguienteElemento.orden;
        
        siguienteElemento.orden = ordenElemento;
        elemento.orden = ordenSiguienteElemento;
    }
    if (objeto.getAttribute("class").includes("botonArriba"))
    {
        let anteriorElemento = propiedadesDesplegadas.sort((a, b) => Number(a.orden) - Number(b.orden)).find(c=> c.orden == (elemento.orden - 1)); 
        let ordenAnteriorElemento = anteriorElemento.orden;
        
        anteriorElemento.orden = ordenElemento;
        elemento.orden = ordenAnteriorElemento;
    }

    // Asi la grilla y el formulario se ordenan de acuerdo al campo orden 
    desplegarTabla();
    desplegarFormulario();
}

//==================================================================================================>>>>>

function abrirModalAgregarColumna()
{
    $("#modalAgregarColumna").modal("show");
}

function abrirModalAgregarNuevoRegistro()
{
    $("#modalAgregarNuevo").modal("show");
}

function abrirModalEditarRegistro(codigo)
{
    let objeto = arreglo.find(x => x.codigo == codigo);

    let cadena = `
    <table>
        ${propiedadesDesplegadas.map(x => 
        {
            return `
            <div class="col-3">
                <div class="md-form">
                    <input type="text" name="${x.nombre}" value="${objeto[x.nombre]}" placeholder="Ingrese ${x.nombre}" 
                    class="form-control" />

                    <label class="active">${x.nombre}</label>
                </div>
            </div>
            `;
        })
        .join("")}
    </table>
    `;
    
    document.querySelector("#formularioEditar").innerHTML = cadena;
    $("#modalEditarRegistro").modal("show");
}

function actualizarElementoEnArreglo()
{
    let nuevoObjeto = {};
    $("#formularioActualizar").serializeArray().forEach(c => nuevoObjeto[c.name] = c.value); 

    let camposIncompletos = propiedadesDesplegadas.filter(x => document.querySelector(`#formularioActualizar [name='${x.nombre}']`)?.value == "").map(x => x.nombre);

    if (camposIncompletos.length > 0)
        return toastr.error(`Los campos \n ${camposIncompletos.join(", ")} \n son requeridos`);

    let objeto = arreglo.find(x => x.codigo == nuevoObjeto.codigo);

    Object.assign(objeto, nuevoObjeto);  // Asigna al objeto del arreglo los nuevos valores
    $("#modalEditarRegistro").modal("toggle");   // Cierra modal  
    desplegarTabla();
}
