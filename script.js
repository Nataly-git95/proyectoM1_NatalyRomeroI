const cantidadcolores = document.getElementById("cantidadcolores");
const formatocolor = document.getElementById("formatocolor");
const crearboton = document.getElementById("crearboton");
const contenedorpaleta = document.getElementById("contenedorpaleta");

crearboton.addEventListener("click", generarpaleta);

let paletaactual = [];

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
            };
        }

        paletaactual = nuevapaleta;
        renderizarpaleta();
        }

        function renderizarpaleta(){

            contenedorpaleta.innerHTML = "";
            paletaactual.forEach((item, index) => {
                const tarjeta = document.createElement("article");
                tarjeta.classList.add("tarjeta-color");
                
                const caja = document.createElement("div");
                caja.classList.add("caja-color");
                caja.style.background = item.color;

                const codigo = document.createElement("p");
                codigo.textContent = item.color;

                const botonbloquear = document.createElement("button");
                botonbloquear.textContent = item.bloqueado ? "🔒" : "🔓";
                botonbloquear.classList.add("boton-bloqueo");
                botonbloquear.addEventListener("click", () => {
                    paletaactual[index].bloqueado =
                    !paletaactual[index].bloqueado;
                    renderizarpaleta();
                });
                caja.appendChild(codigo);
                caja.appendChild(botonbloquear);
                tarjeta.appendChild(caja);
                contenedorpaleta.appendChild(tarjeta)
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

function creartarjetacolor(color) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta-color");

    const caja = document.createElement("div");
    caja.classList.add("caja-color");
    caja.style.backgroundColor = color;
    caja.textContent = color;
    tarjeta.appendChild(caja);
    contenedorpaleta.appendChild(tarjeta);
}
generarpaleta();