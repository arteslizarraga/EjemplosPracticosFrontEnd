
function obtenerColoresDescripcion()
{
    return [
        { codigo: "#ff1f1f", descripcion: "Opción 01" },
        { codigo: "#cc0000", descripcion: "Opción 02" },
        { codigo: "#a70000", descripcion: "Opción 03" },
        { codigo: "#ff8585", descripcion: "Opción 04" },
        { codigo: "#8cf5eb", descripcion: "Opción 05" },
        { codigo: "#b2dfdb", descripcion: "Opción 06" },
        { codigo: "#00bfa5", descripcion: "Opción 07" },
        { codigo: "#14766d", descripcion: "Opción 08" },
        { codigo: "#141c64", descripcion: "Opción 09" },
        { codigo: "#051cc4", descripcion: "Opción 10" }
    ];
}

function obtenerColoresProductos()
{
    return [
        { codigo: "#ff1f1f", descripcion: "Opción 01" },
        { codigo: "#cc0000", descripcion: "Opción 02" },
        { codigo: "#a70000", descripcion: "Opción 03" },
        { codigo: "#ff8585", descripcion: "Opción 04" },
        { codigo: "#8cf5eb", descripcion: "Opción 05" },
        { codigo: "#b2dfdb", descripcion: "Opción 06" },
        { codigo: "#00bfa5", descripcion: "Opción 07" },
        { codigo: "#14766d", descripcion: "Opción 08" },
        { codigo: "#141c64", descripcion: "Opción 09" },
        { codigo: "#051cc4", descripcion: "Opción 10" }
    ];
}

function obtenerNivelesMctp()
{
    return [
        { def_nmctp_ncorr: 1, descripcion: "Descripcion Nivel 1" },
        { def_nmctp_ncorr: 2, descripcion: "Descripcion Nivel 2" },
        { def_nmctp_ncorr: 3, descripcion: "Descripcion Nivel 3" },
        { def_nmctp_ncorr: 4, descripcion: "Descripcion Nivel 4" },
        { def_nmctp_ncorr: 5, descripcion: "Descripcion Nivel 5" }
    ];

 
    //return [
    //    { "def_nmctp_ncorr": "82","descripcion":"COMÚN"},
	   // {"def_nmctp_ncorr":"101","descripcion":"PRUEBA DEF_T_ASIG_TFL 11-5-2023"},
	   // {"def_nmctp_ncorr":"103","descripcion":"PRUEBA_JOSE DEF_T_ASIG_TFL 12-5-2023"},
    //    { "def_nmctp_ncorr": "102","descripcion":"DESCRIPCIÓN PRUEBA JOSE_DEF_T_ASIG_TFL 4-4-2023"},
    //    { "def_nmctp_ncorr": "1","descripcion":"TRONCAL INTRODUCTORIO\t"}
    //];
    
}

function obtenerListaObjetos()
{
    return [
        {
            prelacion: 1,
            tipoAsignatura: "Tipo Asignatura 1",
            def_t_asig_tfl_ncorr: 1,
            tipoOrdenAsignatura: "Ejemplo",
            descripciones: [
                { def_nmctp_ncorr: 1, descripcion: "Descripcion Nivel 1", color: "#ff1f1f" },
                { def_nmctp_ncorr: 2, descripcion: "Descripcion Nivel 2", color: "#cc0000" },
                { def_nmctp_ncorr: 3, descripcion: "Descripcion Nivel 3", color: "#a70000" },
                { def_nmctp_ncorr: 4, descripcion: "Descripcion Nivel 4", color: "#ff8585" },
                { def_nmctp_ncorr: 5, descripcion: "Descripcion Nivel 5", color: "#8cf5eb" }
            ]
        },
        {
            prelacion: 2,
            tipoAsignatura: "Tipo Asignatura 2",
            def_t_asig_tfl_ncorr: 1,
            tipoOrdenAsignatura: "Ejemplo",
            descripciones: [
                { def_nmctp_ncorr: 1, descripcion: "Descripcion Nivel 1", color: "#ff1f1f" },
                { def_nmctp_ncorr: 2, descripcion: "Descripcion Nivel 2", color: "#cc0000" },
                { def_nmctp_ncorr: 3, descripcion: "Descripcion Nivel 3", color: "#a70000" },
                { def_nmctp_ncorr: 4, descripcion: "Descripcion Nivel 4", color: "#ff8585" },
                { def_nmctp_ncorr: 5, descripcion: "Descripcion Nivel 5", color: "#8cf5eb" }
            ]
        },
        {
            prelacion: 3,
            tipoAsignatura: "Tipo Asignatura 3",
            def_t_asig_tfl_ncorr: 1,
            tipoOrdenAsignatura: "Ejemplo",
            descripciones: [
                { def_nmctp_ncorr: 1, descripcion: "Descripcion Nivel 1", color: "#ff1f1f" },
                { def_nmctp_ncorr: 2, descripcion: "Descripcion Nivel 2", color: "#cc0000" },
                { def_nmctp_ncorr: 3, descripcion: "Descripcion Nivel 3", color: "#a70000" },
                { def_nmctp_ncorr: 4, descripcion: "Descripcion Nivel 4", color: "#ff8585" },
                { def_nmctp_ncorr: 5, descripcion: "Descripcion Nivel 5", color: "#8cf5eb" }
            ]
        }
    ];
}

