
function desplegarPaginacionBootstrap(datos) 
{
    let paginaActual = datos.paginaActual
    let totalRegistros = datos.totalRegistros
    let totalPaginas = datos.totalPaginas
    let registrosPorPagina = datos.registrosPorPagina
    let contarDesdeCero = (datos.contarDesdeCero != null) ? datos.contarDesdeCero : true;

    document.querySelector(datos.querySelector).innerHTML = "";   // Limpia

    let ul = document.createElement("ul");
    ul.setAttribute("class", "pagination");

    let cont = 0;

    let agregarLi = (info) => {
        let li = document.createElement("li");
        li.setAttribute("class", `page-item ${(info.esPaginaActual != null && info.esPaginaActual) ? "active" : ""}`);

        let enlace = document.createElement("a");
        enlace.setAttribute("href", "javascript:void(0)");
        enlace.setAttribute("class", "page-link");
        enlace.innerText = info.texto;
        if (info.numeroPagina != null) enlace.setAttribute("numeroPagina", info.numeroPagina);
        enlace.addEventListener("click", info.onclick);
        li.appendChild(enlace);

        ul.appendChild(li);
        cont++;
    };

    if (totalPaginas > 0 && totalRegistros >= registrosPorPagina) 
    {
        if (paginaActual != (contarDesdeCero ? 0 : 1))    // Ejemplo original java
        {
            agregarLi({ texto: "Anterior", onclick: datos.pasoAtras });
        }

        let maximo_paginas_mostrado = 10; // Total de paginas desplegadas. Ej: paginas del 1 al 10,   del 10 al 19,   del 20 al 29 
        let inicio_paginacion = 0;        // Primer numero de la paginación
        let fin_paginacion = 0;           // Ultimo numero de la paginación

        if (totalPaginas <= maximo_paginas_mostrado) { // Si el numero total de paginas es menor o igual a 10	
            inicio_paginacion = contarDesdeCero ? 0 : 1;
            fin_paginacion = totalPaginas;
        }
        else 
        {
            if (paginaActual > totalPaginas - maximo_paginas_mostrado)  // Esto impide que el numero de la pagina sobrepase el total de paginas
            {
                if (contarDesdeCero)
                    inicio_paginacion = totalPaginas - maximo_paginas_mostrado;
                else
                    inicio_paginacion = (totalPaginas - maximo_paginas_mostrado) + 1;

                fin_paginacion = totalPaginas;
            }
            else 
            {
                if (paginaActual < maximo_paginas_mostrado) {
                    inicio_paginacion = contarDesdeCero ? 0 : 1;
                    fin_paginacion = maximo_paginas_mostrado;
                }
                if (paginaActual >= maximo_paginas_mostrado) // Si la pagina actual es mayor o igual a diez  
                {
                    let finLoop = 0;

                    if (totalPaginas % maximo_paginas_mostrado == 0)   // Si la cantidad de resultados es divisible por el numero de paginas
                        finLoop = Math.ceil((totalPaginas / maximo_paginas_mostrado));
                    else
                        finLoop = Math.ceil((totalPaginas / maximo_paginas_mostrado) + 1);

                    for (let i = 1; i < finLoop; i++)  // Determinar donde empieza y termina la paginacion
                    {
                        if (paginaActual < maximo_paginas_mostrado * i) {
                            inicio_paginacion = maximo_paginas_mostrado * (i - 1);
                            fin_paginacion = (maximo_paginas_mostrado * i) - 1;
                            break;  // Es importante parar aquí el looping del for, sino aparecerá solo el ultimo grupo de paginas
                        }
                    }
                }
            }
        }

        //for(let i=0; i<=totalPaginas; i++)  // DE ESTA FORMA SE IMPRIMIRÍA UNA PAGINACIÓN CON EL TOTAL DE LAS PAGINAS

        for (let i = inicio_paginacion; i <= fin_paginacion; i++)  // LA PAGINACIÓN QUEDA ORDENADA EN GRUPOS DE 10 PAGINAS
        {
            agregarLi({
                texto: contarDesdeCero ? (i + 1) : i,
                numeroPagina: i,
                onclick: (paginaActual != i) ? datos.seleccionarPagina : null,
                esPaginaActual: (paginaActual == i)
            });
        }

        if (paginaActual != totalPaginas)  // Si pagina es diferente de totalPaginas 
        {
            agregarLi({ texto: "Siguiente", onclick: datos.pasoAdelante });
        }

        document.querySelector(datos.querySelector).appendChild(ul);  // NUEVO
    }
}

