var objetoImprimir = {
   "horasPresenciales":0,
   "horasOnline":0,
   "horasTotales":0,
   "horasTaller":0,
   "horasTerreno":0,
   "horasCampoClinico":0,
   "horasSincronicas":0,
   "horasAsincronicas":0,
   "maximoHoras":0,
   "contenidosMinimos":null,
   "horasUsoEquipamiento":0,
   "horasUsoSoftware":0,
   "listaProgramaFormacion":[
      {
         "programaFormacion":"programaFormacion 1",
         "programaAcademico":"programaAcademico 1",
         "periodicidad":"periodicidad 1",
         "numeroPeriodo":1,
         "competenciaTecnicaEgreso":"competenciaTecnicaEgreso 1"
      },
      {
         "programaFormacion":"programaFormacion 2",
         "programaAcademico":"programaAcademico 2",
         "periodicidad":"periodicidad 2",
         "numeroPeriodo":2,
         "competenciaTecnicaEgreso":"competenciaTecnicaEgreso 2"
      }
   ],
   "listaElaboracion":[
      {
         "nombreEspecialistaElaborador":"Nombre 1",
         "sede":"Sede 1",
         "mail":"1@gmail.com"
      },
      {
         "nombreEspecialistaElaborador":"Nombre 2",
         "sede":"Sede 2",
         "mail":"2@gmail.com"
      }
   ],
   "listaPerfilDocente":[
      {
         "preferencia":"preferencia 1",
         "tituloProfesional":"tituloProfesional 1",
         "gradoAcademico":"gradoAcademico 1",
         "experienciaDocente":"experienciaDocente 1",
         "experienciaProfesional":"experienciaProfesional 1"
      },
      {
         "preferencia":"preferencia 2",
         "tituloProfesional":"tituloProfesional 2",
         "gradoAcademico":"gradoAcademico 2",
         "experienciaDocente":"experienciaDocente 2",
         "experienciaProfesional":"experienciaProfesional 2"
      }
   ],
   "tipoLaboratorio":[ "3", "4" ],
   "tipoTaller":[
      "3",
      "4"
   ],
   "clusterCompetenciasTransversales":[ "3", "4" ],
   "subCompetencias":[ "3", "4" ],
   "estrategiasDinamicasRecomendadas":[ "3", "4" ],
   "tecnicasDidacticasRecomendadas":[ "3", "4" ],
   "asignaturasPrerrequisito":[ "3", "4" ],
   "equipamientos":[ "3", "4" ],
   "insumos":[ "3", "4" ],
   "software":[ "3", "4" ],
};

var arregloAtributos = [];
var cadena = "";

Object.keys(objetoImprimir).forEach(function(key) 
{
	var valor = objetoImprimir[key];
	
	if (Array.isArray(valor)) 
		cadena += `${key}  json_array_t; \n`;
	else {
		arregloAtributos.push(key);	
		cadena += `${key} varchar(100); \n`;
	}
});

cadena += "-- =========================>>>>> \n";

Object.keys(objetoImprimir).forEach(function(key) 
{
	var valor = objetoImprimir[key];
	
	if (Array.isArray(valor)) 
		cadena += `objeto_${key} json_object_t; \n`;
});

cadena += "-- =========================>>>>> \n";

arregloAtributos.forEach(key => {
	cadena += `${key} := NVL(TFL.PKG_TFL_GENERICOS.OBTENERVALOR(objeto, '${key}'),''); \n`;
});

cadena += "-- =========================>>>>> \n";

arregloAtributos.forEach(key => {
	cadena += `DBMS_OUTPUT.put_line('${key}: ' || ${key}); \n`;
});

cadena += "-- =========================>>>>> \n";

Object.keys(objetoImprimir).forEach(function(key) 
{
	var valor = objetoImprimir[key];
	
	if (Array.isArray(valor)) 
	{
		cadena += `IF objeto.get('${key}') IS NOT NULL AND objeto.get('${key}').is_array THEN \n`;
		cadena += `	${key} := TREAT (objeto.get('${key}') AS json_array_t); \n\n`;
		
		cadena += `		FOR index_${key} IN 0 .. ${key}.get_size - 1 LOOP \n`; 
          cadena += `			objeto_${key} := json_object_t (${key}.get(index_${key})); \n`;  
		cadena += `		END LOOP; \n`; 
		
		cadena += `END IF; \n\n`;
	}	
});

console.log(cadena);