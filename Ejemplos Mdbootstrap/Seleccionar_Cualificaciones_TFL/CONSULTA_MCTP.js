
let paginaActual = 0; 
let registrosPorPagina = 4; 
let totalPaginas = 0; 

let arregloRutas = [];
let arregloFiltrado = [];

let arregloCorrelativosSeleccionados = [];

function buscar(params)
{
    resetearPaginacion();

    return new Promise((resolve, reject) => 
    {
        arregloRutas = obtenerDatos_1();
        generarTabla();
        resolve(true);
    });
}

function generarTabla()
{
    // console.log("arregloCorrelativosSeleccionados", arregloCorrelativosSeleccionados);

    //==================================================>>>>
    // Aplicar Paginación

    arregloFiltrado = arregloRutas;
    totalPaginas = Math.ceil( arregloFiltrado.length / registrosPorPagina ) - 1;

    desplegarPaginacionBootstrap({
		querySelector: "#numeros-paginacion", 
		paginaActual: paginaActual,
		totalRegistros: arregloFiltrado.length,		// res.objeto.recordsTotal,
		totalPaginas: totalPaginas,
		registrosPorPagina: registrosPorPagina,
		pasoAtras: () => { paginaActual --; generarTabla() },  
		pasoAdelante: () => { paginaActual ++; generarTabla() },
		seleccionarPagina: e => { 
			paginaActual = parseInt(e.target.getAttribute("numeroPagina"));
			generarTabla();
		}
	});

    arregloFiltrado = arregloFiltrado.filter((c, index) => {  // Aplica paginacion 
		return (index >= paginaActual * registrosPorPagina && index < (paginaActual + 1) * registrosPorPagina) 
	});

    //==================================================>>>>

    let arregloNivelesExistentesCabecera = []; 

    arregloFiltrado.map(x => x.infoNiveles.filter(y => Array.isArray(y.elementos) && y.elementos.length > 0).map(y => y.numeroNivel)).forEach(x => 
        x.filter(y => !arregloNivelesExistentesCabecera.includes(y)).forEach(y => arregloNivelesExistentesCabecera.push(y))
    );

    arregloNivelesExistentesCabecera = arregloNivelesExistentesCabecera.sort((a, b) => a - b);
    //console.log(arregloNivelesExistentesCabecera);

    //==================================================>>>>

    let cadena = `
    <table id="table-tfl" class="table-tfl">
    <thead>
        <tr class="title-cards">
            <th class="px-2 py-0 pb-2 nivel">
                <div class="col title text-center p-2">Niveles</div>
            </th>

            ${arregloNivelesExistentesCabecera.map(nivel => 
               `<th class="px-2 py-0 pb-2 nivel">
                    <div class="col title text-center p-2">Nivel ${nivel}</div>
                </th>` 
            ).join("")}
        </tr>
    </thead>
    <tbody>
    `;

    arregloFiltrado.forEach(ruta => 
    {
        cadena += `<tr valign="top">`;
        // console.log(`nombreRuta: ${ruta.nombreRuta}`);

        cadena += `
        <td class="ruta p-2">
            <div class="card title h-100 align-items-center justify-content-center">
                ${ruta.nombreRuta}
            </div>
        </td>
        `;

        arregloNivelesExistentesCabecera.forEach(numeroNivel =>
        {
            let infoNivel = ruta.infoNiveles.find(x => x.numeroNivel == numeroNivel);

            cadena += `<td class="ruta p-2">`;
                cadena += `<div class="card-container d-flex flex-row flex-wrap justify-content-between">`;
                
                //console.log(`   numeroNivel: ${infoNivel.numeroNivel}`);
    
                infoNivel.elementos.forEach(x => 
                {
                    // let clasesCssAsociacion = x.asociadoCon.map(x => `me-asocio-con-${x}`).join(" ");
    
                    let textoDesplegado = x.texto;
                    let infoTooltip = "";
    
                    if (textoDesplegado.length > 20) {
                        textoDesplegado = `${textoDesplegado.slice(0, 20)} ...`;
                        infoTooltip = `data-toggle="tooltip" data-placement="top" title="${x.texto}"`;
                    }
    
                    // let arregloString = (x.asociadoCon != null && x.asociadoCon.length > 0) ?
                    //     x.asociadoCon.join("|") : "";

                    //=========================================================================================================================>>>>>>>
                    // 3-1-2023

                    let cssElementoSeleccionado = arregloCorrelativosSeleccionados.some(y => y == x.correlativo) ? "select-card" : ""; 

                    /*
                    <i class="probando-tooltip material-icons icon-lg" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ver perfiles">person</i>

                    $('.probando-tooltip').on('show.bs.tooltip', function(){
                        $($(this).data('bs.tooltip').tip).addClass('yourclassname');
                    });

                    .yourclassname{
                        background-color:#FF5257;
                        box-shadow: 0px 0px 4px 0px #FF5257 !important;
                    }
                    */

                    cadena += `
                    <div class="col-6 p-0">
                        <div class="f-card m-1 ${cssElementoSeleccionado}" onclick="marcarDesmarcarColorGrilla(this, ${x.correlativo})">
                            <div class="head-country pt-2">
                                <p class="text-center info-text mb-1 text-uppercase">CHILE</p>
                            </div>
                            <div class="card sm cards-ruta text-center me-asocio-con-2" id="1">
                                <p ${infoTooltip}>${textoDesplegado}</p>
                            </div>
                            <div class="d-flex p-2 justify-content-between section-action">
                                <button onclick="abrirModalPerfiles('${x.correlativo}')">
                                    <i class="material-icons icon-lg" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ver perfiles">person</i>
                                </button>
                                <button onclick="abrirModalDetalle('${x.correlativo}')">
                                    <i class="material-icons icon-lg blue-text" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ver detalle">visibility</i>
                                </button>
                            </div>
                        </div>
                    </div>
                    `;

                    //====================================================================>>>>>
                    // Usado en TFL.MCPT
                    /*
                    cadena += `
                    <div class="col-6 p-0">
                        <div class="f-card m-1">
                            <div class="card sm cards-ruta text-center ${clasesCssAsociacion}" id="${x.correlativo}"
                            asociado-con="${arregloString}"
                            onmouseenter="focalizarCard(this)"
                            onmouseleave="desFocalizarCard(this)"
                            onclick="clickCard(this)">
                                <p ${infoTooltip}>
                                    ${textoDesplegado}
                                </p>
                            </div>
                            <div class="d-flex p-2 justify-content-between section-action">

                                <button onclick="abrirModalPerfiles('${x.correlativo}')">
                                    <i class="material-icons icon-lg" data-toggle="tooltip" data-placement="top" title="Ver perfiles">person</i>
                                </button>

                                <button onclick="abrirModalDetalle('${x.correlativo}')">
                                    <i class="material-icons icon-lg blue-text" data-toggle="tooltip" data-placement="top" title="Ver detalle">visibility</i>
                                </button>

                            </div>
                        </div>
                    </div>
                    `;
                    */
                    //=========================================================================================================================>>>>>>>
                });
    
                cadena += `</div>`;
            cadena += `</td>`;
        });
    
        cadena += `</tr>`;
    });

    cadena += `
    </tbody>
    </table>
    `;
    
    document.querySelector("#table-tfl").innerHTML = cadena;
}

