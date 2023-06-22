import Painter from "./paint.js";

const canvas = document.getElementById("canvas"); // se obtiene el canvas
let painter = new Painter(canvas); // se crea un objeto Painter

painter.changeColor(document.getElementById("color-picker").value); // se cambia el color del lápiz
painter.changeRadius(document.getElementById("brush-size").value); // se cambia el radio del lápiz

let colorPicker = document.getElementById("color-picker"); // se obtiene el selector de color
colorPicker.addEventListener("change", (e) => { // cuando cambia el color
    painter.changeColor(e.target.value); // se cambia el color del lápiz
});

let radiusPicker = document.getElementById("brush-size"); // se obtiene el selector de radio
radiusPicker.addEventListener("change", (e) => { // cuando cambia el radio
    painter.changeRadius(e.target.value); // se cambia el radio del lápiz
});

let downloadButton = document.getElementById("download"); // se obtiene el botón de descarga
downloadButton.addEventListener("click", () => { // cuando se hace click en el botón de descarga
    painter.saveCanvas(); // se guarda el canvas
}
);

let clearButton = document.getElementById("clear"); // se obtiene el botón de limpiar
clearButton.addEventListener("click", () => { // cuando se hace click en el botón de limpiar
    painter.clearCanvas(); // se limpia el canvas
}
);

let eraseButton = document.getElementById("mode"); // se obtiene el botón de borrar
eraseButton.addEventListener("click", () => { // cuando se hace click en el botón de borrar
    if (painter.mode === "erase") { // si el modo es borrar
        painter.changeMode("paint"); // se cambia el modo a pintar
        eraseButton.innerText = "Erase"; // se cambia el texto del botón
        document.getElementById("canvas").classList.remove("eraser"); // se quita la clase eraser
        return;
    }
    painter.changeMode("erase"); // se cambia el modo a borrar
    eraseButton.innerText = "Paint"; // se cambia el texto del botón
    document.getElementById("canvas").classList.add("eraser"); // se agrega la clase eraser
});