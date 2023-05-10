
let usarDatosDummy = true;  // false;
let sePuedeModificar = true;
let preguntasUtilizadas = [];
this.grillaAnalisisDemandaTFL = {};
this.objeto = {};                   // Agrega un objeto a la página
this.listaObjetos = [];             // Lista objetos sin filtro Front-End aplicado
let arregloDuplicados = [];
let arregloCarrerasPeriodoVigente = [];

this.nextIndex = 0;
let registrosPorPagina = 10;
let paginaActual = 0;

$(document).ready(function ()
{
    $(".chosen-select").chosen({ disable_search_threshold: 10, no_results_text: "Sin Resultados para: ", width: "100%" });

    $('[data-toggle="tooltip"]').tooltip();
    $('.mdb-select').material_select();

    $("#ModalFiltrarTabla [name='fechaInicioVigencia']").datepicker({ language: "es", autoClose: true });
    $("#ModalFiltrarTabla [name='fechaFinVigencia']").datepicker({ language: "es", autoClose: true });
});

(async () => 
{
    let res = obtenerDatos();

    preguntasUtilizadas = res.objeto.preguntas;  // Guardo las preguntas, ya que son usadas regularmente
    this.listaObjetos = res.objeto.data;
    await construirGrillaAnalisisDemandaTFL();
})();

//==================>>>>

$("#ModalCambiarEstado [name='estado']").on("change", (e) =>  // Al seleccionar un option en el modal para cambiar estado
{
    if (e.currentTarget.value != this.objeto.estado)
        $("#btnCambiarEstado").removeAttr("disabled").attr("class", "btn btn-default waves-effect waves-light");  // Habilita botón y lo Oscurece
    else
        $("#btnCambiarEstado").attr("disabled", true).attr("class", "btn");     // Deshabilita botón y lo Aclara
});

//==================>>>>

