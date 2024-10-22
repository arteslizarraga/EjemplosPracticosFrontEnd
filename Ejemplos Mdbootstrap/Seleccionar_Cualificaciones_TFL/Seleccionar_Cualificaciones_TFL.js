// Configuraciones Generales

//Incrementar Tamaño de Fuente
$('#appBody').adjustFontSize();  

//Menu mobile
const   navbar = document.getElementById("offCanvas"),
        overlay = document.querySelector(".navbar-overlay"),
        navbarItems = document.querySelectorAll(".nav-item");


function openNav() {
    navbar.classList.add("navbar-offcanvas--visible");
    overlay.style.display = "block";
    $(navbarItems).each(function () {
        $(this).css("display", "block");
    });
}
 
function closeNav() {
    navbar.classList.remove("navbar-offcanvas--visible");
    overlay.style.display = "none";
    $(navbarItems).each(function () {
        $(this).css("display", "none");
    });
}

//============================================================================================>>>>>>>

$(document).ready(function () 
{
    $("body").tooltip({ selector: "[data-toggle=tooltip]", trigger: "hover" });  // Habilitar tooltips

    $(".chosen-select").chosen({
        disable_search_threshold: 10,
        no_results_text: "Sin Resultados para: ",
        width: "100%"
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('.mdb-select').material_select();
    
    $("#fechaEfectiva").datepicker({
      language: 'es',
      autoClose: true
    });
});

function buscarCualificaciones() 
{
  let card = $("#buscar");

  let params = {
    periodoVigencia: card.find("[name='periodoVigencia']").val(),
    direccionSectorial: card.find("[name='direccionSectorial']").val(),
    area: card.find("[name='area']").val(),
    tfl: card.find("[name='tfl']").val(),
    fechaEfectiva: card.find("[name='fechaEfectiva']").val(),
    sectorProductivo: card.find("[name='sectorProductivo']").val(),
    subSectorProductivo: card.find("[name='subSectorProductivo']").val(),
    ruta: card.find("[name='ruta']").val()
  };  

  /*
  console.log(params); 

  if (!validarNuloVacio(params.tfl))
    return toastr.error("La TFL es requerida");  

  if (!validarNuloVacio(params.sectorProductivo))
    return toastr.error("El sector productivo es requerido"); 
  */

  // Si la TFL seleccionada tiene cualificaciones asociadas y ya está publicada, debe aparecer un mensaje de que no se puede continuar porque ya está publicada

  buscar(params).then(() => 
  {
    limpiarFormulario("#buscar"); 
    document.querySelector("#resultados").style.display = "block";
    document.querySelector("#buscar").style.display = "none"; 

    let probandoTexto = "CAMBIAR TEXTO";
    let card = $("#card-mostrar-filtros-seleccionados");

    card.find("[name='sectorProductivo']").html(probandoTexto);
    card.find("[name='subSectorProductivo']").html(probandoTexto);
    card.find("[name='rutaFormativoLaboral']").html(probandoTexto);
  })
  .catch(ex => toastr(ex));
}

async function abrirModalVerCualificacionesSeleccionadas() 
{
  let datos = [
    { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" },
    { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" },
    { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" }, { ejemplo: "CAMBIAR" }
  ];

  await construirGrillaVerCualificacionesSeleccionadas(datos);
  hideLoading();
  $("#ModalVerCualificacionesSeleccionadas").modal("show");
}

function construirGrillaVerCualificacionesSeleccionadas(perfilesOcupacionalesCualificacion)
{
    let limitarTextoCelda = (descripcion, size = 40) => (descripcion.length > size) ?
        `<container data-toggle="tooltip" data-placement="top" title="${descripcion}" style="cursor: pointer">${descripcion.slice(0, size)} ...</container>`
        : descripcion;

    return new Promise((resolve, reject) =>
    {
        $("#TablaVerCualificacionesSeleccionadas").DataTable({
            data: perfilesOcupacionalesCualificacion,
            destroy: true,
            pageLength: 10,
            dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
            //scrollY: "60vh",
            //scrollX: true,  // Si la tabla tiene poco tamaño hacia el lado, esto hace que se vea pequeña
            //lengthMenu: [[10, 20, 30], [10, 20, 30]],
            bLengthChange: false, // Oculta el select de registros por página
            columnDefs: [],
            aaSorting: [],
            processing: true,
            //serverSide: true, 
            filter: true,
            orderMulti: false,
            responsive: true,
            columns: [
                { "className": "text-nowrap", "render": (data, type, row, meta) => limitarTextoCelda(row.ejemplo) },
                { "className": "text-nowrap", "render": (data, type, row, meta) => limitarTextoCelda(row.ejemplo) },
                { "className": "text-nowrap", "render": (data, type, row, meta) => limitarTextoCelda(row.ejemplo) },
                { "className": "text-nowrap", "render": (data, type, row, meta) => limitarTextoCelda(row.ejemplo) }
            ]
        });

        setTimeout(() => resolve(true), 800);
    });
}

function guardarPublicar()
{
  toastr.success('Datos publicados con Éxito');
}

const 
  bread = document.querySelector('.breadcrumb'),
  breadLast = document.querySelector('.breadcrumb span.active');


function validarDisponibilidad_TFL(tfl_ncorr)
{
  return new Promise((resolve, reject) =>
  {
    resolve(true);
  });
} 

function validar_TFL_Seleccionada_Filtro()
{
  // console.log("Se valida si la TFL seleccionada tiene cualificaciones asociadas o no");
  // Si la TFL seleccionada tiene cualificaciones asociadas y ya está publicada, debe aparecer un mensaje de que no se puede continuar porque ya está publicada

  /*
  let tfl = $("#buscar [name='tfl']").val();

  if (!validarNuloVacio(tfl))
    return toastr.error("Es necesario seleccionar una TFL");  
  */ 

  abrirItemAcordeon("#collapse2");
}

function abrirItemAcordeon(querySelectorItem) {
  // console.log(querySelectorItem);          
  $(querySelectorItem).collapse("toggle");
}

function guardarBorrador_y_buscar()
{
  console.log("guardarBorrador_y_buscar");

  document.querySelector("#buscar").style.display = "block";
  document.querySelector("#resultados").style.display = "none"; 
  hideLoading();
  toastr.success('Borrador Guardado con Éxito');
}

function guardarBorrador()
{
  toastr.success('Borrador Guardado con Éxito');
}

async function abrirModalPerfiles(idCualificacion)
{
  let o = {
    cualificacion: {
      cualificaciones_nombre: "CAMBIAR",
      cualificaciones_version: "CAMBIAR",
      DEF_SPRODUCTIVOS_NOMBRE: "CAMBIAR",
      DEF_SSPRODUCTIVOS_NOMBRE: "CAMBIAR",
      cualificaciones_estado_iprosp: "CAMBIAR",
      CUALIFICACIONES_FPUBLICACION: "CAMBIAR"
    },
    perfilesOcupacionalesCualificacion: [
      { def_nmctp_numero: "CAMBIAR", def_pocupacionales_ccod: "CAMBIAR", def_pocupacionales_Nombre: "CAMBIAR", pocupacionales_cualificacion_estado: "CAMBIAR" },
      { def_nmctp_numero: "CAMBIAR", def_pocupacionales_ccod: "CAMBIAR", def_pocupacionales_Nombre: "CAMBIAR", pocupacionales_cualificacion_estado: "CAMBIAR" },
      { def_nmctp_numero: "CAMBIAR", def_pocupacionales_ccod: "CAMBIAR", def_pocupacionales_Nombre: "CAMBIAR", pocupacionales_cualificacion_estado: "CAMBIAR" },
      { def_nmctp_numero: "CAMBIAR", def_pocupacionales_ccod: "CAMBIAR", def_pocupacionales_Nombre: "CAMBIAR", pocupacionales_cualificacion_estado: "CAMBIAR" },
      { def_nmctp_numero: "CAMBIAR", def_pocupacionales_ccod: "CAMBIAR", def_pocupacionales_Nombre: "CAMBIAR", pocupacionales_cualificacion_estado: "CAMBIAR" },
      { def_nmctp_numero: "CAMBIAR", def_pocupacionales_ccod: "CAMBIAR", def_pocupacionales_Nombre: "CAMBIAR", pocupacionales_cualificacion_estado: "CAMBIAR" },
      { def_nmctp_numero: "CAMBIAR", def_pocupacionales_ccod: "CAMBIAR", def_pocupacionales_Nombre: "CAMBIAR", pocupacionales_cualificacion_estado: "CAMBIAR" },
      { def_nmctp_numero: "CAMBIAR", def_pocupacionales_ccod: "CAMBIAR", def_pocupacionales_Nombre: "CAMBIAR", pocupacionales_cualificacion_estado: "CAMBIAR" },
      { def_nmctp_numero: "CAMBIAR", def_pocupacionales_ccod: "CAMBIAR", def_pocupacionales_Nombre: "CAMBIAR", pocupacionales_cualificacion_estado: "CAMBIAR" },
      { def_nmctp_numero: "CAMBIAR", def_pocupacionales_ccod: "CAMBIAR", def_pocupacionales_Nombre: "CAMBIAR", pocupacionales_cualificacion_estado: "CAMBIAR" },
      { def_nmctp_numero: "CAMBIAR", def_pocupacionales_ccod: "CAMBIAR", def_pocupacionales_Nombre: "CAMBIAR", pocupacionales_cualificacion_estado: "CAMBIAR" },
      { def_nmctp_numero: "CAMBIAR", def_pocupacionales_ccod: "CAMBIAR", def_pocupacionales_Nombre: "CAMBIAR", pocupacionales_cualificacion_estado: "CAMBIAR" }
    ]
  };

  let c = o.cualificacion;

  $("#ModalPerfiles [name='cualificacion']").text(c.cualificaciones_nombre);
  $("#ModalPerfiles [name='versionCualificacion']").text(c.cualificaciones_version);
  $("#ModalPerfiles [name='sectorProductivo']").text(c.DEF_SPRODUCTIVOS_NOMBRE);
  $("#ModalPerfiles [name='subSectorProductivo']").text(c.DEF_SSPRODUCTIVOS_NOMBRE);
  $("#ModalPerfiles [name='estadoCualificacion']").text(c.cualificaciones_estado_iprosp);
  $("#ModalPerfiles [name='fechaPublicacion']").text(c.CUALIFICACIONES_FPUBLICACION);

  await construirGrillaPerfilesOcupacionalesCualificacion(o.perfilesOcupacionalesCualificacion);
  hideLoading();
  $("#ModalPerfiles").modal("show");
}

function construirGrillaPerfilesOcupacionalesCualificacion(perfilesOcupacionalesCualificacion)
{
    let limitarTextoCelda = (descripcion, size = 40) => (descripcion.length > size) ?
        `<container data-toggle="tooltip" data-placement="top" title="${descripcion}" style="cursor: pointer">${descripcion.slice(0, size)} ...</container>`
        : descripcion;

    return new Promise((resolve, reject) =>
    {
        $("#TablaModalPerfiles").DataTable({
            data: perfilesOcupacionalesCualificacion,
            destroy: true,
            pageLength: 10,
            dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
            //scrollY: "60vh",
            //scrollX: true,  // Si la tabla tiene poco tamaño hacia el lado, esto hace que se vea pequeña
            //lengthMenu: [[10, 20, 30], [10, 20, 30]],
            bLengthChange: false, // Oculta el select de registros por página
            columnDefs: [],
            aaSorting: [],
            processing: true,
            //serverSide: true, 
            filter: true,
            orderMulti: false,
            responsive: true,
            columns: [
                { "className": "text-nowrap", "render": (data, type, row, meta) => limitarTextoCelda(row.def_nmctp_numero) },
                { "className": "text-nowrap", "render": (data, type, row, meta) => limitarTextoCelda(row.def_pocupacionales_ccod) },
                { "className": "text-nowrap", "render": (data, type, row, meta) => limitarTextoCelda(row.def_pocupacionales_Nombre) },
                { "className": "text-nowrap", "render": (data, type, row, meta) => limitarTextoCelda(row.pocupacionales_cualificacion_estado) }
            ]
        });
        //.on("draw", () => { resolve(true); });

        setTimeout(() => resolve(true), 800);
    });
}

function abrirModalDetalle(idCualificacion)
{
  let o = {
    tituloModal: "CAMBIAR",
    listaPoblarDetalle: [
      { titulo: "Código Cualificación", contenido: "CAMBIAR" },
      { titulo: "Nombre Cualificación", contenido: "CAMBIAR" },
      { titulo: "Versión Cualificación", contenido: "CAMBIAR" },
      { titulo: "Estado Cualificación", contenido: "CAMBIAR" }, 
      { titulo: "Fecha Publicación de la Versión", contenido: "CAMBIAR" },
      { titulo: "Descripción General Cualificación", col: "col-12", contenido: "CAMBIAR" },
      { titulo: "Descripción Escenario y Condiciones Laborales", col: "col-12", contenido: "CAMBIAR" },
      { titulo: "Descripción Campo Laboral", col: "col-12", contenido: "CAMBIAR" },
      { titulo: "Descripción Situación de Desempeño", col: "col-12", contenido: "CAMBIAR" },
      { titulo: "Descripción Equipamiento e Infraestructura", col: "col-12", contenido: "CAMBIAR" },
      { titulo: "Es Perfil Ocupacional?", contenido: "CAMBIAR" },
      
      { titulo: "Código Definición Tipo Nivel del MCTP", contenido: "CAMBIAR" },
      { titulo: "Definición Nivel del MCTP", contenido: "CAMBIAR" },
      { titulo: "Sub Nivel MCTP", contenido: "CAMBIAR" },
      { titulo: "Sector Productivo Preferente", contenido: "CAMBIAR" },
      { titulo: "Sub Sector Productivo Preferente", contenido: "CAMBIAR" },
      { titulo: "País", contenido: "CAMBIAR" }
    ]
  };

  $("#ModalDetalle [name='tituloModal']").text(o.tituloModal);

  let cadena = o.listaPoblarDetalle.map(x =>
  {
      let tieneContenido = (x.contenido != null && x.contenido != "");
      let contenido = tieneContenido ? x.contenido : "- - -";

      return `
      <div class="${x.col != null && tieneContenido ? x.col : "col-12 col-md-4"}">
          <div class="md-form">
              <p name="">${contenido}</p>
              <label class="active">${x.titulo}</label>
          </div>
      </div>
      `;
  }).join("");

  document.getElementById("ver-detalle-cualificacion").innerHTML = cadena;

  $("#ModalDetalle").modal("show");
}

//=====================================================================================================>>>>>
// Funciones Generales

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

function mostrarErroresRespuestaBackend(res)
{
    if (res.status == 400)  // Si es Bad Request
    {
        res.errores.forEach(error => toastr.error(error));
    }

    if (res.status == 401)
    {
        res.errores.forEach(error => toastr.error(error));
    }

    if (res.status == 500)  // Si es Internal Server Error
    {
        let modalError = $("#ModalError");

        if (modalError.length && modalError.find("[name='mensaje-error']").length)
        {
            modalError.modal("show");
            modalError.find("[name='mensaje-error']").html("");  // Limpia mensajes anteriores

            let cadena = "";

            res.errores.forEach(error => cadena += `${error} <br/>`);
            modalError.find("[name='mensaje-error']").html(cadena);
        }
        else {
            console.log("No se encontró el modal para desplegar los errores");
            res.errores.forEach(error => toastr.error(error));
        }
    }
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



