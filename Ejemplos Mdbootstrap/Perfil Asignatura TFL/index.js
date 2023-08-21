let usarDatosDummy = true;  // false;

this.servicio = new AsignaturasService();
this.servicioCombobox = new ComboboxService();

let sePuedeModificar = true;

this.listaObjetos = [];
this.objeto = {};
this.indexDetalle = null;

this.listaObjetosFiltrada = [];

this.tfl = 0;
this.fechaEfectivaTfl = 0;
this.def_productos_ncorr = 0;

this.asig_tfl_ccod = null;   // Se usa desde el grabar

this.infoCombobox = {};                             // 3-8-2023

$(document).ready(function() 
{
    // Activar selects
    $(".chosen-select").chosen({ disable_search_threshold: 10, no_results_text: "Sin Resultados para: ", width: "100%" });
    $(".mdb-select").material_select();

    $('[data-toggle="tooltip"]').tooltip();

    $("#editar [name='asignaturas_fefectiva']").datepicker({ language: "es", autoClose: true });
});

(() =>   // PRUEBA
{
    mostrarCardEditar(
        422,    // def_tfl_ncorr
        142,    // def_productos_ncorr
        122,    // def_pacademico_ncorr
        'B101'  // asig_tfl_ccod
    );

})();

//==========================================================================================================================================>>>>>>

let limitarTextoCelda = (descripcion, size = 40) =>
{
    if (descripcion != null && typeof descripcion === "string")
    {
        if (descripcion.includes("\\n")) descripcion = descripcion.split("\\n").join("\n");   // Reemplaza saltos de línea con doble backslash por uno normal

        if (descripcion.includes("\r"))  descripcion = descripcion.split("\r").join("\n");

        if (descripcion.length > size)
        {
            let titulo = descripcion;   // El título sí puede contener <br>
            if (titulo.includes("\"")) titulo = titulo.replaceAll("\"", "&quot;");  // Reemplaza comillas dobles por &quot;
            if (titulo.includes("\n")) titulo = titulo.split("\n").join("<br/>");

            return `<container data-html="true" data-toggle="tooltip" data-placement="top" title="${titulo}" style="cursor: pointer">${descripcion.slice(0, size)} ...</container>`;
        }
    }

    return descripcion
};

//==========================================================================================================================================>>>>>>

//#region Perfil Docente

function construirGrillaPerfilDocente()
{
    document.querySelector("#TablaPerfilDocente").innerHTML = `
    <table id="TablaPerfilDocente" class="table table-periodo table-hover table-striped table-bordered m-0">
        <thead>
            <tr>
                <th>Preferencia</th>
                <th>Título Profesional</th>
                <th>Grado Académico</th>
                <th>Experiencia Docente</th>
                <th>Experiencia Profesional</th>
                <th style="width: 200px">Acciones</th>
            </tr>
        </thead>
        <tbody>

            ${this.objeto.listaPerfilDocente.map((x, index) =>
            {
                return `
                <tr>
                    <td class="text-nowrap" valign="top">${x.preferencia}</td>
                    <td class="text-nowrap" valign="top">${x.tituloProfesional}</td>
                    <td class="text-nowrap" valign="top">${x.gradoAcademico}</td>
                    <td class="text-nowrap" valign="top">${x.experienciaDocente}</td>
                    <td class="text-nowrap" valign="top">${x.experienciaProfesional}</td>
                    <td class="text-nowrap" valign="top">

                        <button type="button" onclick="abrirModalPerfilDocente(${index})" class="mr-0 mr-md-4 d-flex align-items-center float-left">
                            <i class="material-icons mr-1 icon-lg grey-text">assignment</i>
                            <span class="d-none d-md-inline">Editar</span>
                        </button>

                        <button type="button" onclick="abrirModalEliminarPerfilDocente(${index})" class="mr-0 mr-md-4 d-flex align-items-center float-left">
                            <i class="material-icons mr-1 icon-lg grey-text">delete</i>
                            <span class="d-none d-md-inline">Eliminar</span>
                        </button>
                    </td>
                </tr>
                `;
            }).join("")}

        </tbody>
    </table>
    `;
}

function abrirModalPerfilDocente(index = null)
{
    this.indexDetalle = index;
    limpiarFormulario("#ModalPerfilDocente");
    let modal = $("#ModalPerfilDocente");

    let preferencia = null;
    let esas_ncorr_tit = null;
    let esas_ncorr_gra = null;

    let arregloPreferencias = [1];

    if (Array.isArray(this.objeto.listaPerfilDocente) && this.objeto.listaPerfilDocente.some(x => x.preferencia))
    {
        arregloPreferencias = [...new Set(this.objeto.listaPerfilDocente.map(x => x.preferencia))];   // Elimina duplicados
        arregloPreferencias.sort((a, b) => a - b);

        let nuevaPreferencia = arregloPreferencias.reduce((prev, current) => (prev > current) ? prev : current) + 1;
        arregloPreferencias.push(nuevaPreferencia);
    }

    if (index != null)
    {
        let elemento = this.objeto.listaPerfilDocente[index];

        modal.find("[name='experienciaDocente']").val(elemento.experienciaDocente);
        modal.find("[name='experienciaProfesional']").val(elemento.experienciaProfesional);

        esas_ncorr_tit = elemento.esas_ncorr_tit;
        esas_ncorr_gra = elemento.esas_ncorr_gra;
        preferencia = elemento.preferencia;
    }

    llenarSelect({
        querySelector: "#ModalPerfilDocente [name='preferencia']",
        data: arregloPreferencias.map(x => {
            return { codigo: x, descripcion: x }
        }),
        selectedValue: preferencia,
        onchange: (e) => {
            //console.log(`value: ${e.value} | text: ${e.text}`);
            console.log(e.value);
        }
    });

    llenarSelect({
        querySelector: "#ModalPerfilDocente [name='tituloProfesional']",
        data: this.infoCombobox.tituloProfesional,
        selectedValue: esas_ncorr_tit,
        onchange: (e) => {
            //console.log(`value: ${e.value} | text: ${e.text}`);
            console.log(e.value);
        }
    });

    llenarSelect({
        querySelector: "#ModalPerfilDocente [name='gradoAcademico']",
        data: this.infoCombobox.gradoAcademico,
        selectedValue: esas_ncorr_gra,
        onchange: (e) => {
            //console.log(`value: ${e.value} | text: ${e.text}`);
            console.log(e.value);
        }
    });

    modal.modal("show");
    habilitarDeshabilitarElementos({ querySelector: "#ModalPerfilDocente", habilitado: sePuedeModificar });

    /*
    tituloProfesional       ->  Selector
    gradoAcademico          ->  Selector
    experienciaDocente
    experienciaProfesional
    certificadoHabilitante          (Desconocido)
    dominioHerramientaEspecifica    (Desconocido)
    */
}