async function construirGrillaAnalisisDemandaTFL() 
{
    let limitarTextoCelda = (descripcion, size = 40) => (descripcion.length > size) ?
        `<container data-toggle="tooltip" data-placement="top" title="${descripcion}" style="cursor: pointer">${descripcion.slice(0, size)} ...</container>`
        : descripcion;

    let obtenerListaObjetosFiltrada = (lista) =>
    {
        let modalFiltrar = $("#ModalFiltrarTablaAnalisis");

        let filtro = {
            tipoNivelMctpCcod: modalFiltrar.find("[name='tipoNivelMctpCcod']").val(),
            defNivelMctpNcorr: modalFiltrar.find("[name='defNivelMctpNcorr']").val(),
            cualificacionNcorr: modalFiltrar.find("[name='cualificacionNcorr']").val()
        };

        if (validarNuloVacio(filtro.tipoNivelMctpCcod) && validarNuloVacio(filtro.defNivelMctpNcorr))
            lista = lista.filter(x => x.def_nmctp_ncorr == filtro.defNivelMctpNcorr);

        if (validarNuloVacio(filtro.cualificacionNcorr))
            lista = lista.filter(x => x.cualificaciones_ncorr == filtro.cualificacionNcorr);

        return lista;
    };

    this.grillaAnalisisDemandaTFL = {
        thead: [
            //{ valor: "Correlativo" },
            { valor: "N° Nivel MCTP" },     // Número Nivel MCTP
            //{ valor: "Nivel MCTP" },
            { valor: "Código Cualificación" },
            { valor: "Cualificación" },
            { valor: "Versión Cualificación" },
            { valor: "Código Ocupacional" },
            { valor: "Perfil Ocupacional" }
        ], 
        tbody: []
    };

    // Agrega preguntas
    preguntasUtilizadas.forEach(x => this.grillaAnalisisDemandaTFL.thead.push({
        valor: x.def_ademanda_pg_pregunta
    }));

    this.grillaAnalisisDemandaTFL.thead.push({ valor: "Estado" });
    this.grillaAnalisisDemandaTFL.thead.push({ html: "Acciones" });   // Si no tiene valor, no se despliega en el Excel

    let listaObjetosFiltrada = obtenerListaObjetosFiltrada(this.listaObjetos);  // Aplicar filtros en caso de que existan

    this.listaObjetos.forEach((row, index) =>
    {
        if (listaObjetosFiltrada.includes(row))
        {
            let arreglo = [
                { valor: row.def_nmctp_numero, atributo: "def_nmctp_numero" },
                { valor: row.cualificaciones_ccod, atributo: "cualificaciones_ccod" },
                { valor: row.cualificaciones_nombre, atributo: "cualificaciones_nombre" },
                { valor: row.cualificaciones_version, atributo: "cualificaciones_version" },
                { valor: row.def_pocupacionales_ccod, atributo: "def_pocupacionales_ccod" },
                { valor: row.def_pocupacionales_nombre, atributo: "def_pocupacionales_nombre" }
            ];

            preguntasUtilizadas.forEach(pregunta =>
            {
                // console.log(pregunta);

                if (row.respuestas.length > 0)
                {
                    let r = row.respuestas.find(x => x.def_ademanda_pg_ncorr == pregunta.def_ademanda_pg_ncorr);

                    if (r != null)
                        arreglo.push({ html: limitarTextoCelda(r.ademanda_rsp_respuesta), valor: r.ademanda_rsp_respuesta });
                }
                else {
                    arreglo.push({ html: "", valor: "" });  // ACA  9-5-2023    // Si en la fila recorrida, la pregunta no tiene respuesta, deja en blanco
                }
            });

            arreglo.push({ valor: row.ademanda_estado });

            arreglo.push({  // Si no tiene valor, no se despliega en el Excel
                html: `
                <div class="d-flex justify-content-between">
                    ${row.ademanda_estado == "ACTIVO" ?
                        `<button type="button" onclick="abrirModalEditar_AnalisisDemanda_TFL(${index})" class="btnEditFila mr-0 mr-md-4 d-flex align-items-center float-left">
                            <i class="material-icons mr-1 icon-lg grey-text">edit</i>
                            <span class="d-none d-md-inline">Editar</span>
                        </button>`
                        : ""}

                    <button type="button" onclick="abrirModalCambiarEstado_AnalisisDemanda_TFL(${index})" class="mr-0 mr-md-4 d-flex align-items-center float-left">
                        <i class="material-icons mr-1 icon-lg grey-text">assignment</i>
                        <span class="d-none d-md-inline">Cambiar Estado</span>
                    </button>
                </div>`
            });

            this.grillaAnalisisDemandaTFL.tbody.push(arreglo);
        }
    });

    let cadena = `
    <table id="TablaResultadosAnalisis" class="datatables table table-hover table-striped table-bordered m-0">
        <thead>
            <tr> ${this.grillaAnalisisDemandaTFL.thead.map(x => `
                <th data-orderable="${x.esOrdenable != null ? "true" :"false"}">
                    ${x.valor != null ? limitarTextoCelda(x.valor) : x.html}
                </th>`).join("")}
            </tr>
        </thead>
        <tbody>
            ${this.grillaAnalisisDemandaTFL.tbody.map(x =>
            {
                return `<tr> ${x.map(y => `<td class="text-nowrap">
                    ${y.html ?? y.valor ?? "DATO DESCONOCIDO"}</td>`).join("")}
                </tr>`;
            }).join("")}
        </tbody>
    </table>
    `;

    document.querySelector("#TablaResultadosAnalisis").innerHTML = cadena;

    return new Promise((resolve, reject) =>
    {
        $("#TablaResultadosAnalisis").DataTable({
            destroy: true,
            pageLength: registrosPorPagina,
            dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
            scrollY: "40vh",
            scrollX: true,  // Si la tabla tiene poco tamaño hacia el lado, esto hace que se vea pequeña
            //lengthMenu: [[10, 20, 30], [10, 20, 30]],
            bLengthChange: false, // Oculta el select de registros por página
            columnDefs: [],
            aaSorting: [],
            processing: true,
            //serverSide: true, 
            filter: true,
            orderMulti: false,
            responsive: true
        })
        .on("page.dt", () => {
            paginaActual = $("#TablaResultadosAnalisis").DataTable().page.info().page;
        })
        .page(paginaActual).draw(false);

        $("#TablaResultadosAnalisis_wrapper .top").append(`
            <div class="dataTables_custom-buttons">
            <button type="button" class="btn btn-rounded btn-default waves-effect" data-toggle="modal" data-target="#ModalFiltrarTablaAnalisis">
                <span class="d-flex align-items-center">
                    <span class="material-icons mr-2">filter_list</span>
                    <span>Filtros</span>
                </span>
            </button>
            </div>
        `);

        $("#TablaResultadosAnalisis_wrapper .dataTables_actions").append(`<div class="dataTables_actions-buttons">
            <button type="button" onclick="descargarExcelAnalisisDemandaTFL()" class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="Descargar Excel">
                <i class="material-icons icon-1x">arrow_downward</i>
            </button>
            <!--
            <button type="button" class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="Descargar PDF">
                <i class="material-icons icon-1x">picture_as_pdf</i>
            </button>
            -->
        </div >`);

        // $('#TablaResultadosAnalisis').css('width', '100%');

        setTimeout(() => resolve(true), 200);
    }); 
}


