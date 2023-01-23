var arreglo = [
	{
		id: 1,
		regiones: [
			{ nombreRegion: "AAAAAAAA" },
			{ nombreRegion: "BBBBBBBB" },
			{ nombreRegion: "CCCCCCCC" }
		]
	},
	{
		id: 2,
		regiones: [
			{ nombreRegion: "DDDDDDDD" },
			{ nombreRegion: "EEEEEEEE" },
			{ nombreRegion: "FFFFFFFF" }
		]
	}
];

// Obtener un arreglo con solo un atributo
arreglo.map(x => x.regiones.map(y => y.nombreRegion)).reduce((prev, next) => prev.concat(next));


// Verificar si todas las preguntas tienen nombreRegion 
arreglo.every(x => x.regiones.some(y => y.nombreRegion != ""));

// Otra forma
arreglo.map(x => x.regiones.some(y => y.nombreRegion != "")).every(x => x == true);