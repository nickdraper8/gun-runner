const AnimatedObject = require("./animated_object");
const Player = require("./player");
const Bullet = require("./bullet");

class Enemy extends AnimatedObject {
    constructor({ vel = [-10,0], color = '#B91C9C', height = 70, width = 40, scale = 1}) {
        super({vel, color, height, width, scale});

        this.setupImages();
        this.cycleLoop = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

        this.spriteHeight = 90;
        this.spriteWidth = 91;
 
        this.scaledHeight = this.scale * this.spriteHeight;
        this.scaledWidth = this.scale * this.spriteWidth;
        
        this.xOffset = 10;
        this.yOffset = 5;

        this.fps = 8;

    }

    setupImages() {
        this.idleImg = new Image();
        this.idleImg.src = "./public/images/Plasma_Drone_Idle.png";
        this.explodeImg = new Image();
        this.explodeImg.src = "./public/images/Plasma_Drone_Explode.png";

        this.currentImage = this.idleImg;
    }

    collideWith(otherObject) {
        if (this.currentImage === this.idleImg) {
            if (otherObject instanceof Player) {
                // console.log("Player collision with enemy")
                return "gameover"
            } else if (otherObject instanceof Bullet) {
                // console.log("enemy explodes")
                document.getElementById("explosion").currentTime = 0;
                document.getElementById("explosion").play();
                this.currentImage = this.explodeImg;
                this.spriteHeight = 190;
                this.spriteWidth = 190;
                // this.cycleLoop = [0,1,2,3,4,5];
                this.currentLoopIndex = 0;
                this.scaledHeight = this.scale * this.spriteHeight;
                this.scaledWidth = this.scale * this.spriteWidth;
                this.xOffset = 60;
                this.yOffset = 60;
                otherObject.remove();
                // debugger
                return "enemykill";
            }
            return false;
        }
    };

    removeDestroyedEnemy() {
        if (this.currentImage === this.explodeImg) {
            // debugger
            if (this.frameCount > 5) {
                return true
            }
        }
        return false;
    }

    // drawFrame(ctx, frameX, frameY, canvasX, canvasY) {
    //     ctx.drawImage(this.currentImage,
    //                     frameX * this.spriteWidth, frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
    //                     canvasX, canvasY, this.scaledWidth, this.scaledHeight);
    // }

    // draw(ctx) {
    //     this.frameCount += 1;
    //     this.drawFrame(ctx, this.cycleLoop[this.currentLoopIndex], 0, this.pos[0]-this.xOffset, this.pos[1]-this.yOffset);
    //     if (this.frameCount < 10){
    //         return
    //     } else {
    //         this.frameCount = 0;
    //         this.currentLoopIndex++;
    //         if (this.currentLoopIndex >= this.cycleLoop.length) {
    //             this.currentLoopIndex = 0;
    //         }
    //     }
    // }


}

module.exports = Enemy;