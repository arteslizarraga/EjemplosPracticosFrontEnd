
var arreglo = [];

function obtenerArregloSaros(fechaInicial) 
{
    const cicloSarosAños = 18; // 18 años
    const cicloSarosDias = 11; // 11 días adicionales
    const cicloSarosHoras = 8; // 8 horas adicionales

    const maxImpresiones = 100; // Número máximo de impresiones
    let conteo = 0;
    
    // Inicializa la fecha con la fecha inicial
    let fecha = new Date(fechaInicial);

    while (conteo < maxImpresiones) 
	{
        arreglo.push(fecha.getFullYear());
        
        // Restar el ciclo de Saros
        fecha.setFullYear(fecha.getFullYear() - cicloSarosAños);
        fecha.setDate(fecha.getDate() - cicloSarosDias);
        fecha.setHours(fecha.getHours() - cicloSarosHoras);

        conteo++;
    }
}

// Llamada a la función con el formato "MM-DD-YYYY"
//obtenerArregloSaros("08-04-2024");
obtenerArregloSaros("11-03-2011");

console.log(arreglo.join(","));

/*
2011: Terremoto de Tohoku, Japón, magnitud 9.1, el 11 de marzo.
1993: Terremoto de Hokkaido, Japón, magnitud 8.3, el 12 de julio.
*/