function obtenerDatos_EJEMPLO_MAS_REAL()
{
    return [
        {
           "def_tasig_mc_estado":"C",       // DEF_TASIG_MC
           "descripcion":[                  // Arreglo de       DEF_MTASIG_MC
              {
                 "def_mtasig_mc_color":"#cc0000",
                 "def_mtasig_mc_tdesc":"MTZ NIVEL 2 - DESCRIPCIÓN, TIPO ASIGNATURA: TRONCAL INTRODUCTORIO ",
                 "def_mtasig_mc_prelacion":"1",
                 "def_nmctp_ncorr_mc":"181",    // Foreign Key de la tabla    DEF_NMCTP
                 "def_t_asig_tfl_ncorr":"1"     // Foreign Key de la tabla    DEF_T_ASIG_TFL
              },
              {
                 "def_mtasig_mc_color":"#ff1f1f",
                 "def_mtasig_mc_tdesc":"MTZ NIVEL 3 - DESCRIPCIÓN, TIPO ASIGNATURA: TRONCAL INTRODUCTORIO ",
                 "def_mtasig_mc_prelacion":"1",
                 "def_nmctp_ncorr_mc":"182",
                 "def_t_asig_tfl_ncorr":"1"
              },
              {
                 "def_mtasig_mc_color":"#a70000",
                 "def_mtasig_mc_tdesc":"MTZ NIVEL 4 - DESCRIPCIÓN, TIPO ASIGNATURA: TRONCAL INTRODUCTORIO ",
                 "def_mtasig_mc_prelacion":"1",
                 "def_nmctp_ncorr_mc":"183",
                 "def_t_asig_tfl_ncorr":"1"
              },
              {
                 "def_mtasig_mc_color":"#ff8585",
                 "def_mtasig_mc_tdesc":"MTZ NIVEL 2 - DESCRIPCIÓN, TIPO ASIGNATURA: COMÚN ",
                 "def_mtasig_mc_prelacion":"1",
                 "def_nmctp_ncorr_mc":"181",
                 "def_t_asig_tfl_ncorr":"82"
              },
              {
                 "def_mtasig_mc_color":"#8cf5eb",
                 "def_mtasig_mc_tdesc":"MTZ NIVEL 3 - DESCRIPCIÓN, TIPO ASIGNATURA: COMÚN ",
                 "def_mtasig_mc_prelacion":"1",
                 "def_nmctp_ncorr_mc":"182",
                 "def_t_asig_tfl_ncorr":"82"
              }
           ],
           "productos": [        // Arreglo de       DEF_PRODREC_MC      
              {
                 "def_prodrec_mc_prelacion":"1",
                 "def_prodrec_mc_color":"#b2dfdb",
                 "def_nmctp_ncorr":"182",               // Foreign Key de la tabla    DEF_NMCTP
                 "def_productos_ncorr":"21"             // Foreign Key de la tabla    DEF_PRODUCTOS
              },
              {
                 "def_prodrec_mc_prelacion":"1",
                 "def_prodrec_mc_color":"#b2dfdb",
                 "def_nmctp_ncorr":"182",               // Foreign Key de la tabla    DEF_NMCTP
                 "def_productos_ncorr":"22"             // Foreign Key de la tabla    DEF_PRODUCTOS
              }
           ]
        }
    ];
}

