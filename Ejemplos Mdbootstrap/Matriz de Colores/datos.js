

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

