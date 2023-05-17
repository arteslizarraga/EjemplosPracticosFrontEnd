
let sePuedeModificar = true;
this.grillaDinamica = {};
let registrosPorPagina = 10;
let paginaActual = 0;
this.indexDetalle = 0;

//======================>>>>>

this.listaObjetos = [];
this.listaProductos = [];
this.objeto = {};
this.coloresDescripcion = obtenerColoresDescripcion();
this.coloresProductos = obtenerColoresProductos();

$(document).ready(function() 
{
    $('[data-toggle="tooltip"]').tooltip();

    // Activar selects
    $(".chosen-select").chosen({ disable_search_threshold: 10, no_results_text: "Sin Resultados para: ", width: "100%" });
    $(".mdb-select").material_select();

    //setTimeout(() => {
    //    construirGrilla();
    //}, 1000)
    
});

(async () =>
{
    showLoading();

    try {
        let res = await obtenerDatos();
        this.listaObjetos = res.listaObjetos;
        this.listaProductos = res.listaProductos;
        construirGrilla();
    }
    catch (ex) {
        if (ex.errores != null) mostrarErroresRespuestaBackend(ex);
        else toastr.error(ex);
    }
    finally { hideLoading() }

})();

function obtenerDatos()
{
    return new Promise((resolve, reject) => 
    {
        let res = {
            "objeto":{
               "listaObjetos":[
                  {
                     "prelacion":1,
                     "tipoAsignatura":"Tipo Asignatura 1",
                     "def_t_asig_tfl_ncorr":1,
                     "tipoOrdenAsignatura":"Ejemplo",
                     "descripciones":[
                        {
                           "prelacion":1,
                           "def_nmctp_ncorr":181,
                           "descripcionNivel":"2",
                           "descripcion":"Descripcion Nivel 1",
                           "color":"#ff1f1f"
                        },
                        {
                           "prelacion":2,
                           "def_nmctp_ncorr":182,
                           "descripcionNivel":"3",
                           "descripcion":"Descripcion Nivel 1",
                           "color":"#ff1f1f"
                        },
                        {
                           "prelacion":3,
                           "def_nmctp_ncorr":183,
                           "descripcionNivel":"4",
                           "descripcion":"Descripcion Nivel 1",
                           "color":"#ff1f1f"
                        },
                        {
                           "prelacion":4,
                           "def_nmctp_ncorr":184,
                           "descripcionNivel":"5",
                           "descripcion":"Descripcion Nivel 1",
                           "color":"#ff1f1f"
                        }
                     ]
                  },
                  {
                     "prelacion":2,
                     "tipoAsignatura":"Tipo Asignatura 2",
                     "def_t_asig_tfl_ncorr":1,
                     "tipoOrdenAsignatura":"Ejemplo",
                     "descripciones":[
                        {
                           "prelacion":1,
                           "def_nmctp_ncorr":181,
                           "descripcionNivel":"2",
                           "descripcion":"Descripcion Nivel 2",
                           "color":"#ff1f1f"
                        },
                        {
                           "prelacion":2,
                           "def_nmctp_ncorr":182,
                           "descripcionNivel":"3",
                           "descripcion":"Descripcion Nivel 2",
                           "color":"#ff1f1f"
                        },
                        {
                           "prelacion":3,
                           "def_nmctp_ncorr":183,
                           "descripcionNivel":"4",
                           "descripcion":"Descripcion Nivel 2",
                           "color":"#ff1f1f"
                        },
                        {
                           "prelacion":4,
                           "def_nmctp_ncorr":184,
                           "descripcionNivel":"5",
                           "descripcion":"Descripcion Nivel 2",
                           "color":"#ff1f1f"
                        }
                     ]
                  },
                  {
                     "prelacion":3,
                     "tipoAsignatura":"Tipo Asignatura 3",
                     "def_t_asig_tfl_ncorr":1,
                     "tipoOrdenAsignatura":"Ejemplo",
                     "descripciones":[
                        {
                           "prelacion":1,
                           "def_nmctp_ncorr":181,
                           "descripcionNivel":"2",
                           "descripcion":"Descripcion Nivel 3",
                           "color":"#ff1f1f"
                        },
                        {
                           "prelacion":2,
                           "def_nmctp_ncorr":182,
                           "descripcionNivel":"3",
                           "descripcion":"Descripcion Nivel 3",
                           "color":"#ff1f1f"
                        },
                        {
                           "prelacion":3,
                           "def_nmctp_ncorr":183,
                           "descripcionNivel":"4",
                           "descripcion":"Descripcion Nivel 3",
                           "color":"#ff1f1f"
                        },
                        {
                           "prelacion":4,
                           "def_nmctp_ncorr":184,
                           "descripcionNivel":"5",
                           "descripcion":"Descripcion Nivel 3",
                           "color":"#ff1f1f"
                        }
                     ]
                  },
                  {
                     "prelacion":4,
                     "tipoAsignatura":"Tipo Asignatura 4",
                     "def_t_asig_tfl_ncorr":1,
                     "tipoOrdenAsignatura":"Ejemplo",
                     "descripciones":[
                        {
                           "prelacion":1,
                           "def_nmctp_ncorr":181,
                           "descripcionNivel":"2",
                           "descripcion":"Descripcion Nivel 4",
                           "color":"#ff1f1f"
                        },
                        {
                           "prelacion":2,
                           "def_nmctp_ncorr":182,
                           "descripcionNivel":"3",
                           "descripcion":"Descripcion Nivel 4",
                           "color":"#ff1f1f"
                        },
                        {
                           "prelacion":3,
                           "def_nmctp_ncorr":183,
                           "descripcionNivel":"4",
                           "descripcion":"Descripcion Nivel 4",
                           "color":"#ff1f1f"
                        },
                        {
                           "prelacion":4,
                           "def_nmctp_ncorr":184,
                           "descripcionNivel":"5",
                           "descripcion":"Descripcion Nivel 4",
                           "color":"#ff1f1f"
                        }
                     ]
                  }
               ],
               "listaProductos":[
                  {
                     "prelacion":1,
                     "tipoAsignatura":"Tipo Asignatura 1 para Producto",
                     "def_t_asig_tfl_ncorr":1,
                     "tipoOrdenAsignatura":"Ejemplo para Producto",
                     "productos":[
                        {
                           "descripcionNivel":"2",
                           "def_nmctp_ncorr":181,
                           "color":"#ff1f1f",
                           "lista_def_productos_ncorr":[ "2", "21", "22" ]
                        },
                        {
                           "descripcionNivel":"3",
                           "def_nmctp_ncorr":182,
                           "color":"#ff1f1f",
                           "lista_def_productos_ncorr":[ "2", "21", "22" ]
                        },
                        {
                           "descripcionNivel":"4",
                           "def_nmctp_ncorr":183,
                           "color":"#ff1f1f",
                           "lista_def_productos_ncorr":[ "2", "21", "22" ]
                        },
                        {
                           "descripcionNivel":"5",
                           "def_nmctp_ncorr":184,
                           "color":"#ff1f1f",
                           "lista_def_productos_ncorr":[ "2", "21", "22" ]
                        }
                     ]
                  }
               ]
            },
            "errores":[
               
            ],
            "status": 200,
            "mensajeExito":null
        };

        resolve(res.objeto);
    });
}

