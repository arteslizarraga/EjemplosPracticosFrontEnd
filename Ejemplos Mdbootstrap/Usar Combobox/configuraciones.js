// Activar selects
$(".chosen-select").chosen({ disable_search_threshold: 10, no_results_text: "Sin Resultados para: ", width: "100%" });
$(".mdb-select").material_select();

async function cargarPagina()
{
    let datos = await obtenerGeneraciones();

    llenarSelect({ 
        querySelector: "#select_1", 
        data: datos
    });

    llenarSelect({ 
        selectedValue: "4",
        querySelector: "#select_2", 
        data: datos
    });

    llenarSelect({ 
        multiple: true, 
        querySelector: "#select_3", 
        data: datos
    });

    llenarSelect({ 
        selectedValue: [ "4", "5", "6" ],  
        multiple: true, 
        querySelector: "#select_4", 
        data: datos
    });

    llenarSelect({ 
        querySelector: "#select_5", 
        data: datos,
        onchange: async () => 
        {
            let valorSeleccionado = $("#select_5").val();
            let textoSeleccionado = $("#select_5 option:selected").text(); 

            if (valorSeleccionado == "") return limpiarSelect("#select_6");

            console.log(`El value seleccionado es ${valorSeleccionado} y el text es ${textoSeleccionado}`);
            let especiesGeneracion = await obtenerEspeciesGeneracion(valorSeleccionado);
            llenarSelect({ querySelector: "#select_6", data: especiesGeneracion });
        }
    });
}

cargarPagina();

function obtenerGeneraciones()
{
    return new Promise((resolve, reject) => 
    {
        $.ajax({
            method: "get",
            url: "https://pokeapi.co/api/v2/generation",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: () => {
                showLoading();
            },
            success: (res) =>
            {
                let datos = res.results.map(x => 
                {
                    let idRegistro = x.url.split("/").reverse()[1];
                    return { codigo: idRegistro, descripcion: x.name };
                });
        
                resolve(datos);
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                toastr.error("Ocurrió un error al obtener los datos");
                hideLoading();
            },
            complete: (res) => {
                hideLoading();
            }
        });
    })
}

function obtenerEspeciesGeneracion(idGeneracion)
{
    return new Promise((resolve, reject) => 
    {
        $.ajax({
            method: "get",
            url: `https://pokeapi.co/api/v2/generation/${idGeneracion}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: () => {
                showLoading();
            },
            success: (res) =>
            {
                let datos = res.pokemon_species.map(x => 
                {
                    let idRegistro = x.url.split("/").reverse()[1];
                    return { codigo: idRegistro, descripcion: x.name };
                });
        
                resolve(datos);
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                toastr.error("Ocurrió un error al obtener los datos");
                hideLoading();
            },
            complete: (res) => {
                hideLoading();
            }
        });
    })
}

function quitarSeleccionSelect(querySelector) {
    $(querySelector).find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
}

function limpiarSelect(querySelector) {
    $(querySelector + ' option[value!=""]').remove().end();    // Remueve todos los options excepto el seleccione
    $(querySelector).trigger("chosen:updated");   
}

function llenarSelect(datos) 
{
  if (Array.from($(datos.querySelector + ' option[value!=""]')).length)   // Si tiene elementos excepto el seleccione
    limpiarSelect(datos.querySelector);                              // Esto sirve al refrescar el combobox con nuevos datos

  quitarSeleccionSelect(datos.querySelector);

  if (datos.data != null) 
  {
    if (datos.selectedValue == null) 
    {
      datos.data.forEach(c => {
        $(datos.querySelector).append('<option value="' + c.codigo + '">' + c.descripcion + '</option>');
      });
    }
    else 
    {
      if (Array.isArray(datos.selectedValue)) 
      {
        var arreglo = datos.selectedValue;

        datos.data.forEach(c => 
        {
          let selected = (arreglo.includes(c.codigo.toString())) ? "selected" : "";
          $(datos.querySelector).append('<option value="' + c.codigo + '" ' + selected + '>' + c.descripcion + '</option>');

        });
      }
      else 
      {
        datos.data.forEach(c => 
        {
          let selected = (c.codigo == datos.selectedValue) ? "selected" : "";
          $(datos.querySelector).append('<option value="' + c.codigo + '" ' + selected + '>' + c.descripcion + '</option>');
        });
      }
    }

  }

  $(datos.querySelector).on("change", () => {
    if (datos.onchange != null && typeof datos.onchange === "function") datos.onchange();
  });

  $(datos.querySelector).trigger("chosen:updated");   // El select toma los cambios realizados

  if (datos.multiple != null && datos.multiple)   // Si es un select multiple, lo refresca
  {
    $(datos.querySelector).materialSelect("destroy");  
    $(datos.querySelector).removeAttr("disabled");
  }
}

function showLoading() {
    $('#loadingOverlay').show();
}

function hideLoading() {
    $('#loadingOverlay').hide();
}