function descargarExcelAnalisisDemandaTFL()
{
    let data = [this.grillaAnalisisDemandaTFL.thead.filter(x => x.valor != null).map(x => x.valor)];

    this.grillaAnalisisDemandaTFL.tbody.forEach(x =>
    {
        data.push(x.filter(y => y.valor != null).map(y => {
            return y.valor;
        }));
    });

    let nombreArchivo = formatearNombreArchivo("ADEMANDA");
    generarExcel(data, nombreArchivo);
}

function abrirModalEditar_AnalisisDemanda_TFL(index)
{
    $(".tooltip").tooltip("hide");      // Cerrar posibles tooltips abiertos
    let clon = this.listaObjetos[index];
    this.objeto = JSON.parse(JSON.stringify(clon));  // Clona el objeto para tener una copia sobre la cual trabajar

    // Mostrar llaves en el modal para orientar al usuario
    let modal = $("#ModalEditar");
    //modal.find("[name='correlativo']").html(this.objeto.ademanda_ncorr);
    modal.find("[name='numeroDefNmctp']").html(this.objeto.def_nmctp_numero);
    modal.find("[name='nombreCualificacion']").html(this.objeto.cualificaciones_nombre);
    modal.find("[name='versionCualificacion']").html(this.objeto.cualificaciones_version);
    modal.find("[name='nombrePerfilOcupacional']").html(this.objeto.def_pocupacionales_nombre);

    if (this.objeto.respuestas.every(x => x.def_ademanda_pg_pregunta != null))
    {
        let estiloCol = this.objeto.respuestas.some(x => x.def_ademanda_pg_pregunta.length >= 130) ?
            "margin-top: 3em" : "";

        document.querySelector("#div-row-textareas-preguntas").innerHTML = this.objeto.respuestas.map(x =>
        {
            return `
	        <div name="div-def-ademanda-pg-ncorr-${x.def_ademanda_pg_ncorr}" class="col-12 col-md-4" style="${estiloCol}">
	            <div class="md-form mb-3">
		            <textarea  
                    oninput="asignarRespuestaPregunta(${x.def_ademanda_pg_ncorr}, event)"
                    rows="2" placeholder="Escriba la respuesta" class="form-control md-textarea"
                    maxlength="1000">${x.ademanda_rsp_respuesta}</textarea>

		            <label class="active">${x.def_ademanda_pg_pregunta}</label>
                    <div class="red-text"> <p></p> </div>
	            </div>
	        </div>
	        `;
        }).join("");
    }

    habilitarDeshabilitarElementos({ querySelector: "#ModalEditar", habilitado: sePuedeModificar });

    //=================>>>>>
    // Botón Guardar y continuar
    let btnGuardarContinuar = modal.find("[name='btn-guardar-y-continuar']");

    let siguienteElemento = listaObjetos[index + 1];

    this.nextIndex = (typeof siguienteElemento !== "undefined" && this.listaObjetos.includes(siguienteElemento)) ?
        (index + 1) : 0;

    btnGuardarContinuar.attr("disabled", true).attr("class", "btn");  // Deshabilita botón guardar y continuar

    if (sePuedeModificar)
    {
        if (this.nextIndex != 0)
            btnGuardarContinuar.removeAttr("disabled").attr("class", "btn btn-default waves-effect waves-light");
        else
            toastr.success("Último registro");
    }

    //=================>>>>>

    modal.modal("show");
}

