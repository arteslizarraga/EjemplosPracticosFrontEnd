
var nombre = new Array(); 
var edad = new Array(); 
var genero = new Array(); 

var listaOriginal = new Array();

var aux = "";
var num_aux = 0;

var btn_grabar = document.getElementById("btn_grabar");
var btn_mostrar_resultados = document.getElementById("btn-mostrar-resultados");

var edt_nombre = document.getElementById("edt_nombre");   
var edt_edad = document.getElementById("edt_edad");				

var combobox_genero = document.getElementById("slc-genero");
var combobox_resultados = document.getElementById("slc-resultados");	


var i=0;

var x = 0;

//===================================================================================================>>>>

function grabarDatos() // (evento) es el parametro               
{		
                                                                                          
	if(!edt_nombre.value || !edt_edad.value)   // 	  || Es o "or".
	{
		alert("Faltan datos");				 
	}
	else if(isNaN(edt_edad.value))   // isNaN  - its not a number
	{
		alert("La edad debe ser un numero");
	}	
	else 
	{
	  //  alert("funciona");
	  //  if(combobox_genero.selectedIndex == 0){ alert("Masculino"); }   // selectedIndex selecciona el numero del option
	  //  if(combobox_genero.selectedIndex == 1){ alert("Femenino"); }
	  //  alert(combobox_genero.value); 								  // .value selecciona el contenido string del option
	  //  alert(combobox_genero.options[combobox_genero.selectedIndex].text);
	  	  
		  nombre[i] = edt_nombre.value;
		  edad[i] = edt_edad.value;
		  genero[i] = combobox_genero.value;
		  
		  
		  i=i+1;
		  
		

		//======================================================================>>>>>
			/* RELLENANDO LA COMBOBOX CON TODOS LOS DATOS CADASTRADOS  */
			
		// Lo hice asi para que la lista original no se desordene al buscar el mas viejo, joven, etc.
		listaOriginal[x] = edt_nombre.value;
		listaOriginal[x+1] = edt_edad.value;
		listaOriginal[x+2] = combobox_genero.value;	
		
		x = x + 3;
		  
		var listaNombres = "";
				
		for(var n=0; n<listaOriginal.length; n=n+3)  
		{	
			listaNombres += "<option>"+listaOriginal[n]+" - - - "+listaOriginal[n+1]+" - - - "+listaOriginal[n+2]+"</option>";
		}	

		document.getElementById("slc-resultados").innerHTML = listaNombres;
		
		//======================================================================>>>>>
		
		edt_nombre.value = "";   // Estas variables seran usadas de nuevo...por eso las limpio
		edt_edad.value = "";
	}			
	
}  



