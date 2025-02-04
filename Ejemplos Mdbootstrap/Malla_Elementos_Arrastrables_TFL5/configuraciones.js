var listaSemestres = [
  {
    numero: 1,
    detalles: [
      { ncorr: 1, descripcion: "Arquitectura 1", cicloCompleto: false },
      { ncorr: 2, descripcion: "Arquitectura 2", cicloCompleto: false },
      { ncorr: 3, descripcion: "Arquitectura 3 Ciclo Completo", cicloCompleto: true }
    ], 
    horas: 24
  },
  {
    numero: 2,
    detalles: [
      { ncorr: 4, descripcion: "Arquitectura 4", cicloCompleto: false },
      { ncorr: 5, descripcion: "Arquitectura 5", cicloCompleto: false }
    ],
    horas: 12
  },
  { numero: 3, horas: 0, detalles: [] },
  { numero: 4, horas: 0, detalles: [] },
  { numero: 5, horas: 0, detalles: [] },
  { numero: 6, horas: 0, detalles: [] },
  { numero: 7, horas: 0, detalles: [] },
  { numero: 8, horas: 0, detalles: [] }
];

$(document).ready(function () 
{
  llenarMalla();
  configurarEventosMalla();
});

function llenarMalla()
{
  document.querySelector("#container-malla").innerHTML = listaSemestres.map(semestre => 
  {
    return `
    <div class="col mb-4 col-malla d-flex flex-column" id="semestre-${semestre.numero}" style="order: 1;">
        <div class="title d-flex flex-column mb-1">
            <div class="title-semestre text-center">
                <p class="m-0 p-2">${semestre.numero}° Semestre</p>
            </div>
            <div class="malla-num d-flex flex-row mt-1 mb-2">
                <span class="col mr-1 text-center ciclo">ciclo 1</span>
                <span class="col ml-1 text-center ciclo">ciclo 2</span>
            </div>
            
            <div ncorr="${semestre.numero}" class="container-card-asignaturas d-flex flex-wrap justify-content-between" style="background-color: transparent;">

                ${semestre.detalles.map(x => 
                {
                  return `
                  <div ncorr="${x.ncorr}" class="${x.cicloCompleto ? "col-12 p-1" : "col-6"} card text-center card-malla" data-horas="8" draggable="true">

                      <div class="card-body my-2">
                          <h5 class="nombre-asignatura">${x.descripcion}</h5>

                          <div class="card-actions d-flex justify-content-between flex-row my-3">

                            ${(x.cicloCompleto) ? 
                            `<div class="card-asignatura-empt d-flex justify-content-start my-2">
                                <div class="icon-empt" data-toggle="tooltip"
                                data-placement="bottom" title=""
                                data-original-title="Asignatura con articulación EMPT">
                                <i class="material-icons">insert_link</i></div>
                            </div>` : ""}

                            <div class="d-flex flex-row ml-auto flex-wrap">

                                <div class="card-asignatura-certificado d-flex justify-content-end my-2 mr-1">
                                    <div class="icon-certi certificado-APP" data-toggle="tooltip" data-placement="bottom"
                                    title="" data-original-title="certificado-APP">
                                    <i class="material-icons">verified</i></div>
                                </div>
                                <div class="card-asignatura-certificado d-flex justify-content-end my-2 mr-1">
                                    <div class="icon-certi certificado-intranet" data-toggle="tooltip" data-placement="bottom"
                                    title="" data-original-title="certificado-intranet"><i
                                    class="material-icons">verified</i></div>
                                </div>
                                <div class="card-asignatura-certificado d-flex justify-content-end my-2 mr-1">
                                    <div class="icon-certi certificado-adjunto" data-toggle="tooltip" data-placement="bottom"
                                    title="" data-original-title="certificado-adjunto"><i
                                    class="material-icons">verified</i></div>
                                </div>
                            </div>
                          </div>
                      </div>
                      <div class="footer-actions d-flex flex-row border-top pt-2 pb-1">
                          <div class="col-6 border-right p-0">
                              <button type="button" class="btn-eliminar-asignatura-malla mr-0 d-flex align-items-center mx-auto">
                                  <i class="material-icons mr-1 icon-lg grey-text icon-2x">delete</i>
                              </button>
                          </div>
                          <div class="col-6 p-0">
                              <button type="button" class="btn-editar-asignatura-malla mr-0 d-flex align-items-center mx-auto">
                                  <i class="material-icons mr-1 icon-lg icon-2x info-text">edit</i>
                              </button>
                          </div>
                      </div>
                  </div>
                  `;
                }).join("")}

            </div>

            <button type="button" class="btn btn-agregar-asignatura-semestre waves-effect my-3 waves-light d-flex align-items-center">
                <i class="material-icons icons-lg mr-1">add</i>
                Agregar Asignatura
            </button>
            <div class="box-horas p-2">
                <span class="hora-semestre">${semestre.horas}</span> horas
            </div>
        </div>
    </div>
    `;
  })
  .join("");
}

