const AnimatedObject = require("./animated_object");

class FloorTile extends AnimatedObject {
    constructor({ vel = [-10,0], pos = [799, 240], color = '#F9421A', height = 60, width = 60, scale = 2}) {
        super({vel, color, height, pos, width});

        this.setupImages();
        this.cycleLoop = [0];

        this.spriteHeight = 32;
        this.spriteWidth = 32;

        this.scale = scale;

        this.scaledHeight = this.scale * this.spriteHeight;
        this.scaledWidth = this.scale * this.spriteWidth;

        this.xOffset = 0;
        this.yOffset = 0;
    }

    setupImages() {
        this.tileImage = new Image();
        this.tileImage.src = "/images/Platform.png";

        this.currentImage = this.tileImage
    }

    drawFrame(frameX, frameY, canvasX, canvasY) {
        debugger
        ctx.drawImage(this.currentImage,
                        frameX * this.spriteWidth, frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
                        canvasX, canvasY, this.scaledWidth, this.scaledHeight);
    }

    draw(ctx) {
        this.drawFrame(0, 0, this.pos[0]-this.xOffset, this.pos[1]-this.yOffset);
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height)
    }

}

module.exports = FloorTile;