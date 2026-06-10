
let usarSonidoPiano = true;

(() => {
    document.querySelector("#checkboxUsarSonidoPiano").checked = usarSonidoPiano;
})();

function actualizarModoSonido(checkbox) {
    usarSonidoPiano = checkbox.checked;  // Función para actualizar la variable cuando cambia el checkbox
}

function construirPiano(querySelector, lista)
{
    let cadena = `<table border="2">
        <thead>
            <tr>
                <th>Acorde</th>
                <th>Opciones</th>
            </tr>
        </thead>
        <tbody>
            ${lista.map((x, index) => 
            {
                const notasAcorde = JSON.parse(x.cadenaListaSubDetalles).map(d => d.nota);
                const cls = (idNota) => notasAcorde.includes(idNota) ? "tecla_pulsada" : "";

                return `
                <tr data-index="${index}">
                    <td>
                        <ul id="piano">
                            <li>
                                <div id="LA_0" sonido="sonidos_piano/220-A.mp3" class="anchor tecla ${cls('LA_0')}" onclick="tocarTecla(this)"></div> </li>
                            <li>
                                <div id="SI_0" sonido="sonidos_piano/246-B.mp3" class="anchor tecla ${cls('SI_0')}" onclick="tocarTecla(this)"></div> <span id="LA_0_sostenido" sonido="sonidos_piano_extra/0As.mp3" class="tecla ${cls('LA_0_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                        
                            <li><div id="DO_1" sonido="sonidos_piano/261-C.mp3" class="anchor tecla ${cls('DO_1')}" onclick="tocarTecla(this)"></div></li> <li>
                                <div id="RE_1" sonido="sonidos_piano/293-D.mp3" class="anchor tecla ${cls('RE_1')}" onclick="tocarTecla(this)"></div> <span id="DO_1_sostenido" sonido="sonidos_piano/277-C-sharp.mp3" class="tecla ${cls('DO_1_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="MI_1" sonido="sonidos_piano/329-E.mp3" class="anchor tecla ${cls('MI_1')}" onclick="tocarTecla(this)"></div> <span id="RE_1_sostenido" sonido="sonidos_piano/311-D-sharp.mp3" class="tecla ${cls('RE_1_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li><div id="FA_1" sonido="sonidos_piano/349-F.mp3" class="anchor tecla ${cls('FA_1')}" onclick="tocarTecla(this)"></div></li> <li>
                                <div id="SOL_1" sonido="sonidos_piano/391-G.mp3" class="anchor tecla ${cls('SOL_1')}" onclick="tocarTecla(this)"></div> <span id="FA_1_sostenido" sonido="sonidos_piano/369F-sharp.mp3" class="tecla ${cls('FA_1_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="LA_1" sonido="sonidos_piano/440-A.mp3" class="anchor tecla ${cls('LA_1')}" onclick="tocarTecla(this)"></div> <span id="SOL_1_sostenido" sonido="sonidos_piano/415-G-sharp.mp3" class="tecla ${cls('SOL_1_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="SI_1" sonido="sonidos_piano/495-B.mp3" class="anchor tecla ${cls('SI_1')}" onclick="tocarTecla(this)"></div> <span id="LA_1_sostenido" sonido="sonidos_piano/466-A-sharp.mp3" class="tecla ${cls('LA_1_sostenido')}" onclick="tocarTecla(this)"></span> </li>

                            <li><div id="DO_2" sonido="sonidos_piano/523-C.mp3" class="anchor tecla ${cls('DO_2')}" onclick="tocarTecla(this)"></div></li> <li>
                                <div id="RE_2" sonido="sonidos_piano/587-D.mp3" class="anchor tecla ${cls('RE_2')}" onclick="tocarTecla(this)"></div> <span id="DO_2_sostenido" sonido="sonidos_piano/545-C-sharp.mp3" class="tecla ${cls('DO_2_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="MI_2" sonido="sonidos_piano/659-E.mp3" class="anchor tecla ${cls('MI_2')}" onclick="tocarTecla(this)"></div> <span id="RE_2_sostenido" sonido="sonidos_piano/622-D-sharp.mp3" class="tecla ${cls('RE_2_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li><div id="FA_2" sonido="sonidos_piano/698-F.mp3" class="anchor tecla ${cls('FA_2')}" onclick="tocarTecla(this)"></div></li> <li>
                                <div id="SOL_2" sonido="sonidos_piano/783-G.mp3" class="anchor tecla ${cls('SOL_2')}" onclick="tocarTecla(this)"></div> <span id="FA_2_sostenido" sonido="sonidos_piano/698-F-sharp.mp3" class="tecla ${cls('FA_2_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="LA_2" sonido="sonidos_piano/880-A.mp3" class="anchor tecla ${cls('LA_2')}" onclick="tocarTecla(this)"></div> <span id="SOL_2_sostenido" sonido="sonidos_piano/830-G-sharp.mp3" class="tecla ${cls('SOL_2_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="SI_2" sonido="sonidos_piano/987-B.mp3" class="anchor tecla ${cls('SI_2')}" onclick="tocarTecla(this)"></div> <span id="LA_2_sostenido" sonido="sonidos_piano/932-A-sharp.mp3" class="tecla ${cls('LA_2_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            
                            <li>
                                <div id="DO_3" sonido="sonidos_piano/1046-C.mp3" class="anchor tecla ${cls('DO_3')}" onclick="tocarTecla(this)"></div></li> <li>
                                <div id="RE_3" sonido="sonidos_parche/D4.mp3" class="anchor tecla ${cls('RE_3')}" onclick="tocarTecla(this)"></div>  <span id="DO_3_sostenido" sonido="sonidos_parche/Db4.mp3" class="tecla ${cls('DO_3_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="MI_3" sonido="sonidos_piano_extra/3E.mp3" class="anchor tecla ${cls('MI_3')}" onclick="tocarTecla(this)"></div> <span id="RE_3_sostenido" sonido="sonidos_piano_extra/3Ds.mp3" class="tecla ${cls('RE_3_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li><div id="FA_3" sonido="sonidos_piano_extra/3F.mp3" class="anchor tecla ${cls('FA_3')}" onclick="tocarTecla(this)"></div></li> <li>
                                <div id="SOL_3" sonido="sonidos_piano_extra/3G.mp3" class="anchor tecla ${cls('SOL_3')}" onclick="tocarTecla(this)"></div> <span id="FA_3_sostenido" sonido="sonidos_piano_extra/3Fs.mp3" class="tecla ${cls('FA_3_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="LA_3" sonido="sonidos_piano_extra/3A.mp3" class="anchor tecla ${cls('LA_3')}" onclick="tocarTecla(this)"></div> <span id="SOL_3_sostenido" sonido="sonidos_piano_extra/3Gs.mp3" class="tecla ${cls('SOL_3_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="SI_3" sonido="sonidos_piano_extra/3B.mp3" class="anchor tecla ${cls('SI_3')}" onclick="tocarTecla(this)"></div> <span id="LA_3_sostenido" sonido="sonidos_piano_extra/3As.mp3" class="tecla ${cls('LA_3_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            
                            <li><div id="DO_4" sonido="sonidos_piano_extra/4C.mp3" class="anchor tecla ${cls('DO_4')}" onclick="tocarTecla(this)"></div></li> <li>
                                <div id="RE_4" sonido="sonidos_piano_extra/4D.mp3" class="anchor tecla ${cls('RE_4')}" onclick="tocarTecla(this)"></div>  <span id="DO_4_sostenido" sonido="sonidos_piano_extra/4Cs.mp3" class="tecla ${cls('DO_4_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="MI_4" sonido="sonidos_piano_extra/4E.mp3" class="anchor tecla ${cls('MI_4')}" onclick="tocarTecla(this)"></div> <span id="RE_4_sostenido" sonido="sonidos_piano_extra/4Ds.mp3" class="tecla ${cls('RE_4_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li><div id="FA_4" sonido="sonidos_piano_extra/4F.mp3" class="anchor tecla ${cls('FA_4')}" onclick="tocarTecla(this)"></div></li> <li>
                                <div id="SOL_4" sonido="sonidos_piano_extra/4G.mp3" class="anchor tecla ${cls('SOL_4')}" onclick="tocarTecla(this)"></div> <span id="FA_4_sostenido" sonido="sonidos_piano_extra/4Fs.mp3" class="tecla ${cls('FA_4_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="LA_4" sonido="sonidos_piano_extra/4A.mp3" class="anchor tecla ${cls('LA_4')}" onclick="tocarTecla(this)"></div> <span id="SOL_4_sostenido" sonido="sonidos_piano_extra/4Gs.mp3" class="tecla ${cls('SOL_4_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="SI_4" sonido="sonidos_piano_extra/4B.mp3" class="anchor tecla ${cls('SI_4')}" onclick="tocarTecla(this)"></div> <span id="LA_4_sostenido" sonido="sonidos_piano_extra/4As.mp3" class="tecla ${cls('LA_4_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            
                            <li><div id="DO_5" sonido="sonidos_piano_extra/5C.mp3" class="anchor tecla ${cls('DO_5')}" onclick="tocarTecla(this)"></div></li> <li>
                                <div id="RE_5" sonido="sonidos_piano_extra/5D.mp3" class="anchor tecla ${cls('RE_5')}" onclick="tocarTecla(this)"></div>  <span id="DO_5_sostenido" sonido="sonidos_piano_extra/5Cs.mp3" class="tecla ${cls('DO_5_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="MI_5" sonido="sonidos_piano_extra/5E.mp3" class="anchor tecla ${cls('MI_5')}" onclick="tocarTecla(this)"></div> <span id="RE_5_sostenido" sonido="sonidos_piano_extra/5Ds.mp3" class="tecla ${cls('RE_5_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li><div id="FA_5" sonido="sonidos_piano_extra/5F.mp3" class="anchor tecla ${cls('FA_5')}" onclick="tocarTecla(this)"></div></li> <li>
                                <div id="SOL_5" sonido="sonidos_piano_extra/5G.mp3" class="anchor tecla ${cls('SOL_5')}" onclick="tocarTecla(this)"></div> <span id="FA_5_sostenido" sonido="sonidos_piano_extra/5Fs.mp3" class="tecla ${cls('FA_5_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="LA_5" sonido="sonidos_piano_extra/5A.mp3" class="anchor tecla ${cls('LA_5')}" onclick="tocarTecla(this)"></div> <span id="SOL_5_sostenido" sonido="sonidos_piano_extra/5Gs.mp3" class="tecla ${cls('SOL_5_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            <li>
                                <div id="SI_5" sonido="sonidos_piano_extra/5B.mp3" class="anchor tecla ${cls('SI_5')}" onclick="tocarTecla(this)"></div> <span id="LA_5_sostenido" sonido="sonidos_piano_extra/5As.mp3" class="tecla ${cls('LA_5_sostenido')}" onclick="tocarTecla(this)"></span> </li>
                            
                            <li><div id="DO_6" sonido="sonidos_piano_extra/6C.mp3" class="anchor tecla ${cls('DO_6')}" onclick="tocarTecla(this)"></div></li> </ul>
                    </td>
                    <td>  
                        <button type="button" onclick="tocarAcorde(${index})">Tocar Acorde</button>
                    </td>
                </tr>
                `;
            }).join("")}
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>`;
    
    document.querySelector(querySelector).innerHTML = cadena;
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const frecuenciasNotas = {
    "LA_0": 27.50, "LA_0_sostenido": 29.14, "SI_0": 30.87,
    "DO_1": 32.70, "DO_1_sostenido": 34.65, "RE_1": 36.71, "RE_1_sostenido": 38.89, "MI_1": 41.20, "FA_1": 43.65, "FA_1_sostenido": 46.25, "SOL_1": 49.00, "SOL_1_sostenido": 51.91, "LA_1": 55.00, "LA_1_sostenido": 58.27, "SI_1": 61.74,
    "DO_2": 65.41, "DO_2_sostenido": 69.30, "RE_2": 73.42, "RE_2_sostenido": 77.78, "MI_2": 82.41, "FA_2": 87.31, "FA_2_sostenido": 92.50, "SOL_2": 98.00, "SOL_2_sostenido": 103.83, "LA_2": 110.00, "LA_2_sostenido": 116.54, "SI_2": 123.47,
    "DO_3": 130.81, "DO_3_sostenido": 138.59, "RE_3": 146.83, "RE_3_sostenido": 155.56, "MI_3": 164.81, "FA_3": 174.61, "FA_3_sostenido": 185.00, "SOL_3": 196.00, "SOL_3_sostenido": 207.65, "LA_3": 220.00, "LA_3_sostenido": 233.08, "SI_3": 246.94,
    "DO_4": 261.63, "DO_4_sostenido": 277.18, "RE_4": 293.66, "RE_4_sostenido": 311.13, "MI_4": 329.63, "FA_4": 349.23, "FA_4_sostenido": 369.99, "SOL_4": 392.00, "SOL_4_sostenido": 415.30, "LA_4": 440.00, "LA_4_sostenido": 466.16, "SI_4": 493.88,
    "DO_5": 523.25, "DO_5_sostenido": 554.37, "RE_5": 587.33, "RE_5_sostenido": 622.25, "MI_5": 659.25, "FA_5": 698.46, "FA_5_sostenido": 739.99, "SOL_5": 783.99, "SOL_5_sostenido": 830.61, "LA_5": 880.00, "LA_5_sostenido": 932.33, "SI_5": 987.77,
    "DO_6": 1046.50
};

function tocarTecla(elemento) 
{
    if (usarSonidoPiano) 
    {
        // Modo Archivo de Audio: Lee la ruta física desde el atributo "sonido"
        const rutaSonido = elemento.getAttribute("sonido");
        if (rutaSonido) {
            const audio = new Audio(rutaSonido);
            audio.play().catch(err => console.log("Error al reproducir archivo:", err));
        }
    } 
    else 
    {
        // Modo Frecuencias Sintetizadas (Web Audio API)
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const frecuencia = frecuenciasNotas[elemento.id];

        if (frecuencia) {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(frecuencia, audioCtx.currentTime);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 3.2);

            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 3.2);
        }
    }
}

function tocarAcorde(index)
{
    let elemento = objeto.listaDetalleComposicionMusical[index];
    const subDetalles = JSON.parse(elemento.cadenaListaSubDetalles);
    
    if (usarSonidoPiano) 
    {
        // Modo Archivo de Audio simultáneo para acordes
        subDetalles.forEach(item => {
            // Buscamos la tecla en el DOM dentro de esta fila para extraer su atributo 'sonido'
            const teclaDOM = document.querySelector(`tr[data-index="${index}"] #${item.nota}`);
            if (teclaDOM) {
                const rutaSonido = teclaDOM.getAttribute("sonido");
                if (rutaSonido) {
                    const audio = new Audio(rutaSonido);
                    audio.play().catch(err => console.log("Error al reproducir archivo:", err));
                }
            }
        });
    } 
    else 
    {
        // Modo Frecuencias Sintetizadas (Web Audio API)
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        subDetalles.forEach(item => 
        {
            const frecuencia = frecuenciasNotas[item.nota];

            if (frecuencia) 
            {
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();

                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(frecuencia, audioCtx.currentTime);

                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);

                gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 3.2);

                oscillator.start(audioCtx.currentTime);
                oscillator.stop(audioCtx.currentTime + 3.2);
            }
        });
    }
}
