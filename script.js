const cantidadcolores = document.getElementById("cantidadcolores");
const formatocolor = document.getElementById("formatocolor");
const crearboton = document.getElementById("crearboton");
const contenedorpaleta = document.getElementById("contenedorpaleta");

let paletaactual = [];

crearboton.addEventListener("click", generarpaleta);

function generarpaleta(){

    const cantidad = cantidadcolores.value;
    const formato = formatocolor.value;

    let nuevapaleta = [];

    for(let i = 0; i < cantidad; i++){

        if(paletaactual [i] && paletaactual[i].bloqueado){
            nuevapaleta.push(paletaactual[i]);

        }else {
            let colorgenerado;

            if (formato === "hex"){
                colorgenerado = generarHex();

            }else if (formato === "rgba") {
            colorgenerado = generarRGBA();
            }else{
                colorgenerado = generarHSL();
            }
            nuevapaleta.push({
                color: colorgenerado, bloqueado: false});
            }
        }

        paletaactual = nuevapaleta;

        renderizarpaleta();

        mostrarToast("🎨Paleta creada correctamente",crearboton);
        }
        

        function renderizarpaleta(){

            contenedorpaleta.innerHTML = "";
            paletaactual.forEach((item, index) => {
                const tarjeta = document.createElement("article");
                tarjeta.classList.add("tarjeta-color");
                
                const caja = document.createElement("div");
                caja.classList.add("caja-color");
                caja.style.background = item.color;

                const codigo = document.createElement("span");
                codigo.classList.add("codigo-color");
                codigo.textContent = item.color;

                codigo.addEventListener("click", ()=>{
                    navigator.clipboard.writeText(item.color);
                    mostrarToast("📋Color copiado", codigo);
                });
                const colorTexto = obtenerContraste(item.color);
                codigo.style.color = colorTexto;
                
                const botonbloqueo = document.createElement("button");
                botonbloqueo.classList.add("boton-bloqueo");
                botonbloqueo.textContent = item.bloqueado ? "🔒" : "🔓";
                botonbloqueo.addEventListener("click",()=>{
                    paletaactual[index].bloqueado = !paletaactual[index].bloqueado;
                    
                    const mensaje = paletaactual[index].bloqueado
                    ? "Color bloqueado 🔒" : "Color desbloqueado 🔓";
                    mostrarToast(mensaje, botonbloqueo);
                    
                    renderizarpaleta();
                }
            );

                    caja.appendChild(botonbloqueo);
                    caja.appendChild(codigo);
            
                    tarjeta.appendChild(caja);
            
                    contenedorpaleta.appendChild(tarjeta);
            });
            }

function generarHex() {
    const letras = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() *16)];
    }
    return color
}

function generarRGBA() {
    const r = Math.floor(Math.random() *256);
    const g = Math.floor(Math.random() *256);
    const b = Math.floor(Math.random() *256);
    return `rgba(${r}, ${g}, ${b}, 1)`;
}

function generarHSL() {
    const h = Math.floor(Math.random() *360);
    const s = Math.floor(Math.random() *100);
    const l = Math.floor(Math.random() *100);
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function mostrarToast(mensaje, elemento){

    const toastExistente = document.querySelector(".toast");

    if(toastExistente){

        toastExistente.remove();
    }

    const toast = document.createElement("div");

    toast.classList.add("toast");

    toast.textContent = mensaje;

    document.body.appendChild(toast);

    const rect = elemento.getBoundingClientRect();

    toast.style.top = `${rect.top - 50}px`;

    toast.style.left = `${rect.left}px`;

    setTimeout(()=>{

        toast.classList.add("show");

    },10);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },200);

    },1200);
}

function obtenerContraste(color){

    if(
        color.includes("#")
    ){

        const hex = color.replace("#","");

        const r = parseInt(hex.substring(0,2),16);

        const g = parseInt(hex.substring(2,4),16);

        const b = parseInt(hex.substring(4,6),16);

        const brillo = (r * 299 + g * 587 + b * 114) / 1000;

        return brillo > 128 ? "#000" : "#fff";
    }

    return "#000";
}

generarpaleta();
