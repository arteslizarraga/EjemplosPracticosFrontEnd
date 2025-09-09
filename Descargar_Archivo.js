// FUNCIONA

async function descargarArchivo(queryString) 
{
    try {
        const response = await fetch("http://localhost:52111/DownloadFile/GetArchivo", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: queryString
        });

        if (!response.ok) throw new Error("Error en la petición: " + response.statusText);

        const data = await response.json();

        if (!data.contenido) {
            console.warn("No se encontró contenido en la respuesta.");
            return;
        }

        // Convertir array de bytes a Uint8Array
        const byteArray = new Uint8Array(data.contenido);

        // Detectar extensión y asignar MIME type
        let mimeType = "application/octet-stream"; // valor por defecto
        if (data.fileName) {
            const ext = data.fileName.split('.').pop().toLowerCase();
            if (ext === "pdf") mimeType = "application/pdf";
            else if (ext === "jpg" || ext === "jpeg") mimeType = "image/jpeg";
            else if (ext === "png") mimeType = "image/png";
            // puedes agregar más tipos si necesitas
        }

        // Crear blob con el tipo adecuado
        const blob = new Blob([byteArray], { type: mimeType });

        // Preparar nombre del archivo
        const nombreArchivo = data.fileName ? decodeURIComponent(data.fileName) : "archivo";

        // Crear link de descarga
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = encodeURIComponent(nombreArchivo);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(link.href);

    } catch (err) {
        console.error("Error al descargar archivo:", err);
    }
}

// Ejemplo de llamada
descargarArchivo("fcarNcorr=7397");

//================================================>>>>
/*
[HttpPost]
public ActionResult GetArchivo(string fcreNcorr)
{
	try
	{
		DataAccess db = new DataAccess();
		DataTable dt = db.traer_documento_descargar(int.Parse(fcreNcorr));

		if (dt.Rows.Count > 0)
		{
			if (dt.Rows.Count == 0 || dt.Rows[0].IsNull("FCAR_FARCHIVO"))
				throw new Exception("El campo FCAR_FARCHIVO está nulo.");

			string fileName = dt.Rows[0]["FCAR_TNOMBRE"].ToString();
			byte[] fdata = (byte[])dt.Rows[0]["FCAR_FARCHIVO"];

			//return Json(new { fileName, contenido = fdata });  // Se cae si es muy grande

			return new JsonResult
			{
				Data = new { fileName, contenido = fdata },
				JsonRequestBehavior = JsonRequestBehavior.AllowGet,
				MaxJsonLength = int.MaxValue
			};
		}
		else
		{
			return Json(new { mensaje = "Sin Datos" });
		}
	}
	catch (Exception ex)
	{
		return Json(new { mensaje = ex.Message });
		//return new HttpStatusCodeResult(HttpStatusCode.BadRequest, ex.Message);
	}
}
*/