function construirGrilla() 
{
    let limitarTextoCelda = (descripcion, size = 40) =>
    {
        if (descripcion != null && typeof descripcion === "string")
        {
            if (descripcion.includes("\\n")) descripcion = descripcion.split("\\n").join("\n");   // Reemplaza saltos de línea con doble backslash por uno normal

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

    this.grillaDinamica = {
        thead: [
            { valor: "Prelación" },
            { valor: "Tipo Asignatura" },
            { valor: "Tipo Origen Asignatura" }
        ], 
        tbody: []
    };


    // Agrega niveles
    this.nivelesMctp.forEach(x => this.grillaDinamica.thead.push({
        valor: `Nivel ${x.descripcion}`
    }));

    // this.grillaDinamica.thead.push({ valor: "Estado" });
    this.grillaDinamica.thead.push({ html: "Acciones" });   // Si no tiene valor, no se despliega en el Excel


    this.listaObjetos.forEach((row, index) =>
    {
        let arreglo = [
            { valor: row.prelacion, atributo: "prelacion" },
            { valor: row.tipoAsignatura, atributo: "tipoAsignatura" },
            { valor: row.tipoOrdenAsignatura, atributo: "tipoOrdenAsignatura" } 
        ];

        this.nivelesMctp.forEach(nivel =>
        {
            if (row.descripciones.length > 0)
            {
                let r = row.descripciones.find(x => x.def_nmctp_ncorr == nivel.def_nmctp_ncorr);

                if (r != null)
                {
                    // arreglo.push({ html: limitarTextoCelda(r.descripcion), valor: r.descripcion });

                    arreglo.push({
                        html: `
                        <div class="d-flex justify-content-start">
                            <div class="pt-1">
                                <div class="color" style="background-color: ${r.color}"></div>
                            </div>
                            <div class="txt-nvl ml-2">
                                <span>${limitarTextoCelda(r.descripcion)}</span>
                            </div>
                        </div>`,
                        valor: r.descripcion
                    });
                }
            }
            else {
                arreglo.push({ html: "", valor: "" });  // Si en la fila recorrida, el nivel no tiene contenido, deja en blanco
            }
        });

        //arreglo.push({ valor: row.estado });

        arreglo.push({  // Si no tiene valor, no se despliega en el Excel
            html: `
            <div class="d-flex justify-content-between">

                <button type="button" onclick="desplegarCardEditarDescripcion(${index})" class="btnEditFila mr-0 mr-md-4 d-flex align-items-center float-left">
                    <i class="material-icons mr-1 icon-lg grey-text">edit</i>
                    <span class="d-none d-md-inline">Editar</span>
                </button>

                <button type="button" onclick="abrirModalEliminarDescripcion(${index})" class="mr-0 mr-md-4 d-flex align-items-center float-left">
                    <i class="material-icons mr-1 icon-lg grey-text">assignment</i>
                    <span class="d-none d-md-inline">Eliminar</span>
                </button>
            </div>`
        });

        this.grillaDinamica.tbody.push(arreglo);
    });

    //========================================================================>>>>
    // Prueba 17-5-2023

    this.listaProductos.forEach((row, index) =>
    {
        let arreglo = [
            { valor: row.prelacion, atributo: "prelacion" },
            { valor: row.tipoAsignatura, atributo: "tipoAsignatura" },
            { valor: row.tipoOrdenAsignatura, atributo: "tipoOrdenAsignatura" } 
        ];

        this.nivelesMctp.forEach(nivel =>
        {
            if (row.productos.length > 0)
            {
                let r = row.productos.find(x => x.def_nmctp_ncorr == nivel.def_nmctp_ncorr);

                if (r != null)
                {
                    // arreglo.push({ html: limitarTextoCelda(r.color), valor: r.color });

                    //==================>>>>

                    // this.listaProductos[0].productos[0].lista_def_productos_ncorr   // [ "2", "21", "22" ]

                    //==================>>>>

                    arreglo.push({
                        html: `
                        <div class="d-flex justify-content-start">
                            <div class="pt-1">
                                <div class="color" style="background-color: ${r.color}"></div>
                            </div>
                        
                            <div class="txt-nvl ml-2">
                                <span>
                                    ${limitarTextoCelda(r.lista_def_productos_ncorr.map(ncorrProducto =>
                                    {
                                        let producto = this.listaCboProductos.find(y => y.codigo == ncorrProducto);
                                        return (producto != null) ? `${producto.descripcion}<br/>` : "";      
                                    }).join(""))}
                                </span>
                            </div>
                    
                        </div>`,
                        valor: r.descripcion
                    });
                }
            }
            else {
                arreglo.push({ html: "", valor: "" });  // Si en la fila recorrida, el nivel no tiene contenido, deja en blanco
            }
        });

        //arreglo.push({ valor: row.estado });

        arreglo.push({  // Si no tiene valor, no se despliega en el Excel
            html: `
            <div class="d-flex justify-content-between">

                <button type="button" onclick="abrirModalEditarProducto(${index})" class="btnEditFila mr-0 mr-md-4 d-flex align-items-center float-left">
                    <i class="material-icons mr-1 icon-lg grey-text">edit</i>
                    <span class="d-none d-md-inline">Editar</span>
                </button>

                <!--
                <button type="button" onclick="abrirModalEliminarProducto(${index})" class="mr-0 mr-md-4 d-flex align-items-center float-left">
                    <i class="material-icons mr-1 icon-lg grey-text">assignment</i>
                    <span class="d-none d-md-inline">Eliminar</span>
                </button>
                -->
            </div>`
        });

        this.grillaDinamica.tbody.push(arreglo);
    });

    //========================================================================>>>>

    let cadena = `
    <table id="TablaResultados" class="datatables table table-hover table-striped table-bordered m-0">
        <thead>
            <tr> ${this.grillaDinamica.thead.map(x => `
                <th data-orderable="${x.esOrdenable != null ? "true" :"false"}">
                    ${x.valor != null ? limitarTextoCelda(x.valor) : x.html}
                </th>`).join("")}
            </tr>
        </thead>
        <tbody>
            ${this.grillaDinamica.tbody.map(x =>
            {
                return `<tr> ${x.map(y => `<td class="text-nowrap">
                    ${y.html ?? y.valor ?? "DATO DESCONOCIDO"}</td>`).join("")}
                </tr>`;
            }).join("")}
        </tbody>
    </table>
    `;

    document.querySelector("#TablaResultados").innerHTML = cadena;


    $("#TablaResultados").DataTable({
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
        paginaActual = $("#TablaResultados").DataTable().page.info().page;
    })
    .page(paginaActual).draw(false);

    //$("#TablaResultados_wrapper .top").append(`
    //    <div class="dataTables_custom-buttons">
    //    <button type="button" class="btn btn-rounded btn-default waves-effect" data-toggle="modal" data-target="#ModalFiltrarTablaAnalisis">
    //        <span class="d-flex align-items-center">
    //            <span class="material-icons mr-2">filter_list</span>
    //            <span>Filtros</span>
    //        </span>
    //    </button>
    //    </div>
    //`);

    $("#TablaResultados_wrapper .dataTables_actions").append(`<div class="dataTables_actions-buttons">
        <button type="button" onclick="descargarExcel()" class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="Descargar Excel">
            <i class="material-icons icon-1x">arrow_downward</i>
        </button>
    </div >`);

    // $('#TablaResultados').css('width', '100%');

    setTimeout(() => {
        $("#TablaResultados").DataTable().columns.adjust().draw();   // Endereza columnas descuadradas
        $('[data-toggle="tooltip"]').tooltip();
    }, 200);
}

function descargarExcel()
{
    let data = [this.grillaDinamica.thead.filter(x => x.valor != null).map(x => x.valor)];

    this.grillaDinamica.tbody.forEach(x =>
    {
        data.push(x.filter(y => y.valor != null).map(y => {
            return y.valor;
        }));
    });

    let nombreArchivo = formatearNombreArchivo("DEF_TASIG_MC");
    generarExcel(data, nombreArchivo);
}

//============================================================================================================================>>>>>

//#region Trabajar con Descripciones

function abrirModalAgregarNuevaDescripcion()
{
    if (!sePuedeModificar) return;

    limpiarFormulario("#ModalAgregarNuevaDescripcion");

    //==============================>>>>
    // Llenar selector de prelación

    let obtenerArregloPrelaciones = () => 
    {
        let arregloPrelaciones = [];
        let numero = 0;

	    this.listaObjetos.forEach((x, index) => {
		    numero = index + 1;
		    arregloPrelaciones.push({ codigo: numero, descripcion: numero });
	    });

	    numero ++;
	    arregloPrelaciones.push({ codigo: numero, descripcion: numero });

	    return arregloPrelaciones;
    };

    let arregloPrelaciones = obtenerArregloPrelaciones();

    if (arregloPrelaciones.length == 0)
        arregloPrelaciones = [{ codigo: 1, descripcion: 1 }];
    
    llenarCombobox("#ModalAgregarNuevaDescripcion [name='prelacion']", arregloPrelaciones);

    //==============================>>>>

    this.objeto = {
        prelacion: 0,
        tipoAsignatura: "",
        tipoOrdenAsignatura: "",
        descripciones: this.nivelesMctp.map(x =>
        {
            return { def_nmctp_ncorr: x.def_nmctp_ncorr, descripcion: "", descripcionNivel: x.descripcion, color: null };
        })
    };

    let cadena = `
    <div class="acordeon-niveles accordion md-accordion" id="acordeon-niveles-descripcion-crear" role="tablist" aria-multiselectable="true">

        ${this.objeto.descripciones.map((nivel, indexNivel) =>
        {
            return `
            <div class="accordion-item">
    
                <div class="accordion-header grey lighten-3" role="tab" id="heading-nivel-${nivel.def_nmctp_ncorr}">
                    <a data-toggle="collapse" data-parent="#acordeon-niveles-descripcion-crear" href="#collapse-nivel-${nivel.def_nmctp_ncorr}" aria-expanded="false" aria-controls="collapse-nivel-${nivel.def_nmctp_ncorr}">
                    <h5 class="mb-0 pl-3 pr-3">
                        Nivel ${nivel.descripcionNivel}
                        <span class="accordion-arrow"><i class="material-icons rotate-icon float-right">keyboard_arrow_down</i></span>
                    </h5>
                    </a>
                </div>
                <div id="collapse-nivel-${nivel.def_nmctp_ncorr}" class="collapse ${indexNivel == 0 ? "show" : ""}" role="tabpanel" aria-labelledby="heading-nivel-${nivel.def_nmctp_ncorr}" data-parent="#acordeon-niveles-descripcion-crear">
    
                    <div class="accordion-body p-3 pt-3 pb-2">
    
                        <div class="row mb-4">

                            <div class="col-12 col-md-6">
                                <div class="md-form mb-3">
                                    <textarea onkeyup="objeto.descripciones[${indexNivel}].descripcion = this.value"
                                    name="descripcion" rows="3" placeholder="Ingrese Descripción" class="form-control md-textarea">${nivel.descripcion}</textarea>

                                    <label class="active">Nivel ${nivel.descripcionNivel}</label>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
    
                                <div class="md-form">
                                    <label class="active">Color</label>
                                </div>
                                <div name="colorNivel" class="dropdown">
                                    <button class="dropdown-toggle d-flex col drop-color text-left p-1 pl-0" type="button" data-toggle="dropdown" aria-expanded="false">Seleccione color</button>
                                    <div class="dropdown-menu col">
                                        
                                        ${this.coloresDescripcion.map(x => 
                                        {
                                            return `
                                            <a codigo="${x.codigo}" onclick="seleccionarColorDescripcion(this, ${indexNivel}, '${x.codigo}')" class="dropdown-item d-flex">
                                                <div class="d-flex">
                                                    <div class="circle pt-1">
                                                        <div class="color" style="background-color: ${x.codigo}"></div>
                                                    </div>
                                                    <span class="ml-2">${x.descripcion}</span>
                                                </div>
                                            </a>
                                            `;
                                        }).join("")}

                                    </div>
                                </div>
    
                            </div>
    
                        </div>  <!-- Fin div row mb-4 -->
    
                    </div>  <!-- Fin div accordion-body -->
    
                </div>   <!-- Fin div collapse-nivel-${nivel.def_nmctp_ncorr} -->
    
            </div>  <!-- Fin div accordion-item -->
            `;
        })
        .join("")}

    </div>
    `;

    document.querySelector("#acordeon-niveles-descripcion-crear").innerHTML = cadena;

    //============================================================>>>>

    $("#ModalAgregarNuevaDescripcion").modal("show");
}

function agregarNuevaDescripcion()
{
    let modal = $("#ModalAgregarNuevaDescripcion");
    let prelacion = modal.find("[name='prelacion']").val();
    let tipoAsignaturaNcorr = modal.find("[name='tipoAsignaturaNcorr']").val();
    let errores = [];

    if (!validarNuloVacio(prelacion))
        errores.push("La prelación es requerida");

    if (!validarNuloVacio(tipoAsignaturaNcorr))
        errores.push("El tipo de asignatura es requerido");

    if (this.objeto.descripciones.some(x => !validarNuloVacio(x.descripcion)))
        errores.push("Todos los niveles deben poseer una descripción");

    if (this.objeto.descripciones.some(x => !validarNuloVacio(x.color)))
        errores.push("Todos los niveles deben poseer un color");

    if (errores.length > 0) {
        errores.reverse().forEach(error => toastr.error(error));
        return;
    }

    this.objeto.prelacion = prelacion;
    this.objeto.tipoAsignatura = modal.find("[name='tipoAsignaturaNcorr'] option:selected").text();
    this.objeto.def_t_asig_tfl_ncorr = tipoAsignaturaNcorr;     // Foreign Key de la tabla    DEF_T_ASIG_TFL

    this.listaObjetos.push(this.objeto);
    cerrarModal("#ModalAgregarNuevaDescripcion");
    construirGrilla();
}

function desplegarCardEditarDescripcion(index)
{
    showLoading();
    this.indexDetalle = index;
    document.querySelector("#editar").style.display = "block";
    document.querySelector("#resultados").style.display = "none";

    this.objeto = JSON.parse(JSON.stringify(this.listaObjetos[index]));   // Hace una copia del detalle

    //=====================================>>>>>
    // Llenar selector de prelación
    llenarCombobox(
        "#editar [name='prelacion']",
        this.listaObjetos.map((x, index) => {
            let numero = index + 1;
            return { codigo: numero, descripcion: numero };
        })
    );

    setTimeout(() => {
        $("#editar [name='prelacion']").val(this.objeto.prelacion).trigger("chosen:updated");
    }, 200);

    //=====================================>>>>>

    $("#editar [name='tipoAsignaturaNcorr']").val(this.objeto.def_t_asig_tfl_ncorr).trigger("chosen:updated");


    let cadena = `
    <div class="acordeon-niveles accordion md-accordion" id="acordeon-niveles-descripcion-editar" role="tablist" aria-multiselectable="true">

        ${this.objeto.descripciones.map((nivel, indexNivel) =>
        {
            return `
            <div class="accordion-item">
    
                <div class="accordion-header grey lighten-3" role="tab" id="heading-nivel-${nivel.def_nmctp_ncorr}">
                    <a data-toggle="collapse" data-parent="#acordeon-niveles-descripcion-editar" href="#collapse-nivel-${nivel.def_nmctp_ncorr}" aria-expanded="false" aria-controls="collapse-nivel-${nivel.def_nmctp_ncorr}">
                    <h5 class="mb-0 pl-3 pr-3">
                        Nivel ${nivel.descripcionNivel}
                        <span class="accordion-arrow"><i class="material-icons rotate-icon float-right">keyboard_arrow_down</i></span>
                    </h5>
                    </a>
                </div>
                <div id="collapse-nivel-${nivel.def_nmctp_ncorr}" class="collapse ${indexNivel == 0 ? "show" : ""}" role="tabpanel" aria-labelledby="heading-nivel-${nivel.def_nmctp_ncorr}" data-parent="#acordeon-niveles-descripcion-editar">
    
                    <div class="accordion-body p-3 pt-3 pb-2">
    
                        <div class="row mb-4">

                            <div class="col-12 col-md-6">
                                <div class="md-form mb-3">
                                    <textarea onkeyup="objeto.descripciones[${indexNivel}].descripcion = this.value"
                                    name="descripcion" rows="3" placeholder="Ingrese Descripción" class="form-control md-textarea">${nivel.descripcion}</textarea>

                                    <label class="active">Nivel ${nivel.descripcionNivel}</label>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
    
                                <div class="md-form">
                                    <label class="active">Color</label>
                                </div>
                                <div name="colorNivel" class="dropdown">
                                    <button class="dropdown-toggle d-flex col drop-color text-left p-1 pl-0" type="button" data-toggle="dropdown" aria-expanded="false">Seleccione color</button>
                                    <div class="dropdown-menu col">
                                        
                                        ${this.coloresDescripcion.map(x => 
                                        {
                                            return `
                                            <a codigo="${x.codigo}" onclick="seleccionarColorDescripcion(this, ${indexNivel}, '${x.codigo}')" class="dropdown-item d-flex">
                                                <div class="d-flex">
                                                    <div class="circle pt-1">
                                                        <div class="color" style="background-color: ${x.codigo}"></div>
                                                    </div>
                                                    <span class="ml-2">${x.descripcion}</span>
                                                </div>
                                            </a>
                                            `;
                                        }).join("")}

                                    </div>
                                </div>
    
                            </div>
    
                        </div>  <!-- Fin div row mb-4 -->
    
                    </div>  <!-- Fin div accordion-body -->
    
                </div>   <!-- Fin div collapse-nivel-${nivel.def_nmctp_ncorr} -->
    
            </div>  <!-- Fin div accordion-item -->
            `;
        })
        .join("")}

    </div>
    `;

    document.querySelector("#acordeon-niveles-descripcion-editar").innerHTML = cadena;

    setTimeout(() => 
    {
        this.objeto.descripciones.forEach(x =>
        {
            let a = Array.from(document.querySelectorAll(`#acordeon-niveles-descripcion-editar #collapse-nivel-${x.def_nmctp_ncorr} [name='colorNivel'] a`))
            .find(y => y.getAttribute("codigo") == x.color);

            if (a != null) {
                a.click()
            }    
        });

        hideLoading();
        habilitarDeshabilitarElementos({ querySelector: "#editar", habilitado: sePuedeModificar });
    }, 200);
}

function seleccionarColorDescripcion(e, indexNivel, color)
{
    // console.log(e);
    e.parentElement.previousElementSibling.innerHTML  = e.innerHTML;
    //console.log(color);

    let elemento = this.objeto.descripciones[indexNivel];
    elemento.color = color;
}

function actualizarDescripcion()
{
    let card = $("#editar");
    let prelacion = card.find("[name='prelacion']").val();
    let tipoAsignaturaNcorr = card.find("[name='tipoAsignaturaNcorr']").val();

    let errores = [];

    if (!validarNuloVacio(prelacion))
        errores.push("La prelación es requerida");

    if (!validarNuloVacio(tipoAsignaturaNcorr))
        errores.push("El tipo de asignatura es requerido");

    if (this.objeto.descripciones.some(x => !validarNuloVacio(x.descripcion)))
        errores.push("Todos los niveles deben poseer una descripción");

    if (this.objeto.descripciones.some(x => !validarNuloVacio(x.color)))
        errores.push("Todos los niveles deben poseer un color");

    if (errores.length > 0) {
        errores.reverse().forEach(error => toastr.error(error));
        return;
    }

    let elemento = this.listaObjetos[this.indexDetalle];
    elemento.prelacion = prelacion;
    elemento.tipoAsignatura = card.find("[name='tipoAsignaturaNcorr'] option:selected").text();
    elemento.def_t_asig_tfl_ncorr = tipoAsignaturaNcorr;     // Foreign Key de la tabla    DEF_T_ASIG_TFL

    elemento.descripciones.forEach((x, index) =>
    {
        x.descripcion = this.objeto.descripciones[index].descripcion;
        x.color = this.objeto.descripciones[index].color;
    });

    document.querySelector("#editar").style.display = "none";
    document.querySelector("#resultados").style.display = "block";
    construirGrilla();
}

function abrirModalEliminarDescripcion(index)
{
    if (!sePuedeModificar) return;

    this.indexDetalle = index;
    $("#ModalEliminarDescripcion").modal("toggle");
}

function eliminarDescripcion()
{
    this.listaObjetos.splice(this.indexDetalle, 1);     // Elimina la posición del arreglo

    // this.listaObjetos.sort((a, b) => a.prelacion - b.prelacion).forEach((x, i) => x.prelacion = i + 1);  // Re asigna prelacion a todos los elementos del arreglo

    cerrarModal("#ModalEliminarDescripcion");
    construirGrilla();
}

function volverGrilla()
{
    document.querySelector("#editar").style.display = "none";
    document.querySelector("#resultados").style.display = "block";
}

//#endregion Trabajar con Descripciones

//============================================================================================================================>>>>>

//#region Trabajar con Productos

function abrirModalEditarProducto(index)
{
    showLoading();
    this.indexDetalle = index;

    this.objeto = JSON.parse(JSON.stringify(this.listaProductos[index]));   // Hace una copia del detalle

    //=====================================>>>>>
    // Llenar selector de prelación
    llenarCombobox(
        "#ModalEditarProducto [name='prelacion']",
        this.listaProductos.map((x, index) => {
            let numero = index + 1;
            return { codigo: numero, descripcion: numero };
        })
    );

    setTimeout(() => {
        $("#ModalEditarProducto [name='prelacion']").val(this.objeto.prelacion).trigger("chosen:updated");
    }, 200);

    //=====================================>>>>>

    $("#editar [name='tipoAsignaturaNcorr']").val(this.objeto.def_t_asig_tfl_ncorr).trigger("chosen:updated");


    let cadena = `
    <div class="acordeon-niveles accordion md-accordion" id="acordeon-niveles-producto-editar" role="tablist" aria-multiselectable="true">

        ${this.objeto.productos.map((nivel, indexNivel) =>
        {
            return `
            <div class="accordion-item">
    
                <div class="accordion-header grey lighten-3" role="tab" id="heading-nivel-${nivel.def_nmctp_ncorr}">
                    <a data-toggle="collapse" data-parent="#acordeon-niveles-producto-editar" href="#collapse-nivel-${nivel.def_nmctp_ncorr}" aria-expanded="false" aria-controls="collapse-nivel-${nivel.def_nmctp_ncorr}">
                    <h5 class="mb-0 pl-3 pr-3">
                        Nivel ${nivel.descripcionNivel}
                        <span class="accordion-arrow"><i class="material-icons rotate-icon float-right">keyboard_arrow_down</i></span>
                    </h5>
                    </a>
                </div>
                <div id="collapse-nivel-${nivel.def_nmctp_ncorr}" class="collapse ${indexNivel == 0 ? "show" : ""}" role="tabpanel" aria-labelledby="heading-nivel-${nivel.def_nmctp_ncorr}" data-parent="#acordeon-niveles-descripcion-editar">
    
                    <div class="accordion-body p-3 pt-3 pb-2">
    
                        <div class="row mb-4">

                            <!--
                            <div class="col-12 col-md-6">
                                <div class="md-form mb-3">
                                    <textarea onkeyup="objeto.productos[${indexNivel}].descripcion = this.value"
                                    name="descripcion" rows="3" placeholder="Ingrese Descripción" class="form-control md-textarea">${nivel.descripcion}</textarea>

                                    <label class="active">Nivel ${nivel.descripcionNivel}</label>
                                </div>
                            </div>
                            -->

                            <div class="col-12 col-md-6">
                                <div class="form-group"> 
                                    <label>Programa de Formación Recomendados</label> 

                                    <select name="defProgramaFormativoRecomendado" class="form-control select2" multiple="" style="width: 100%;">
                                        ${this.listaCboProductos.map(x => `<option value="${x.codigo}">${x.descripcion}</option>`).join("")}
                                    </select> 
                                </div> 
                            </div>

                            <div class="col-12 col-md-4">
    
                                <div class="md-form">
                                    <label class="active">Color</label>
                                </div>
                                <div name="colorNivel" class="dropdown">
                                    <button class="dropdown-toggle d-flex col drop-color text-left p-1 pl-0" type="button" data-toggle="dropdown" aria-expanded="false">Seleccione color</button>
                                    <div class="dropdown-menu col">
                                        
                                        ${this.coloresProductos.map(x =>
                                        {
                                            return `
                                            <a codigo="${x.codigo}" onclick="seleccionarColorProducto(this, ${indexNivel}, '${x.codigo}')" class="dropdown-item d-flex">
                                                <div class="d-flex">
                                                    <div class="circle pt-1">
                                                        <div class="color" style="background-color: ${x.codigo}"></div>
                                                    </div>
                                                    <span class="ml-2">${x.descripcion}</span>
                                                </div>
                                            </a>
                                            `;
                                        }).join("")}

                                    </div>
                                </div>
    
                            </div>
    
                        </div>  <!-- Fin div row mb-4 -->
    
                    </div>  <!-- Fin div accordion-body -->
    
                </div>   <!-- Fin div collapse-nivel-${nivel.def_nmctp_ncorr} -->
    
            </div>  <!-- Fin div accordion-item -->
            `;
        })
        .join("")}

    </div>
    `;

    document.querySelector("#acordeon-niveles-producto-editar").innerHTML = cadena;

    setTimeout(() => 
    {
        this.objeto.productos.forEach(x =>
        {
            let a = Array.from(document.querySelectorAll(`#acordeon-niveles-producto-editar #collapse-nivel-${x.def_nmctp_ncorr} [name='colorNivel'] a`))
            .find(y => y.getAttribute("codigo") == x.color);

            if (a != null) {
                a.click()
            }

            //=====================>>>>
            // Select2

            let cbo = $(`#acordeon-niveles-producto-editar #collapse-nivel-${x.def_nmctp_ncorr} [name='defProgramaFormativoRecomendado']`);

            if (Array.isArray(x.lista_def_productos_ncorr) && x.lista_def_productos_ncorr.length > 0) {
                cbo.val(x.lista_def_productos_ncorr).change();
            }

            cbo.select2({ allowClear: true, closeOnSelect: false, multiple: true, placeholder: "Seleccione" });

            //=====================>>>>
        });

        habilitarDeshabilitarElementos({ querySelector: "#ModalEditarProducto", habilitado: sePuedeModificar });
        hideLoading();
    }, 200);

    //==========================================>>>>>

    $("#ModalEditarProducto").modal("show");
}

function seleccionarColorProducto(e, indexNivel, color)
{
    // console.log(e);
    e.parentElement.previousElementSibling.innerHTML  = e.innerHTML;
    //console.log(color);

    let elemento = this.objeto.productos[indexNivel];
    elemento.color = color;
}

function actualizarProducto()
{
    if (!sePuedeModificar) return;

    let faltanProductos = false;

    this.objeto.productos.forEach(x =>
    {
        let cbo = $(`#acordeon-niveles-producto-editar #collapse-nivel-${x.def_nmctp_ncorr} [name='defProgramaFormativoRecomendado']`);
        let valor = cbo.select2("val");
        if (Array.isArray(valor) && valor.length == 0) faltanProductos = true;
    });

    let modal = $("#ModalEditarProducto");
    let prelacion = modal.find("[name='prelacion']").val();

    let errores = [];

    if (faltanProductos)
        errores.push("Todos los niveles debe tener programa de formación recomendados");

    if (!validarNuloVacio(prelacion))
        errores.push("La prelación es requerida");

    if (errores.length > 0) {
        errores.reverse().forEach(x => toastr.error(x));
        return;
    }

    //======================>>>>>

    let elemento = this.listaProductos[this.indexDetalle];
    elemento.prelacion = prelacion;
    //elemento.tipoAsignatura = card.find("[name='tipoAsignaturaNcorr'] option:selected").text();
    //elemento.def_t_asig_tfl_ncorr = tipoAsignaturaNcorr;     // Foreign Key de la tabla    DEF_T_ASIG_TFL

    elemento.productos.forEach((x, index) =>
    {
        //x.descripcion = this.objeto.descripciones[index].descripcion;
        x.color = this.objeto.productos[index].color;

        let cbo = $(`#acordeon-niveles-producto-editar #collapse-nivel-${x.def_nmctp_ncorr} [name='defProgramaFormativoRecomendado']`);
        x.lista_def_productos_ncorr = cbo.select2("val");  // ["2", "21", "22"]
    });

    construirGrilla();
    cerrarModal("#ModalEditarProducto");
}

function abrirModalEliminarProducto(index)
{
    if (!sePuedeModificar) return;

    this.indexDetalle = index;
    $("#ModalEliminarProducto").modal("toggle");
}

function eliminarProducto()
{
    this.listaProductos.splice(this.indexDetalle, 1);     // Elimina la posición del arreglo

    // this.listaObjetos.sort((a, b) => a.prelacion - b.prelacion).forEach((x, i) => x.prelacion = i + 1);  // Re asigna prelacion a todos los elementos del arreglo

    cerrarModal("#ModalEliminarProducto");
    construirGrilla();
}

//#endregion Trabajar con Productos

//============================================================================================================================>>>>>

function guardarBorrador()
{
    grabar(true)
    .then(res => 
    {
        toastr.success(res.mensajeExito);

        let fechaHoy = new Date().toJSON().slice(0, 10).split("-").reverse().join("/");
        $("#resultados [name='fechaPoblamiento']").html(fechaHoy);
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
    grabar(false)
    .then(res => 
    {
        toastr.success(res.mensajeExito);
        definirMensaje({ mostrar: true, icono: "lock", mensaje: "Matriz de colores publicada, no se puede modificar" });
        sePuedeModificar = false;

        let infoCabecera = $("#resultados");

        let fechaHoy = new Date().toJSON().slice(0, 10).split("-").reverse().join("/");
        let fechaPublicacion = $("#ModalGuardarPublicar [name='fechaPublicacion']").val();

        infoCabecera.find("[name='fechaPoblamiento']").html(fechaHoy);
        infoCabecera.find("[name='fechaPublicacion']").html(fechaPublicacion);

        Array.from(document.querySelectorAll(".deshabilitar-publicado")).forEach(x => x.disabled = true);  // Deshabilita botones
    })
    .catch(ex => toastr.error(ex));
}

function grabar(esBorrador)
{
    /*
    // Valida que todas las preguntas estén respondidas
    let estaCompleto = listaObjetos
        .every(x => x.respuestas.some(y => y.esRespuestaObligatoria && validarNuloVacio(y.ademanda_rsp_respuesta)));

    if (!estaCompleto && !esBorrador)
        return Promise.reject("Existen preguntas requeridas sin responder");
    */

    let copiaDetallesParaEnviar = this.listaObjetos.map(x => 
    {
        return {
            def_tasig_mc_estado: (esBorrador) ? "C" : "P",       // Tabla DEF_TASIG_MC      |     Estado del Registro ("C": En Creación, "P": Publicada)
            descripcion: x.descripciones.map(y => 
            {
                return {
                    def_mtasig_mc_color: y.color,
                    def_mtasig_mc_tdesc: y.descripcion,
                    def_mtasig_mc_prelacion: y.prelacion,   
                    def_nmctp_ncorr_mc: y.def_nmctp_ncorr,    // Foreign Key de la tabla    DEF_NMCTP
                    def_t_asig_tfl_ncorr: "1"                 // Foreign Key de la tabla    DEF_T_ASIG_TFL   |   CAMBIAR EL VALOR
                };
            })
        };
    });

    let p_json_datos = JSON.stringify(copiaDetallesParaEnviar);
    console.log(p_json_datos);

    // let fechaPublicacion = (!esBorrador) ? $("#ModalGuardarPublicar [name='fechaPublicacion']").val() : "";
    // let params = obtenerParamsFiltro();

    return new Promise((resolve, reject) => {
        resolve({ status: 200, mensajeExito: "Exito" });
    });

    /*
    return new Promise((resolve, reject) =>
    {
        $.ajax({
            method: "POST",
            url: "DEF_TASIG_MC.aspx/DEF_TASIG_MC_GRABAR",
            data: JSON.stringify({
                p_json_datos,       
                p_consignara_ec,                    // Consignará elementos complementarios
                p_ecomplemetarios_fpublicacion,     // Fecha publicación
                p_def_tfl_ncorr: params.tfl,
                esBorrador
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: () => showLoading(),
            success: async (res) =>
            {
                if (res.status == 200)
                    resolve(res);
                else {
                    mostrarErroresRespuestaBackend(res);
                    reject(false);
                }
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {

                let msn = (esBorrador) ? "Ocurrió un error al guardar el borrador" : "Ocurrió un error al guardar";
                toastr.error(msn);
                reject(false);
            },
            complete: () => hideLoading()
        });
    });
    */
}

function definirMensaje(datos = {})
{
    // definirMensaje({ mostrar: false });
    // definirMensaje({ mostrar: true, icono: "warning", mensaje: "Hay duplicados. Revisar" });
    // definirMensaje({ mostrar: true, icono: "lock", mensaje: "No se puede modificar" });

    let querySelector = datos.querySelector ?? "#resultados #mensaje";
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

//============================================================================================================================>>>>>

//#region Funciones Generales

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

	Array.from($(datos.querySelector).find(":input"))
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
