const MovingObject = require("./moving_object");

class AnimatedObject extends MovingObject {
    constructor(options) {
        super(options)

        this.scale = 2;
        this.scaledWidth = this.scale * this.width;
        this.scaledHeight = this.scale * this.height;

        this.currentLoopIndex = 0;
        this.frameCount = 0;
    }

    drawFrame(frameX, frameY, canvasX, canvasY) {
        ctx.drawImage(this.currentImage,
                        frameX * this.width, frameY * this.height, this.width, this.height,
                        canvasX, canvasY, this.scaledWidth, this.scaledHeight);
    }

    draw(ctx) {
        this.frameCount += 1;
        this.drawFrame(this.cycleLoop[this.currentLoopIndex], 0, this.pos[0]-15, this.pos[1]-10);
        if (this.frameCount < 10){
            return
        } else {
            this.frameCount = 0;
            this.currentLoopIndex++;
            if (this.currentLoopIndex >= this.cycleLoop.length) {
                this.currentLoopIndex = 0;
            }
        }
    }
}

module.exports = AnimatedObject;