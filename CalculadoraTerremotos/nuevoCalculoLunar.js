const MES_SINODICO = 29.53058867;
const ANO_TROPICO   = 365.242189;

function fechaAJDN(anio, mes, dia) {
  if (mes <= 2) { anio -= 1; mes += 12; }
  const A = Math.floor(anio / 100);
  let B = 0;
  if (anio > 1582 || (anio === 1582 && (mes > 10 || (mes === 10 && dia >= 15)))) {
    B = 2 - A + Math.floor(A / 4);
  }
  return Math.floor(365.25 * (anio + 4716)) + Math.floor(30.6001 * (mes + 1)) + dia + B - 1524.5;
}

function obtenerEtiquetaFase(diasCiclo) {
  if (diasCiclo < 1.84 || diasCiclo > 27.69) return "Luna Nueva (Syzygia)";
  if (diasCiclo < 5.53) return "Luna Creciente";
  if (diasCiclo < 9.22) return "Cuarto Creciente (Cuadratura)";
  if (diasCiclo < 12.91) return "Gibosa Creciente";
  if (diasCiclo < 16.61) return "Luna Llena (Syzygia)";
  if (diasCiclo < 20.30) return "Gibosa Menguante";
  if (diasCiclo < 23.99) return "Cuarto Menguante (Cuadratura)";
  return "Luna Menguante";
}

function calcularFaseProyectadaLibre(eventosArray) {
  const ev1 = eventosArray[0];
  const ev2 = eventosArray[1];

  const p1 = ev1.fecha.split("-").map(Number);
  const jdn1 = fechaAJDN(p1[0], p1[1], p1[2]);
  const faseOrigen = ev1.astronomia.diasDesdeLunaNueva;

  // Tomamos el mes y día del evento base como referencia estacional
  const mesBase = p1[1];
  const diaBase = p1[2];

  // Ajuste por si el año destino no es bisiesto y la fecha es 29 de febrero
  const diasEnMes = new Date(ev2.anio, mesBase, 0).getDate();
  const diaAjustado = Math.min(diaBase, diasEnMes);

  const jdn2 = fechaAJDN(ev2.anio, mesBase, diaAjustado);
  const diasTranscurridos = jdn2 - jdn1;

  // Cálculo astronómico sin restricciones de la fase en el año destino
  const faseProyectada = ((faseOrigen + diasTranscurridos) % MES_SINODICO + MES_SINODICO) % MES_SINODICO;

  return {
    eventoBase: {
      nombre: ev1.nombre,
      fecha: ev1.fecha,
      faseIngresada: `${ev1.astronomia.fase} (${faseOrigen} días desde Luna Nueva)`
    },
    eventoProyectado: {
      nombre: ev2.nombre,
      anioEvaluado: ev2.anio,
      fechaProyectada: `${ev2.anio}-${String(mesBase).padStart(2, '0')}-${String(diaAjustado).padStart(2, '0')}`,
      faseLunarCalculada: `${obtenerEtiquetaFase(faseProyectada)} (${faseProyectada.toFixed(2)} días desde Luna Nueva)`,
      ciclosLunaresCompletos: Number((diasTranscurridos / MES_SINODICO).toFixed(3))
    }
  };
}

// ==========================================
// PRUEBA 
// ==========================================

var entradaJSON = [
  {
    "nombre": "Terremoto de Caldera",
    "fecha": "1420-09-01",
    "astronomia": {
      "fase": "Cuarto Menguante +1 día",
      "diasDesdeLunaNueva": 23.15
    }
  },
  {
    "nombre": "Terremoto de Valparaíso",
    "anio": 1730
  }
];

var resultado = calcularFaseProyectadaLibre(entradaJSON);
console.log(JSON.stringify(resultado, null, 2));

//========================================================>>>>

var entradaJSON = [
  {
    "nombre": "Terremoto de Caldera",
    "fecha": "1420-09-01",
    "astronomia": {
      "fase": "Cuarto Menguante +1 día",
      "diasDesdeLunaNueva": 23.15
    }
  },
  {
    "nombre": "Terremoto hipotético",
    "anio": 2010
  }
];

var resultado = calcularFaseProyectadaLibre(entradaJSON);
console.log(JSON.stringify(resultado, null, 2));

/*
var entradaJSON = [
  {
    "nombre": "Terremoto de Caldera",
    "fecha": "1420-09-01",
    "astronomia": {
      "fase": "Cuarto Menguante +1 día",
      "diasDesdeLunaNueva": 23.15
    }
  },
  {
    "nombre": "Terremoto de Valparaíso",
    "anio": 1730
  }
];

var resultado = calcularFaseProyectada(entradaJSON);
console.log(JSON.stringify(resultado, null, 2));
*/
//==========================================================>>>>>
/*
var entradaJSON = [
  {
    "nombre": "Terremoto de Arica",
    "fecha": "1868-08-13",
    "astronomia": {
      "fase": "Luna Nueva -5 días",
      "diasDesdeLunaNueva": 24.53
    }
  },
  {
    "nombre": "Terremoto y maremoto de Iquique",
    "anio": 1877
  }
];

var resultado = calcularFaseProyectada(entradaJSON);
console.log(JSON.stringify(resultado, null, 2));
*/
//==========================================================>>>>>
/*
var entradaJSON = [
  {
    "nombre": "Terremoto de Valparaíso",
    "fecha": "1822-11-19",
    "astronomia": {
      "fase": "Cuarto Creciente -3 días",
      "diasDesdeLunaNueva": 4.38
    }
  },
  {
    "nombre": "Terremoto de Concepción",
    "anio": 1835
  }
];

var resultado = calcularFaseProyectada(entradaJSON);
console.log(JSON.stringify(resultado, null, 2));
*/
//==========================================================>>>>>