function abrirModalCambiarEstado_AnalisisDemanda_TFL(index)
{
    let clon = this.listaObjetos[index];
    this.objeto = JSON.parse(JSON.stringify(clon));  // Clona el objeto para tener una copia sobre la cual trabajar

    // Mostrar llaves en el modal para orientar al usuario
    let modal = $("#ModalCambiarEstado"); 
    modal.find("[name='correlativo']").html(this.objeto.ademanda_ncorr);
    modal.find("[name='numeroDefNmctp']").html(this.objeto.def_nmctp_numero);
    modal.find("[name='nombreCualificacion']").html(this.objeto.cualificaciones_nombre);
    modal.find("[name='versionCualificacion']").html(this.objeto.cualificaciones_version);
    modal.find("[name='nombrePerfilOcupacional']").html(this.objeto.def_pocupacionales_nombre);

    // Deshabilitar elementos si está publicado
    Array.from(document.querySelectorAll(".deshabilitar-publicado")).forEach(x => x.disabled = !sePuedeModificar);

    modal.find("[name='estado']").val(this.objeto.ademanda_estado).trigger("chosen:updated");

    modal.modal("show");
    $("#btnCambiarEstado").attr("disabled", true);   // Deshabilita botón
    $("#btnCambiarEstado").attr("class", "btn");     // Aclara color del botón
}

function cambiarEstadoAnalisisDemanda_TFL()
{
    let ncorrCualificacion = this.objeto.cualificaciones_ncorr;
    let ncorrAdemanda = this.objeto.ademanda_ncorr;
    let ncorrDefPerfilocupacional = this.objeto.def_pocupacionales_ncorr;

    let elemento = this.listaObjetos.find(x =>
        x.cualificaciones_ncorr == ncorrCualificacion &&
        x.ademanda_ncorr == ncorrAdemanda &&
        x.def_pocupacionales_ncorr == ncorrDefPerfilocupacional
    );

    let modal = $("#ModalCambiarEstado");
    let estado = modal.find("[name='estado']").val();
    elemento.ademanda_estado = estado;      // Sobre escribe el estado del elemento
    construirGrillaAnalisisDemandaTFL();    // Refresca el estado en la grilla
    modal.modal("toggle");
}

function asignarRespuestaPregunta(def_ademanda_pg_ncorr, e)
{
    let elemento = this.objeto.respuestas.find(x => x.def_ademanda_pg_ncorr == def_ademanda_pg_ncorr);

    if (elemento != null) 
        elemento.ademanda_rsp_respuesta = e.target.value;
    else
        console.log(`No se encontró la pregunta con el def_ademanda_pg_ncorr ${def_ademanda_pg_ncorr}`);
}

function guardarDatosModalEditar(pasarSiguientePagina = false)
{
    // Limpia mensajes de anteriores intentos
    $("#ModalEditar .red-text").html("");
    $("#ModalEditar textarea").removeClass("textarea-requerido-incompleto");

    // Validar preguntas obligatorias
    let respuestasNoRespondidas = this.objeto.respuestas.filter(x => !validarNuloVacio(x.ademanda_rsp_respuesta) && x.esRespuestaObligatoria);

    respuestasNoRespondidas.forEach(x =>
    {
        let div = $(`#ModalEditar [name='div-def-ademanda-pg-ncorr-${x.def_ademanda_pg_ncorr}']`);
        div.find(".red-text").html("*Respuesta requerida");
        div.find("textarea").addClass("textarea-requerido-incompleto");
    });

    if (respuestasNoRespondidas.length > 0) return;

    let infoValidar = this.objeto.respuestas.filter(x => validarNuloVacio(x.ademanda_rsp_respuesta)).map(x => {
        return { def_ademanda_pg_ncorr: x.def_ademanda_pg_ncorr, ademanda_rsp_respuesta: x.ademanda_rsp_respuesta };
    });

    //===========================>>>>>

    let ncorrCualificacion = this.objeto.cualificaciones_ncorr;
    let ncorrAdemanda = this.objeto.ademanda_ncorr;
    let ncorrDefPerfilocupacional = this.objeto.def_pocupacionales_ncorr;

    let elemento = this.listaObjetos.find(x =>
        x.cualificaciones_ncorr == ncorrCualificacion &&
        x.ademanda_ncorr == ncorrAdemanda &&
        x.def_pocupacionales_ncorr == ncorrDefPerfilocupacional
    );

    elemento.respuestas = this.objeto.respuestas;  // Sobre escribe las respuestas del elemento
    construirGrillaAnalisisDemandaTFL();           // Coloca las preguntas respondidas en la grilla

    if (pasarSiguientePagina)
    {
        paginaActual = (Math.ceil((this.nextIndex + 1) / registrosPorPagina)) - 1;
        // console.log(`paginaActual: ${paginaActual}`);

        setTimeout(() => {
            abrirModalEditar_AnalisisDemanda_TFL(this.nextIndex);
            construirGrillaAnalisisDemandaTFL();
        }, 500);
    }

    $("#ModalEditar").modal("toggle");
}

