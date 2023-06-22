import Painter from "./paint.js";

const canvas = document.getElementById("canvas");
let painter = new Painter(canvas);
let colorPicker = document.createElement("input");
colorPicker.type = "color";
colorPicker.addEventListener("change", (e) => {
    painter.changeColor(e.target.value);
});
document.body.appendChild(colorPicker);
let radiusPicker = document.createElement("input");
radiusPicker.type = "range";
radiusPicker.min = 1;
radiusPicker.max = 100;
radiusPicker.value = 5;
radiusPicker.addEventListener("change", (e) => {
    painter.changeRadius(e.target.value);
});
document.body.appendChild(radiusPicker);

let downloadButton = document.createElement("button");
downloadButton.innerText = "Download";
downloadButton.addEventListener("click", () => {
    painter.saveCanvas();
}
);
document.body.appendChild(downloadButton);

let clearButton = document.createElement("button");
clearButton.innerText = "Clear";
clearButton.addEventListener("click", () => {
    painter.clearCanvas();
}
);
document.body.appendChild(clearButton);

let eraseButton = document.createElement("button");
eraseButton.innerText = "Erase";
eraseButton.addEventListener("click", () => {
    if (painter.mode === "erase") {
        painter.changeMode("paint");
        eraseButton.innerText = "Erase";
        return;
    }
    painter.changeMode("erase");
    eraseButton.innerText = "Paint";
});
document.body.appendChild(eraseButton);