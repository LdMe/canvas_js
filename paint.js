// clase painter que se encarga de pintar los elementos en el canvas
// hay 2 modos diferentes, el de dibujar con lápiz y el de borrar
// se puede cambiar el color y el radio del lápiz o el borrador

class Painter {
    constructor(canvas) {
        this.paintColor = "black";
        this.paintRadius = 5;
        this.eraseRadius = 10;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.lineWidth = this.paintRadius * 2;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = this.paintColor;
        this.ctx.fillStyle = this.paintColor;
        this.ctx.globalCompositeOperation = "source-over";
        this.isPainting = false;
        this.isErasing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.lastCommands = [];
        this.canvas.addEventListener("mousedown", this.startPainting.bind(this));
        this.canvas.addEventListener("mousemove", this.paint.bind(this));
        this.canvas.addEventListener("mouseup", this.stopPainting.bind(this));
        this.canvas.addEventListener("mouseout", this.stopPainting.bind(this));
        this.canvas.addEventListener("touchstart", this.startPainting.bind(this));
        this.canvas.addEventListener("touchmove", this.paint.bind(this));
        this.canvas.addEventListener("touchend", this.stopPainting.bind(this));
        this.canvas.addEventListener("touchcancel", this.stopPainting.bind(this));
    }
    startPainting(e) {
        this.isPainting = true;
        this.isErasing = false;
        this.lastX = e.offsetX;
        this.lastY = e.offsetY;
    }
    stopPainting() {
        this.isPainting = false;
        this.isErasing = false;
    }
    paint(e) {
        if (this.isPainting) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(e.offsetX, e.offsetY);
            this.ctx.stroke();
            this.lastX = e.offsetX;
            this.lastY = e.offsetY;
        }
    }
    erase(e) {
        if (this.isErasing) {
            this.ctx.beginPath();
            this.ctx.arc(e.offsetX, e.offsetY, this.eraseRadius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    changeColor(color) {
        this.paintColor = color;
        this.ctx.strokeStyle = this.paintColor;
        this.ctx.fillStyle = this.paintColor;
    }
    changeRadius(radius) {
        this.paintRadius = radius;
        this.ctx.lineWidth = this.paintRadius * 2;
    }
    changeEraseRadius(radius) {
        this.eraseRadius = radius;
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    saveCanvas() {
        let link = document.createElement("a");
        link.download = "canvas.png";
        link.href = this.canvas.toDataURL();
        link.click();
    }
    changeMode(mode) {
        if (mode === "paint") {
            this.mode = "paint";
            this.ctx.globalCompositeOperation = "source-over";
        } else if (mode === "erase") {
            this.mode = "erase";
            this.ctx.globalCompositeOperation = "destination-out";
        }
    }
}

export default Painter;