function guardarBorrador()
{
    ademandaGrabar(true)
    .then(res => 
    {
        toastr.success(res.mensajeExito);

        let fechaHoy = new Date().toJSON().slice(0, 10).split("-").reverse().join("/");
        $("#resultadosAnalisisDemanda [name='fechaPoblamiento']").html(fechaHoy);
    })
    .catch(ex => toastr.error(ex));
}

function abrirModalGuardarPublicar()
{
    let txtFecha = $("#ModalGuardarPublicar [name='fechaPublicacion']");
    let fechaHoy = new Date().toJSON().slice(0, 10).split("-").reverse().join("/");  // "24/01/2023" 
    txtFecha.val(fechaHoy);

    if (txtFecha.data("datepicker") == null)  // Si no ha sido inicializado
        txtFecha.datepicker({ language: "es", autoClose: true });

    $("#ModalGuardarPublicar").modal("show");
}

function guardar_y_publicar()
{
    ademandaGrabar(false)
    .then(res => 
    {
        toastr.success(res.mensajeExito);
        definirMensaje({ mostrar: true, icono: "lock", mensaje: "Análisis de Demanda publicada, no se puede modificar" });
        sePuedeModificar = false;

        let infoCabecera = $("#resultadosAnalisisDemanda");

        let fechaHoy = new Date().toJSON().slice(0, 10).split("-").reverse().join("/");
        let fechaPublicacion = $("#ModalGuardarPublicar [name='fechaPublicacion']").val();

        infoCabecera.find("[name='fechaPoblamiento']").html(fechaHoy);
        infoCabecera.find("[name='fechaPublicacion']").html(fechaPublicacion);

        Array.from(document.querySelectorAll(".deshabilitar-publicado")).forEach(x => x.disabled = true);  // Deshabilita botones
    })
    .catch(ex => toastr.error(ex));
}

function ademandaGrabar(esBorrador)
{
    // Valida que todas las preguntas estén respondidas
    let estaCompleto = listaObjetos
        .every(x => x.respuestas.some(y => y.esRespuestaObligatoria && validarNuloVacio(y.ademanda_rsp_respuesta)));

    if (!estaCompleto && !esBorrador)
        return Promise.reject("Existen preguntas requeridas sin responder");

    let copiaDetallesParaEnviar = listaObjetos.map(ademanda => {
        return {
            ademanda_ncorr: ademanda.ademanda_ncorr,
            ademanda_estado: (ademanda.ademanda_estado != null && ademanda.ademanda_estado.toLowerCase() == "activo") ? "A" : "I",
            cualificaciones_ncorr: ademanda.cualificaciones_ncorr,
            def_pocupacionales_ncorr: ademanda.def_pocupacionales_ncorr,
            respuestas: ademanda.respuestas.map(respuesta => {
                return { def_ademanda_pg_ncorr: respuesta.def_ademanda_pg_ncorr, ademanda_rsp_respuesta: respuesta.ademanda_rsp_respuesta };
            })
        };
    });

    let p_json_datos = JSON.stringify(copiaDetallesParaEnviar);
    console.log(p_json_datos);

    // let fechaPublicacion = (!esBorrador) ? $("#ModalGuardarPublicar [name='fechaPublicacion']").val() : "";
    // let params = obtenerParamsFiltro();

    return new Promise((resolve, reject) =>
    {
        resolve({ status: 200, mensajeExito: "Exito" });
    });
}

function definirMensaje(datos = {})
{
    // definirMensaje({ mostrar: false });
    // definirMensaje({ mostrar: true, icono: "warning", mensaje: "Hay duplicados. Revisar" });
    // definirMensaje({ mostrar: true, icono: "lock", mensaje: "No se puede modificar" });

    let querySelector = datos.querySelector ?? "#resultadosAnalisisDemanda #mensaje";
    let mensajeNoModificar = document.querySelector(querySelector);

    if (datos.mostrar && datos.mensaje != null)
    {
        mensajeNoModificar.style.cssText = "visibility: visible";  // Muestra mensaje "Análisis de Demanda publicada, no se puede modificar"
        let p = Array.from(mensajeNoModificar.children).find(x => x.tagName.toLowerCase() == "p");
        let i = Array.from(mensajeNoModificar.children).find(x => x.tagName.toLowerCase() == "i");

        p.textContent = datos.mensaje;
        i.textContent = datos.icono ?? "error";

        let color = (datos.icono == "warning") ?
            "#ffa000"   // Amarillo
            : "#c00";   // Rojo

        p.style.color = color;
        i.style.color = color;
    }
    else {
        mensajeNoModificar.style.cssText = "visibility: hidden";
    }
}

