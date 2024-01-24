
this.listaObjetos = JSON.parse('[{"numeroPeriodo":1,"detallesPeriodo":[{"programaFormacion":"7d8bb478f7","programaAcademico":"7c311d3ce3","asignaturaTFL":"1a4b4c6e69","tipoAsignatura":"fa4fc7009e","horas":10,"certificado":"e7b6f2a994"},{"programaFormacion":"a3ab381459","programaAcademico":"0e445f48f2","asignaturaTFL":"f552723e86","tipoAsignatura":"f60768d77f","horas":10,"certificado":"966ebebcf1"}],"totalHorasProgramaFormacion":20},{"numeroPeriodo":2,"detallesPeriodo":[{"programaFormacion":"fcf5f69f86","programaAcademico":"a0b85743ff","asignaturaTFL":"4332581613","tipoAsignatura":"f3efd95775","horas":10,"certificado":"ab5013389d"},{"programaFormacion":"faaabab231","programaAcademico":"23a7ab8a29","asignaturaTFL":"150ee94614","tipoAsignatura":"035070be38","horas":10,"certificado":"0403baee55"}],"totalHorasProgramaFormacion":20},{"numeroPeriodo":3,"detallesPeriodo":[{"programaFormacion":"8c4b0df364","programaAcademico":"48f81aee9f","asignaturaTFL":"65a404c3f8","tipoAsignatura":"f087620761","horas":10,"certificado":"d70cb3b667"},{"programaFormacion":"e20f14f26f","programaAcademico":"87f04e2f5a","asignaturaTFL":"a719b6936d","tipoAsignatura":"9909535376","horas":10,"certificado":"43d21052a5"}],"totalHorasProgramaFormacion":20},{"numeroPeriodo":4,"detallesPeriodo":[{"programaFormacion":"39b134a223","programaAcademico":"0e65788a91","asignaturaTFL":"6dffc3c7ec","tipoAsignatura":"4ace67dbad","horas":10,"certificado":"e68b3489e6"},{"programaFormacion":"10a9b5ccbd","programaAcademico":"d3ea12340d","asignaturaTFL":"34cae86900","tipoAsignatura":"18187597e8","horas":10,"certificado":"081b4cb919"}],"totalHorasProgramaFormacion":20}]');

desplegarMalla();

function desplegarMalla()
{
    let totalHorasProgramaAcademico = 0;

    let cadena = `
	<div class="vista-malla p-2" style="display: block;">
	  <div class="px-3">
		<div id="super-container" class="super-container row flex-row flex-nowrap mb-2">
		  <div class="card-container first">
			<h2 class="title p-2 text-center">Horas</h2>
			<div class="card card-vacia mb-2">

			</div>
		  </div>

          ${this.listaObjetos.map(periodo => 
          {
            // ${periodo.detallesPeriodo.map((x, indexDetalle) =>

            return `
            <!-- Período ${periodo.numeroPeriodo} -->

            <div class="card-container col">
              <h2 class="title p-2 text-center">Periodo ${periodo.numeroPeriodo}</h2>

              ${periodo.detallesPeriodo.map(x => 
              {
                return `
                <div class="card mb-2">
                    <p class="text-center">${x.programaFormacion}</p>
                    <div class="card-footer-periodo row flex-row">
                    <div class="col">
                        <strong class="text-nowrap">${x.horas}</strong>
                    </div>
                    <div class="col">
                        <strong class="text-nowrap">TC</strong>
                    </div>
                    <div class="col">
                        <strong class="text-nowrap">AI</strong>
                    </div>
                    </div>
                </div>
                `;
              })
              .join("")}
  
            </div>
            `;
          })
          .join("")}
		 
		</div>

		<div id="card-container-footer" class="card-container-footer row flex-row flex-nowrap">

		  <div class="card-container first">
			<div class="card"><strong>Total Horas Período</strong></div>
		  </div>

          <!-- Total Horas Período -->

          ${this.listaObjetos.map(periodo => 
          {
            let suma = (periodo.detallesPeriodo.length > 0) ?
                periodo.detallesPeriodo.reduce((acumulador, elemento) => acumulador + elemento.horas, 0)
                : 0;

            totalHorasProgramaAcademico = totalHorasProgramaAcademico + suma;

            return `
            <!-- Total Horas Período ${periodo.numeroPeriodo} -->

            <div class="card-container col">
              <div class="card mb-2">
                <p class="text-center font-weight-bold">${suma}</p>
              </div>
            </div>
            `;
          })
          .join("")}

		</div>

		<div id="card-container-total" class="card-container-total row flex-row flex-nowrap">

		  <div class="card-container first">
			<div class="card"><strong>Total Horas Programa Académico</strong></div>
		  </div>

		  <div class="card-container col-12">
			<div class="card mb-2">
			  <p class="text-center font-weight-bold">@totalHorasProgramaAcademico</p>
			</div>
		  </div>

		</div>

	  </div>
	</div>
    `;

    cadena = cadena.replace("@totalHorasProgramaAcademico", totalHorasProgramaAcademico);

    document.querySelector("#despliegue-malla").innerHTML = cadena;
}