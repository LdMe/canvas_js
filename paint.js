// clase painter que se encarga de pintar los elementos en el canvas
// hay 2 modos diferentes, el de dibujar con lápiz y el de borrar
// se puede cambiar el color y el radio del lápiz o el borrador

class Painter {
    constructor(canvas) {
        this.paintColor = "black"; // color del lápiz
        this.paintRadius = 5; // radio del lápiz
        this.canvas = canvas; // canvas
        this.ctx = canvas.getContext("2d"); // contexto del canvas
        this.ctx.lineWidth = this.paintRadius * 2; // ancho de la línea
        this.ctx.lineCap = "round"; // tipo de línea
        this.ctx.strokeStyle = this.paintColor; // color de la línea
        this.ctx.fillStyle = this.paintColor; // color de relleno
        this.ctx.globalCompositeOperation = "source-over"; // modo de dibujado. source-over es el modo por defecto, que dibuja sobre el canvas
        this.isPainting = false; // indica si se está pintando o no
        this.lastX = 0; // última posición x
        this.lastY = 0; // última posición y
        this.addListeners();
    }
    addListeners() {
        this.canvas.addEventListener("mousedown", (e) =>this.startPainting(e)); // cuando se pulsa el ratón, se empieza a pintar
        this.canvas.addEventListener("mousemove", (e) => this.paint(e)); // cuando se mueve el ratón, se pinta
        this.canvas.addEventListener("mouseup", (e) => this.stopPainting(e)); // cuando se deja de pulsar el ratón, se deja de pintar
        this.canvas.addEventListener("mouseout", (e) =>this.stopPainting(e)); // cuando el ratón sale del canvas, se deja de pintar
        this.canvas.addEventListener("touchstart", (e) => this.startPainting(e,true)); // cuando se toca la pantalla, se empieza a pintar
        this.canvas.addEventListener("touchmove", (e) =>this.paint(e,true)); // cuando se mueve el dedo por la pantalla, se pinta
        this.canvas.addEventListener("touchend", (e) => this.stopPainting(e)); // cuando se deja de tocar la pantalla, se deja de pintar
        this.canvas.addEventListener("touchcancel", (e) =>this.stopPainting(e)); // cuando se cancela el evento touch, se deja de pintar
    }
    startPainting(e,isTouch=false) {
        this.isPainting = true;
        if (isTouch) { // si es un evento touch, se guarda la posición del dedo
            this.lastX = e.touches[0].clientX - this.canvas.offsetLeft; // posición x del dedo
            this.lastY = e.touches[0].clientY - this.canvas.offsetTop; // posición y del dedo
            return;
        }
        this.lastX = e.offsetX; // posición x del ratón
        this.lastY = e.offsetY; // posición y del ratón
    }
    stopPainting() {
        this.isPainting = false;
    }
    paint(e,isTouch=false) {
        if (this.isPainting) {
            if (isTouch) { // si es un evento touch, se pinta desde la última posición del dedo
                this.ctx.beginPath(); // se empieza a dibujar
                this.ctx.moveTo(this.lastX, this.lastY); // se mueve el lápiz a la última posición del dedo
                this.ctx.lineTo(e.touches[0].clientX - this.canvas.offsetLeft, e.touches[0].clientY - this.canvas.offsetTop); // se dibuja una línea hasta la posición actual del dedo
                this.ctx.stroke(); // se dibuja la línea
                this.lastX = e.touches[0].clientX - this.canvas.offsetLeft; // se guarda la última posición del dedo
                this.lastY = e.touches[0].clientY - this.canvas.offsetTop; // se guarda la última posición del dedo
                return;
            }
            this.ctx.beginPath(); // se empieza a dibujar
            this.ctx.moveTo(this.lastX, this.lastY); // se mueve el lápiz a la última posición del ratón
            this.ctx.lineTo(e.offsetX, e.offsetY); // se dibuja una línea hasta la posición actual del ratón
            this.ctx.stroke(); // se dibuja la línea
            this.lastX = e.offsetX; // se guarda la última posición del ratón
            this.lastY = e.offsetY; // se guarda la última posición del ratón
        }
    } 
    changeColor(color) {
        this.paintColor = color; // se cambia el color del lápiz
        this.ctx.strokeStyle = this.paintColor; // se cambia el color de la línea
        this.ctx.fillStyle = this.paintColor; // se cambia el color de relleno
    }
    changeRadius(radius) {
        this.paintRadius = radius; // se cambia el radio del lápiz
        this.ctx.lineWidth = this.paintRadius * 2; // se cambia el ancho de la línea
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // se limpia el canvas
    }
    saveCanvas() {
        let link = document.createElement("a"); // se crea un enlace
        link.download = "canvas.png"; // se le da un nombre al archivo
        link.href = this.canvas.toDataURL(); // se le asigna el contenido del canvas
        link.click(); // se hace click en el enlace
    }
    changeMode(mode) {
        if (mode === "paint") {  
            this.mode = "paint"; // se cambia el modo a pintar
            this.ctx.globalCompositeOperation = "source-over"; // se cambia el modo de dibujado a source-over, que dibuja sobre el canvas
        } else if (mode === "erase") {
            this.mode = "erase"; // se cambia el modo a borrar
            this.ctx.globalCompositeOperation = "destination-out"; // se cambia el modo de dibujado a destination-out, que borra lo que se dibuja sobre el canvas
        }
    }
}

export default Painter;