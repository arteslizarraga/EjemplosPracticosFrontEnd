
this.nivelesMctp = obtenerNivelesMctp();
this.listaObjetos = obtenerListaObjetos();

this.objeto = JSON.parse(JSON.stringify(this.listaObjetos[0]));   // Hace una copia del item cero de    this.listaObjetos[0]

$(document).ready(function() 
{
    // Activar selects
    $(".chosen-select").chosen({ disable_search_threshold: 10, no_results_text: "Sin Resultados para: ", width: "100%" });
    $(".mdb-select").material_select();

    construirAcordeonNiveles();
});

//===================================================>>>>

function construirAcordeonNiveles()
{
    this.coloresDescripcion = obtenerColoresDescripcion();

    // ${this.nivelesMctp.map((nivel, indexNivel) =>

    let cadena = `
    <div class="acordeon-niveles accordion md-accordion" id="acordeon-niveles-descripcion" role="tablist" aria-multiselectable="true">

        ${this.objeto.niveles.map((nivel, indexNivel) => 
        {
            return `
            <div class="accordion-item">
    
                <div class="accordion-header grey lighten-3" role="tab" id="heading-nivel-${nivel.def_nmctp_ncorr}">
                    <a data-toggle="collapse" data-parent="#acordeon-niveles-descripcion" href="#collapse-nivel-${nivel.def_nmctp_ncorr}" aria-expanded="false" aria-controls="collapse-nivel-${nivel.def_nmctp_ncorr}">
                    <h5 class="mb-0 pl-3 pr-3">
                        Nivel ${nivel.def_nmctp_ncorr}
                        <span class="accordion-arrow"><i class="material-icons rotate-icon float-right">keyboard_arrow_down</i></span>
                    </h5>
                    </a>
                </div>
                <div id="collapse-nivel-${nivel.def_nmctp_ncorr}" class="collapse ${indexNivel == 0 ? "show" : ""}" role="tabpanel" aria-labelledby="heading-nivel-${nivel.def_nmctp_ncorr}" data-parent="#acordeon-niveles-descripcion">
    
                    <div class="accordion-body p-3 pt-3 pb-2">
    
                        <div class="row mb-4">

                            <div class="col-12 col-md-6">
                                <div class="md-form mb-3">
                                    <textarea onkeyup="objeto.niveles[${indexNivel}].descripcion = this.value" 
                                    name="descripcion" rows="3" placeholder="Ingrese Descripción" class="form-control md-textarea">${nivel.descripcion}</textarea>

                                    <label class="active">Nivel ${nivel.def_nmctp_ncorr}</label>
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

    document.querySelector("#acordeon-niveles-descripcion").innerHTML = cadena;

    setTimeout(() => 
    {
        this.objeto.niveles.forEach(x => 
        {
            let a = Array.from(document.querySelectorAll(`#acordeon-niveles-descripcion #collapse-nivel-${x.def_nmctp_ncorr} [name='colorNivel'] a`))
            .find(y => y.getAttribute("codigo") == x.color);

            if (a != null) {
                a.click()
            }    
        });
    }, 200);
}

function seleccionarColorDescripcion(e, indexNivel, color)
{
    // console.log(e);
    e.parentElement.previousElementSibling.innerHTML  = e.innerHTML;
    //console.log(color);

    let elemento = this.objeto.niveles[indexNivel];
    elemento.color = color;
}

//=================================================================>>>>>
// Habilitar Dropdowns para seleccionar colores
/*
const drop = document.querySelectorAll(".drop-color");

for (let i=0; i < drop.length; i++)
{
    let d = drop[i];
    let b = d.nextElementSibling.children;

    for(let i=0; i < b.length; i++)
    {
        let bb = b[i];

        // console.log(bb);  // Probar con este

        bb.addEventListener("click", function(){
            bb.parentElement.previousElementSibling.innerHTML  = bb.innerHTML;
        })
    }
    
    // console.log(d.nextElementSibling.children)
}
*/
//=================================================================>>>>>