function obtenerDatos()
{
    /*
    let preguntas = [1, 2, 3].map(x => {
        return {
            def_ademanda_pg_ncorr: x, def_ademanda_pg_pregunta: `Pregunta ${x}`
         }
    });

    let data = [1, 2, 3, 4].map(x => 
    {
        let infoCualquiera = `Fila ${x}`;

        return {
            ademanda_ncorr: x,

            def_nmctp_numero: infoCualquiera,
            cualificaciones_ccod: infoCualquiera,
            cualificaciones_nombre: infoCualquiera,
            cualificaciones_version: infoCualquiera,
            def_pocupacionales_ccod: infoCualquiera,
            def_pocupacionales_nombre: infoCualquiera,
            ademanda_estado: "ACTIVO",
            respuestas: preguntas.map(y => {
                return { 
                    def_ademanda_pg_ncorr: y.def_ademanda_pg_ncorr, 
                    ademanda_rsp_respuesta: `Resp. a la Preg. ${y.def_ademanda_pg_ncorr} en la Fila ${x}`,
                    ademanda_ncorr: x,  
                    esRespuestaObligatoria: true,  
                    def_ademanda_pg_pregunta: y.def_ademanda_pg_pregunta 
                };
            })
        };
    });

    let res = {
        objeto:{
           statusPublicacion: "PUBLICADA_CON_DATOS",
           mensaje: "Análisis de Demanda publicada, no se puede modificar",
           data: data,              // [],
           preguntas: preguntas
        },
        errores: [],
        status: 200,
        mensajeExito: null
    };

    console.log(JSON.stringify(res));
    */

    //===============================================================================>>>>>>

    let res = {
        "objeto":{
           "statusPublicacion":"PUBLICADA_CON_DATOS",
           "mensaje":"Análisis de Demanda publicada, no se puede modificar",
           "data":[
              {
                 "ademanda_ncorr":1,
                 "def_nmctp_numero":"Fila 1",
                 "cualificaciones_ccod":"Fila 1",
                 "cualificaciones_nombre":"Fila 1",
                 "cualificaciones_version":"Fila 1",
                 "def_pocupacionales_ccod":"Fila 1",
                 "def_pocupacionales_nombre":"Fila 1",
                 "ademanda_estado":"ACTIVO",
                 "respuestas":[
                    {
                       "def_ademanda_pg_ncorr":1,
                       "ademanda_rsp_respuesta":"Resp. a la Preg. 1 en la Fila 1",
                       "ademanda_ncorr":1,
                       "esRespuestaObligatoria":true,
                       "def_ademanda_pg_pregunta":"Pregunta 1"
                    },
                    {
                       "def_ademanda_pg_ncorr":2,
                       "ademanda_rsp_respuesta":"Resp. a la Preg. 2 en la Fila 1",
                       "ademanda_ncorr":1,
                       "esRespuestaObligatoria":true,
                       "def_ademanda_pg_pregunta":"Pregunta 2"
                    },
                    {
                       "def_ademanda_pg_ncorr":3,
                       "ademanda_rsp_respuesta":"Resp. a la Preg. 3 en la Fila 1",
                       "ademanda_ncorr":1,
                       "esRespuestaObligatoria":true,
                       "def_ademanda_pg_pregunta":"Pregunta 3"
                    }
                 ]
              },
              {
                 "ademanda_ncorr":2,
                 "def_nmctp_numero":"Fila 2",
                 "cualificaciones_ccod":"Fila 2",
                 "cualificaciones_nombre":"Fila 2",
                 "cualificaciones_version":"Fila 2",
                 "def_pocupacionales_ccod":"Fila 2",
                 "def_pocupacionales_nombre":"Fila 2",
                 "ademanda_estado":"ACTIVO",
                 "respuestas":[
                    {
                       "def_ademanda_pg_ncorr":1,
                       "ademanda_rsp_respuesta":"Resp. a la Preg. 1 en la Fila 2",
                       "ademanda_ncorr":2,
                       "esRespuestaObligatoria":true,
                       "def_ademanda_pg_pregunta":"Pregunta 1"
                    },
                    {
                       "def_ademanda_pg_ncorr":2,
                       "ademanda_rsp_respuesta":"Resp. a la Preg. 2 en la Fila 2",
                       "ademanda_ncorr":2,
                       "esRespuestaObligatoria":true,
                       "def_ademanda_pg_pregunta":"Pregunta 2"
                    },
                    {
                       "def_ademanda_pg_ncorr":3,
                       "ademanda_rsp_respuesta":"Resp. a la Preg. 3 en la Fila 2",
                       "ademanda_ncorr":2,
                       "esRespuestaObligatoria":true,
                       "def_ademanda_pg_pregunta":"Pregunta 3"
                    }
                 ]
              },
              {
                 "ademanda_ncorr":3,
                 "def_nmctp_numero":"Fila 3",
                 "cualificaciones_ccod":"Fila 3",
                 "cualificaciones_nombre":"Fila 3",
                 "cualificaciones_version":"Fila 3",
                 "def_pocupacionales_ccod":"Fila 3",
                 "def_pocupacionales_nombre":"Fila 3",
                 "ademanda_estado":"ACTIVO",
                 "respuestas":[
                    {
                       "def_ademanda_pg_ncorr":1,
                       "ademanda_rsp_respuesta":"Resp. a la Preg. 1 en la Fila 3",
                       "ademanda_ncorr":3,
                       "esRespuestaObligatoria":true,
                       "def_ademanda_pg_pregunta":"Pregunta 1"
                    },
                    {
                       "def_ademanda_pg_ncorr":2,
                       "ademanda_rsp_respuesta":"Resp. a la Preg. 2 en la Fila 3",
                       "ademanda_ncorr":3,
                       "esRespuestaObligatoria":true,
                       "def_ademanda_pg_pregunta":"Pregunta 2"
                    },
                    {
                       "def_ademanda_pg_ncorr":3,
                       "ademanda_rsp_respuesta":"Resp. a la Preg. 3 en la Fila 3",
                       "ademanda_ncorr":3,
                       "esRespuestaObligatoria":true,
                       "def_ademanda_pg_pregunta":"Pregunta 3"
                    }
                 ]
              },
              {
                 "ademanda_ncorr":4,
                 "def_nmctp_numero":"Fila 4",
                 "cualificaciones_ccod":"Fila 4",
                 "cualificaciones_nombre":"Fila 4",
                 "cualificaciones_version":"Fila 4",
                 "def_pocupacionales_ccod":"Fila 4",
                 "def_pocupacionales_nombre":"Fila 4",
                 "ademanda_estado":"ACTIVO",
                 "respuestas":[
                    {
                       "def_ademanda_pg_ncorr":1,
                       "ademanda_rsp_respuesta":"Resp. a la Preg. 1 en la Fila 4",
                       "ademanda_ncorr":4,
                       "esRespuestaObligatoria":true,
                       "def_ademanda_pg_pregunta":"Pregunta 1"
                    },
                    {
                       "def_ademanda_pg_ncorr":2,
                       "ademanda_rsp_respuesta":"Resp. a la Preg. 2 en la Fila 4",
                       "ademanda_ncorr":4,
                       "esRespuestaObligatoria":true,
                       "def_ademanda_pg_pregunta":"Pregunta 2"
                    },
                    {
                       "def_ademanda_pg_ncorr":3,
                       "ademanda_rsp_respuesta":"Resp. a la Preg. 3 en la Fila 4",
                       "ademanda_ncorr":4,
                       "esRespuestaObligatoria":true,
                       "def_ademanda_pg_pregunta":"Pregunta 3"
                    }
                 ]
              }
           ],
           "preguntas":[
              {
                 "def_ademanda_pg_ncorr":1,
                 "def_ademanda_pg_pregunta":"Pregunta 1"
              },
              {
                 "def_ademanda_pg_ncorr":2,
                 "def_ademanda_pg_pregunta":"Pregunta 2"
              },
              {
                 "def_ademanda_pg_ncorr":3,
                 "def_ademanda_pg_pregunta":"Pregunta 3"
              }
           ]
        },
        "errores":[
           
        ],
        "status":200,
        "mensajeExito":null
    };

    return res;
}

