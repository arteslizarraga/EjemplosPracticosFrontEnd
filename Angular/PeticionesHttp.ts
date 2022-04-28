

let pais = {
  nombre: "Chile",
  ciudades: [{ nombre: "Santiago" }, { nombre: "Valpo" }]
};

let headers= new HttpHeaders();
headers.append('Accept', 'application/json');

this.http.post<any>('https://localhost:44303/Pruebas/Probando', pais, { headers: headers })
.pipe(
	map(res => 
	{
	  let retorno = {
		mensaje: "Hola", respuestaCapturada: res
	  };

	  return retorno;
	})
)
.subscribe(
  (data) => {
	console.log(data);
  },
  (error) => console.log(error)
);

/*
public class PruebasController : Controller
{
	public class Pais
	{
		public string nombre { get; set; }
		public List<Ciudad> ciudades { get; set; }
	}

	public class Ciudad
	{
		public string nombre { get; set; }
	}

	public ActionResult Probando(Pais pais)   // https://localhost:44303/Pruebas/Probando
	{
		return Json(pais, JsonRequestBehavior.AllowGet);
	}
}
*/