function resetearPaginacion()
{
    paginaActual = 0;
    totalPaginas = 0;
}


//==================================================================>>>>>
// 3-1-2023

function marcarDesmarcarColorGrilla(ele, correlativo)
{
    //console.log(ele);

    if(ele.classList.contains('select-card') === false)
    {
      // console.log("Agrega la clase select-card");
      ele.classList.add('select-card');
      arregloCorrelativosSeleccionados.push(correlativo);
    }
    else {
      // console.log("Remueve la clase select-card");
      ele.classList.remove('select-card');
      arregloCorrelativosSeleccionados = arregloCorrelativosSeleccionados.filter(x => x != correlativo);
    }

    console.log(arregloCorrelativosSeleccionados);
}

//==================================================================>>>>>

function imprimirParaDotNet()
{
    var cadena = "";
    
    cadena += "List<Ruta> lista = new List<Ruta>()";
    cadena += "{";

    cadena += arregloRutas.map(ruta => 
    {
        return `
            new Ruta { 
                ncorr = ${ruta.ncorr}, 
                nombreRuta = "${ruta.nombreRuta}",
                infoNiveles = new List<InfoNivel>() 
                { 
                    ${ruta.infoNiveles.map(infoNivel => 
                    {
                        return `
                        new InfoNivel { 
                            numeroNivel = ${infoNivel.numeroNivel},
                            elementos = new List<Elemento>()
                            { 
                                ${infoNivel.elementos.map(elemento => 
                                {
                                    return `new Elemento { correlativo = ${elemento.correlativo}, texto = "${elemento.texto}" },`;
                                }).join("")}
                            }
                        },
                        `;
                    }).join("")}
                }
            },
        `;
    }).join(""); 

    cadena += "};";

    console.log(cadena); 
}