//#region Funciones Generales

function showLoading() {
    $('#loadingOverlay').show();
}

function hideLoading() {
    $('#loadingOverlay').hide();
}

function validarNuloVacio(contenido)
{
    if (contenido == null || contenido == "")
        return false;
    else
        return true;
}

const limpiarFormulario = (querySelector) =>
{
    Array.from($(querySelector).find(":input"))
        .filter(x => x.className.includes("form-control") && x.attributes.getNamedItem("no-limpiar") == null).forEach(x => {
            x.value = "";
        });

    Array.from($(querySelector).find("select"))
        .filter(x => x.attributes.getNamedItem("no-limpiar") == null).forEach(x => {
            $(`${querySelector} [name='${x.name}']`).find("option:first-child").prop("selected", true).trigger("chosen:updated");
        });
};

function limpiarCombobox(querySelector) {
    $(querySelector + ' option[value!=""]').remove().end();    // Remueve todos los options excepto el seleccione
    $(querySelector).trigger("chosen:updated");
}

function llenarCombobox(querySelector, arreglo)
{
    if (!Array.isArray(arreglo))
        return console.log("La función llenarCombobox debe recibir un arreglo");

    let select = $(querySelector);
    select.find("option[value!='']").remove().end();
    arreglo.forEach(x => select.append(`<option value="${x.codigo}">${x.descripcion}</option>`))  // El arreglo debe tener los elementos codigo y descripcion
    select.trigger("chosen:updated");
}