function configurarEventosMalla() 
{
  // Remover eventos existentes
  const oldElements = document.querySelectorAll('.container-card-asignaturas, .container-card-electivo');

  oldElements.forEach((element) => {
    const newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);
  });

  const containerCard = document.querySelectorAll('.container-card-asignaturas');
  const containerCardElectivo = document.querySelectorAll('.container-card-electivo');
  let electivo = false;
  let seleccionado = null;

  document.addEventListener('dragstart', (e) => 
  {
    const cardMalla = e.target.closest('.card-malla');
    if (!cardMalla) return;

    seleccionado = cardMalla; // Guarda el elemento arrastrado
    const isElectivo = cardMalla.closest('.malla-group') !== null;

    electivo = isElectivo;
    cardMalla.classList.add('seleccionada');
    e.dataTransfer.setData('text/html', cardMalla.outerHTML); // Guarda el HTML del elemento
    e.dataTransfer.effectAllowed = 'move';
  });

  document.addEventListener('dragend', () => {
    if (seleccionado) {
      seleccionado.classList.remove('seleccionada'); // Remueve la clase seleccionada
      seleccionado = null;  // Reinicia el elemento seleccionado
      electivo = false;     // Reinicia el estado de electivo
    }
  });

  const handleDrop = (e, isElectivoTarget, targetContainer) => 
  {
    e.preventDefault();
  
    if (targetContainer.hasAttribute("ncorr")) 
    {
      const ncorrContenedor = targetContainer.getAttribute("ncorr");                    // ncorr de destino
      const ncorrElemento = seleccionado ? seleccionado.getAttribute("ncorr") : null;   // ncorr del elemento arrastrado
  
      console.log("electivo", electivo);
      console.log("ncorr del contenedor destino:", ncorrContenedor);
      console.log("ncorr del elemento arrastrado:", ncorrElemento);
      console.log("=========================>>>>");
  
      // Aquí puedes agregar la lógica adicional
    }
  
    if ((electivo && !isElectivoTarget) || (!electivo && isElectivoTarget)) {
      toastr.warning(isElectivoTarget
        ? 'Una asignatura no puede ir en un grupo electivo'
        : 'Un electivo no puede ir en un semestre de asignatura');
      return;
    }
  
    const nuevoElemento = document.createElement('div');
    nuevoElemento.innerHTML = e.dataTransfer.getData('text/html');
    const nuevaCard = nuevoElemento.firstChild;
  
    nuevaCard.classList.remove('seleccionada'); // Asegúrate de eliminar cualquier clase residual
    nuevaCard.draggable = true; // Mantén el nuevo elemento arrastrable
  
    const rect = targetContainer.getBoundingClientRect();
    const middleY = rect.top + rect.height / 2;
  
    if (e.clientY < middleY) {
      targetContainer.insertBefore(nuevaCard, targetContainer.firstChild);
    } else {
      targetContainer.appendChild(nuevaCard);
    }
  
    seleccionado.remove();  // Elimina el elemento original
    seleccionado = null;    // Reinicia el elemento seleccionado
    electivo = false;       // Reinicia el estado de electivo
  };  

  containerCard.forEach((asignaturaMalla) => 
  {
    asignaturaMalla.addEventListener('dragover', (e) => {
      e.preventDefault();
      asignaturaMalla.style.backgroundColor = "rgba(178,77,25,0.4)";
    });

    asignaturaMalla.addEventListener('dragleave', () => {
      asignaturaMalla.style.backgroundColor = "transparent";
    });

    asignaturaMalla.addEventListener('drop', (e) => {
      asignaturaMalla.style.backgroundColor = "transparent";
      handleDrop(e, false, asignaturaMalla);
    });
  });

  containerCardElectivo.forEach((electivoMalla) => 
  {
    electivoMalla.addEventListener('dragover', (e) => {
      e.preventDefault();
      electivoMalla.style.backgroundColor = "rgba(121,121,121,0.4)";
    });

    electivoMalla.addEventListener('dragleave', () => {
      electivoMalla.style.backgroundColor = "transparent";
    });

    electivoMalla.addEventListener('drop', (e) => {
      electivoMalla.style.backgroundColor = "transparent";
      handleDrop(e, true, electivoMalla);
    });
  });
}

