const MovingObject = require("./moving_object");

class AnimatedObject extends MovingObject {
    constructor(options) {
        super(options)

        this.scale = options.scale;
        this.scaledWidth = this.scale * this.width;
        this.scaledHeight = this.scale * this.height;

        this.currentLoopIndex = 0;
        this.frameCount = 0;
    }

    drawFrame(ctx, frameX, frameY, canvasX, canvasY) {
        ctx.drawImage(this.currentImage,
                        frameX * this.spriteWidth, frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
                        canvasX, canvasY, this.scaledWidth, this.scaledHeight);
    }

    draw(ctx) {
        this.frameCount += 1;
        this.drawFrame(ctx, this.cycleLoop[this.currentLoopIndex], 0, this.pos[0]-this.xOffset, this.pos[1]-this.yOffset);
        if (this.frameCount < this.fps){
            return
        } else {
            this.frameCount = 0;
            this.currentLoopIndex++;
            if (this.currentLoopIndex >= this.cycleLoop.length) {
                this.currentLoopIndex = 0;
            }
        }
        // uncomment below to see hitbox!

        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height)
    }
}

module.exports = AnimatedObject;