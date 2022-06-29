
function llenarSelect2(datos)
{
    /*
    {
        querySelector: "#select2_asignaturas",
        url: "https://localhost:44303/Combobox/GetAsignaturasSelect2",
        consultarPorRut: true,
        maxlength: 15,
        placeholder: "Seleccione una Asignatura",
        registrosPorPagina: 5,
        multiple: true,
        params: { i_carr_ccod: "T66" },
        optionsSeleccionados: [
            { id: "DC0801", text: "DC0801-COMPUTACIÓN APLICADA I" },
            { id: "DC0802", text: "DC0802-COMPUTACIÓN APLICADA II" },
            { id: "DC0804", text: "DC0804-COMPUTACIÓN APLICADA III" },
        ],
        onclick: () => alert("Click en el select2"),
        onchange: () => alert("Onchange en el select2"),
        onblur: () => alert("Onblur en el select2")
    }
    */

    let esMultiple = (datos.multiple != null && datos.multiple);
    let querySelectorSinGato = datos.querySelector.split("#").join("");
    let params = {};

    if (datos.params != null && typeof datos.params !== "function")  // Si datos.params no es nulo, y no es una funcion
        params = datos.params

    const obtenerInputBuscador = () => 
    {
        if (esMultiple) 
            return Array.from($(".select2-search__field")).find(x => x.attributes["aria-describedby"].nodeValue.includes(querySelectorSinGato));

        return inputBuscador = Array.from(document.getElementsByClassName("select2-search__field"))
        .find(x => x.attributes["aria-controls"] != null && x.attributes["aria-controls"].nodeValue.includes(querySelectorSinGato));
    }

    const retornoEvento = () => 
    {
        let res = datos;
        res.value = $(datos.querySelector).select2("val");
        res.text = $(`${datos.querySelector} option:last-child`).text();
        
        return res;
    }

    $(datos.querySelector).select2({
        allowClear: true,
        closeOnSelect: esMultiple ? false : true,  // Si es multiple, no lo cierra al seleccionar un option
        multiple: esMultiple,
        placeholder: datos.placeholder ?? "Seleccione",
        //minimumInputLength: 3,  // Minimo de caracteres para busquedas
        ajax: {
            type: "POST",
            url: datos.url,
            delay: 700,     // Esperar antes de enviar la petición
            data: (p) => 
            {
                let query = {
                    search: p.term,
                    pageSize: datos.registrosPorPagina ?? 10,
                    page: p.page || 1
                };

                let envio = {...params, ...query};   // A los parametros recibidos le agrega los campos search, pageSize y page
                return envio;
                //return query;
            },
            transport: function (params, success, failure) 
            {
                let busqueda = params.data.search;
                let inputBuscador = obtenerInputBuscador();

                if (![null, undefined, ""].includes(busqueda))  // Si el usuario escribió algo en la caja de búsquedas
                {
                    if (datos.consultarPorRut != null && datos.consultarPorRut && ! /^[A-Za-z\s]*$/.test(busqueda))  // Si tiene al menos un caracter que no sea una letra
                    {
                        let rutFormateado = formatearRut(busqueda)
                        inputBuscador.value = rutFormateado; 

                        if (
                            busqueda.split("-").filter(x => x != "").length == 1 ||     // Si no tiene digito verificador
                            busqueda.length > 15 ||                                     // Si es un rut demasiado grande
                            ! busqueda.toLowerCase().match(/^[0-9\k\.\-\/]+$/)          // Si no es un rut válido (Sirve con y sin puntos)
                        )   
                        { return false; }   

                        params.data.search = busqueda.replaceAll(".", "");   // Va a buscar al backend el rut sin los puntos
                    }
                }

                var $request = $.ajax(params);
                $request.then(success);
                $request.fail(failure);

                return $request;
            },
            processResults: (res) =>   // (res: RespuestaBackend<any>)
            {
                if (res != null && res.status != null) 
                {
                    if (res.status == 200) {
                        return {
                            results: res.objeto.resultados,
                            pagination: {
                                more: res.objeto.traerMasRegistros
                            }
                        };
                    }
                    else {
                        this.utilidades.mostrarErroresRespuestaBackend(res);
                    }
                }
                else
                    return { results: [], pagination: { more: false } };
            }
        }
    })
    .on("select2:open", () => 
    {
        if (datos.params != null && typeof datos.params === "function") 
        {
            let retorno = retornoEvento();
            params = datos.params(retorno);
        }

        if (datos.onclick != null && typeof datos.onclick === "function")
            datos.onclick();

        let inputBuscador = obtenerInputBuscador();
        inputBuscador.maxLength = datos.maxlength ?? 40;
    })
    .on("change", () => 
    {
        let retorno = retornoEvento();  // { value: "1234", text: "Hola" }

        if (datos.onchange != null && typeof datos.onchange === "function")
            datos.onchange(retorno);
    })
    .on("select2:close", () => 
    {
        let retorno = retornoEvento();  // { value: "1234", text: "Hola" }

        if (datos.onblur != null && typeof datos.onblur === "function")
            datos.onblur(retorno);
    });

    //==============================================>>>>>

    if (esMultiple && datos.optionsSeleccionados != null && Array.isArray(datos.optionsSeleccionados)) 
    {
        datos.optionsSeleccionados.forEach(c => 
            $(datos.querySelector).append(new Option(c.text, c.id, true, true))
        );
    
        //$(datos.querySelector).trigger("change");   // ESTO DISPARA EL EVENTO ONCHANGE
    }

    //==============================================>>>>>
    
}

function formatearRut(contenido)
{
    // Si el primer caracter es un guion, o el contenido no es valido, o tiene mas de 15 caracteres
    if (contenido.charAt(0) == "-" || ! contenido.match(/^[0-9\k\.\-\/]+$/) || contenido.length > 15) 
        contenido = contenido.slice(0, -1);

    var dvRut = contenido.split("-")[1];
    if (dvRut != null && dvRut.length > 1) { contenido = contenido.slice(0, -1); }  // Remueve mas de un digito verificador

    var ultimoCaracter = contenido.substr(-1);

    if (!contenido.includes("-"))   // Si no se agrego el guion, entonces formatea el numero
    {
        if (ultimoCaracter.includes("k")) { contenido = contenido.slice(0, -1); }

        var num = contenido.split("-")[0].replace(/\./g, "");
        num = num.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g, "$1.");
        num = num.split("").reverse().join("").replace(/^[\.]/, "");
        contenido = num;
    }
    else {
        if ((contenido.split("-").length - 1) > 1) contenido = contenido.slice(0, -1);  // Si tiene mas de un guion
    }
    
    return contenido;
}















