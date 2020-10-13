const MovingObject = require("./moving_object");

class StaticSpriteObject extends MovingObject {
    constructor(options) {
        super(options)

        this.scale = options.scale;
        this.scaledWidth = this.scale * this.width;
        this.scaledHeight = this.scale * this.height;

    }

    drawFrame(frameX, frameY, canvasX, canvasY) {
        ctx.drawImage(this.currentImage,
                        frameX * this.spriteWidth, frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
                        canvasX, canvasY, this.scaledWidth, this.scaledHeight);
    }

    draw(ctx) {
        this.drawFrame(0, 0, this.pos[0]-this.xOffset, this.pos[1]-this.yOffset);
    }
}

module.exports = StaticSpriteObject;