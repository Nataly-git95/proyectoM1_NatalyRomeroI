function generateHex() {
    const letras = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() *16)];
    }
    return color
}

function generateRGBA() {
    const r = Math.floor(Math.random() *256);
    const g = Math.floor(Math.random() *256);
    const b = Math.floor(Math.random() *256);
    return `rgba(${r}, ${g}, ${b}, 1)`;
}

function generateHSL() {
    const h = Math.floor(Math.random() *360);
    const s = Math.floor(Math.random() *100);
    const l = Math.floor(Math.random() *100);
    return `hsl(${h}, ${s}%, ${l}%)`;
}