function mostrarResultado()
{
//====================================================================================================================>>>>>
//====================================================================================================================>>>>>

                     /* CALCULANDO EL USUARIO MAS VIEJO */

		for(var cont1 = 0; cont1 < nombre.length; cont1++ )  
		{	
			for(var cont2=0; cont2 < nombre.length-1; cont2++ )  
			{	
				if(edad[cont2] > edad[cont2 + 1])
				{
					aux = nombre[cont2];
					nombre[cont2] = nombre[cont2 + 1];
					nombre[cont2 + 1] = aux;
					
					num_aux = edad[cont2];
					edad[cont2] = edad[cont2 + 1];
					edad[cont2 + 1] = num_aux;
				}					
			}				
		}			 
					 
		// alert(nombre+"\n"+edad+"\n"+genero+"\n"+"El usuario mas viejo es:  "+nombre[cont2]+"  con la edad de:   "+edad[cont2]);
		
		document.getElementById("us-mas-viejo").innerHTML = "El usuario mas viejo es:  "+nombre[cont2]+"  con la edad de:  "+edad[cont2];	
					 		
		cont1 = 0;
		cont2 = 0;

		
//====================================================================================================================>>>>>
//====================================================================================================================>>>>>

				/* CALCULANDO EL USUARIO MAS JOVEN  */
				
		for(var cont1 = 0; cont1 < nombre.length; cont1++ )  
		{	
			for(var cont2=0; cont2 < nombre.length-1; cont2++ )  
			{	
				if(edad[cont2] < edad[cont2 + 1])   // Aqui es el contrario del anterior....en vez de >  es  <
				{
					aux = nombre[cont2];
					nombre[cont2] = nombre[cont2 + 1];
					nombre[cont2 + 1] = aux;
						
					num_aux = edad[cont2];
					edad[cont2] = edad[cont2 + 1];
					edad[cont2 + 1] = num_aux;
				}					
			}				
		}			 
		
		document.getElementById("us-mas-joven").innerHTML = "El usuario mas joven es:  "+nombre[cont2]+"  con la edad de:  "+edad[cont2];			
		cont1 = 0;
		cont2 = 0;	
		
//====================================================================================================================>>>>>
//====================================================================================================================>>>>>	
	
				/* CALCULANDO CANTIDAD DE HOMBRES Y MUJERES  */
	
		var cont_genM = 0;      // variaveis para calcular genero
		var cont_genF = 0;
	
	    for(var cont1 = 0; cont1 < nombre.length; cont1++ )  
		{				
			if(genero[cont1] == "Masculino")
			{
				cont_genM = parseInt(cont_genM) + parseInt(1);   // cont_genM = cont_genM + 1;
			}					
			if(genero[cont1] == "Femenino")
			{
				cont_genF = parseInt(cont_genF) + parseInt(1);   // cont_genF = cont_genF + 1;
			}			
		}
	
		document.getElementById("cantidad-hombres").innerHTML = "Cantidad de hombres:  "+cont_genM;
		document.getElementById("cantidad-mujeres").innerHTML = "Cantidad de mujeres:  "+cont_genF;
		cont1 = 0;
		cont2 = 0;
	
	
//====================================================================================================================>>>>>
//====================================================================================================================>>>>>	
	
				/* CALCULANDO ADULTOS Y MENORES DE EDAD  */	
				
		var contAdulto = 0;      
		var contNoAdulto = 0;
	
	    for(var cont1 = 0; cont1 < edad.length; cont1++ )  
		{				
			if(edad[cont1] >= 18 )
			{
				contAdulto = parseInt(contAdulto) + parseInt(1);   // contAdulto = contAdulto + 1;
			}					
			if(edad[cont1] < 18)
			{
				contNoAdulto = parseInt(contNoAdulto) + parseInt(1);   // contNoAdulto = contNoAdulto + 1;
			}			
		}	

		document.getElementById("mayoria-de-edad").innerHTML = "Numero de adultos:  "+contAdulto;
		document.getElementById("menor-de-edad").innerHTML = "Menores de edad: "+contNoAdulto;

//====================================================================================================================>>>>>
//====================================================================================================================>>>>>	
	
	
}                  
                       

function dobleClickCombobox()
{
	
	var numero_vector = combobox_resultados.selectedIndex;   // selectedIndex elige el numero del option(tambien empiezan de cero, como los arrays)   
	var preguntaBorrar = confirm("Desea alterar datos de:  "+nombre[numero_vector]+" ?");    // confirm pregunta SI o NO	
		
	if(preguntaBorrar) // Si el usuario escoje "si"
	{
		nombre[numero_vector] = edt_nombre.value;  /* ALTERA EL ARRAY USANDO LOS MISMOS ELEMENTOS QUE SE USARON PARA CADASTRAR */
		edad[numero_vector] = edt_edad.value;
		genero[numero_vector] = combobox_genero.value;	
	}	
	
}


function alCargarDocumento()  
{
   // alert("Esta conectado a Javascript");	
  
	btn_grabar.onclick = grabarDatos; 
	
	btn_mostrar_resultados.onclick = mostrarResultado;
	
	combobox_resultados.ondblclick = dobleClickCombobox;  // A hacer doble click en la combobox con los resultados
}



//===================================================================================================>>>>

// EVENTOS

window.onload = alCargarDocumento;		// Al cargar el documento ejecuta la funcion alCargarDocumento.