function guardarPerfilDocente()
{
    let modal = $("#ModalPerfilDocente");

    let preferencia = modal.find("[name='preferencia']").val();
    let tituloProfesional = modal.find("[name='tituloProfesional'] option:selected").text();
    let esas_ncorr_tit = modal.find("[name='tituloProfesional']").val();

    let gradoAcademico = modal.find("[name='gradoAcademico'] option:selected").text();
    let esas_ncorr_gra = modal.find("[name='gradoAcademico']").val();

    let experienciaDocente = modal.find("[name='experienciaDocente']").val();
    let experienciaProfesional = modal.find("[name='experienciaProfesional']").val();

    let errores = [];

    if (!validarNuloVacio(preferencia))
        errores.push("Preferencia es requerida");

    if (!validarNuloVacio(esas_ncorr_tit))
        errores.push("Título profesional es requerido");

    if (!validarNuloVacio(esas_ncorr_gra))
        errores.push("Grado académico es requerido");

    if (!validarNuloVacio(experienciaDocente))
        errores.push("Años de Experiencia Docente es requerido");

    if (!validarNuloVacio(experienciaProfesional))
        errores.push("Años de Experiencia Profesional es requerido");

    if (errores.length > 0) {
        errores.reverse().forEach(x => toastr.error(x));
        return;
    }

    if (this.indexDetalle != null)  // Actualizar
    {
        let elemento = this.objeto.listaPerfilDocente[this.indexDetalle];
        elemento.preferencia = parseInt(preferencia);

        elemento.tituloProfesional = tituloProfesional;
        elemento.esas_ncorr_tit = esas_ncorr_tit;

        elemento.gradoAcademico = gradoAcademico;
        elemento.esas_ncorr_gra = esas_ncorr_gra;

        elemento.experienciaDocente = experienciaDocente;
        elemento.experienciaProfesional = experienciaProfesional;
    }
    else  // Insertar
    {
        this.objeto.listaPerfilDocente.push({
            preferencia: parseInt(preferencia),

            tituloProfesional,
            esas_ncorr_tit,

            gradoAcademico,
            esas_ncorr_gra,

            experienciaDocente,
            experienciaProfesional
        });
    }

    construirGrillaPerfilDocente();
    cerrarModal("#ModalPerfilDocente");
}

function abrirModalEliminarPerfilDocente(index)
{
    if (!sePuedeModificar) return;

    this.index = index;
    let opcionConfirm = confirm("Desea realmente eliminar este elemento");

    if (opcionConfirm == true)
        eliminarPerfilDocente();
}

function eliminarPerfilDocente()
{
    this.objeto.listaPerfilDocente.splice(this.index, 1);
    construirGrillaPerfilDocente();
}

//#endregion Perfil Docente

//#region Elaboración

function construirGrillaElaboracion()
{
    document.querySelector("#TablaElaboracion").innerHTML = `
    <table id="TablaElaboracion" class="table table-periodo table-hover table-striped table-bordered m-0">
        <thead>
            <tr>
                <th>Nombre Especialista Elaborador</th>
                <th>Sede</th>
                <th>Mail</th>
                <th style="width: 200px">Acciones</th>
            </tr>
        </thead>
        <tbody>

            ${this.objeto.listaElaboracion.map((x, index) =>
            {
                return `
                <tr>
                    <td class="text-nowrap" valign="top">${x.nombreEspecialistaElaborador}</td>
                    <td class="text-nowrap" valign="top">${x.sede}</td>
                    <td class="text-nowrap" valign="top">${x.mail}</td>
                    <td class="text-nowrap" valign="top">

                        <button type="button" onclick="abrirModalElaboracion(${index})" class="mr-0 mr-md-4 d-flex align-items-center float-left">
                            <i class="material-icons mr-1 icon-lg grey-text">assignment</i>
                            <span class="d-none d-md-inline">Editar</span>
                        </button>

                        <button type="button" onclick="abrirModalEliminarElaboracion(${index})" class="mr-0 mr-md-4 d-flex align-items-center float-left">
                            <i class="material-icons mr-1 icon-lg grey-text">delete</i>
                            <span class="d-none d-md-inline">Eliminar</span>
                        </button>

                    </td>
                </tr>
                `;
            }).join("")}

        </tbody>
    </table>
    `;
}

