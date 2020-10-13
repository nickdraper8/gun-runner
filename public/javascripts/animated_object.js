const MovingObject = require("./moving_object");

class AnimatedObject extends MovingObject {
    constructor({ vel = [0, 0], pos = [100,100], height = 20, width = 20 }) {
        super({vel, pos, height, width})

        this.setupImages();

        this.scale = 4;
        this.width = 47;
        this.height = 40;
        this.scaledWidth = this.scale * width;
        this.scaledHeight = this.scale * height;

        this.cycleLoop = [0,1,2,3,4,5];
        this.currentLoopIndex = 0;
        this.frameCount = 0;
    }

    setupImages() {
        this.runningImg = new Image();
        this.runningImg.src = "/images/Gunner_Red_Run.png";
        
        this.runningImg.onload = () => {
            this.draw(ctx)
        }
    }

    drawFrame(frameX, frameY, canvasX, canvasY) {
        ctx.drawImage(this.runningImg,
                        frameX * this.width, frameY * this.height, this.width, this.height,
                        canvasX, canvasY, this.scaledWidth, this.scaledHeight);
    }

    // draw(ctx) {
    //     this.drawFrame(0, 0, 0, 0);
    //     this.drawFrame(1, 0, this.scaledWidth, 0);
    //     this.drawFrame(2, 0, this.scaledWidth * 2, 0);
    //     this.drawFrame(3, 0, this.scaledWidth * 3, 0);
    //     this.drawFrame(4, 0, this.scaledWidth * 4, 0);
    //     this.drawFrame(5, 0, this.scaledWidth * 5, 0);
    // }

    step(ctx) {
        this.frameCount += 1;
        this.drawFrame(this.cycleLoop[this.currentLoopIndex], 0, this.pos[0], this.pos[1]);
        debugger
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