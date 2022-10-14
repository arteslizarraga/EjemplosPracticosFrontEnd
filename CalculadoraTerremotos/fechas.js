function calcularDiferenciaEntreDosFechas(babu) 
{
    let primeraFecha = babu.primeraFecha.split("-"); 
    let segundaFecha = babu.segundaFecha.split("-");

    let diaPrimeraFecha = primeraFecha[0];
    let mesPrimeraFecha = primeraFecha[1];
    let anioPrimeraFecha = primeraFecha[2];

    let diaSegundaFecha = segundaFecha[0];
    let mesSegundaFecha = segundaFecha[1];
    let anioSegundaFecha = segundaFecha[2];

    if (diaSegundaFecha == "" || mesSegundaFecha == "" || anioSegundaFecha == "" || diaPrimeraFecha == "" || mesPrimeraFecha == "" || anioPrimeraFecha == "") {
        return "Información recibida incorrecta (Función calcularDiferenciaEntreDosFechas)";
    }

    let aniosMesesDias = null;
    let soloDias = null;

    let curd = new Date(anioSegundaFecha, mesSegundaFecha - 1, diaSegundaFecha);
    let cald = new Date(anioPrimeraFecha, mesPrimeraFecha - 1, diaPrimeraFecha);

    let diff = Date.UTC(anioSegundaFecha, mesSegundaFecha - 1, diaSegundaFecha, 0, 0, 0)
        - Date.UTC(anioPrimeraFecha, mesPrimeraFecha - 1, diaPrimeraFecha, 0, 0, 0);

    let dife = datediff(curd, cald);

    if (checkleapyear(cald) == true) {
        aniosMesesDias = dife[0] + " años, " + dife[1] + " meses, y " + dife[2] + " días";
    } 
    else {
        aniosMesesDias = dife[0] + " años, " + dife[1] + " meses, y " + dife[2] + " días";
    }

    let secleft = diff / 1000 / 60;
    let hrsleft = secleft / 60;
    let daysleft = hrsleft / 24;

    // soloDias = daysleft + " días";
    soloDias = daysleft;

    // console.log({ aniosMesesDias, soloDias }); 
    return { aniosMesesDias, soloDias }; 
}

function checkleapyear(datea) {
    if (datea.getYear() % 4 == 0) {
        if (datea.getYear() % 10 != 0) {
            return true;
        }
        else {
            if (datea.getYear() % 400 == 0)
                return true;
            else
                return false;
        }
    }
    return false;
}

function DaysInMonth(Y, M) {
    with (new Date(Y, M, 1, 12)) {
        setDate(-2);
        return getDate();
    }
}

function datediff(date1, date2) {
    var y1 = date1.getFullYear(), m1 = date1.getMonth(), d1 = date1.getDate(),
        y2 = date2.getFullYear(), m2 = date2.getMonth(), d2 = date2.getDate();
    if (d1 < d2) {
        m1--;
        d1 += DaysInMonth(y2, m2);
    }
    if (m1 < m2) {
        y1--;
        m1 += 12;
    }
    return [y1 - y2, m1 - m2, d1 - d2];
}