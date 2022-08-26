
this.objeto = {
    nombre: "José", estado: "A", fechaEfectiva: "12/07/2022", descripcion: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
};

// Activar selects
$(".chosen-select").chosen({ disable_search_threshold: 10, no_results_text: "Sin Resultados para: ", width: "100%" });
$(".mdb-select").material_select();

$("#formCrear [name='fechaEfectiva']").datepicker({ language: "es", autoClose: true });

/*
const limpiarFormulario = (querySelector) =>
{
    $(querySelector).trigger("reset");  // Limpia el formulario

    Array.from($(querySelector).find("select")).forEach(x => {
        $(`${querySelector} [name='${x.name}']`).find("option:first-child").prop("selected", true).trigger("chosen:updated");
    });
};
*/

const limpiarFormulario = (querySelector) =>
{
    //$(querySelector).trigger("reset");  // Limpia el formulario

    Array.from($(querySelector).find(":input"))
    .filter(x => x.className.includes("form-control") && x.attributes.getNamedItem("no-limpiar") == null).forEach(x => 
    {
        x.value = "";
    });

    Array.from($(querySelector).find("select"))
    .filter(x => x.attributes.getNamedItem("no-limpiar") == null).forEach(x =>
    {
        $(`${querySelector} [name='${x.name}']`).find("option:first-child").prop("selected", true).trigger("chosen:updated");
    });
};

const llenarFormulario = (querySelector, o) =>
{
    Object.entries(o).filter(([, valorAtributo]) => ! Array.isArray(valorAtributo))  // No incluye arreglos en caso de que los tenga 
    .forEach(([nombreAtributo, valorAtributo]) => 
    { 
        let campo = document.querySelector(`${querySelector} [name="${nombreAtributo}"]`);

        if (campo != null) 
        {
            if (["input", "textarea"].includes(campo.localName)) {
                campo.value = valorAtributo;
            }
            if (campo.localName == "select") {
                $(`${querySelector} [name="${nombreAtributo}"]`).val(valorAtributo).trigger("chosen:updated");
            }
        }
    }); 
}

const probandoLimpiar = () => limpiarFormulario("#formCrear");

const probandoLlenar = () => llenarFormulario("#formCrear", this.objeto);


