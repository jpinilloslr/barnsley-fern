require("linqjs");
let CanvasRenderer = require("./canvas-renderer");

class FernRenderer extends CanvasRenderer {
    init() {
        this.backgroundColor = "#000";
        this.coordinatesSystem.x.min = -2.1820;
        this.coordinatesSystem.x.max = 2.6558;
        this.coordinatesSystem.y.min = 0;
        this.coordinatesSystem.y.max = 9.9983;
        this.coordinatesSystem.y.inverted = true;
        this.screenMargin = 15;
        super.init();
    }

    draw() {
        let point = {x: 0, y: 0};
        for (let i = 0; i < 1000000; i++) {
            let mappedPoint = this.mapToScreenCoordinates(point);
            this.drawPixel(mappedPoint, this.getColor(point));
            point = this.getNextPoint(point);
        }
    }

    getColor(point) {
        const large = Math.abs(this.coordinatesSystem.x.min) + Math.abs(this.coordinatesSystem.x.max);
        let r = parseInt(this.mapRange(Math.abs(point.x), 0, large / 2, 10, 255));
        let g = parseInt(this.mapRange(Math.sin(point.y), -1, 1, 255, 50));
        let b = parseInt(this.mapRange(Math.cos((point.x) * 3), -1, 1, 255, 0));
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }

    getNextPoint(point) {
        let rand = Math.random();
        let range = [
            {probabilityLimit: 0.01, func: this.f1},
            {probabilityLimit: 0.86, func: this.f2},
            {probabilityLimit: 0.93, func: this.f3},
            {probabilityLimit: 1.00, func: this.f4},
        ].first(x => rand <= x.probabilityLimit);
        return range.func(point);
    }

    f1(point) {
        return {
            x: 0,
            y: 0.16 * point.y
        };
    }

    f2(point) {
        return {
            x: 0.85 * point.x + 0.04 * point.y,
            y: -0.04 * point.x + 0.85 * point.y + 1.6
        };
    }

    f3(point) {
        return {
            x: 0.20 * point.x - 0.26 * point.y,
            y: 0.23 * point.x + 0.22 * point.y + 1.6
        };
    }

    f4(point) {
        return {
            x: -0.15 * point.x + 0.28 * point.y,
            y: 0.26 * point.x + 0.24 * point.y + 0.44
        };
    }
}

new FernRenderer();