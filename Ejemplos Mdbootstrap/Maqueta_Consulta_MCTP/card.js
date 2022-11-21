
function focalizarCard(e)  // Evento mouseenter
{
    let asociadoCon = e.getAttribute("asociado-con");

    if (asociadoCon != "")
    {
        asociadoCon.split("|").forEach(x =>
        {
            let card = document.getElementById(x);

            if (card != null)
                card.classList.add("asoc");
        });
    }
}

function desFocalizarCard(e) // Evento mouseleave 
{
    let asociadoCon = e.getAttribute("asociado-con");

    if (asociadoCon != "" && !e.hasAttribute("marcado"))
    {
        asociadoCon.split("|").forEach(x =>
        {
            let card = document.getElementById(x);

            if (card != null)
                card.classList.remove("asoc");
        });
    }
}

function clickCard(e)  // Evento click
{
    let asociadoCon = e.getAttribute("asociado-con");
    let agregarColor = false;

    if (!e.hasAttribute("marcado"))
    {
        //console.log("Se ha marcado");
        e.setAttribute("marcado", "true");
        e.classList.add("selected");
        agregarColor = true;
    }
    else 
    {
        // console.log("Se ha desmarcado");
        e.removeAttribute("marcado");
        e.classList.remove("selected");
    }

    if (asociadoCon != "")
    {
        asociadoCon.split("|").forEach(x =>
        {
            let card = document.getElementById(x);

            if (card != null)
            {
                if (agregarColor)
                    card.classList.add("asoc")
                else 
                    card.classList.remove("asoc");
            }
        });
    }
}

// Despliegue Instrucciones para el Usuario

const infoButton = document.getElementById('info-button');
const info = document.getElementById('info');

const estilosInfo = (height, opacity, visibility) => {
    info.style.cssText = `
            height: ${height};
            opacity: ${opacity};
            visibility: ${visibility};
            transition: all 0.3s;`;
}


infoButton.addEventListener('click', () =>
{
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
    const des = info.style.visibility;

    if (des === 'visible'){
        infoButton.classList.add('btn-reduce', 'p-0');
        estilosInfo('0px',0,'hidden');
        infoButton.innerHTML = `<i class="info-icon material-icons icon-lg" data-toggle="tooltip" data-placement="top" title="informaci&oacute;n">info</i>`;
        
    }
    else if (des === 'hidden')
    {
        if (screen.width <= 768 && screen.width >= 481){
            estilosInfo('140px',1,'visible');
        }
        else if (screen.width <= 480) {
            estilosInfo('250px',1,'visible');
        }
        else {
            estilosInfo('100px',1,'visible');
        }
        infoButton.classList.remove('btn-reduce', 'p-0');
        infoButton.innerText = 'Entendido';
    }
    
});
