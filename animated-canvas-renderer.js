let CanvasRenderer = require("./canvas-renderer");

class AnimatedCanvasRenderer extends CanvasRenderer {
    constructor() {
        super();
        this.fps = 60;
    }

    draw() {
        setInterval(x => this.drawFrame(), 1000 / this.fps);
    }  

    drawFrame() {
    }
}

module.exports = AnimatedCanvasRenderer;