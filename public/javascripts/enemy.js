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
    }

    setupImages() {
        this.idleImg = new Image();
        this.idleImg.src = "/images/Plasma_Drone_Idle.png";
        this.explodeImg = new Image();
        this.explodeImg.src = "/images/Plasma_Drone_Explode.png";

        this.currentImage = this.idleImg
    }

    collideWith(otherObject) {
        if (otherObject instanceof Player) {
            console.log("Player collision with obsticle")
            return "gameover"
        } else if (otherObject instanceof Bullet) { // to remove later, the rest will be used for enemy objects
            this.remove();
            otherObject.remove();
            // debugger
            return "enemykill";
        }
        return false;
    };


}

module.exports = Enemy;