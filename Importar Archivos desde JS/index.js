
console.log("Hola desde index.js");

importarArchivoJS("probando_1.js");
importarArchivoJS("probando_2.js");

function importarArchivoJS(src)
{
    if (src == null || src == "") return;

    let script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);
}