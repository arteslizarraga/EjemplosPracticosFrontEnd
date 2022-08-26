
// public galeria : Array<Array<Foto>>;

let galeria = [
    [], [], []
];

let listaFotos = [
    {"codigo":25,"src":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"},
    {"codigo":24,"src":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png"},
    {"codigo":23,"src":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png"},
    {"codigo":22,"src":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png"},
    {"codigo":21,"src":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png"},
    {"codigo":20,"src":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png"},
    {"codigo":18,"src":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png"},
    {"codigo":11,"src":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png"},
    {"codigo":10,"src":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png"}
];

llenarGaleria(listaFotos);

let cadena = `
<table class="galeria-imagenes">

    ${galeria.map((fila, index) => 
    { 
        return `
        <tr>
            ${fila.map((celda, index) => 
            { 
                let estiloBordeTd = "none";
                let claseTd = "";
                let contenidoTd = "";

                if (celda.src != null) 
                {
                    estiloBordeTd = "2px solid";
                    claseTd = "tiene-contenido";

                    contenidoTd = `
                    <div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="check_imagen_${celda.codigo}">
                            <label class="custom-control-label" for="check_imagen_${celda.codigo}"><br></label>
                        </div>
                        <img style="max-width: 130px; max-height: 115px;"
                        src="${celda.src}">
                    </div>
                    `;
                }

                return `
                <td onclick="marcarImagenSeleccionada(${celda.codigo})" style="border: ${estiloBordeTd}" class="${claseTd}"> 
                    ${contenidoTd}
                </td>
                `;

            }).join("")} 
        </tr>
        `;

    }).join("")} 
</table>
`;

document.querySelector("#galeria-desplegada").innerHTML = cadena;

//==============================================================================================================>>>>

// llenarGaleria(arreglo: Array<Foto>, cantidadFilas: Number = 3, cantidadColumnas: Number = 3)

function llenarGaleria(arreglo, cantidadFilas = 3, cantidadColumnas = 3)
{
  let arrRangoFilas = Array.from(Array(cantidadFilas).keys());          // [ 0, 1, 2 ]
  let arrRangoColumnas = Array.from(Array(cantidadColumnas).keys());    // [ 0, 1, 2 ]
  let cont = 0;

  arrRangoFilas.forEach(fila => 
  {
    arrRangoColumnas.forEach(columna => 
    {
      if (arreglo[cont] != null)  // Si existe la posición en el arreglo
        galeria[fila][columna] = arreglo[cont];  
      else 
        galeria[fila][columna] = { codigo: 0, src: null };  // Agrega un item vacío para rellenar

      cont ++;
    });
  });
}

// marcarImagenSeleccionada(foto: Foto)

function marcarImagenSeleccionada(codigo)
{
  // this.fotoSeleccionada = foto;

  $(`#check_imagen_${codigo}`).prop("checked", true);    // Marca checkbox
  listaFotos.filter(x => x.codigo != codigo).forEach(c => $(`#check_imagen_${c.codigo}`).prop("checked", false));  // Desmarca los demás checkbox
}