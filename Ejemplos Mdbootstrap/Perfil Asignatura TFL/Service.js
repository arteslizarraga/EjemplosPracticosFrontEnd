// Llamadas Endpoints

class ComboboxService
{
    obtenerFuncionesPorAreaFormativa(p_tcla_tdesc)
    {
        return new Promise((resolve, reject) => 
        {
            $.ajax({
                method: "POST",
                url: "ASIGNATURAS.aspx/ASIGNATURAS_AREA_FUNCION",
                data: JSON.stringify({ p_tcla_tdesc }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (res) =>
                {
                    if (res.status == 200)
                        resolve(res.objeto);
                    else 
                        reject(res);
                },
                error: (XMLHttpRequest, textStatus, errorThrown) => reject("Ocurrió un error")
            });
        });
    }

    obtenerCompetenciasPorCluster(p_comt_ncorr)
    {
        return new Promise((resolve, reject) => 
        {
            $.ajax({
                method: "POST",
                url: "ASIGNATURAS.aspx/ASIGNATURAS_SUBCOMPETENCIAS",
                data: JSON.stringify({ p_comt_ncorr }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (res) =>
                {
                    if (res.status == 200)
                        resolve(res.objeto);
                    else 
                        reject(res);
                },
                error: (XMLHttpRequest, textStatus, errorThrown) => reject("Ocurrió un error")
            });
        });
    }
}

class AsignaturasService
{
    obtenerDatosCardEditar(
        def_tfl_ncorr,
        def_productos_ncorr,
        def_pacademico_ncorr,
        asig_tfl_ccod
    )
    {
        let respuesta = {
            "objetoDesplegar":{
               "nombreAsignatura":"UCL PLARA 1 fdsfdsfdf",
               "asignaturas_fefectiva":"17/08/2023",
               "asignaturas_estado":"INACTIVO",
               "mtz_asig_prod_encorr":694,
               "asig_tfl_ncorr":310,
               "malla_pacademico_ncorr":45,
               "horasPresenciales":3,
               "horasOnline":5,
               "horasTotales":45,
               "horasAula":4,
               "horasLaboratorio":5,
               "horasTaller":23,
               "horasTerreno":54,
               "horasCampoClinico":4,
               "horasSincronicas":3,
               "horasAsincronicas":2,
               "modalidad":1,
               "tipoAsignatura":2,
               "areaFormativa":3,
               "funcionAsignatura":4,
               "indicadorSeccReqMaximoHrs":"Si",
               "seccionMaximoHrs":2,
               "nivelMctp":181,
               "cualificacionesAsociadas":"- CUALIFICACIÓN 1\r- CUALIFICACIÓN 2\r",
               "uclsAsociadas":"- UCL PLARA 1\r- UCL PLARA 2\r- UCL PLARA 3\r- UCL PLARA 1\r- UCL PLARA 4\r- UCL PLARA 5\r",
               "certificados":"PROCESO DE TITULACIÓN",
               "contenidosMinimos":"sdasdasdsd",
               "horasUsoEquipamiento":3,
               "horasUsoSoftware":2,
               "certificacionesHabilitantes":"aaaaaaaaaa",
               "dominioHerramientas":"bbbbbbbbbbbb",
               "observaciones":"cccccccccccc",
               "listaProgramaFormacion":[
                  {
                     "programaFormacion":"CURSOS DE OFICIOS O BÁSICOS",
                     "programaAcademico":"TECNOLOGÍA EN WEBMASTER",
                     "periodicidad":"Mensual",
                     "numeroPeriodo":2,
                     "competenciaTecnicaEgreso":"COMPETENCIA TÉCNICA EGRESO 1"
                  },
                  {
                     "programaFormacion":"CURSOS DE OFICIOS O BÁSICOS",
                     "programaAcademico":"TECNOLOGÍA EN WEBMASTER",
                     "periodicidad":"Mensual",
                     "numeroPeriodo":2,
                     "competenciaTecnicaEgreso":"COMPETENCIA TÉCNICA EGRESO 1"
                  }
               ],
               "listaElaboracion":[
                  {
                     "asignaturas_elab_ncorr":194,
                     "nombreEspecialistaElaborador":"aaaaaaa",
                     "sede":"Arica",
                     "sede_ccod":18,
                     "mail":"asasas@yahoo.es"
                  }
               ],
               "listaPerfilDocente":[
                  {
                     "asignaturas_pd_det_ncorr":147,
                     "preferencia":1,
                     "tituloProfesional":"Administrador de Empresas con mención en Marketing",
                     "esas_ncorr_tit":564,
                     "gradoAcademico":"Licenciado en Administración de Empresas",
                     "esas_ncorr_gra":48,
                     "experienciaDocente":3,
                     "experienciaProfesional":4
                  }
               ],
               "tipoLaboratorio":[
                  "1",
                  "2"
               ],
               "tipoTaller":[
                  "1",
                  "2"
               ],
               "clusterCompetenciasTransversales":[
                  {
                     "ncorrCluster":2,
                     "listaCompetencias":[
                        {
                           "ncorrCompetencia":1
                        },
                        {
                           "ncorrCompetencia":4
                        }
                     ]
                  },
                  {
                     "ncorrCluster":4,
                     "listaCompetencias":[
                        {
                           "ncorrCompetencia":9
                        }
                     ]
                  }
               ],
               "estrategiasDinamicasRecomendadas":[
                  "5",
                  "8"
               ],
               "tecnicasDidacticasRecomendadas":[
                  "1",
                  "3"
               ],
               "asignaturasPrerrequisito":[
                  "337",
                  "338"
               ],
               "equipamientos":[
                  "464",
                  "465"
               ],
               "insumos":[
                  "678",
                  "679"
               ],
               "software":[
                  "618",
                  "660"
               ]
            },
            "infoCombobox":{
               "nivelMctp":[
                  {
                     "codigo":"181",
                     "descripcion":"2",
                     "selected":false
                  },
                  {
                     "codigo":"182",
                     "descripcion":"3",
                     "selected":false
                  },
                  {
                     "codigo":"183",
                     "descripcion":"4",
                     "selected":false
                  },
                  {
                     "codigo":"184",
                     "descripcion":"5",
                     "selected":false
                  }
               ],
               "tipoLaboratorio":[
                  {
                     "codigo":"2",
                     "descripcion":"Enfermería",
                     "selected":false
                  },
                  {
                     "codigo":"3",
                     "descripcion":"Lab 3",
                     "selected":false
                  },
                  {
                     "codigo":"1",
                     "descripcion":"Metrología",
                     "selected":false
                  }
               ],
               "tipoTaller":[
                  {
                     "codigo":"2",
                     "descripcion":"Aula",
                     "selected":false
                  },
                  {
                     "codigo":"1",
                     "descripcion":"Mecánico",
                     "selected":false
                  }
               ],
               "modalidad":[
                  {
                     "codigo":"1",
                     "descripcion":"Presencial",
                     "selected":false
                  },
                  {
                     "codigo":"3",
                     "descripcion":"Semipresencial",
                     "selected":false
                  },
                  {
                     "codigo":"2",
                     "descripcion":"Online",
                     "selected":false
                  }
               ],
               "tipoAsignatura":[
                  {
                     "codigo":"1",
                     "descripcion":"Lectiva",
                     "selected":false
                  },
                  {
                     "codigo":"2",
                     "descripcion":"Practica",
                     "selected":false
                  },
                  {
                     "codigo":"3",
                     "descripcion":"Co-Curricular",
                     "selected":false
                  },
                  {
                     "codigo":"4",
                     "descripcion":"Extra-Curricular",
                     "selected":false
                  }
               ],
               "areaFormativa":[
                  {
                     "codigo":"1",
                     "descripcion":"Disciplinas Básicas",
                     "selected":false
                  },
                  {
                     "codigo":"3",
                     "descripcion":"Formación para la Empleabilidad",
                     "selected":false
                  },
                  {
                     "codigo":"12",
                     "descripcion":"De la Especialidad",
                     "selected":false
                  }
               ],
               "clusterCompetenciasTransversales":[
                  {
                     "codigo":"5",
                     "descripcion":"Aprendizaje Continuo o Permanente",
                     "selected":false
                  },
                  {
                     "codigo":"6",
                     "descripcion":"Competencias Habilitantes",
                     "selected":false
                  },
                  {
                     "codigo":"2",
                     "descripcion":"Ética y Ciudadanía.",
                     "selected":false
                  },
                  {
                     "codigo":"4",
                     "descripcion":"Resolución de Problemas, Innovación y Emprendimiento",
                     "selected":false
                  },
                  {
                     "codigo":"3",
                     "descripcion":"Trabajo Colaborativo y Comunicación",
                     "selected":false
                  }
               ],
               "estrategiasDinamicasRecomendadas":[
                  {
                     "codigo":"8",
                     "descripcion":"Aprendizaje Basado en Desafíos (ABDe)",
                     "selected":false
                  },
                  {
                     "codigo":"5",
                     "descripcion":"Aprendizaje Basado en Investigación (ABI)",
                     "selected":false
                  },
                  {
                     "codigo":"4",
                     "descripcion":"Aprendizaje Basado en Problemas (ABP)",
                     "selected":false
                  },
                  {
                     "codigo":"6",
                     "descripcion":"Aprendizaje Basado en Proyectos (ABPro)",
                     "selected":false
                  },
                  {
                     "codigo":"11",
                     "descripcion":"Aprendizaje Centrado en la Resolución de Problemas en el Aula (ACERPA)",
                     "selected":false
                  },
                  {
                     "codigo":"7",
                     "descripcion":"Aprendizaje Servicio (A+S)",
                     "selected":false
                  },
                  {
                     "codigo":"3",
                     "descripcion":"Dilemas Éticos (DE)",
                     "selected":false
                  },
                  {
                     "codigo":"2",
                     "descripcion":"Método del Caso (MC)",
                     "selected":false
                  },
                  {
                     "codigo":"9",
                     "descripcion":"Prácticas Externas (PE)",
                     "selected":false
                  },
                  {
                     "codigo":"10",
                     "descripcion":"Simulación Clínica (SC)",
                     "selected":false
                  },
                  {
                     "codigo":"1",
                     "descripcion":"Trabajo Colaborativo (TC)",
                     "selected":false
                  }
               ],
               "tecnicasDidacticasRecomendadas":[
                  {
                     "codigo":"1",
                     "descripcion":"Clase Expositiva (CEX)\r\n",
                     "selected":false
                  },
                  {
                     "codigo":"3",
                     "descripcion":"Clase Invertida (CI)",
                     "selected":false
                  },
                  {
                     "codigo":"10",
                     "descripcion":"Curación de contenidos (CC)",
                     "selected":false
                  },
                  {
                     "codigo":"2",
                     "descripcion":"Debate (DBT)",
                     "selected":false
                  },
                  {
                     "codigo":"5",
                     "descripcion":"Demostración (DMT)",
                     "selected":false
                  },
                  {
                     "codigo":"7",
                     "descripcion":"Juego de Roles (JR)",
                     "selected":false
                  },
                  {
                     "codigo":"8",
                     "descripcion":"Prácticas de Laboratorio/ Taller (PLT)",
                     "selected":false
                  },
                  {
                     "codigo":"4",
                     "descripcion":"Salida a Terreno (ST) Trabajo de Campo (TDC)",
                     "selected":false
                  },
                  {
                     "codigo":"6",
                     "descripcion":"Simulación (SIM)",
                     "selected":false
                  },
                  {
                     "codigo":"11",
                     "descripcion":"Tutorías de pares (TP)",
                     "selected":false
                  },
                  {
                     "codigo":"9",
                     "descripcion":"Webquests (WBQ)",
                     "selected":false
                  }
               ],
               "equipamientos":[
                  {
                     "codigo":"464",
                     "descripcion":"parte 1",
                     "selected":false
                  },
                  {
                     "codigo":"465",
                     "descripcion":"parte 2",
                     "selected":false
                  },
                  {
                     "codigo":"462",
                     "descripcion":"taller cocina 1",
                     "selected":false
                  },
                  {
                     "codigo":"615",
                     "descripcion":"taller cocina 2",
                     "selected":false
                  }
               ],
               "insumos":[
                  {
                     "codigo":"678",
                     "descripcion":"Insumo 1",
                     "selected":false
                  },
                  {
                     "codigo":"679",
                     "descripcion":"Insumo 2",
                     "selected":false
                  },
                  {
                     "codigo":"680",
                     "descripcion":"Insumo 3",
                     "selected":false
                  }
               ],
               "software":[
                  {
                     "codigo":"645",
                     "descripcion":"Autodesk AUTOCAD",
                     "selected":false
                  },
                  {
                     "codigo":"438",
                     "descripcion":"English Discoveries",
                     "selected":false
                  },
                  {
                     "codigo":"660",
                     "descripcion":"English Discoveries Oline",
                     "selected":false
                  },
                  {
                     "codigo":"618",
                     "descripcion":"Excel de Office Microsoft®",
                     "selected":false
                  },
                  {
                     "codigo":"439",
                     "descripcion":"Expert",
                     "selected":false
                  },
                  {
                     "codigo":"647",
                     "descripcion":"Geogebra",
                     "selected":false
                  },
                  {
                     "codigo":"644",
                     "descripcion":"Geogebra esta es una prueba de texto",
                     "selected":false
                  },
                  {
                     "codigo":"672",
                     "descripcion":"Google Chrome",
                     "selected":false
                  },
                  {
                     "codigo":"606",
                     "descripcion":"Hi-Class",
                     "selected":false
                  },
                  {
                     "codigo":"664",
                     "descripcion":"Meshlab",
                     "selected":false
                  },
                  {
                     "codigo":"640",
                     "descripcion":"Microsoft Excel",
                     "selected":false
                  },
                  {
                     "codigo":"655",
                     "descripcion":"Microsoft Office",
                     "selected":false
                  },
                  {
                     "codigo":"665",
                     "descripcion":"Microsoft Office ",
                     "selected":false
                  },
                  {
                     "codigo":"641",
                     "descripcion":"Microsoft PowerPoint",
                     "selected":false
                  },
                  {
                     "codigo":"642",
                     "descripcion":"Microsoft Word",
                     "selected":false
                  },
                  {
                     "codigo":"639",
                     "descripcion":"MS Project",
                     "selected":false
                  },
                  {
                     "codigo":"643",
                     "descripcion":"ONDAC",
                     "selected":false
                  },
                  {
                     "codigo":"440",
                     "descripcion":"On-Line",
                     "selected":false
                  },
                  {
                     "codigo":"619",
                     "descripcion":"R - Project for statistical computing",
                     "selected":false
                  },
                  {
                     "codigo":"648",
                     "descripcion":"Revit Structure Suite. ",
                     "selected":false
                  },
                  {
                     "codigo":"666",
                     "descripcion":"Software Post-Proceso GPS",
                     "selected":false
                  },
                  {
                     "codigo":"661",
                     "descripcion":"Touchstone Online",
                     "selected":false
                  },
                  {
                     "codigo":"605",
                     "descripcion":"Wordfast",
                     "selected":false
                  },
                  {
                     "codigo":"625",
                     "descripcion":"2007",
                     "selected":false
                  },
                  {
                     "codigo":"626",
                     "descripcion":"2.11.0 (abril 2010)",
                     "selected":false
                  }
               ],
               "tituloProfesional":[
                  {
                     "codigo":"669",
                     "descripcion":" del área de Gestión",
                     "selected":false
                  },
                  {
                     "codigo":"192",
                     "descripcion":"Abogado",
                     "selected":false
                  },
                  {
                     "codigo":"193",
                     "descripcion":"Actor",
                     "selected":false
                  },
                  {
                     "codigo":"563",
                     "descripcion":"Administrador de Empresas con mención en Finanzas",
                     "selected":false
                  },
                  {
                     "codigo":"564",
                     "descripcion":"Administrador de Empresas con mención en Marketing",
                     "selected":false
                  },
                  {
                     "codigo":"565",
                     "descripcion":"Administrador de Empresas con mención en Personal o Gestión de Personas",
                     "selected":false
                  },
                  {
                     "codigo":"504",
                     "descripcion":"Administrador de Empresas Turísticas",
                     "selected":false
                  },
                  {
                     "codigo":"566",
                     "descripcion":"Administrador de Hoteles y Restaurantes",
                     "selected":false
                  },
                  {
                     "codigo":"567",
                     "descripcion":"Administrador de la Producción Gastronomica BTS",
                     "selected":false
                  },
                  {
                     "codigo":"568",
                     "descripcion":"Administrador en Producción Gastronómica",
                     "selected":false
                  },
                  {
                     "codigo":"569",
                     "descripcion":"Administrador en Producción Gastronómica mención Cocina Internacional",
                     "selected":false
                  },
                  {
                     "codigo":"570",
                     "descripcion":"Administrador en Producción Gastronómica mención Pastelería Internacional",
                     "selected":false
                  },
                  {
                     "codigo":"571",
                     "descripcion":"Administrador en Producción Gastronómica mención Pastelería Internacional y Cocina Internacional",
                     "selected":false
                  },
                  {
                     "codigo":"572",
                     "descripcion":"Administrador Hotelero Profesional",
                     "selected":false
                  },
                  {
                     "codigo":"573",
                     "descripcion":"Administrador Hotelero Profesional con mención en Alimentos y Bebidas",
                     "selected":false
                  },
                  {
                     "codigo":"574",
                     "descripcion":"Administrador Hotelero Profesional mención Recepción y Habitaciones",
                     "selected":false
                  },
                  {
                     "codigo":"575",
                     "descripcion":"Administrador Hotelero Profesional mención Recepción y Habitaciones con Título BTS",
                     "selected":false
                  },
                  {
                     "codigo":"492",
                     "descripcion":"Administrador Público",
                     "selected":false
                  },
                  {
                     "codigo":"499",
                     "descripcion":"Agente de Viajes",
                     "selected":false
                  },
                  {
                     "codigo":"194",
                     "descripcion":"Analista de Sistemas",
                     "selected":false
                  },
                  {
                     "codigo":"195",
                     "descripcion":"Analista Programador",
                     "selected":false
                  },
                  {
                     "codigo":"196",
                     "descripcion":"Analista Químico",
                     "selected":false
                  },
                  {
                     "codigo":"197",
                     "descripcion":"Animador ",
                     "selected":false
                  },
                  {
                     "codigo":"198",
                     "descripcion":"Animador 3D",
                     "selected":false
                  },
                  {
                     "codigo":"199",
                     "descripcion":"Antropólogo",
                     "selected":false
                  },
                  {
                     "codigo":"200",
                     "descripcion":"Antropólogo Físico",
                     "selected":false
                  },
                  {
                     "codigo":"201",
                     "descripcion":"Antropólogo Social",
                     "selected":false
                  },
                  {
                     "codigo":"202",
                     "descripcion":"Arqueólogo",
                     "selected":false
                  },
                  {
                     "codigo":"203",
                     "descripcion":"Arquitecto",
                     "selected":false
                  },
                  {
                     "codigo":"204",
                     "descripcion":"Arquitecto del Paisaje ",
                     "selected":false
                  },
                  {
                     "codigo":"205",
                     "descripcion":"Asistente Social",
                     "selected":false
                  },
                  {
                     "codigo":"497",
                     "descripcion":"Biólogo",
                     "selected":false
                  },
                  {
                     "codigo":"206",
                     "descripcion":"Biólogo Marino",
                     "selected":false
                  },
                  {
                     "codigo":"207",
                     "descripcion":"Bioquímico",
                     "selected":false
                  },
                  {
                     "codigo":"208",
                     "descripcion":"Biotecnólogo",
                     "selected":false
                  },
                  {
                     "codigo":"209",
                     "descripcion":"Camarógrafo de Video y TV",
                     "selected":false
                  },
                  {
                     "codigo":"210",
                     "descripcion":"Cientista Político",
                     "selected":false
                  },
                  {
                     "codigo":"509",
                     "descripcion":"Cientista Social",
                     "selected":false
                  },
                  {
                     "codigo":"211",
                     "descripcion":"Cineasta",
                     "selected":false
                  },
                  {
                     "codigo":"212",
                     "descripcion":"Cirujano Dental",
                     "selected":false
                  },
                  {
                     "codigo":"459",
                     "descripcion":"Comunicador",
                     "selected":false
                  },
                  {
                     "codigo":"213",
                     "descripcion":"Comunicador Audiovisual",
                     "selected":false
                  },
                  {
                     "codigo":"214",
                     "descripcion":"Comunicador Digital",
                     "selected":false
                  },
                  {
                     "codigo":"215",
                     "descripcion":"Comunicador Esénico ",
                     "selected":false
                  },
                  {
                     "codigo":"216",
                     "descripcion":"Comunicador Esénico y Actor",
                     "selected":false
                  },
                  {
                     "codigo":"217",
                     "descripcion":"Comunicador Multimedia",
                     "selected":false
                  },
                  {
                     "codigo":"218",
                     "descripcion":"Constructor Civil",
                     "selected":false
                  },
                  {
                     "codigo":"219",
                     "descripcion":"Contador Auditor",
                     "selected":false
                  },
                  {
                     "codigo":"576",
                     "descripcion":"Contador General",
                     "selected":false
                  },
                  {
                     "codigo":"220",
                     "descripcion":"Coreógrafo ",
                     "selected":false
                  },
                  {
                     "codigo":"221",
                     "descripcion":"Decorador de Interiores",
                     "selected":false
                  },
                  {
                     "codigo":"222",
                     "descripcion":"Dibujante en Proyectos de Arquitectura e Ingenieria",
                     "selected":false
                  },
                  {
                     "codigo":"223",
                     "descripcion":"Dibujante Técnico",
                     "selected":false
                  },
                  {
                     "codigo":"224",
                     "descripcion":"Director de Arte",
                     "selected":false
                  },
                  {
                     "codigo":"225",
                     "descripcion":"Director Teatral",
                     "selected":false
                  },
                  {
                     "codigo":"226",
                     "descripcion":"Diseñador",
                     "selected":false
                  },
                  {
                     "codigo":"227",
                     "descripcion":"Diseñador de Ambientes",
                     "selected":false
                  },
                  {
                     "codigo":"228",
                     "descripcion":"Diseñador de Animación Digital",
                     "selected":false
                  },
                  {
                     "codigo":"229",
                     "descripcion":"Diseñador de Arquitectura del Paisaje",
                     "selected":false
                  },
                  {
                     "codigo":"230",
                     "descripcion":"Diseñador de Espacios Interiores y Equipamiento",
                     "selected":false
                  },
                  {
                     "codigo":"231",
                     "descripcion":"Diseñador de Imagen y Estilo",
                     "selected":false
                  },
                  {
                     "codigo":"232",
                     "descripcion":"Diseñador de Objetos y Ambientes",
                     "selected":false
                  },
                  {
                     "codigo":"233",
                     "descripcion":"Diseñador de Productos",
                     "selected":false
                  },
                  {
                     "codigo":"234",
                     "descripcion":"Diseñador de Vestuario y Textiles",
                     "selected":false
                  },
                  {
                     "codigo":"235",
                     "descripcion":"Diseñador Editorial",
                     "selected":false
                  },
                  {
                     "codigo":"236",
                     "descripcion":"Diseñador en Arquitectura Interior y Decoración",
                     "selected":false
                  },
                  {
                     "codigo":"237",
                     "descripcion":"Diseñador Gráfico",
                     "selected":false
                  },
                  {
                     "codigo":"238",
                     "descripcion":"Diseñador Gráfico Profesional",
                     "selected":false
                  },
                  {
                     "codigo":"239",
                     "descripcion":"Diseñador Gráfico Publicitario",
                     "selected":false
                  },
                  {
                     "codigo":"240",
                     "descripcion":"Diseñador Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"241",
                     "descripcion":"Diseñador Industrial de Mobiliario y Producto",
                     "selected":false
                  },
                  {
                     "codigo":"242",
                     "descripcion":"Diseñador Multimedia",
                     "selected":false
                  },
                  {
                     "codigo":"243",
                     "descripcion":"Diseñador Teatral",
                     "selected":false
                  },
                  {
                     "codigo":"244",
                     "descripcion":"Diseñador Textil",
                     "selected":false
                  },
                  {
                     "codigo":"245",
                     "descripcion":"Diseñador y Comunicador Visual",
                     "selected":false
                  },
                  {
                     "codigo":"246",
                     "descripcion":"Diseñador y Programador Multimedia",
                     "selected":false
                  },
                  {
                     "codigo":"247",
                     "descripcion":"Diseñor de Vestuario",
                     "selected":false
                  },
                  {
                     "codigo":"577",
                     "descripcion":"Economista",
                     "selected":false
                  },
                  {
                     "codigo":"496",
                     "descripcion":"Educador en Salud",
                     "selected":false
                  },
                  {
                     "codigo":"248",
                     "descripcion":"Educadora de Párvulos",
                     "selected":false
                  },
                  {
                     "codigo":"249",
                     "descripcion":"Enfermera",
                     "selected":false
                  },
                  {
                     "codigo":"250",
                     "descripcion":"Enfermera Matrona",
                     "selected":false
                  },
                  {
                     "codigo":"455",
                     "descripcion":"Entrenador de Atletismo Acreditado por la IAAF",
                     "selected":false
                  },
                  {
                     "codigo":"251",
                     "descripcion":"Escenógrafo",
                     "selected":false
                  },
                  {
                     "codigo":"460",
                     "descripcion":"Escritor (Bilingüe)",
                     "selected":false
                  },
                  {
                     "codigo":"594",
                     "descripcion":"Estadístico",
                     "selected":false
                  },
                  {
                     "codigo":"448",
                     "descripcion":"Experto Profesional en Prevención de Riesgos",
                     "selected":false
                  },
                  {
                     "codigo":"252",
                     "descripcion":"Fonaudiologo",
                     "selected":false
                  },
                  {
                     "codigo":"253",
                     "descripcion":"Fotógrafo",
                     "selected":false
                  },
                  {
                     "codigo":"254",
                     "descripcion":"Geógrafo",
                     "selected":false
                  },
                  {
                     "codigo":"255",
                     "descripcion":"Geólogo",
                     "selected":false
                  },
                  {
                     "codigo":"500",
                     "descripcion":"Guía Turístico",
                     "selected":false
                  },
                  {
                     "codigo":"256",
                     "descripcion":"Ilustrador",
                     "selected":false
                  },
                  {
                     "codigo":"257",
                     "descripcion":"Ingeniería Civil",
                     "selected":false
                  },
                  {
                     "codigo":"258",
                     "descripcion":"Ingeniería en Administración de Empresas",
                     "selected":false
                  },
                  {
                     "codigo":"259",
                     "descripcion":"Ingeniería en Negocios Internacionales",
                     "selected":false
                  },
                  {
                     "codigo":"260",
                     "descripcion":"Ingeniero Agrícola",
                     "selected":false
                  },
                  {
                     "codigo":"261",
                     "descripcion":"Ingeniero Agrónomo",
                     "selected":false
                  },
                  {
                     "codigo":"262",
                     "descripcion":"Ingeniero Ambiental",
                     "selected":false
                  },
                  {
                     "codigo":"263",
                     "descripcion":"Ingeniero Bioquímico",
                     "selected":false
                  },
                  {
                     "codigo":"264",
                     "descripcion":"Ingeniero Civil",
                     "selected":false
                  },
                  {
                     "codigo":"265",
                     "descripcion":"Ingeniero Civil Agrícola",
                     "selected":false
                  },
                  {
                     "codigo":"266",
                     "descripcion":"Ingeniero Civil Ambiental ",
                     "selected":false
                  },
                  {
                     "codigo":"267",
                     "descripcion":"Ingeniero Civil Bioquímico",
                     "selected":false
                  },
                  {
                     "codigo":"268",
                     "descripcion":"Ingeniero Civil Eléctricista o Electrónico",
                     "selected":false
                  },
                  {
                     "codigo":"269",
                     "descripcion":"Ingeniero Civil Eléctrico ",
                     "selected":false
                  },
                  {
                     "codigo":"270",
                     "descripcion":"Ingeniero Civil en Automatización e Instrumentación",
                     "selected":false
                  },
                  {
                     "codigo":"271",
                     "descripcion":"Ingeniero Civil en Automatización y Control",
                     "selected":false
                  },
                  {
                     "codigo":"272",
                     "descripcion":"Ingeniero Civil en Biotecnología",
                     "selected":false
                  },
                  {
                     "codigo":"273",
                     "descripcion":"Ingeniero Civil en Computación",
                     "selected":false
                  },
                  {
                     "codigo":"274",
                     "descripcion":"Ingeniero Civil en Electricidad",
                     "selected":false
                  },
                  {
                     "codigo":"275",
                     "descripcion":"Ingeniero Civil en Electrónica",
                     "selected":false
                  },
                  {
                     "codigo":"276",
                     "descripcion":"Ingeniero Civil en Informática",
                     "selected":false
                  },
                  {
                     "codigo":"598",
                     "descripcion":"Ingeniero Civil en Matemáticas",
                     "selected":false
                  },
                  {
                     "codigo":"277",
                     "descripcion":"Ingeniero Civil en Metalurgia",
                     "selected":false
                  },
                  {
                     "codigo":"278",
                     "descripcion":"Ingeniero Civil en Minas",
                     "selected":false
                  },
                  {
                     "codigo":"279",
                     "descripcion":"Ingeniero Civil en Sonido",
                     "selected":false
                  },
                  {
                     "codigo":"280",
                     "descripcion":"Ingeniero Civil en Sonido y Acústica",
                     "selected":false
                  },
                  {
                     "codigo":"281",
                     "descripcion":"Ingeniero Civil en Telemática",
                     "selected":false
                  },
                  {
                     "codigo":"282",
                     "descripcion":"Ingeniero Civil Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"283",
                     "descripcion":"Ingeniero Civil Mecánico",
                     "selected":false
                  },
                  {
                     "codigo":"284",
                     "descripcion":"Ingeniero Civil Químico",
                     "selected":false
                  },
                  {
                     "codigo":"285",
                     "descripcion":"Ingeniero Comercial",
                     "selected":false
                  },
                  {
                     "codigo":"286",
                     "descripcion":"Ingeniero Constructor",
                     "selected":false
                  },
                  {
                     "codigo":"602",
                     "descripcion":"Ingeniero de Ejecución en Acuicultura",
                     "selected":false
                  },
                  {
                     "codigo":"287",
                     "descripcion":"Ingeniero de Ejecución en Computación",
                     "selected":false
                  },
                  {
                     "codigo":"288",
                     "descripcion":"Ingeniero de Ejecución en Informática ",
                     "selected":false
                  },
                  {
                     "codigo":"289",
                     "descripcion":"Ingeniero de Ejecución en Metalurgia",
                     "selected":false
                  },
                  {
                     "codigo":"290",
                     "descripcion":"Ingeniero de Ejecución en Minas",
                     "selected":false
                  },
                  {
                     "codigo":"291",
                     "descripcion":"Ingeniero de la Madera",
                     "selected":false
                  },
                  {
                     "codigo":"292",
                     "descripcion":"Ingeniero Ejecución Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"293",
                     "descripcion":"Ingeniero Ejecución Mecánico",
                     "selected":false
                  },
                  {
                     "codigo":"294",
                     "descripcion":"Ingeniero Electricista",
                     "selected":false
                  },
                  {
                     "codigo":"295",
                     "descripcion":"Ingeniero Electricista mención Potencia",
                     "selected":false
                  },
                  {
                     "codigo":"296",
                     "descripcion":"Ingeniero Electricista mención Proyectos de Instalaciones Eléctricas",
                     "selected":false
                  },
                  {
                     "codigo":"297",
                     "descripcion":"Ingeniero Eléctrico ",
                     "selected":false
                  },
                  {
                     "codigo":"601",
                     "descripcion":"Ingeniero en Acuicultura",
                     "selected":false
                  },
                  {
                     "codigo":"299",
                     "descripcion":"Ingeniero en Acústica",
                     "selected":false
                  },
                  {
                     "codigo":"300",
                     "descripcion":"Ingeniero en Administración de Empresas",
                     "selected":false
                  },
                  {
                     "codigo":"301",
                     "descripcion":"Ingeniero en Alimentos",
                     "selected":false
                  },
                  {
                     "codigo":"302",
                     "descripcion":"Ingeniero en Automatización y Control Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"303",
                     "descripcion":"Ingeniero en Bioprocesos",
                     "selected":false
                  },
                  {
                     "codigo":"304",
                     "descripcion":"Ingeniero en Biotecnología",
                     "selected":false
                  },
                  {
                     "codigo":"305",
                     "descripcion":"Ingeniero en Ciencias Ambientales ",
                     "selected":false
                  },
                  {
                     "codigo":"306",
                     "descripcion":"Ingeniero en Climatización",
                     "selected":false
                  },
                  {
                     "codigo":"307",
                     "descripcion":"Ingeniero en Conectividad y Redes",
                     "selected":false
                  },
                  {
                     "codigo":"298",
                     "descripcion":"Ingeniero en Control Automático",
                     "selected":false
                  },
                  {
                     "codigo":"308",
                     "descripcion":"Ingeniero en Diseño de Producto",
                     "selected":false
                  },
                  {
                     "codigo":"309",
                     "descripcion":"Ingeniero en Diseño Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"310",
                     "descripcion":"Ingeniero en Domótica",
                     "selected":false
                  },
                  {
                     "codigo":"578",
                     "descripcion":"Ingeniero en Ejecución en Administración de Empresas mención Finanzas",
                     "selected":false
                  },
                  {
                     "codigo":"311",
                     "descripcion":"Ingeniero en Ejecución en Maderas",
                     "selected":false
                  },
                  {
                     "codigo":"312",
                     "descripcion":"Ingeniero en Ejecución Forestal",
                     "selected":false
                  },
                  {
                     "codigo":"313",
                     "descripcion":"Ingeniero en Electricidad",
                     "selected":false
                  },
                  {
                     "codigo":"314",
                     "descripcion":"Ingeniero en Electrónica",
                     "selected":false
                  },
                  {
                     "codigo":"315",
                     "descripcion":"Ingeniero en Gestión de Calidad y Ambiente",
                     "selected":false
                  },
                  {
                     "codigo":"316",
                     "descripcion":"Ingeniero en Gestión y Control de Calidad",
                     "selected":false
                  },
                  {
                     "codigo":"317",
                     "descripcion":"Ingeniero en Industria Alimentaria",
                     "selected":false
                  },
                  {
                     "codigo":"318",
                     "descripcion":"Ingeniero en Informática ",
                     "selected":false
                  },
                  {
                     "codigo":"319",
                     "descripcion":"Ingeniero en Logística ",
                     "selected":false
                  },
                  {
                     "codigo":"320",
                     "descripcion":"Ingeniero en Maquinaria Pesada y Vehículos Automotrices",
                     "selected":false
                  },
                  {
                     "codigo":"322",
                     "descripcion":"Ingeniero en Maquinaria, Vehículos Automotrices y Sistemas Electrónicos",
                     "selected":false
                  },
                  {
                     "codigo":"321",
                     "descripcion":"Ingeniero en Maquinaria y Vehículos Automotrices",
                     "selected":false
                  },
                  {
                     "codigo":"323",
                     "descripcion":"Ingeniero en Metalmecánica",
                     "selected":false
                  },
                  {
                     "codigo":"324",
                     "descripcion":"Ingeniero en Metalurgia",
                     "selected":false
                  },
                  {
                     "codigo":"325",
                     "descripcion":"Ingeniero en Minas",
                     "selected":false
                  },
                  {
                     "codigo":"326",
                     "descripcion":"Ingeniero en Pesca y Acuicultura",
                     "selected":false
                  },
                  {
                     "codigo":"327",
                     "descripcion":"Ingeniero en Prevención de Riesgos",
                     "selected":false
                  },
                  {
                     "codigo":"328",
                     "descripcion":"Ingeniero en Prevención de Riesgos, Calidad y Ambiente",
                     "selected":false
                  },
                  {
                     "codigo":"329",
                     "descripcion":"Ingeniero en Química Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"330",
                     "descripcion":"Ingeniero en Recursos Naturales Renovables",
                     "selected":false
                  },
                  {
                     "codigo":"331",
                     "descripcion":"Ingeniero en Refrigeración",
                     "selected":false
                  },
                  {
                     "codigo":"332",
                     "descripcion":"Ingeniero en Sonido",
                     "selected":false
                  },
                  {
                     "codigo":"333",
                     "descripcion":"Ingeniero en Telecomunicaciones",
                     "selected":false
                  },
                  {
                     "codigo":"592",
                     "descripcion":"Ingeniero en Telecomunicaciones, Conectividad y Redes",
                     "selected":false
                  },
                  {
                     "codigo":"334",
                     "descripcion":"Ingeniero en Telecontrol",
                     "selected":false
                  },
                  {
                     "codigo":"335",
                     "descripcion":"Ingeniero en Transporte",
                     "selected":false
                  },
                  {
                     "codigo":"336",
                     "descripcion":"Ingeniero Forestal",
                     "selected":false
                  },
                  {
                     "codigo":"337",
                     "descripcion":"Ingeniero Geomensor",
                     "selected":false
                  },
                  {
                     "codigo":"338",
                     "descripcion":"Ingeniero Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"339",
                     "descripcion":"Ingeniero Mecánico",
                     "selected":false
                  },
                  {
                     "codigo":"340",
                     "descripcion":"Ingeniero Mecánico en Mantenimiento Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"341",
                     "descripcion":"Ingeniero Mecánico en Producción Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"342",
                     "descripcion":"Ingeniero Metalúrgico ",
                     "selected":false
                  },
                  {
                     "codigo":"343",
                     "descripcion":"Ingeniero Pesquero",
                     "selected":false
                  },
                  {
                     "codigo":"344",
                     "descripcion":"Ingeniero Químico",
                     "selected":false
                  },
                  {
                     "codigo":"345",
                     "descripcion":"Intérprete Musical",
                     "selected":false
                  },
                  {
                     "codigo":"346",
                     "descripcion":"Kinesiólogo",
                     "selected":false
                  },
                  {
                     "codigo":"347",
                     "descripcion":"Laboratorista Dental",
                     "selected":false
                  },
                  {
                     "codigo":"348",
                     "descripcion":"Locutor Profesional",
                     "selected":false
                  },
                  {
                     "codigo":"349",
                     "descripcion":"Matrona",
                     "selected":false
                  },
                  {
                     "codigo":"350",
                     "descripcion":"Médico",
                     "selected":false
                  },
                  {
                     "codigo":"453",
                     "descripcion":"Médico Cirujano",
                     "selected":false
                  },
                  {
                     "codigo":"351",
                     "descripcion":"Médico Veterinario",
                     "selected":false
                  },
                  {
                     "codigo":"352",
                     "descripcion":"Microbiólogo",
                     "selected":false
                  },
                  {
                     "codigo":"353",
                     "descripcion":"Montagista y Editor",
                     "selected":false
                  },
                  {
                     "codigo":"354",
                     "descripcion":"Nutricionista",
                     "selected":false
                  },
                  {
                     "codigo":"595",
                     "descripcion":"Odontólogo",
                     "selected":false
                  },
                  {
                     "codigo":"452",
                     "descripcion":"Orientador Educacional",
                     "selected":false
                  },
                  {
                     "codigo":"355",
                     "descripcion":"Paisajista",
                     "selected":false
                  },
                  {
                     "codigo":"356",
                     "descripcion":"Pedagógo en Artes Plasticas",
                     "selected":false
                  },
                  {
                     "codigo":"357",
                     "descripcion":"Pedagógo en Historia del Arte",
                     "selected":false
                  },
                  {
                     "codigo":"358",
                     "descripcion":"Periodista",
                     "selected":false
                  },
                  {
                     "codigo":"495",
                     "descripcion":"Prevencionista de Riesgo",
                     "selected":false
                  },
                  {
                     "codigo":"359",
                     "descripcion":"Productor Cinematográfico",
                     "selected":false
                  },
                  {
                     "codigo":"360",
                     "descripcion":"Productor de Arte y Diseño",
                     "selected":false
                  },
                  {
                     "codigo":"546",
                     "descripcion":"Profesional de la Música (Compositor o intérprete)",
                     "selected":false
                  },
                  {
                     "codigo":"545",
                     "descripcion":"Profesional de la Música (Compositor o intérprete en Piano)",
                     "selected":false
                  },
                  {
                     "codigo":"632",
                     "descripcion":"Profesional del área de Administración y Negocio",
                     "selected":false
                  },
                  {
                     "codigo":"653",
                     "descripcion":"Profesional del área de Administración y Negocios",
                     "selected":false
                  },
                  {
                     "codigo":"633",
                     "descripcion":"Profesional del área de Comunicaciones",
                     "selected":false
                  },
                  {
                     "codigo":"667",
                     "descripcion":"Profesional del área de Disciplinas Básicas",
                     "selected":false
                  },
                  {
                     "codigo":"675",
                     "descripcion":"Profesional del área de Diseño",
                     "selected":false
                  },
                  {
                     "codigo":"629",
                     "descripcion":"Profesional del área de Educación",
                     "selected":false
                  },
                  {
                     "codigo":"627",
                     "descripcion":"Profesional del área de Electricidad",
                     "selected":false
                  },
                  {
                     "codigo":"676",
                     "descripcion":"Profesional del área de Electricidad y Electrónica",
                     "selected":false
                  },
                  {
                     "codigo":"670",
                     "descripcion":"Profesional del área de Gastronomía",
                     "selected":false
                  },
                  {
                     "codigo":"659",
                     "descripcion":"Profesional del área de Idiomas",
                     "selected":false
                  },
                  {
                     "codigo":"510",
                     "descripcion":"Profesional del Área de las Ciencias Naturales",
                     "selected":false
                  },
                  {
                     "codigo":"657",
                     "descripcion":"Profesional del área de Mecánica",
                     "selected":false
                  },
                  {
                     "codigo":"652",
                     "descripcion":"Profesional del área de Procesos Agroindustriales",
                     "selected":false
                  },
                  {
                     "codigo":"634",
                     "descripcion":"Profesional del área de Procesos Industriales",
                     "selected":false
                  },
                  {
                     "codigo":"649",
                     "descripcion":"Profesional del área de Silvoagropecuaria",
                     "selected":false
                  },
                  {
                     "codigo":"662",
                     "descripcion":"Profesional del área de Silvoagropecuario",
                     "selected":false
                  },
                  {
                     "codigo":"508",
                     "descripcion":"Profesor",
                     "selected":false
                  },
                  {
                     "codigo":"363",
                     "descripcion":"Profesor Básico Inicial",
                     "selected":false
                  },
                  {
                     "codigo":"450",
                     "descripcion":"Profesor de Artes Plásticas",
                     "selected":false
                  },
                  {
                     "codigo":"364",
                     "descripcion":"Profesor de Castellano en Enseñanza Media",
                     "selected":false
                  },
                  {
                     "codigo":"365",
                     "descripcion":"Profesor de Castellano y Comunicación",
                     "selected":false
                  },
                  {
                     "codigo":"491",
                     "descripcion":"Profesor de Ciencias Sociales",
                     "selected":false
                  },
                  {
                     "codigo":"494",
                     "descripcion":"Profesor de Computación e Informática",
                     "selected":false
                  },
                  {
                     "codigo":"366",
                     "descripcion":"Profesor de Danza",
                     "selected":false
                  },
                  {
                     "codigo":"367",
                     "descripcion":"Profesor de Educación Básica",
                     "selected":false
                  },
                  {
                     "codigo":"368",
                     "descripcion":"Profesor de Educación Básica con Especialización",
                     "selected":false
                  },
                  {
                     "codigo":"369",
                     "descripcion":"Profesor de Educación Básica mención Educación Diferencial",
                     "selected":false
                  },
                  {
                     "codigo":"370",
                     "descripcion":"Profesor de Educación Diferencial",
                     "selected":false
                  },
                  {
                     "codigo":"371",
                     "descripcion":"Profesor de Educación Diferencial mención Dificultades en el Aprendizaje e Inclusión Educativa",
                     "selected":false
                  },
                  {
                     "codigo":"372",
                     "descripcion":"Profesor de Educación Diferencial mención Discapacidad Cognitiva y Alteraciones Severas del Desarrollo",
                     "selected":false
                  },
                  {
                     "codigo":"373",
                     "descripcion":"Profesor de Educación Diferencial mención NEET y Deficiencia Mental",
                     "selected":false
                  },
                  {
                     "codigo":"374",
                     "descripcion":"Profesor de Educación Diferencial mención Trastorno del Aprendizaje",
                     "selected":false
                  },
                  {
                     "codigo":"375",
                     "descripcion":"Profesor de Educación Especial con Mención en Retardo Mental",
                     "selected":false
                  },
                  {
                     "codigo":"376",
                     "descripcion":"Profesor de Educación Especial con mención en Trastornos de Lenguaje",
                     "selected":false
                  },
                  {
                     "codigo":"377",
                     "descripcion":"Profesor de Educación Especial mención en Trastornos Específicos del Aprendizaje",
                     "selected":false
                  },
                  {
                     "codigo":"378",
                     "descripcion":"Profesor de Educación Física",
                     "selected":false
                  },
                  {
                     "codigo":"507",
                     "descripcion":"Profesor de Educación Media",
                     "selected":false
                  },
                  {
                     "codigo":"511",
                     "descripcion":"Profesor de Educación Media Bilingue",
                     "selected":false
                  },
                  {
                     "codigo":"379",
                     "descripcion":"Profesor de Educación Media con mención en Artes Musicales ",
                     "selected":false
                  },
                  {
                     "codigo":"512",
                     "descripcion":"Profesor de Educación Media con mención en Filosofía",
                     "selected":false
                  },
                  {
                     "codigo":"380",
                     "descripcion":"Profesor de Educación Media con mención en Historia ",
                     "selected":false
                  },
                  {
                     "codigo":"381",
                     "descripcion":"Profesor de Educación Media con mención en Historia y Geografía",
                     "selected":false
                  },
                  {
                     "codigo":"383",
                     "descripcion":"Profesor de Educación Media con mención en Lengua Española",
                     "selected":false
                  },
                  {
                     "codigo":"384",
                     "descripcion":"Profesor de Educación Media con mención en Matemática y Estadística",
                     "selected":false
                  },
                  {
                     "codigo":"385",
                     "descripcion":"Profesor de Enseñanza Básica en Lenguaje Castellana y Comunicación",
                     "selected":false
                  },
                  {
                     "codigo":"505",
                     "descripcion":"Profesor de Enseñanza Media con mención en Inglés",
                     "selected":false
                  },
                  {
                     "codigo":"386",
                     "descripcion":"Profesor de Enseñanza Media Lenguaje Castellana y Comunicación",
                     "selected":false
                  },
                  {
                     "codigo":"443",
                     "descripcion":"Profesor de Español",
                     "selected":false
                  },
                  {
                     "codigo":"449",
                     "descripcion":"Profesor de Estado",
                     "selected":false
                  },
                  {
                     "codigo":"387",
                     "descripcion":"Profesor de Estado en Biología",
                     "selected":false
                  },
                  {
                     "codigo":"388",
                     "descripcion":"Profesor de Estado en Física",
                     "selected":false
                  },
                  {
                     "codigo":"389",
                     "descripcion":"Profesor de Estado en Química",
                     "selected":false
                  },
                  {
                     "codigo":"454",
                     "descripcion":"Profesor de Filosofía",
                     "selected":false
                  },
                  {
                     "codigo":"609",
                     "descripcion":"Profesor de Francés",
                     "selected":false
                  },
                  {
                     "codigo":"502",
                     "descripcion":"Profesor de Geografía",
                     "selected":false
                  },
                  {
                     "codigo":"501",
                     "descripcion":"Profesor de Historia",
                     "selected":false
                  },
                  {
                     "codigo":"390",
                     "descripcion":"Profesor de Inglés",
                     "selected":false
                  },
                  {
                     "codigo":"391",
                     "descripcion":"Profesor de Lenguaje y Comunicación",
                     "selected":false
                  },
                  {
                     "codigo":"392",
                     "descripcion":"Profesor de Matemática con mención en Computación e Informática",
                     "selected":false
                  },
                  {
                     "codigo":"393",
                     "descripcion":"Profesor de Matemática con mención en Matemática e Informática",
                     "selected":false
                  },
                  {
                     "codigo":"593",
                     "descripcion":"Profesor de Matemáticas y Estadística",
                     "selected":false
                  },
                  {
                     "codigo":"532",
                     "descripcion":"Profesor de Música",
                     "selected":false
                  },
                  {
                     "codigo":"447",
                     "descripcion":"Profesor de Teatro o Artes Escénicas",
                     "selected":false
                  },
                  {
                     "codigo":"552",
                     "descripcion":"Profesor en Artes Musicales (especializado en charango y cuatro)",
                     "selected":false
                  },
                  {
                     "codigo":"561",
                     "descripcion":"Profesor en Artes Musicales (especializado en vientos andinos)",
                     "selected":false
                  },
                  {
                     "codigo":"394",
                     "descripcion":"Profesor en Educación General Básica mención Castellano",
                     "selected":false
                  },
                  {
                     "codigo":"461",
                     "descripcion":"Profesor/Investigador",
                     "selected":false
                  },
                  {
                     "codigo":"395",
                     "descripcion":"Programador de Aplicaciones",
                     "selected":false
                  },
                  {
                     "codigo":"396",
                     "descripcion":"Psicólogo",
                     "selected":false
                  },
                  {
                     "codigo":"493",
                     "descripcion":"Psicólogo Educacional",
                     "selected":false
                  },
                  {
                     "codigo":"490",
                     "descripcion":"Psicólogo Laboral",
                     "selected":false
                  },
                  {
                     "codigo":"397",
                     "descripcion":"Psicopedagogo",
                     "selected":false
                  },
                  {
                     "codigo":"398",
                     "descripcion":"Publicista",
                     "selected":false
                  },
                  {
                     "codigo":"399",
                     "descripcion":"Químico Farmaceútico",
                     "selected":false
                  },
                  {
                     "codigo":"400",
                     "descripcion":"Químico Laboratorista",
                     "selected":false
                  },
                  {
                     "codigo":"401",
                     "descripcion":"Relacionador Público ",
                     "selected":false
                  },
                  {
                     "codigo":"402",
                     "descripcion":"Secretaria Ejecutiva",
                     "selected":false
                  },
                  {
                     "codigo":"403",
                     "descripcion":"Sociólogo",
                     "selected":false
                  },
                  {
                     "codigo":"404",
                     "descripcion":"Sonidista",
                     "selected":false
                  },
                  {
                     "codigo":"579",
                     "descripcion":"Tecnico  en Cocina Internacional de INACAP",
                     "selected":false
                  },
                  {
                     "codigo":"405",
                     "descripcion":"Técnico Agrícola",
                     "selected":false
                  },
                  {
                     "codigo":"406",
                     "descripcion":"Técnico de Nivel Superior Analista Químico",
                     "selected":false
                  },
                  {
                     "codigo":"407",
                     "descripcion":"Técnico de Nivel Superior en Biotecnología Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"580",
                     "descripcion":"Tecnico de Nivel Superior en Cocina Internacional",
                     "selected":false
                  },
                  {
                     "codigo":"581",
                     "descripcion":"Tecnico de Nivel Superior en Cocina Internacional y Pastelería Internacional",
                     "selected":false
                  },
                  {
                     "codigo":"408",
                     "descripcion":"Técnico de Nivel Superior en Mantenimiento Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"409",
                     "descripcion":"Técnico de Nivel Superior en Mecánica Automotriz",
                     "selected":false
                  },
                  {
                     "codigo":"582",
                     "descripcion":"Tecnico de Nivel Superior en Pastelería Internacional",
                     "selected":false
                  },
                  {
                     "codigo":"410",
                     "descripcion":"Técnico de Nivel Superior en Refrigeración",
                     "selected":false
                  },
                  {
                     "codigo":"411",
                     "descripcion":"Técnico de Nivel Superior en Tecnología Industrial de los Alimentos",
                     "selected":false
                  },
                  {
                     "codigo":"412",
                     "descripcion":"Técnico de Nivel Superior Mecánico Automotriz en Maquinaria Pesada",
                     "selected":false
                  },
                  {
                     "codigo":"456",
                     "descripcion":"Técnico Deportivo Calificado",
                     "selected":false
                  },
                  {
                     "codigo":"413",
                     "descripcion":"Técnico en Acuicultura",
                     "selected":false
                  },
                  {
                     "codigo":"583",
                     "descripcion":"Tecnico en Administración Hotelera mención Alimentos y Bebidas",
                     "selected":false
                  },
                  {
                     "codigo":"584",
                     "descripcion":"Tecnico en Administración Hotelera mención Recepción  y Habitaciones",
                     "selected":false
                  },
                  {
                     "codigo":"585",
                     "descripcion":"Tecnico en Administración Hotelera mención Servicios Hoteleros de INACAP",
                     "selected":false
                  },
                  {
                     "codigo":"414",
                     "descripcion":"Técnico en Computación e Informatica",
                     "selected":false
                  },
                  {
                     "codigo":"589",
                     "descripcion":"Técnico en Conectividad y Redes",
                     "selected":false
                  },
                  {
                     "codigo":"415",
                     "descripcion":"Técnico en Diseño",
                     "selected":false
                  },
                  {
                     "codigo":"451",
                     "descripcion":"Técnico en Farmacia",
                     "selected":false
                  },
                  {
                     "codigo":"416",
                     "descripcion":"Tecnico en Geología",
                     "selected":false
                  },
                  {
                     "codigo":"417",
                     "descripcion":"Técnico en Metalurgia",
                     "selected":false
                  },
                  {
                     "codigo":"418",
                     "descripcion":"Técnico en Minería",
                     "selected":false
                  },
                  {
                     "codigo":"419",
                     "descripcion":"Técnico en Procesamiento de Minerales",
                     "selected":false
                  },
                  {
                     "codigo":"586",
                     "descripcion":"Técnico en Producción Gastronómica",
                     "selected":false
                  },
                  {
                     "codigo":"420",
                     "descripcion":"Técnico en Riego",
                     "selected":false
                  },
                  {
                     "codigo":"590",
                     "descripcion":"Técnico en Telecomunicaciones",
                     "selected":false
                  },
                  {
                     "codigo":"591",
                     "descripcion":"Técnico en Telecomunicaciones, Conectividad y Redes",
                     "selected":false
                  },
                  {
                     "codigo":"503",
                     "descripcion":"Técnico en Turismo",
                     "selected":false
                  },
                  {
                     "codigo":"597",
                     "descripcion":"Técnico en Vitivinicultura",
                     "selected":false
                  },
                  {
                     "codigo":"421",
                     "descripcion":"Técnico Forestal",
                     "selected":false
                  },
                  {
                     "codigo":"654",
                     "descripcion":"Técnico Nivel Superior del área de Administración y Negocios",
                     "selected":false
                  },
                  {
                     "codigo":"620",
                     "descripcion":"Técnico Nivel Superior del área de Construcción",
                     "selected":false
                  },
                  {
                     "codigo":"674",
                     "descripcion":"Técnico Nivel Superior del área de Diseño",
                     "selected":false
                  },
                  {
                     "codigo":"677",
                     "descripcion":"Técnico Nivel Superior del área de Electricidad y Electrónica",
                     "selected":false
                  },
                  {
                     "codigo":"671",
                     "descripcion":"Técnico Nivel Superior del área de Gastronomía",
                     "selected":false
                  },
                  {
                     "codigo":"656",
                     "descripcion":"Técnico Nivel Superior del área de Mecánica",
                     "selected":false
                  },
                  {
                     "codigo":"651",
                     "descripcion":"Técnico Nivel Superior del área de Procesos Agroindustriales",
                     "selected":false
                  },
                  {
                     "codigo":"663",
                     "descripcion":"Técnico Nivel Superior del área de Silvoagropecuario",
                     "selected":false
                  },
                  {
                     "codigo":"422",
                     "descripcion":"Técnico Nivel Superior en Climatización",
                     "selected":false
                  },
                  {
                     "codigo":"423",
                     "descripcion":"Técnico Nivel Superior Mecánico Automotriz en Sistemas Electrónicos",
                     "selected":false
                  },
                  {
                     "codigo":"424",
                     "descripcion":"Técnico Nivel Superior Mecánico en Producción Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"425",
                     "descripcion":"Técnico Pecuario",
                     "selected":false
                  },
                  {
                     "codigo":"426",
                     "descripcion":"Técnico Superior en Automatización y Control Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"427",
                     "descripcion":"Técnico Superior en Electricidad",
                     "selected":false
                  },
                  {
                     "codigo":"428",
                     "descripcion":"Técnico Superior en Electricidad Electrónica",
                     "selected":false
                  },
                  {
                     "codigo":"429",
                     "descripcion":"Técnico Superior en Electrónica",
                     "selected":false
                  },
                  {
                     "codigo":"430",
                     "descripcion":"Técnico Superior en Tecnología en Sonido",
                     "selected":false
                  },
                  {
                     "codigo":"431",
                     "descripcion":"Técnico Topógrafo",
                     "selected":false
                  },
                  {
                     "codigo":"587",
                     "descripcion":"Técnico Universitario en Relaciones Humanas ",
                     "selected":false
                  },
                  {
                     "codigo":"432",
                     "descripcion":"Tecnólogo en Alimentos",
                     "selected":false
                  },
                  {
                     "codigo":"433",
                     "descripcion":"Tecnólogo Médico",
                     "selected":false
                  },
                  {
                     "codigo":"434",
                     "descripcion":"Terapeuta Ocupacional",
                     "selected":false
                  },
                  {
                     "codigo":"445",
                     "descripcion":"Título o Certificado de Lengua Francesa",
                     "selected":false
                  },
                  {
                     "codigo":"444",
                     "descripcion":"Título o Certificado de Lengua Inglesa",
                     "selected":false
                  },
                  {
                     "codigo":"435",
                     "descripcion":"Topógrafo",
                     "selected":false
                  },
                  {
                     "codigo":"436",
                     "descripcion":"Trabajador Social",
                     "selected":false
                  },
                  {
                     "codigo":"437",
                     "descripcion":"Traductor (a) Inglés - Español",
                     "selected":false
                  }
               ],
               "gradoAcademico":[
                  {
                     "codigo":"631",
                     "descripcion":"Doctor",
                     "selected":false
                  },
                  {
                     "codigo":"2",
                     "descripcion":"Doctor en Biología",
                     "selected":false
                  },
                  {
                     "codigo":"3",
                     "descripcion":"Doctor en Bioquímica",
                     "selected":false
                  },
                  {
                     "codigo":"4",
                     "descripcion":"Doctor en Ciencia Política",
                     "selected":false
                  },
                  {
                     "codigo":"5",
                     "descripcion":"Doctor en Ciencias Ambientales",
                     "selected":false
                  },
                  {
                     "codigo":"6",
                     "descripcion":"Doctor en Ciencias de la Administración",
                     "selected":false
                  },
                  {
                     "codigo":"7",
                     "descripcion":"Doctor en Ciencias de la Ingeniería",
                     "selected":false
                  },
                  {
                     "codigo":"8",
                     "descripcion":"Doctor en Ciencias de la Vida",
                     "selected":false
                  },
                  {
                     "codigo":"9",
                     "descripcion":"Doctor en Ciencias Exactas",
                     "selected":false
                  },
                  {
                     "codigo":"10",
                     "descripcion":"Doctor en Ciencias Sociales y Humanas",
                     "selected":false
                  },
                  {
                     "codigo":"11",
                     "descripcion":"Doctor en Computación ",
                     "selected":false
                  },
                  {
                     "codigo":"12",
                     "descripcion":"Doctor en Derecho",
                     "selected":false
                  },
                  {
                     "codigo":"13",
                     "descripcion":"Doctor en Desarrollo Humano Sustentable",
                     "selected":false
                  },
                  {
                     "codigo":"14",
                     "descripcion":"Doctor en Educación",
                     "selected":false
                  },
                  {
                     "codigo":"15",
                     "descripcion":"Doctor en Electrónica mención Control Automático",
                     "selected":false
                  },
                  {
                     "codigo":"16",
                     "descripcion":"Doctor en Estudios Latinoamericanos",
                     "selected":false
                  },
                  {
                     "codigo":"17",
                     "descripcion":"Doctor en Filosofía",
                     "selected":false
                  },
                  {
                     "codigo":"18",
                     "descripcion":"Doctor en Física",
                     "selected":false
                  },
                  {
                     "codigo":"19",
                     "descripcion":"Doctor en Historia",
                     "selected":false
                  },
                  {
                     "codigo":"20",
                     "descripcion":"Doctor en Informática",
                     "selected":false
                  },
                  {
                     "codigo":"21",
                     "descripcion":"Doctor en Literatura",
                     "selected":false
                  },
                  {
                     "codigo":"22",
                     "descripcion":"Doctor en Psicología",
                     "selected":false
                  },
                  {
                     "codigo":"23",
                     "descripcion":"Doctor en Psicoterapia",
                     "selected":false
                  },
                  {
                     "codigo":"24",
                     "descripcion":"Doctor en Química",
                     "selected":false
                  },
                  {
                     "codigo":"1",
                     "descripcion":"Doctor en Sonido y Acústica",
                     "selected":false
                  },
                  {
                     "codigo":"25",
                     "descripcion":"Doctor en Trabajo Social",
                     "selected":false
                  },
                  {
                     "codigo":"27",
                     "descripcion":"Doctorado en Acuicultura",
                     "selected":false
                  },
                  {
                     "codigo":"28",
                     "descripcion":"Doctorado en Ciencia y Tecnología de los Alimentos",
                     "selected":false
                  },
                  {
                     "codigo":"29",
                     "descripcion":"Doctorado en Ciencias ",
                     "selected":false
                  },
                  {
                     "codigo":"30",
                     "descripcion":"Doctorado en Ciencias Agrarias",
                     "selected":false
                  },
                  {
                     "codigo":"31",
                     "descripcion":"Doctorado en Ciencias Agropecuarias",
                     "selected":false
                  },
                  {
                     "codigo":"32",
                     "descripcion":"Doctorado en Ciencias Biológicas",
                     "selected":false
                  },
                  {
                     "codigo":"33",
                     "descripcion":"Doctorado en Ciencias de la Agricultura",
                     "selected":false
                  },
                  {
                     "codigo":"34",
                     "descripcion":"Doctorado en Ciencias de la Educación",
                     "selected":false
                  },
                  {
                     "codigo":"35",
                     "descripcion":"Doctorado en Ciencias de la Ingeniería",
                     "selected":false
                  },
                  {
                     "codigo":"36",
                     "descripcion":"Doctorado en Ciencias de la Ingeniería e Ingeniería de Procesos",
                     "selected":false
                  },
                  {
                     "codigo":"26",
                     "descripcion":"Doctorado en Ciencias de Recursos Naturales",
                     "selected":false
                  },
                  {
                     "codigo":"37",
                     "descripcion":"Doctorado en Ciencias Forestales",
                     "selected":false
                  },
                  {
                     "codigo":"38",
                     "descripcion":"Doctorado en Ciencias Silvoagropecuarias y Veterinarias",
                     "selected":false
                  },
                  {
                     "codigo":"39",
                     "descripcion":"Doctorado en Economía",
                     "selected":false
                  },
                  {
                     "codigo":"40",
                     "descripcion":"Doctorado en Ingeniería Eléctrica",
                     "selected":false
                  },
                  {
                     "codigo":"41",
                     "descripcion":"Doctorado en Ingeniería Electrónica",
                     "selected":false
                  },
                  {
                     "codigo":"42",
                     "descripcion":"Doctorado en Matemáticas",
                     "selected":false
                  },
                  {
                     "codigo":"43",
                     "descripcion":"Doctorado en Sistemas de Ingeniería",
                     "selected":false
                  },
                  {
                     "codigo":"44",
                     "descripcion":"Doctorado en Sociologia",
                     "selected":false
                  },
                  {
                     "codigo":"45",
                     "descripcion":"Doctorado en Sociología: Análisis de los Problemas Sociales en Sociedades Avanzadas",
                     "selected":false
                  },
                  {
                     "codigo":"486",
                     "descripcion":"Licenciado",
                     "selected":false
                  },
                  {
                     "codigo":"46",
                     "descripcion":"Licenciado en Actuación",
                     "selected":false
                  },
                  {
                     "codigo":"604",
                     "descripcion":"Licenciado en Acuicultura",
                     "selected":false
                  },
                  {
                     "codigo":"48",
                     "descripcion":"Licenciado en Administración de Empresas",
                     "selected":false
                  },
                  {
                     "codigo":"49",
                     "descripcion":"Licenciado en Antropología",
                     "selected":false
                  },
                  {
                     "codigo":"50",
                     "descripcion":"Licenciado en Arte",
                     "selected":false
                  },
                  {
                     "codigo":"458",
                     "descripcion":"Licenciado en Bellas Artes",
                     "selected":false
                  },
                  {
                     "codigo":"51",
                     "descripcion":"Licenciado en Biología",
                     "selected":false
                  },
                  {
                     "codigo":"52",
                     "descripcion":"Licenciado en Biotecnología",
                     "selected":false
                  },
                  {
                     "codigo":"53",
                     "descripcion":"Licenciado en Ciencia Política",
                     "selected":false
                  },
                  {
                     "codigo":"54",
                     "descripcion":"Licenciado en Ciencias",
                     "selected":false
                  },
                  {
                     "codigo":"55",
                     "descripcion":"Licenciado en Ciencias Administrativas",
                     "selected":false
                  },
                  {
                     "codigo":"56",
                     "descripcion":"Licenciado en Ciencias Agrarias",
                     "selected":false
                  },
                  {
                     "codigo":"57",
                     "descripcion":"Licenciado en Ciencias con mención Ecología",
                     "selected":false
                  },
                  {
                     "codigo":"58",
                     "descripcion":"Licenciado en Ciencias con mención en Botánica",
                     "selected":false
                  },
                  {
                     "codigo":"59",
                     "descripcion":"Licenciado en Ciencias con mención Fisiología",
                     "selected":false
                  },
                  {
                     "codigo":"60",
                     "descripcion":"Licenciado en Ciencias de la Administración de Empresas",
                     "selected":false
                  },
                  {
                     "codigo":"61",
                     "descripcion":"Licenciado en Ciencias de la Computación",
                     "selected":false
                  },
                  {
                     "codigo":"62",
                     "descripcion":"Licenciado en Ciencias de la Informática",
                     "selected":false
                  },
                  {
                     "codigo":"63",
                     "descripcion":"Licenciado en Ciencias de la Ingeniería",
                     "selected":false
                  },
                  {
                     "codigo":"64",
                     "descripcion":"Licenciado en Ciencias de la Madera",
                     "selected":false
                  },
                  {
                     "codigo":"489",
                     "descripcion":"Licenciado en Ciencias de la Ocupación Humana",
                     "selected":false
                  },
                  {
                     "codigo":"65",
                     "descripcion":"Licenciado en Ciencias de la Salud",
                     "selected":false
                  },
                  {
                     "codigo":"66",
                     "descripcion":"Licenciado en Ciencias de los Alimentos",
                     "selected":false
                  },
                  {
                     "codigo":"67",
                     "descripcion":"Licenciado en Ciencias del Mar",
                     "selected":false
                  },
                  {
                     "codigo":"68",
                     "descripcion":"Licenciado en Ciencias Económicas y Administrativas",
                     "selected":false
                  },
                  {
                     "codigo":"69",
                     "descripcion":"Licenciado en Ciencias Exactas",
                     "selected":false
                  },
                  {
                     "codigo":"70",
                     "descripcion":"Licenciado en Ciencias Forestales",
                     "selected":false
                  },
                  {
                     "codigo":"71",
                     "descripcion":"Licenciado en Ciencias Jurídicas y Sociales",
                     "selected":false
                  },
                  {
                     "codigo":"603",
                     "descripcion":"Licenciado en Ciencias Pesqueras",
                     "selected":false
                  },
                  {
                     "codigo":"72",
                     "descripcion":"Licenciado en Ciencias Veterinarias",
                     "selected":false
                  },
                  {
                     "codigo":"73",
                     "descripcion":"Licenciado en Ciencias Veterinarias y Pecuarias",
                     "selected":false
                  },
                  {
                     "codigo":"74",
                     "descripcion":"Licenciado en Comunicación ",
                     "selected":false
                  },
                  {
                     "codigo":"75",
                     "descripcion":"Licenciado en Comunicación Audivisual",
                     "selected":false
                  },
                  {
                     "codigo":"76",
                     "descripcion":"Licenciado en Comunicación Social",
                     "selected":false
                  },
                  {
                     "codigo":"77",
                     "descripcion":"Licenciado en Control de Gestión ",
                     "selected":false
                  },
                  {
                     "codigo":"78",
                     "descripcion":"Licenciado en Derecho",
                     "selected":false
                  },
                  {
                     "codigo":"79",
                     "descripcion":"Licenciado en Diseño",
                     "selected":false
                  },
                  {
                     "codigo":"80",
                     "descripcion":"Licenciado en Educación",
                     "selected":false
                  },
                  {
                     "codigo":"517",
                     "descripcion":"Licenciado en Educación con Postítulo en Inclusión Educativa y Diversidad",
                     "selected":false
                  },
                  {
                     "codigo":"81",
                     "descripcion":"Licenciado en Educación Media",
                     "selected":false
                  },
                  {
                     "codigo":"483",
                     "descripcion":"Licenciado en Educación mención Inglés",
                     "selected":false
                  },
                  {
                     "codigo":"82",
                     "descripcion":"Licenciado en Educación mención Lingüística",
                     "selected":false
                  },
                  {
                     "codigo":"457",
                     "descripcion":"Licenciado en Educación para la Salud",
                     "selected":false
                  },
                  {
                     "codigo":"521",
                     "descripcion":"Licenciado en Educación y Magister en Educación",
                     "selected":false
                  },
                  {
                     "codigo":"526",
                     "descripcion":"Licenciado en Educación y Magister en Educación con mención en Currículum y Evaluación",
                     "selected":false
                  },
                  {
                     "codigo":"520",
                     "descripcion":"Licenciado en Educación y Magister en Educación con mención en Gestión Educacional",
                     "selected":false
                  },
                  {
                     "codigo":"514",
                     "descripcion":"Licenciado en Educación y Magister en Educación y/o Postítulo en Inclusión Educativa y Diversidad",
                     "selected":false
                  },
                  {
                     "codigo":"515",
                     "descripcion":"Licenciado en Educación y Magister en Evaluación Educacional",
                     "selected":false
                  },
                  {
                     "codigo":"513",
                     "descripcion":"Licenciado en Educación y Magister en Psicología Educacional",
                     "selected":false
                  },
                  {
                     "codigo":"610",
                     "descripcion":"Licenciado en Educación y Pedagogía en Francés",
                     "selected":false
                  },
                  {
                     "codigo":"522",
                     "descripcion":"Licenciado en Educación y/o Historia y Magister en Educación",
                     "selected":false
                  },
                  {
                     "codigo":"83",
                     "descripcion":"Licenciado en Enfermería",
                     "selected":false
                  },
                  {
                     "codigo":"84",
                     "descripcion":"Licenciado en Estética",
                     "selected":false
                  },
                  {
                     "codigo":"85",
                     "descripcion":"Licenciado en Filosofía",
                     "selected":false
                  },
                  {
                     "codigo":"86",
                     "descripcion":"Licenciado en Física",
                     "selected":false
                  },
                  {
                     "codigo":"488",
                     "descripcion":"Licenciado en Fonoaudiología",
                     "selected":false
                  },
                  {
                     "codigo":"87",
                     "descripcion":"Licenciado en Geografía",
                     "selected":false
                  },
                  {
                     "codigo":"88",
                     "descripcion":"Licenciado en Historia",
                     "selected":false
                  },
                  {
                     "codigo":"528",
                     "descripcion":"Licenciado en Historia y Magister en Educación",
                     "selected":false
                  },
                  {
                     "codigo":"89",
                     "descripcion":"Licenciado en Ingeniería de Alimentos",
                     "selected":false
                  },
                  {
                     "codigo":"90",
                     "descripcion":"Licenciado en Kinesiología",
                     "selected":false
                  },
                  {
                     "codigo":"446",
                     "descripcion":"Licenciado en Lengua Francesa",
                     "selected":false
                  },
                  {
                     "codigo":"91",
                     "descripcion":"Licenciado en Lengua Inglesa",
                     "selected":false
                  },
                  {
                     "codigo":"92",
                     "descripcion":"Licenciado en Lengua y Literatura Hispánicas, con mención en Lingüística",
                     "selected":false
                  },
                  {
                     "codigo":"93",
                     "descripcion":"Licenciado en Lengua y Literatura Hispánicas, con mención en Literatura",
                     "selected":false
                  },
                  {
                     "codigo":"470",
                     "descripcion":"Licenciado en Lenguas y Letras",
                     "selected":false
                  },
                  {
                     "codigo":"94",
                     "descripcion":"Licenciado en Letras",
                     "selected":false
                  },
                  {
                     "codigo":"442",
                     "descripcion":"Licenciado en Lingüística",
                     "selected":false
                  },
                  {
                     "codigo":"485",
                     "descripcion":"Licenciado en Lingüística Aplicada a la Traducción con mención Inglés",
                     "selected":false
                  },
                  {
                     "codigo":"95",
                     "descripcion":"Licenciado en Literatura",
                     "selected":false
                  },
                  {
                     "codigo":"96",
                     "descripcion":"Licenciado en Matemáticas ",
                     "selected":false
                  },
                  {
                     "codigo":"97",
                     "descripcion":"Licenciado en Música",
                     "selected":false
                  },
                  {
                     "codigo":"560",
                     "descripcion":"Licenciado en Música con Postgrado en Musicología y/o Educación",
                     "selected":false
                  },
                  {
                     "codigo":"551",
                     "descripcion":"Licenciado en Música (especializado en charango y cuatro)",
                     "selected":false
                  },
                  {
                     "codigo":"548",
                     "descripcion":"Licenciado en Música (especializado en vientos andinos)",
                     "selected":false
                  },
                  {
                     "codigo":"535",
                     "descripcion":"Licenciado en Música mención Canto",
                     "selected":false
                  },
                  {
                     "codigo":"547",
                     "descripcion":"Licenciado en Música (Mención Canto, Postítulo Dirección Coral)",
                     "selected":false
                  },
                  {
                     "codigo":"539",
                     "descripcion":"Licenciado en Música (Mención Flauta Dulce)",
                     "selected":false
                  },
                  {
                     "codigo":"540",
                     "descripcion":"Licenciado en Música (Mención Guitarra)",
                     "selected":false
                  },
                  {
                     "codigo":"558",
                     "descripcion":"Licenciado en música mención Percusión ",
                     "selected":false
                  },
                  {
                     "codigo":"544",
                     "descripcion":"Licenciado en Música (Mención Piano)",
                     "selected":false
                  },
                  {
                     "codigo":"533",
                     "descripcion":"Licenciado en Música mención Teoría Musical o Composición",
                     "selected":false
                  },
                  {
                     "codigo":"555",
                     "descripcion":"Licenciado en Música o en educación mención bajo",
                     "selected":false
                  },
                  {
                     "codigo":"556",
                     "descripcion":"Licenciado en Música o en educación mención guitarra eléctrica",
                     "selected":false
                  },
                  {
                     "codigo":"538",
                     "descripcion":"Licenciado en Música (Postítulo o postgrado en estética o en musicología)",
                     "selected":false
                  },
                  {
                     "codigo":"557",
                     "descripcion":"Licenciado en Música y en Educación",
                     "selected":false
                  },
                  {
                     "codigo":"98",
                     "descripcion":"Licenciado en Pedagogía",
                     "selected":false
                  },
                  {
                     "codigo":"47",
                     "descripcion":"Licenciado en Pesca y Acuicultura",
                     "selected":false
                  },
                  {
                     "codigo":"99",
                     "descripcion":"Licenciado en Psicología",
                     "selected":false
                  },
                  {
                     "codigo":"542",
                     "descripcion":"Licenciado en Psicología (Postítulo o postgrado en Educación) ",
                     "selected":false
                  },
                  {
                     "codigo":"100",
                     "descripcion":"Licenciado en Psicopedagogía ",
                     "selected":false
                  },
                  {
                     "codigo":"101",
                     "descripcion":"Licenciado en Química",
                     "selected":false
                  },
                  {
                     "codigo":"102",
                     "descripcion":"Licenciado en Servicio Social",
                     "selected":false
                  },
                  {
                     "codigo":"103",
                     "descripcion":"Licenciado en Sociología",
                     "selected":false
                  },
                  {
                     "codigo":"104",
                     "descripcion":"Licenciado en Sonido",
                     "selected":false
                  },
                  {
                     "codigo":"105",
                     "descripcion":"Licenciado en Trabajo Social",
                     "selected":false
                  },
                  {
                     "codigo":"484",
                     "descripcion":"Licenciado en Traducción (e Intérprete)",
                     "selected":false
                  },
                  {
                     "codigo":"559",
                     "descripcion":"Licenciado y/o Magister en Educación especializado en uso de tecnologías en el aula",
                     "selected":false
                  },
                  {
                     "codigo":"613",
                     "descripcion":"Licenciatura en Lengua Francesa",
                     "selected":false
                  },
                  {
                     "codigo":"487",
                     "descripcion":"Magister",
                     "selected":false
                  },
                  {
                     "codigo":"107",
                     "descripcion":"Magíster Electrónica mención Control ",
                     "selected":false
                  },
                  {
                     "codigo":"531",
                     "descripcion":"Magister en  Curriculum y Evalaución o Magister en Diseño Instruccional",
                     "selected":false
                  },
                  {
                     "codigo":"109",
                     "descripcion":"Magíster en Acuicultura",
                     "selected":false
                  },
                  {
                     "codigo":"110",
                     "descripcion":"Magíster en Administración de Empresas",
                     "selected":false
                  },
                  {
                     "codigo":"111",
                     "descripcion":"Magíster en Agronegocios",
                     "selected":false
                  },
                  {
                     "codigo":"112",
                     "descripcion":"Magíster en Antropología",
                     "selected":false
                  },
                  {
                     "codigo":"113",
                     "descripcion":"Magíster en Areas Silvestres y Conservación de la Naturaleza",
                     "selected":false
                  },
                  {
                     "codigo":"114",
                     "descripcion":"Magíster en Arte Sonoro",
                     "selected":false
                  },
                  {
                     "codigo":"115",
                     "descripcion":"Magíster en Biología",
                     "selected":false
                  },
                  {
                     "codigo":"116",
                     "descripcion":"Magíster en Bioquímica",
                     "selected":false
                  },
                  {
                     "codigo":"117",
                     "descripcion":"Magíster en Ciencia Jurídica",
                     "selected":false
                  },
                  {
                     "codigo":"118",
                     "descripcion":"Magíster en Ciencia Política",
                     "selected":false
                  },
                  {
                     "codigo":"119",
                     "descripcion":"Magíster en Ciencia y Tecnología de la Madera",
                     "selected":false
                  },
                  {
                     "codigo":"120",
                     "descripcion":"Magíster en Ciencias",
                     "selected":false
                  },
                  {
                     "codigo":"121",
                     "descripcion":"Magíster en Ciencias Agropecuarias",
                     "selected":false
                  },
                  {
                     "codigo":"122",
                     "descripcion":"Magíster en Ciencias Ambientales",
                     "selected":false
                  },
                  {
                     "codigo":"123",
                     "descripcion":"Magíster en Ciencias Animales",
                     "selected":false
                  },
                  {
                     "codigo":"124",
                     "descripcion":"Magíster en Ciencias Animales y Veterinarias",
                     "selected":false
                  },
                  {
                     "codigo":"125",
                     "descripcion":"Magíster en Ciencias de la Educación",
                     "selected":false
                  },
                  {
                     "codigo":"126",
                     "descripcion":"Magíster en Ciencias de la Ingeniería",
                     "selected":false
                  },
                  {
                     "codigo":"127",
                     "descripcion":"Magíster en Ciencias de la Ingeniería Eléctrica",
                     "selected":false
                  },
                  {
                     "codigo":"128",
                     "descripcion":"Magíster en Ciencias de la Ingeniería Mención Electrónica Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"129",
                     "descripcion":"Magíster en Ciencias de la Ingeniería Mención Ingeniería Eléctrica",
                     "selected":false
                  },
                  {
                     "codigo":"130",
                     "descripcion":"Magíster en Ciencias de la Salud",
                     "selected":false
                  },
                  {
                     "codigo":"131",
                     "descripcion":"Magíster en Ciencias de la Vida",
                     "selected":false
                  },
                  {
                     "codigo":"132",
                     "descripcion":"Magíster en Ciencias del Mar",
                     "selected":false
                  },
                  {
                     "codigo":"133",
                     "descripcion":"Magíster en Ciencias Exactas",
                     "selected":false
                  },
                  {
                     "codigo":"134",
                     "descripcion":"Magíster en Ciencias Forestales",
                     "selected":false
                  },
                  {
                     "codigo":"135",
                     "descripcion":"Magíster en Ciencias Sociales",
                     "selected":false
                  },
                  {
                     "codigo":"136",
                     "descripcion":"Magíster en Ciencias Vegetales",
                     "selected":false
                  },
                  {
                     "codigo":"137",
                     "descripcion":"Magíster en Ciencias Veterinarias",
                     "selected":false
                  },
                  {
                     "codigo":"534",
                     "descripcion":"Magister en Composición",
                     "selected":false
                  },
                  {
                     "codigo":"138",
                     "descripcion":"Magíster en Comunicación Estratégica",
                     "selected":false
                  },
                  {
                     "codigo":"139",
                     "descripcion":"Magíster en Comunicación Social",
                     "selected":false
                  },
                  {
                     "codigo":"524",
                     "descripcion":"Magister en Currículo y Evaluación",
                     "selected":false
                  },
                  {
                     "codigo":"140",
                     "descripcion":"Magíster en Currículo y Evaluación Educacional",
                     "selected":false
                  },
                  {
                     "codigo":"141",
                     "descripcion":"Magíster en Derecho de la Empresa",
                     "selected":false
                  },
                  {
                     "codigo":"142",
                     "descripcion":"Magíster en Derecho Público",
                     "selected":false
                  },
                  {
                     "codigo":"143",
                     "descripcion":"Magíster en Diseño ",
                     "selected":false
                  },
                  {
                     "codigo":"144",
                     "descripcion":"Magíster en Diseño y Comunicación",
                     "selected":false
                  },
                  {
                     "codigo":"145",
                     "descripcion":"Magíster en Ecología Marina                                        ",
                     "selected":false
                  },
                  {
                     "codigo":"146",
                     "descripcion":"Magíster en Economía",
                     "selected":false
                  },
                  {
                     "codigo":"147",
                     "descripcion":"Magíster en Economía Agraria",
                     "selected":false
                  },
                  {
                     "codigo":"148",
                     "descripcion":"Magíster en Economía Energética",
                     "selected":false
                  },
                  {
                     "codigo":"149",
                     "descripcion":"Magíster en Educación",
                     "selected":false
                  },
                  {
                     "codigo":"518",
                     "descripcion":"Magister en Educación con Especialización en Inclusión Educativa y Diversidad",
                     "selected":false
                  },
                  {
                     "codigo":"527",
                     "descripcion":"Magister en Educación con mención en Currículum y Evaluación",
                     "selected":false
                  },
                  {
                     "codigo":"519",
                     "descripcion":"Magister en Educación con mención en Gestión Educacional o Postítulo en Gestión Educacional",
                     "selected":false
                  },
                  {
                     "codigo":"150",
                     "descripcion":"Magíster en Educación mención Currículo",
                     "selected":false
                  },
                  {
                     "codigo":"151",
                     "descripcion":"Magíster en Educación mención Evaluación Educacional",
                     "selected":false
                  },
                  {
                     "codigo":"152",
                     "descripcion":"Magíster en Educación mención Gestión Educacional",
                     "selected":false
                  },
                  {
                     "codigo":"475",
                     "descripcion":"Magister en Educación mención Inglés",
                     "selected":false
                  },
                  {
                     "codigo":"525",
                     "descripcion":"Magister en Educación o postgrado en Investigación Social",
                     "selected":false
                  },
                  {
                     "codigo":"530",
                     "descripcion":"Magister en el área de las Ciencias Básicas",
                     "selected":false
                  },
                  {
                     "codigo":"529",
                     "descripcion":"Magister en el área de las Ciencias Naturales",
                     "selected":false
                  },
                  {
                     "codigo":"153",
                     "descripcion":"Magíster en Enología y Vitivinicultura",
                     "selected":false
                  },
                  {
                     "codigo":"476",
                     "descripcion":"Magister en Enseñanza del Inglés como Lengua Extranjera",
                     "selected":false
                  },
                  {
                     "codigo":"154",
                     "descripcion":"Magíster en Estadística",
                     "selected":false
                  },
                  {
                     "codigo":"155",
                     "descripcion":"Magíster en Ética Social y Desarrollo Humano",
                     "selected":false
                  },
                  {
                     "codigo":"516",
                     "descripcion":"Magister en Evaluación Educacional",
                     "selected":false
                  },
                  {
                     "codigo":"156",
                     "descripcion":"Magíster en Filosofía",
                     "selected":false
                  },
                  {
                     "codigo":"157",
                     "descripcion":"Magíster en Física",
                     "selected":false
                  },
                  {
                     "codigo":"158",
                     "descripcion":"Magíster en Gestión de Personas",
                     "selected":false
                  },
                  {
                     "codigo":"159",
                     "descripcion":"Magíster en Gestión Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"160",
                     "descripcion":"Magíster en Gestión Integral de la Calidad",
                     "selected":false
                  },
                  {
                     "codigo":"161",
                     "descripcion":"Magíster en Gestión Tecnológica, Mención Biotecnología",
                     "selected":false
                  },
                  {
                     "codigo":"162",
                     "descripcion":"Magíster en Gestión y Dirección Educacional",
                     "selected":false
                  },
                  {
                     "codigo":"163",
                     "descripcion":"Magíster en Gobierno Electrónico",
                     "selected":false
                  },
                  {
                     "codigo":"164",
                     "descripcion":"Magíster en Historia",
                     "selected":false
                  },
                  {
                     "codigo":"165",
                     "descripcion":"Magíster en Ingeniería",
                     "selected":false
                  },
                  {
                     "codigo":"166",
                     "descripcion":"Magíster en Ingeniería Agrícola ",
                     "selected":false
                  },
                  {
                     "codigo":"167",
                     "descripcion":"Magíster en Ingeniería de Negocios con Tecnologías de Información",
                     "selected":false
                  },
                  {
                     "codigo":"168",
                     "descripcion":"Magíster en Ingeniería Eléctrica",
                     "selected":false
                  },
                  {
                     "codigo":"169",
                     "descripcion":"Magíster en Ingeniería Electrónica",
                     "selected":false
                  },
                  {
                     "codigo":"170",
                     "descripcion":"Magíster en Ingeniería Industrial",
                     "selected":false
                  },
                  {
                     "codigo":"171",
                     "descripcion":"Magíster en Ingeniería Mecánica",
                     "selected":false
                  },
                  {
                     "codigo":"474",
                     "descripcion":"Magister en Inglés",
                     "selected":false
                  },
                  {
                     "codigo":"523",
                     "descripcion":"Magister en Investigación en el área de las Ciencias Sociales",
                     "selected":false
                  },
                  {
                     "codigo":"172",
                     "descripcion":"Magíster en Investigación Social",
                     "selected":false
                  },
                  {
                     "codigo":"478",
                     "descripcion":"Magister en la Enseñanza del Inglés",
                     "selected":false
                  },
                  {
                     "codigo":"477",
                     "descripcion":"Magister en la Enseñanza y Aprendizaje del Inglés como Lengua Extranjera",
                     "selected":false
                  },
                  {
                     "codigo":"173",
                     "descripcion":"Magíster en Manejo de Suelos y Aguas",
                     "selected":false
                  },
                  {
                     "codigo":"599",
                     "descripcion":"Magister en Matemáticas",
                     "selected":false
                  },
                  {
                     "codigo":"174",
                     "descripcion":"Magíster en Minería",
                     "selected":false
                  },
                  {
                     "codigo":"537",
                     "descripcion":"Magister en Musicología",
                     "selected":false
                  },
                  {
                     "codigo":"554",
                     "descripcion":"Magister en Musicología o Licenciado en Estética",
                     "selected":false
                  },
                  {
                     "codigo":"175",
                     "descripcion":"Magíster en Políticas Públicas",
                     "selected":false
                  },
                  {
                     "codigo":"176",
                     "descripcion":"Magíster en Psicología Educacional",
                     "selected":false
                  },
                  {
                     "codigo":"177",
                     "descripcion":"Magíster en Psicología Educacional Mención Orientación Vocacional",
                     "selected":false
                  },
                  {
                     "codigo":"108",
                     "descripcion":"Magíster en Psicología Laboral Organizacional",
                     "selected":false
                  },
                  {
                     "codigo":"178",
                     "descripcion":"Magíster en Psicología Mención Psicología Educacional",
                     "selected":false
                  },
                  {
                     "codigo":"179",
                     "descripcion":"Magíster en Psicología Social Comunitaria",
                     "selected":false
                  },
                  {
                     "codigo":"180",
                     "descripcion":"Magíster en Química",
                     "selected":false
                  },
                  {
                     "codigo":"181",
                     "descripcion":"Magíster en Recursos Naturales",
                     "selected":false
                  },
                  {
                     "codigo":"182",
                     "descripcion":"Magíster en Salud Pública",
                     "selected":false
                  },
                  {
                     "codigo":"183",
                     "descripcion":"Magíster en Sociología",
                     "selected":false
                  },
                  {
                     "codigo":"106",
                     "descripcion":"Magíster en Sonido",
                     "selected":false
                  },
                  {
                     "codigo":"184",
                     "descripcion":"Magíster en Sonido y Acústica",
                     "selected":false
                  },
                  {
                     "codigo":"185",
                     "descripcion":"Magíster en Tecnología de los Alimentos",
                     "selected":false
                  },
                  {
                     "codigo":"186",
                     "descripcion":"Magíster en Tecnologías de Información",
                     "selected":false
                  },
                  {
                     "codigo":"187",
                     "descripcion":"Magíster en Telecomunicaciones",
                     "selected":false
                  },
                  {
                     "codigo":"188",
                     "descripcion":"Magíster en Trabajo Social",
                     "selected":false
                  },
                  {
                     "codigo":"189",
                     "descripcion":"Magíster en Trabajo Social y Poliíticas Sociales",
                     "selected":false
                  },
                  {
                     "codigo":"482",
                     "descripcion":"Magister en Traducción (e Interpretación)",
                     "selected":false
                  },
                  {
                     "codigo":"553",
                     "descripcion":"Magister y/o Doctor en Educación con especialización en Curriculum",
                     "selected":false
                  },
                  {
                     "codigo":"550",
                     "descripcion":"Magister y/o Doctor en Psicología",
                     "selected":false
                  },
                  {
                     "codigo":"190",
                     "descripcion":"Master en Brand Communication",
                     "selected":false
                  },
                  {
                     "codigo":"191",
                     "descripcion":"Master en Diseño Estratégico ",
                     "selected":false
                  },
                  {
                     "codigo":"624",
                     "descripcion":"No Aplica",
                     "selected":false
                  },
                  {
                     "codigo":"473",
                     "descripcion":"Pedagogía en Inglés",
                     "selected":false
                  },
                  {
                     "codigo":"479",
                     "descripcion":"Pedagogía mención Inglés",
                     "selected":false
                  },
                  {
                     "codigo":"536",
                     "descripcion":"Postítulo en Dirección Coral",
                     "selected":false
                  },
                  {
                     "codigo":"612",
                     "descripcion":"Profesor de Estado de Francés",
                     "selected":false
                  },
                  {
                     "codigo":"611",
                     "descripcion":"Profesor de Francés",
                     "selected":false
                  },
                  {
                     "codigo":"541",
                     "descripcion":"Profesor de Música (Postítulo en Dirección Coral)",
                     "selected":false
                  },
                  {
                     "codigo":"549",
                     "descripcion":"Profesor en Artes Musicales (especializado en vientos andinos)",
                     "selected":false
                  },
                  {
                     "codigo":"543",
                     "descripcion":"Profesor Enseñanza Media (Postítulo en Psicología)",
                     "selected":false
                  }
               ],
               "sedes":[
                  {
                     "codigo":"10",
                     "descripcion":"Antofagasta",
                     "selected":false
                  },
                  {
                     "codigo":"7",
                     "descripcion":"Apoquindo",
                     "selected":false
                  },
                  {
                     "codigo":"18",
                     "descripcion":"Arica",
                     "selected":false
                  },
                  {
                     "codigo":"15",
                     "descripcion":"Calama",
                     "selected":false
                  },
                  {
                     "codigo":"42",
                     "descripcion":"Capacitación Rm",
                     "selected":false
                  },
                  {
                     "codigo":"20",
                     "descripcion":"Chillán",
                     "selected":false
                  },
                  {
                     "codigo":"32",
                     "descripcion":"Concepción - Talcahuano",
                     "selected":false
                  },
                  {
                     "codigo":"19",
                     "descripcion":"Copiapó",
                     "selected":false
                  },
                  {
                     "codigo":"28",
                     "descripcion":"Corporación",
                     "selected":false
                  },
                  {
                     "codigo":"24",
                     "descripcion":"Coyhaique",
                     "selected":false
                  },
                  {
                     "codigo":"34",
                     "descripcion":"Curicó",
                     "selected":false
                  },
                  {
                     "codigo":"26",
                     "descripcion":"Iquique",
                     "selected":false
                  },
                  {
                     "codigo":"46",
                     "descripcion":"La Granja",
                     "selected":false
                  },
                  {
                     "codigo":"11",
                     "descripcion":"La Serena",
                     "selected":false
                  },
                  {
                     "codigo":"30",
                     "descripcion":"Los Ángeles",
                     "selected":false
                  },
                  {
                     "codigo":"5",
                     "descripcion":"Maipú",
                     "selected":false
                  },
                  {
                     "codigo":"40",
                     "descripcion":"Ñuñoa (Ex Pérez Rosales)",
                     "selected":false
                  },
                  {
                     "codigo":"22",
                     "descripcion":"Osorno",
                     "selected":false
                  },
                  {
                     "codigo":"44",
                     "descripcion":"Postgrados",
                     "selected":false
                  },
                  {
                     "codigo":"43",
                     "descripcion":"Puente Alto",
                     "selected":false
                  },
                  {
                     "codigo":"23",
                     "descripcion":"Puerto Montt",
                     "selected":false
                  },
                  {
                     "codigo":"25",
                     "descripcion":"Punta Arenas",
                     "selected":false
                  },
                  {
                     "codigo":"17",
                     "descripcion":"Rancagua",
                     "selected":false
                  },
                  {
                     "codigo":"6",
                     "descripcion":"Renca",
                     "selected":false
                  },
                  {
                     "codigo":"45",
                     "descripcion":"San Pedro De La Paz",
                     "selected":false
                  },
                  {
                     "codigo":"2",
                     "descripcion":"Santiago Centro",
                     "selected":false
                  },
                  {
                     "codigo":"41",
                     "descripcion":"Santiago Sur",
                     "selected":false
                  },
                  {
                     "codigo":"29",
                     "descripcion":"Talca",
                     "selected":false
                  },
                  {
                     "codigo":"8",
                     "descripcion":"Temuco",
                     "selected":false
                  },
                  {
                     "codigo":"21",
                     "descripcion":"Valdivia",
                     "selected":false
                  },
                  {
                     "codigo":"13",
                     "descripcion":"Valparaíso",
                     "selected":false
                  },
                  {
                     "codigo":"33",
                     "descripcion":"Virtual",
                     "selected":false
                  }
               ],
               "asignaturasPrerrequisito":[
                  {
                     "codigo":"337",
                     "descripcion":"C303 - UCL PLARA 3",
                     "selected":false
                  },
                  {
                     "codigo":"338",
                     "descripcion":"C303 - UCL PLARA 6",
                     "selected":false
                  },
                  {
                     "codigo":"339",
                     "descripcion":"C707 - UCL PLARA 2 - C707",
                     "selected":false
                  },
                  {
                     "codigo":"340",
                     "descripcion":"C707 - UCL PLARA 7",
                     "selected":false
                  },
                  {
                     "codigo":"341",
                     "descripcion":"C505 - UCL PLARA 5",
                     "selected":false
                  },
                  {
                     "codigo":"335",
                     "descripcion":"C101 - UCL PLARA 1",
                     "selected":false
                  },
                  {
                     "codigo":"336",
                     "descripcion":"C404 - UCL PLARA 4",
                     "selected":false
                  },
                  {
                     "codigo":"150",
                     "descripcion":"A303 - Electivo II Alternativa A: Contabilidad Gubernamental, sin Fines de Lucro y Compañías de Seguros",
                     "selected":false
                  },
                  {
                     "codigo":"151",
                     "descripcion":"A203 - Taller Profesional de Arquitectura del Paisaje II: Recuperación de Macropaisajes Alterados",
                     "selected":false
                  },
                  {
                     "codigo":"152",
                     "descripcion":"A02123 - DFSDDFSDFfgff",
                     "selected":false
                  },
                  {
                     "codigo":"153",
                     "descripcion":"A303 - asasasas",
                     "selected":false
                  },
                  {
                     "codigo":"154",
                     "descripcion":"A303 - ",
                     "selected":false
                  },
                  {
                     "codigo":"155",
                     "descripcion":"A303 - ",
                     "selected":false
                  },
                  {
                     "codigo":"156",
                     "descripcion":"A405 - ",
                     "selected":false
                  },
                  {
                     "codigo":"199",
                     "descripcion":"A12121 - Arquitectura de Comunicaciones Industriales",
                     "selected":false
                  },
                  {
                     "codigo":"200",
                     "descripcion":"A22214 - Álgebra - A22214 plara",
                     "selected":false
                  },
                  {
                     "codigo":"148",
                     "descripcion":"A101 - Marketing  gastronómico",
                     "selected":false
                  },
                  {
                     "codigo":"149",
                     "descripcion":"A102 - ASAAS",
                     "selected":false
                  },
                  {
                     "codigo":"201",
                     "descripcion":"A33614 - ASIGNATURA 1 - A33614",
                     "selected":false
                  },
                  {
                     "codigo":"202",
                     "descripcion":"A48857 - Auditoría plara",
                     "selected":false
                  },
                  {
                     "codigo":"203",
                     "descripcion":"A58878 - elemento plara 1",
                     "selected":false
                  },
                  {
                     "codigo":"284",
                     "descripcion":"PL0300 - UCL PROGRAMAR LA LIMPIEZA DEL LUGAR",
                     "selected":false
                  },
                  {
                     "codigo":"255",
                     "descripcion":"PL2222 - Reading for Business English",
                     "selected":false
                  },
                  {
                     "codigo":"256",
                     "descripcion":"PL3333 - AUTO GESTIONAR EL SERVICIO AL CLIENTE, SEGÚN LOS PROTOCOLOS Y PROCEDIMIENTOS DE LA EMPRESA",
                     "selected":false
                  },
                  {
                     "codigo":"257",
                     "descripcion":"PL4444 - ORGANIZAR LA PLAZA DE TRABAJO Y LOS REQUERIMIENTOS DE MATERIAS PRIMAS PARA LA ELABORACIÓN DE BEBESTIBLES, DE ACUERDO A NORMATIVAS APLICABLES VIGENTES Y PROCEDIMIENTOS ESTABLECIDOS",
                     "selected":false
                  },
                  {
                     "codigo":"258",
                     "descripcion":"PL5555 - ORGANIZAR PLAZA DE TRABAJO, SEGÚN PROTOCOLOS DE LA EMPRESA Y NORMATIVA LEGAL VIGENTE",
                     "selected":false
                  },
                  {
                     "codigo":"253",
                     "descripcion":"PL1111 - UCL REALIZAR PREPARACIÓN Y DESPACHO DE PEDIDOS",
                     "selected":false
                  },
                  {
                     "codigo":"259",
                     "descripcion":"PL6666 - PREPARAR BEBESTIBLES, DE ACUERDO A FICHAS TÉCNICAS Y NORMATIVAS APLICABLES VIGENTES",
                     "selected":false
                  },
                  {
                     "codigo":"260",
                     "descripcion":"PL1777 - GESTIONAR ACTIVIDADES Y/O FUNCIONES REALIZADAS POR EL PERSONAL A CARGO, SEGÚN PROTOCOLOS Y PROCEDIMIENTOS ESTABLECIDOS",
                     "selected":false
                  },
                  {
                     "codigo":"254",
                     "descripcion":"PL1111 - Administración",
                     "selected":false
                  },
                  {
                     "codigo":"261",
                     "descripcion":"PL8888 - SUPERVISAR LA PREPARACIÓN DEL ÁREA DE COMEDOR Y LA ENTREGA DE LOS SERVICIOS GASTRONÓMICOS, CONFORME LOS ESTÁNDARES DE CALIDAD Y LINEAMIENTOS ESTABLECIDOS",
                     "selected":false
                  },
                  {
                     "codigo":"262",
                     "descripcion":"PL9999 - COMPLEMENTARIO 4",
                     "selected":false
                  },
                  {
                     "codigo":"263",
                     "descripcion":"PL0101 - ADMINISTRAR EL ESTABLECIMIENTO GASTRONÓMICO, DE ACUERDO A PROTOCOLOS Y PROCEDIMIENTOS ESTABLECIDOS, Y NORMATIVA APLICABLE VIGENTE",
                     "selected":false
                  },
                  {
                     "codigo":"264",
                     "descripcion":"PL0111 - GESTIONAR AL PERSONAL A CARGO, DE ACUERDO A NORMATIVA APLICABLE VIGENTE Y PROCEDIMIENTOS ESTABLECIDOS",
                     "selected":false
                  },
                  {
                     "codigo":"265",
                     "descripcion":"PL0121 - ORGANIZAR LA PREPARACIÓN DE UN EVENTO DE BANQUETERÍA",
                     "selected":false
                  },
                  {
                     "codigo":"266",
                     "descripcion":"PL0131 - PLANIFICAR UN EVENTO DE BANQUETERÍA",
                     "selected":false
                  },
                  {
                     "codigo":"267",
                     "descripcion":"PL0141 - SUPERVISAR Y CONTROLAR LA ATENCIÓN DEL EVENTO",
                     "selected":false
                  },
                  {
                     "codigo":"268",
                     "descripcion":"PL0151 - VENDER UN SERVICIO DE BANQUETERÍA",
                     "selected":false
                  },
                  {
                     "codigo":"269",
                     "descripcion":"PL0161 - UCL REALIZAR LA RECEPCIÓN Y ALMACENAMIENTO DE MATERIAS",
                     "selected":false
                  },
                  {
                     "codigo":"270",
                     "descripcion":"PL0171 - COMPLEMENTARIO 2",
                     "selected":false
                  },
                  {
                     "codigo":"271",
                     "descripcion":"PL0181 - PREPARAR BEBESTIBLES, DE ACUERDO A FICHAS TÉCNICAS Y NORMATIVAS APLICABLES VIGENTES",
                     "selected":false
                  },
                  {
                     "codigo":"272",
                     "descripcion":"PL0191 - ATENDER AL COMENSAL DURANTE SU ESTADÍA, SEGÚN PROTOCOLOS DE LA EMPRESA",
                     "selected":false
                  },
                  {
                     "codigo":"273",
                     "descripcion":"PL0200 - COMPLEMENTARIO 3",
                     "selected":false
                  },
                  {
                     "codigo":"274",
                     "descripcion":"PL0210 - Auditoría",
                     "selected":false
                  },
                  {
                     "codigo":"275",
                     "descripcion":"PL0220 - Arquitectura de Comunicaciones Industriales",
                     "selected":false
                  },
                  {
                     "codigo":"276",
                     "descripcion":"PL0230 - GESTIONAR LA APLICACIÓN DE SISTEMAS DE TRAZABILIDAD INTERNA DEL SERVICIO Y DE LAS MATERIAS PRIMAS E INSUMOS",
                     "selected":false
                  },
                  {
                     "codigo":"277",
                     "descripcion":"PL0240 - COMPLEMENTARIO 1",
                     "selected":false
                  },
                  {
                     "codigo":"278",
                     "descripcion":"PL0250 - Álgebra",
                     "selected":false
                  },
                  {
                     "codigo":"279",
                     "descripcion":"PL0260 - GESTIONAR ORDEN, HIGIENE Y MANTENIMIENTO DE LA BODEGA Y SU EQUIPAMIENTO, DE ACUERDO A LINEAMIENTOS ESTABLECIDOS Y NORMATIVAS APLICABLES VIGENTESLLL",
                     "selected":false
                  },
                  {
                     "codigo":"280",
                     "descripcion":"PL0270 - ATENDER AL COMENSAL DURANTE SU ESTADÍA, SEGÚN PROTOCOLOS DE LA EMPRESA",
                     "selected":false
                  },
                  {
                     "codigo":"281",
                     "descripcion":"PL0270 - AUTO GESTIONAR EL SERVICIO AL CLIENTE, SEGÚN LOS PROTOCOLOS Y PROCEDIMIENTOS DE LA EMPRESA",
                     "selected":false
                  },
                  {
                     "codigo":"282",
                     "descripcion":"PL0280 - UCL ADMINISTRAR EL PRESUPUESTO DEL ESTABLECIMIENTO GASTRONÓMICO",
                     "selected":false
                  },
                  {
                     "codigo":"283",
                     "descripcion":"PL0290 - UCL MANTENER UNIFORME Y PRESENTACIÓN PERSONAL",
                     "selected":false
                  },
                  {
                     "codigo":"187",
                     "descripcion":"BGSC23 - ",
                     "selected":false
                  },
                  {
                     "codigo":"188",
                     "descripcion":"A22ASD - ",
                     "selected":false
                  },
                  {
                     "codigo":"185",
                     "descripcion":"A12345 - ",
                     "selected":false
                  },
                  {
                     "codigo":"186",
                     "descripcion":"A32165 - ",
                     "selected":false
                  },
                  {
                     "codigo":"312",
                     "descripcion":"B601 - UCL PLARA 6",
                     "selected":false
                  },
                  {
                     "codigo":"313",
                     "descripcion":"B701 - UCL PLARA 7",
                     "selected":false
                  },
                  {
                     "codigo":"314",
                     "descripcion":"B201 - UCL PLARA 2",
                     "selected":false
                  },
                  {
                     "codigo":"315",
                     "descripcion":"B101 - UCL PLARA 1",
                     "selected":false
                  },
                  {
                     "codigo":"316",
                     "descripcion":"B201 - UCL PLARA 3",
                     "selected":false
                  },
                  {
                     "codigo":"317",
                     "descripcion":"B401 - UCL PLARA 4",
                     "selected":false
                  },
                  {
                     "codigo":"318",
                     "descripcion":"B501 - UCL PLARA 5",
                     "selected":false
                  },
                  {
                     "codigo":"311",
                     "descripcion":"B101 - UCL PLARA 1",
                     "selected":false
                  }
               ]
            },
            "optionsSelectoresDependientes":{
               "cboFuncionAsignatura":[
                  {
                     "codigo":"3",
                     "descripcion":"Formación General",
                     "selected":false
                  },
                  {
                     "codigo":"4",
                     "descripcion":"Gestión",
                     "selected":false
                  },
                  {
                     "codigo":"5",
                     "descripcion":"Idiomas",
                     "selected":false
                  }
               ],
               "cboCompetencias":[
                  {
                     "codigo":"ncorrCompetencia=1&ncorrCluster=2",
                     "descripcion":"CLÚSTER: Ética y Ciudadanía., COMPETENCIA: Ciudadanía (SUB-COMPETENCIA: Compromiso y participación)",
                     "selected":true
                  },
                  {
                     "codigo":"ncorrCompetencia=2&ncorrCluster=2",
                     "descripcion":"CLÚSTER: Ética y Ciudadanía., COMPETENCIA: Ciudadanía (SUB-COMPETENCIA: Respeto a la diversidad)",
                     "selected":false
                  },
                  {
                     "codigo":"ncorrCompetencia=3&ncorrCluster=2",
                     "descripcion":"CLÚSTER: Ética y Ciudadanía., COMPETENCIA: Razonamiento ético en el ámbito profesional (SUB-COMPETENCIA: Reflexión crítica)",
                     "selected":false
                  },
                  {
                     "codigo":"ncorrCompetencia=4&ncorrCluster=2",
                     "descripcion":"CLÚSTER: Ética y Ciudadanía., COMPETENCIA: Razonamiento ético en el ámbito profesional (SUB-COMPETENCIA: Responsabilidad y autocuidado)",
                     "selected":true
                  },
                  {
                     "codigo":"ncorrCompetencia=13&ncorrCluster=4",
                     "descripcion":"CLÚSTER: Resolución de Problemas, Innovación y Emprendimiento, COMPETENCIA: Capacidad emprendedora (SUB-COMPETENCIA: No aplica)",
                     "selected":false
                  },
                  {
                     "codigo":"ncorrCompetencia=12&ncorrCluster=4",
                     "descripcion":"CLÚSTER: Resolución de Problemas, Innovación y Emprendimiento, COMPETENCIA: Pensamiento creativo (SUB-COMPETENCIA: No aplica)",
                     "selected":false
                  },
                  {
                     "codigo":"ncorrCompetencia=9&ncorrCluster=4",
                     "descripcion":"CLÚSTER: Resolución de Problemas, Innovación y Emprendimiento, COMPETENCIA: Resolución de problemas (SUB-COMPETENCIA: Análisis crítico)",
                     "selected":true
                  },
                  {
                     "codigo":"ncorrCompetencia=11&ncorrCluster=4",
                     "descripcion":"CLÚSTER: Resolución de Problemas, Innovación y Emprendimiento, COMPETENCIA: Resolución de problemas (SUB-COMPETENCIA: Evaluación de resultados)",
                     "selected":false
                  },
                  {
                     "codigo":"ncorrCompetencia=10&ncorrCluster=4",
                     "descripcion":"CLÚSTER: Resolución de Problemas, Innovación y Emprendimiento, COMPETENCIA: Resolución de problemas (SUB-COMPETENCIA: Identificación e implementación de soluciones)",
                     "selected":false
                  }
               ]
            },
            "fechaPublicacion":"",
            "statusPublicacion":"NO_PUBLICADA_CON_DATOS",
            "mensaje":null
        };

        return new Promise((resolve, reject) => 
        {
            resolve(respuesta);
        });
    }
}