function abrirModalElaboracion(index = null)
{
    this.indexDetalle = index;
    limpiarFormulario("#ModalElaboracion");
    let modal = $("#ModalElaboracion");

    let sede_ccod = null;

    if (index != null)
    {
        let elemento = this.objeto.listaElaboracion[index];
        modal.find("[name='nombreEspecialistaElaborador']").val(elemento.nombreEspecialistaElaborador);
        modal.find("[name='mail']").val(elemento.mail);

        sede_ccod = elemento.sede_ccod;
    }

    llenarSelect({
        querySelector: "#ModalElaboracion [name='sede']",
        data: this.infoCombobox.sedes,
        selectedValue: sede_ccod,
        onchange: (e) => {
            //console.log(`value: ${e.value} | text: ${e.text}`);
            console.log(e.value);
        }
    });

    modal.modal("show");
    habilitarDeshabilitarElementos({ querySelector: "#ModalElaboracion", habilitado: sePuedeModificar });
}

function guardarElaboracion()
{
    let modal = $("#ModalElaboracion");

    let validarEmail = (email) => {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    let nombreEspecialistaElaborador = modal.find("[name='nombreEspecialistaElaborador']").val();
    let mail = modal.find("[name='mail']").val();
    let sede = modal.find("[name='sede'] option:selected").text();
    let sede_ccod = modal.find("[name='sede']").val();

    let errores = [];

    if (!validarNuloVacio(nombreEspecialistaElaborador))
        errores.push("Nombre especialista elaborador es requerido");

    if (!validarNuloVacio(sede_ccod))
        errores.push("Sede es requerida");

    if (!validarNuloVacio(mail))
        errores.push("Email es requerido");
    else
    {
        if (!validarEmail(mail))
            errores.push("El Email no es válido");
    }

    if (errores.length > 0) {
        errores.reverse().forEach(x => toastr.error(x));
        return;
    }

    if (this.indexDetalle != null)  // Actualizar
    {
        let elemento = this.objeto.listaElaboracion[this.indexDetalle];
        elemento.nombreEspecialistaElaborador = nombreEspecialistaElaborador;
        elemento.sede = sede;
        elemento.sede_ccod = sede_ccod;
        elemento.mail = mail;
    }
    else  // Insertar
    {
        this.objeto.listaElaboracion.push({
            nombreEspecialistaElaborador,
            sede,
            sede_ccod,
            mail
        });
    }

    construirGrillaElaboracion();
    cerrarModal("#ModalElaboracion");
}

function abrirModalEliminarElaboracion(index)
{
    if (!sePuedeModificar) return;

    this.index = index;
    let opcionConfirm = confirm("Desea realmente eliminar este elemento");

    if (opcionConfirm == true)
        eliminarElaboracion();
}

function eliminarElaboracion()
{
    this.objeto.listaElaboracion.splice(this.index, 1);
    construirGrillaElaboracion();
}

//#endregion Elaboración

async function mostrarCardEditar(def_tfl_ncorr, def_productos_ncorr, def_pacademico_ncorr, asig_tfl_ccod)
{
    document.querySelector("#editar").style.display = "block";

    limpiarFormulario("#editar");                           // Limpia inputs, textareas y selectores
    definirMensaje({ mostrar: false });                     // Limpia mensaje
    $("#editar [name='fechaPublicacion']").html("-");       // Limpia fecha de publicación
    $("#editar [name='asignaturas_estado']").html("-");     // Limpia estado

    showLoading();

    try
    {
        this.asig_tfl_ccod = asig_tfl_ccod;

        let res = await this.servicio.obtenerDatosCardEditar(
            def_tfl_ncorr,
            def_productos_ncorr,
            def_pacademico_ncorr,
            this.asig_tfl_ccod
        );

        //console.log(JSON.stringify(res));

        this.objeto = res.objetoDesplegar;
        this.infoCombobox = res.infoCombobox;

        let optionsSelectoresDependientes = res.optionsSelectoresDependientes;

        //=======================================================================================================>>>>>
        // Cabecera del Editar

        let filtro = $("#itemAcordeonBuscar");
        let programaFormacion = filtro.find("[name='defProductosNcorr'] option:selected").text();
        let programaAcademico = filtro.find("[name='programaAcademico'] option:selected").text();

        $("#editar [name='programaDeFormacion']").html(programaFormacion);
        $("#editar [name='programaAcademico']").html(programaAcademico);

        if (validarNuloVacio(res.fechaPublicacion))
            $("#editar [name='fechaPublicacion']").html(res.fechaPublicacion);

        let asignaturas_fefectiva = validarNuloVacio(this.objeto.asignaturas_fefectiva) ? this.objeto.asignaturas_fefectiva : "";
        $("#editar [name='asignaturas_fefectiva']").val(asignaturas_fefectiva);

        /*
        // Por defecto deja el selector como Inactivo
        let asignaturas_estado = validarNuloVacio(this.objeto.asignaturas_estado) ?
            (this.objeto.asignaturas_estado.toUpperCase().startsWith("A") ? "A" : "I")
            : "I";

        $("#editar [name='asignaturas_estado']").val(asignaturas_estado).trigger("chosen:updated");
        */

        $("#editar [name='asig_tfl_ccod']").html(asig_tfl_ccod);
        $("#editar [name='asignaturas_estado']").html(this.objeto.asignaturas_estado);

        //=======================================================================================================>>>>>
        // Definir mensaje de si se puede editar o no

        let statusPublicacion = res.statusPublicacion;
        let mensaje = res.mensaje;
        
        if (statusPublicacion == "PUBLICADA_CON_DATOS")
        {
            sePuedeModificar = false;
            definirMensaje({ mostrar: true, icono: "lock", mensaje });
        }
        else if (statusPublicacion == "NO_PUBLICADA_CON_DATOS" || statusPublicacion == "SIN_DATOS")
        {
            sePuedeModificar = true;
            definirMensaje({ mostrar: false });
        }
        else {
            definirMensaje({ mostrar: false });
        }

        // Deshabilitar elementos si está publicado
        //Array.from(document.querySelectorAll(".deshabilitar-publicado")).forEach(x => x.disabled = !sePuedeModificar);

        // Habilita / Deshabilita   ->  #editar     -> Dependiendo de si se puede modificar o no
        habilitarDeshabilitarElementos({ querySelector: "#editar", habilitado: sePuedeModificar });

        //=======================================================================================================>>>>>
        // Definir maxlength de textareas e inputs

        let arregloMaxlength = [
	        { nombre: "nombreAsignatura", maxlength: 100 }, 
	        { nombre: "horasPresenciales", maxlength: 3 }, 
	        { nombre: "horasOnline", maxlength: 3 }, 
	        { nombre: "horasTotales", maxlength: 3 }, 
	        { nombre: "horasAula", maxlength: 3 }, 
	        { nombre: "horasLaboratorio", maxlength: 3 }, 
	        { nombre: "horasTaller", maxlength: 3 }, 
	        { nombre: "horasTerreno", maxlength: 3 }, 
	        { nombre: "horasCampoClinico", maxlength: 3 }, 
	        { nombre: "horasSincronicas", maxlength: 3 }, 
	        { nombre: "horasAsincronicas", maxlength: 3 }, 
	        { nombre: "seccionMaximoHrs", maxlength: 6 },
	        { nombre: "contenidosMinimos", maxlength: 4000 }, 
	        { nombre: "horasUsoEquipamiento", maxlength: 6 }, 
	        { nombre: "horasUsoSoftware", maxlength: 6 }, 
	        { nombre: "certificacionesHabilitantes", maxlength: 500 }, 
          { nombre: "dominioHerramientas", maxlength: 500 },
          { nombre: "observaciones", maxlength: 500 }
        ];

        arregloMaxlength.forEach(x => 
        {
	        let element = $(`#editar [name='${x.nombre}']`)[0];
	        element.setAttribute("maxlength", x.maxlength);
	        //console.log(element.getAttribute("maxlength"));
        });

        //=======================================================================================================>>>>>
        // Asignar valor a Inputs

        for (let [key, value] of Object.entries(this.objeto )) 
        {
	        if (validarNuloVacio(value) && !Array.isArray(value))
	        {
                let input = document.querySelector(`#editar [name='${key}']`);
		
		        if (input != null)
			        input.value = value;
	        }
        }

        //=======================================================================================================>>>>>
        // Acordeón -> Programa de Formación

        document.querySelector("#TablaProgramaFormacion").innerHTML = `
        <table id="TablaProgramaFormacion" class="table table-periodo table-hover table-striped table-bordered m-0" width="100%">
            <thead>
                <tr>
                    <th>Programa Formación</th>
                    <th>Programa Académico</th>
                    <th>Periocidad</th>
                    <th>Número de Período</th>
                    <th>Competencia Técnica del Egreso</th>
                </tr>
            </thead>
            <tbody>
                ${this.objeto.listaProgramaFormacion.map(x =>
                {
                    return `
                    <tr>
                        <td class="text-nowrap" valign="top">${limitarTextoCelda(x.programaFormacion)}</td>
                        <td class="text-nowrap" valign="top">${limitarTextoCelda(x.programaAcademico)}</td>
                        <td class="text-nowrap" valign="top">${limitarTextoCelda(x.periodicidad)}</td>
                        <td class="text-nowrap" valign="top">${limitarTextoCelda(x.numeroPeriodo)}</td>
                        <td class="text-nowrap" valign="top">${limitarTextoCelda(x.competenciaTecnicaEgreso)}</td>
                    </tr>
                    `;
                }).join("")}
            </tbody>
        </table>
        `;

        // #editar [name='CAMBIAR']

        //=======================================================================================================>>>>>
        // Acordeón -> Horas

        llenarSelect({
            querySelector: "#editar [name='tipoLaboratorio']",
            multiple: true,
            data: this.infoCombobox.tipoLaboratorio,
            selectedValue: this.objeto.tipoLaboratorio
        });

        llenarSelect({
            querySelector: "#editar [name='tipoTaller']",
            multiple: true,
            data: this.infoCombobox.tipoTaller,
            selectedValue: this.objeto.tipoTaller
        });

        //=======================================================================================================>>>>>
        // Acordeón -> General

        llenarSelect({
            querySelector: "#editar [name='modalidad']",
            data: this.infoCombobox.modalidad,
            selectedValue: this.objeto.modalidad
        });

        llenarSelect({
            querySelector: "#editar [name='tipoAsignatura']",
            data: this.infoCombobox.tipoAsignatura,
            selectedValue: this.objeto.tipoAsignatura
        });

        llenarSelect({
            querySelector: "#editar [name='areaFormativa']",
            data: this.infoCombobox.areaFormativa,
            selectedValue: this.objeto.areaFormativa,  //"2",
            onchange: (e) =>
            {
                limpiarCombobox("#editar [name='funcionAsignatura']");

                if (validarNuloVacio(e.value))
                {
                    let p_tcla_tdesc = e.text;      // Debe ser el texto del Área Formativa
                    showLoading();

                    this.servicioCombobox.obtenerFuncionesPorAreaFormativa(p_tcla_tdesc).then(lista => {
                        llenarCombobox("#editar [name='funcionAsignatura']", lista);
                    })
                    .catch(ex => mostrarErroresRespuestaBackend(ex))
                    .finally(() => hideLoading());
                }
            }
        });

        llenarSelect({
            querySelector: "#editar [name='funcionAsignatura']",
            data: optionsSelectoresDependientes.cboFuncionAsignatura,
            selectedValue: this.objeto.funcionAsignatura
        });

        llenarSelect({
            querySelector: "#editar [name='indicadorSeccReqMaximoHrs']",
            data: [
                { codigo: "Si", descripcion: "Si" },
                { codigo: "No", descripcion: "No" }
            ],
            selectedValue: this.objeto.indicadorSeccReqMaximoHrs
        });

        //=======================================================================================================>>>>>
        // Acordeón -> Descriptor

        $("#cualificacionesAsociadas").html(limitarTextoCelda(this.objeto.cualificacionesAsociadas));
        $("#uclsAsociadas").html(limitarTextoCelda(this.objeto.uclsAsociadas));
        $("#certificados").html(this.objeto.certificados);

        llenarSelect({
            querySelector: "#editar [name='nivelMctp']",
            data: this.infoCombobox.nivelMctp,
            selectedValue: this.objeto.nivelMctp
        });

        llenarSelect({
            querySelector: "#editar [name='clusterCompetenciasTransversales']",
            multiple: true,
            data: this.infoCombobox.clusterCompetenciasTransversales,
            selectedValue: (this.objeto.clusterCompetenciasTransversales.length > 0) ?
                this.objeto.clusterCompetenciasTransversales.map(x => `${x.ncorrCluster}`) : null,
            onchange: (e) =>
            {
                //console.log(`value: ${e.value} | text: ${e.text}`);

                limpiarCombobox("#editar [name='competencias']");

                if (Array.isArray(e.value) && e.value.length > 0)
                {
                    //============================>>>>
                    // 9-8-2023

                    this.objeto.clusterCompetenciasTransversales = e.value.map(x => {
                        return { ncorrCluster: x, listaCompetencias: [] };
                    });

                    //============================>>>>
                    // Obtener Competencias asociadas al(los) cluster seleccionado(s)

                    showLoading();
                    let p_comt_ncorr = e.value.join("|");    // [ "2", "4", "3" ].join("|")

                    this.servicioCombobox.obtenerCompetenciasPorCluster(p_comt_ncorr).then(lista =>
                    {
                        let listaProcesada = lista.map(x =>
                        {
                            return {
                                codigo: `ncorrCompetencia=${x.comp_ncorr}&ncorrCluster=${x.comt_ncorr}`,
                                descripcion: x.csubcompetencias
                            };
                        });

                        llenarSelect({ querySelector: "#editar [name='competencias']", data: listaProcesada });
                    })
                    .catch(ex => mostrarErroresRespuestaBackend(ex))
                    .finally(() => hideLoading());

                    //============================>>>>
                }
                else {
                    this.objeto.clusterCompetenciasTransversales = [];
                }
            }
        });

        let obtenerObjetoDesdeQueryString = (cadena) => 
        {
	        return cadena.split('&').reduce((acc, pair) => 
	        {
                let [key, value] = pair.split('=');
	            acc[key] = value;
	            return acc;
	        }, {});
        };

        //$("#editar [name='competencias']").materialSelect("destroy");

        llenarSelect({
            querySelector: "#editar [name='competencias']",
            data: optionsSelectoresDependientes.cboCompetencias,
            //selectedValue: this.objeto.subCompetencias,
            selectedValue: (optionsSelectoresDependientes.cboCompetencias.length > 0) ?
                optionsSelectoresDependientes.cboCompetencias.filter(x => x.selected).map(x => x.codigo)
                : [],
            onchange: (e) =>
            {
                this.objeto.clusterCompetenciasTransversales.forEach(cluster => cluster.listaCompetencias = []);  // Limpia las competencias

                if (Array.isArray(e.value))
                {
                    e.value.forEach(cadena =>  // cadena    =>   "ncorrCompetencia=13&ncorrCluster=4"
                    {
                        let obj = obtenerObjetoDesdeQueryString(cadena);   // { ncorrCompetencia: "13", ncorrCluster: "4" }
                        let clusterEncontrado = this.objeto.clusterCompetenciasTransversales.find(y => y.ncorrCluster == obj.ncorrCluster);
                        clusterEncontrado.listaCompetencias.push({ ncorrCompetencia: obj.ncorrCompetencia });
                    });
                }
            }
        });

        llenarSelect({
            querySelector: "#editar [name='estrategiasDinamicasRecomendadas']",
            multiple: true,
            data: this.infoCombobox.estrategiasDinamicasRecomendadas,
            selectedValue: this.objeto.estrategiasDinamicasRecomendadas
        });

        llenarSelect({
            querySelector: "#editar [name='tecnicasDidacticasRecomendadas']",
            multiple: true,
            data: this.infoCombobox.tecnicasDidacticasRecomendadas,
            selectedValue: this.objeto.tecnicasDidacticasRecomendadas
        });

        llenarSelect({
            querySelector: "#editar [name='asignaturasPrerrequisito']",
            multiple: true,
            data: this.infoCombobox.asignaturasPrerrequisito,
            selectedValue: this.objeto.asignaturasPrerrequisito
        });

        //=======================================================================================================>>>>>
        // Acordeón -> Estándar Académico

        llenarSelect({
            querySelector: "#editar [name='equipamientos']",
            multiple: true,
            data: this.infoCombobox.equipamientos,
            selectedValue: this.objeto.equipamientos
        });

        llenarSelect({
            querySelector: "#editar [name='insumos']",
            multiple: true,
            data: this.infoCombobox.insumos,
            selectedValue: this.objeto.insumos
        });

        //$("#editar [name='software']").materialSelect("destroy");   // Sin esto, el selector de Software no se muestra

        llenarSelect({
            querySelector: "#editar [name='software']",
            multiple: true,
            data: this.infoCombobox.software,
            selectedValue: this.objeto.software
        });

        //=======================================================================================================>>>>>
        // Acordeón -> Perfil Docente

        construirGrillaPerfilDocente();

        //=======================================================================================================>>>>>
        // Acordeón -> Elaboración

        construirGrillaElaboracion();

        //=======================================================================================================>>>>>
    }
    catch (ex) {
        if (ex.errores != null) mostrarErroresRespuestaBackend(ex);
        else toastr.error(ex);
    }
    finally {
        hideLoading();
    }
}

function construirGrilla()
{
    
}

function ModalFiltrarTablaSeleccionarItem()
{
    limpiarFormulario("#ModalFiltrarTablaSeleccionarItem");
    //limpiarCombobox("#ModalFiltrarTablaSeleccionarItem [name='uclNcorr']");   // Limpia el selector de UCL, ya que depende de la Cualificación
}

function limpiarFiltrosModalFiltrarTablaPrincipal()
{
    limpiarFormulario("#ModalFiltrarTablaPrincipal");
    //limpiarCombobox("#ModalFiltrarTablaPrincipal [name='uclNcorr']");   // Limpia el selector de UCL, ya que depende de la Cualificación
}

function volverFiltrar()
{
    document.querySelector("#buscar").style.display = "block";
    document.querySelector("#resultados").style.display = "none";
}

function guardarBorrador()
{
    showLoading();

    grabar(true).then(res => 
    {
        toastr.success(res.mensajeExito);

        // let fechaHoy = new Date().toJSON().slice(0, 10).split("-").reverse().join("/");
        // $("#editar [name='fechaPoblamiento']").html(fechaHoy);
    })
    .catch(ex => 
    {
        if (ex.errores != null) mostrarErroresRespuestaBackend(ex);
        else toastr.error(ex);
    })
    .finally(() => hideLoading());
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
    showLoading();

    grabar(false).then(res => 
    {
        toastr.success(res.mensajeExito);
        definirMensaje({ mostrar: true, icono: "lock", mensaje: "Asignatura publicada, no se puede modificar" });
        sePuedeModificar = false;

        let infoCabecera = $("#editar");

        //let fechaHoy = new Date().toJSON().slice(0, 10).split("-").reverse().join("/");
        let fechaPublicacion = $("#ModalGuardarPublicar [name='fechaPublicacion']").val();

        //infoCabecera.find("[name='fechaPoblamiento']").html(fechaHoy);
        infoCabecera.find("[name='fechaPublicacion']").html(fechaPublicacion);

        habilitarDeshabilitarElementos({ querySelector: "#editar", habilitado: false });  // Deshabilita todo el #editar

        //Array.from(document.querySelectorAll(".deshabilitar-publicado")).forEach(x => x.disabled = true);  // Deshabilita botones
    })
    .catch(ex => 
    {
        if (ex.errores != null) mostrarErroresRespuestaBackend(ex);
        else toastr.error(ex);
    })
    .finally(() => hideLoading());
}

function grabar(esBorrador)
{
    let asignaturas_fefectiva = $("#editar [name='asignaturas_fefectiva']").val();

    if (!validarNuloVacio(asignaturas_fefectiva))
        return Promise.reject("La fecha efectiva es requerida");

    //=======================================>>>>>
    // Asignar valores de selectores e inputs a    =>      this.objeto 

    for (let [key, value] of Object.entries(this.objeto)) 
    {
        if (
            key != "clusterCompetenciasTransversales" &&
            key != "competencias"
        )
        {
          let querySelector = `#editar [name='${key}']`;

          let element = $(querySelector)[0]; // Obtener el primer elemento del resultado

	        if (element) 
	        {
            let tagName = element.tagName;

            if (tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA")
		        {
                let valor = $(element).val();
		            //console.log(`${key} es un ${tagName}`);
		            //console.log(valor);
		            //console.log("===========================>>>");

                    this.objeto[key] = valor

                    if (!esBorrador && ((Array.isArray(valor) && valor.length == 0) || valor == ""))  // Validar campos requeridos
                    {
                        let textoLabel = $(element).closest('.md-form').find('label').text();
                        textoLabel = textoLabel.trim();
                        textoLabel = textoLabel.replace("Seleccionar Todo", "").toLowerCase();
                        textoLabel = textoLabel.charAt(0).toUpperCase() + textoLabel.slice(1);   // Primera letra en mayúsculas

                        return Promise.reject(`${textoLabel} es requerido`);
                    }
		        }
	        }
        }
    }

    if (!esBorrador)
    {
        if (this.objeto.clusterCompetenciasTransversales.length == 0)
            return Promise.reject("Cluster competencias transversales es requerido");
        else
        {
            let competencias = $("#editar [name='competencias']").val();

            if (Array.isArray(competencias) && competencias.length == 0) 
                return Promise.reject("Es necesario seleccionar al menos una competencia");
        }
    }

    //=======================================>>>>>

    let copiaDetallesParaEnviar = JSON.parse(JSON.stringify(this.objeto));

    //=================>>>>>
    // Aplicar split con pipe en caso de ser un selector múltiple

    copiaDetallesParaEnviar.tipoLaboratorio = copiaDetallesParaEnviar.tipoLaboratorio.join("|");
    copiaDetallesParaEnviar.tipoTaller = copiaDetallesParaEnviar.tipoTaller.join("|");
    copiaDetallesParaEnviar.estrategiasDinamicasRecomendadas = copiaDetallesParaEnviar.estrategiasDinamicasRecomendadas.join("|");
    copiaDetallesParaEnviar.tecnicasDidacticasRecomendadas = copiaDetallesParaEnviar.tecnicasDidacticasRecomendadas.join("|");
    copiaDetallesParaEnviar.asignaturasPrerrequisito = copiaDetallesParaEnviar.asignaturasPrerrequisito.join("|");
    copiaDetallesParaEnviar.equipamientos = copiaDetallesParaEnviar.equipamientos.join("|");
    copiaDetallesParaEnviar.insumos = copiaDetallesParaEnviar.insumos.join("|");
    copiaDetallesParaEnviar.software = copiaDetallesParaEnviar.software.join("|");

    //=================>>>>>

    // Eliminar atributos que no son leídos desde el SP
    delete copiaDetallesParaEnviar.cualificacionesAsociadas;
    delete copiaDetallesParaEnviar.uclsAsociadas;
    delete copiaDetallesParaEnviar.certificados;
    delete copiaDetallesParaEnviar.asignaturas_fefectiva;
    delete copiaDetallesParaEnviar.asignaturas_estado;

    copiaDetallesParaEnviar.listaElaboracion = this.objeto.listaElaboracion.map(x =>   // La listaElaboracion en el SP es distinta, por eso se cambia
    {
        return {
            nombreEspecialista: x.nombreEspecialistaElaborador,     // ASIGNATURAS_ELAB_NOMBRE   -- Nombre Especialista
            mailEspecialista: x.mail,                               // ASIGNATURAS_ELAB_MAIL     -- Mail Especialista
            sede: x.sede_ccod                                       // SEDE_CCOD                 -- Sede / INACAP.SEDES
        };
    });

    copiaDetallesParaEnviar.listaPerfilDocente = this.objeto.listaPerfilDocente.map(x =>   // La listaPerfilDocente en el SP es distinta, por eso se cambia
    {
        return {
            preferencia: x.preferencia,                         // ASIGNATURAS_PD_DET_PRFC    -- Preferencia
            experienciaDocente: x.experienciaDocente,           // ASIGNATURAS_PD_DET_EDOC    -- Experiencia Docente
            experienciaProfesional: x.experienciaProfesional,   // ASIGNATURAS_PD_DET_EPRF    -- Experiencia Profesional
            tituloProfesional: x.esas_ncorr_tit,                // ESAS_NCORR_TIT             -- Título Profesional / ADMPLAN.ESTANDARES_ASIGNATURAS.ESAS_NCORR (TIPOS_ESTANDARES=1)
            gradoAcademico: x.esas_ncorr_gra                    // ESAS_NCORR_GRA             -- Grado Académico / ADMPLAN.ESTANDARES_ASIGNATURAS.ESAS_NCORR (TIPOS_ESTANDARES=2)
        };
    });
    

    //=======================================>>>>>

    /*
    if (this.listaObjetos.length == 0)
        return Promise.reject("La matriz de tributación debe poseer al menos un detalle para guardar");
    */

    let p_json_datos = JSON.stringify(copiaDetallesParaEnviar);
    console.log(p_json_datos);

    let asignaturas_fpublicacion = (!esBorrador) ? $("#ModalGuardarPublicar [name='fechaPublicacion']").val() : "";

    //return new Promise((resolve, reject) => {
    //    resolve({ status: 200, mensajeExito: "Exito" });
    //});

    
    return new Promise((resolve, reject) =>  
    {
        $.ajax({
            method: "POST",
            url: "ASIGNATURAS.aspx/ASIGNATURAS_GRABAR",
            data: JSON.stringify({
                p_json_datos,
                p_asignaturas_ccod: this.asig_tfl_ccod,                     // REVISAR
                p_asignaturas_fefectiva: asignaturas_fefectiva,
                p_asignaturas_fpublicacion: asignaturas_fpublicacion,
                esBorrador
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: async (res) =>
            {
                if (res.status == 200)
                    resolve(res);
                else {
                    reject(res);
                }
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                let msn = (esBorrador) ? "Ocurrió un error al guardar el borrador" : "Ocurrió un error al guardar";
                reject(msn);
            }
        });
    });
    
}


function definirMensaje(datos = {})
{
    // definirMensaje({ mostrar: false });
    // definirMensaje({ mostrar: true, icono: "warning", mensaje: "Hay duplicados. Revisar" });
    // definirMensaje({ mostrar: true, icono: "lock", mensaje: "No se puede modificar" });

    let querySelector = datos.querySelector ?? "#editar #mensaje";
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

//#region Funciones Generales

function quitarSeleccionSelect(querySelector) {
    $(querySelector).find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
}

function limpiarSelect(querySelector) {
    $(querySelector + ' option[value!=""]').remove().end();    // Remueve todos los options excepto el seleccione
    $(querySelector).trigger("chosen:updated");   
}

function llenarSelect(datos)
{
    //==================================>>>>>

    if (datos.multiple != null && datos.multiple)   // Si es un select multiple
    {
        $(datos.querySelector).off();   // Remover los eventos asociados al select
    }

    //==================================>>>>>
    // Destruir y volver a crear el select

    /*
    (() =>
    {
        let selectElement = $(datos.querySelector);

        if (selectElement.hasClass('mdb-select'))
        {
            // Destruir el select y remover eventos asociados
            selectElement.materialSelect('destroy');
            selectElement.off();

            selectElement.materialSelect();  // Volver a crear el select
        }
    })();
    */
    //==================================>>>>>

    const retornoEvento = () => {
        let res = { ...datos };
        res.value = $(datos.querySelector).val();
        res.text = $(`${datos.querySelector} option:selected`).text();
        return res;
    };

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

                //======>>>
                // Probando
                /*
                try {
                    datos.data.forEach(c => {
                        let selected = (arreglo.includes(c.codigo.toString())) ? "selected" : "";
                        $(datos.querySelector).append('<option value="' + c.codigo + '" ' + selected + '>' + c.descripcion + '</option>');
                    });
                }
                catch (err) {
                    console.log("El error está en: " + datos.querySelector);   // El error está en: #editar [name='competencias']
                }
                */
                //======>>>

                datos.data.forEach(c => {
                    let selected = (arreglo.includes(c.codigo.toString())) ? "selected" : "";
                    $(datos.querySelector).append('<option value="' + c.codigo + '" ' + selected + '>' + c.descripcion + '</option>');
                });
            }
            else {
                datos.data.forEach(c => {
                    let selected = (c.codigo == datos.selectedValue) ? "selected" : "";
                    $(datos.querySelector).append('<option value="' + c.codigo + '" ' + selected + '>' + c.descripcion + '</option>');
                });
            }
        }

    }

    $(datos.querySelector).on("change", () =>
    {
        if (datos.onchange != null && typeof datos.onchange === "function") {
            let retorno = retornoEvento();  // { value: "1234", text: "Hola" }
            datos.onchange(retorno);
        }
    });

    $(datos.querySelector).trigger("chosen:updated");   // El select toma los cambios realizados

    /*
    if (datos.multiple != null && datos.multiple)   // Si es un select multiple, lo refresca
    {
      $(datos.querySelector).materialSelect("destroy");  
      $(datos.querySelector).removeAttr("disabled");
    }
    */
}

function formatearNumeroEntero(cadena)
{
	// formatearNumeroEntero("123456789") 

	if (cadena.charAt(0) == "0")  // Si el primer caracter es un cero
	{
		cadena = cadena.substring(1, cadena.length)   // Remueve Primer caracter

		if (cadena.charAt(1) == "0") return "";  // Si el usuario intenta ingregar puros ceros
		return cadena;
	}

	cadena = cadena.split(".").join("");  // Remueve puntos
	cadena = cadena.replace(/[^0-9.]/g, '');   // Remueve letras

	let arreglo = cadena.split("").reverse().map((x, index) => 
	{ 
		var cont = index + 1;
		return (cont % 3 == 0 && cont != cadena.length) ? `.${x}` : x
	});

	return arreglo.reverse().join("");
}

function limpiarFormulario(querySelector)
{
    Array.from($(querySelector).find(":input"))
    .filter(x => x.className.includes("form-control") && x.attributes.getNamedItem("no-limpiar") == null).forEach(x => {
        x.value = "";
    });

    Array.from($(querySelector).find("select"))
    .filter(x => x.attributes.getNamedItem("no-limpiar") == null).forEach(x => {
        $(`${querySelector} [name='${x.name}']`).find("option:first-child").prop("selected", true).trigger("chosen:updated");
    });
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

function limpiarCombobox(querySelector) {
    $(querySelector + ' option[value!=""]').remove().end();    // Remueve todos los options excepto el seleccione
    $(querySelector).trigger("chosen:updated");
}

function habilitarDeshabilitarCombobox(datos)
{
    // habilitarDeshabilitarCombobox({ querySelector: "#resultados-busqueda [name='estado']", habilitado: false });

    if (datos.habilitado) 
        $(datos.querySelector).removeAttr("disabled").trigger("chosen:updated");
    else
        $(datos.querySelector).attr("disabled", true).trigger("chosen:updated");
}

function showLoading() {
    $('#loadingOverlay').show();
}

function hideLoading() {
    $('#loadingOverlay').hide();
}

function cerrarModal(querySelector) {
    $(querySelector).modal("toggle");   // Cierra el modal
    $(".modal-backdrop").hide();        // Agregado para que el fondo del modal desaparezca
}

function validarNuloVacio(contenido)
{
    if (contenido == null || contenido == "")
        return false;
    else
        return true;
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
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.aoa_to_sheet(data);

    // Obtener las claves de las celdas en el worksheet
    let cellKeys = Object.keys(worksheet);

    // Iterar sobre las celdas y agregar el salto de línea en el contenido
    cellKeys.forEach(key => {
        let cell = worksheet[key];
        if (cell.t === "s" && cell.s) {
            cell.s.wrapText = true; // Habilitar el ajuste de texto automático
            cell.v = [cell.v]; // Convertir el contenido en un array de strings
        }
    });

    workbook.SheetNames.push("Hoja 1");
    workbook.Sheets["Hoja 1"] = worksheet;

    let xlsbin = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary"
    });

    let buffer = new ArrayBuffer(xlsbin.length);
    let array = new Uint8Array(buffer);

    for (let i = 0; i < xlsbin.length; i++) {
        array[i] = xlsbin.charCodeAt(i) & 0xff;
    }

    let xlsblob = new Blob([buffer], { type: "application/octet-stream" });
    delete array;
    delete buffer;
    delete xlsbin;

    let url = window.URL.createObjectURL(xlsblob);
    let anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${nombreArchivo}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
    delete anchor;
}

function formatearNumeroEntero(cadena)
{
	// formatearNumeroEntero("123456789") 

	if (cadena.charAt(0) == "0")  // Si el primer caracter es un cero
	{
		cadena = cadena.substring(1, cadena.length)   // Remueve Primer caracter

		if (cadena.charAt(1) == "0") return "";  // Si el usuario intenta ingregar puros ceros
		return cadena;
	}

	cadena = cadena.split(".").join("");  // Remueve puntos
	cadena = cadena.replace(/[^0-9.]/g, '');   // Remueve letras

	let arreglo = cadena.split("").reverse().map((x, index) => 
	{ 
		var cont = index + 1;
		return (cont % 3 == 0 && cont != cadena.length) ? `.${x}` : x
	});

	return arreglo.reverse().join("");
}

function habilitarDeshabilitarElementos(datos)
{
    // habilitarDeshabilitarElementos({ querySelector: "#ModalEditar", habilitado: false });

    Array.from($(datos.querySelector)
    //.find(":input"))
    .find(":input:not(.no-inhabilitar)"))
	.filter(x => x.tagName != null && !x.tagName.toLowerCase().includes("button"))
    .forEach(x => 
    {
        if (x.tagName.toLowerCase() == "textarea") {
            x.readOnly = !datos.habilitado;
        }
        else {
            x.disabled = !datos.habilitado;
        }
    });
	
    Array.from($(datos.querySelector)
    //.find("select"))
    .find("select:not(.no-inhabilitar)"))
    .forEach(x =>
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