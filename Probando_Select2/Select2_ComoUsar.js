    //===============================================================================================>>>>>>
    
    //$("#select_probando_1").select2({ closeOnSelect: false });

    //$("#select2_asignaturas").select2({ allowClear: true, closeOnSelect: false });

    /*
    $("#select2_asignaturas").select2({
      allowClear: true,
      closeOnSelect: false,  // No lo cierra al seleccionar un option
      ajax: {
        type:"POST",
        url: `${this.config.urlBackend}/Combobox/GetAsignaturasSelect2`,
        data: (params) => {
          var query = {
            i_carr_ccod: () => { return this.objeto.programasEstudio.join(","); },  // "CC ,DMP",
            search: params.term,
            pageSize: 10,
            page: params.page || 1
          }

          return query;
        }
      }
    })
    .on("change", () => {
      // let texto = $("select2_asignaturas option:selected").text();
      let valor = $("#select2_asignaturas").select2("val");
      console.log(valor);
    });
    */
    
    // $("#select2_asignaturas").select2("val");    // [ "CBMF01", "COIC01" ]          [ "AOAG04", "AOIC01", "CBES01" ] 

    // Agregar options
    /*
    $("#select2_asignaturas").append(new Option("dato 1", "1", true, true));
    $("#select2_asignaturas").append(new Option("dato 2", "2", true, true))
    $("#select2_asignaturas").trigger("change"); 
    */

    // $("#select2_asignaturas").val("").trigger("change");   // Limpiar select

    // Obtener valores seleccionados
    /*
    $("#select2_asignaturas").select2("data").forEach(c => {
      console.log(`${c.id} | ${c.text}`);
    });
    */

    //===============================================================================================>>>>>>