function formatearNombreArchivo(nombreArchivo)
{
    let agregarCero = (i) => {
        if (i < 10) { i = "0" + i }
        return i;
    }

    let today = new Date();
    let dia = String(today.getDate()).padStart(2, "0");
    let mes = String(today.getMonth() + 1).padStart(2, "0");
    let anio = today.getFullYear();
    let hora = agregarCero(today.getHours());
    let minuto = agregarCero(today.getMinutes());
    let segundo = agregarCero(today.getSeconds());

    return `${nombreArchivo}__${dia}${mes}${anio}_${hora}${minuto}${segundo}`;  // Estandar de nombre archivo usado en Inacap
}

function generarExcel(data, nombreArchivo)
{
    let workbook = XLSX.utils.book_new(),
        worksheet = XLSX.utils.aoa_to_sheet(data);

    workbook.SheetNames.push("Hoja 1");
    workbook.Sheets["Hoja 1"] = worksheet;

    let xlsbin = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary"
    });

    let buffer = new ArrayBuffer(xlsbin.length),
        array = new Uint8Array(buffer);

    for (let i = 0; i < xlsbin.length; i++) {
        array[i] = xlsbin.charCodeAt(i) & 0XFF;
    }

    let xlsblob = new Blob([buffer], { type: "application/octet-stream" });
    delete array; delete buffer; delete xlsbin;

    let url = window.URL.createObjectURL(xlsblob),
        anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${nombreArchivo}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
    delete anchor;
}

function habilitarDeshabilitarElementos(datos)
{
    // habilitarDeshabilitarElementos({ querySelector: "#ModalEditar", habilitado: false });

	Array.from($(datos.querySelector).find(":input"))
	.filter(x => x.tagName != null && !x.tagName.toLowerCase().includes("button"))
	.forEach(x => x.disabled = !datos.habilitado);
	
    Array.from($(datos.querySelector).find("select")).forEach(x => 
	{
        let selector = $(`${datos.querySelector} [name='${x.name}']`);
		
		if (datos.habilitado) 
			selector.removeAttr("disabled");
		else 
			selector.attr("disabled", "disabled");
		
		selector.trigger("chosen:updated");
    });
	
	Array.from($(datos.querySelector).find(":button")).filter(x => x.textContent != null).forEach(x => 
	{
        let texto = x.textContent.toLowerCase();
		
		if (
            texto.includes("guardar") || texto.includes("insertar") || texto.includes("agregar") ||
            texto.includes("actualizar") || texto.includes("cambiar") || texto.includes("editar") ||
            texto.includes("eliminar") || texto.includes("quitar") || texto.includes("remover")
		) 
		{
			if (datos.habilitado) {
				x.disabled = false;
				x.setAttribute("class", "btn btn-default waves-effect waves-light");  // Oscurece botón
			}
			else {
				x.disabled = true; 
				x.setAttribute("class", "btn");  // Aclara botón
			}
		}		
	});
}

//#endregion Funciones Generales