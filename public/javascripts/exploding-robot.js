const AnimatedObject = require("./animated_object");

class ExplodingRobot extends AnimatedObject {
    constructor({ vel = [-10,0], color = '#B91C9C', height = 70, width = 40, scale = 1}) {
        super({vel, color, height, width, scale});

        this.setupImages();
        this.cycleLoop = [0,1,2,3,4,5];

        this.spriteHeight = 90;
        this.spriteWidth = 91;

        this.scaledHeight = this.scale * this.spriteHeight;
        this.scaledWidth = this.scale * this.spriteWidth;

        this.xOffset = 10;
        this.yOffset = 5;
    }

    setupImages() {
        this.explodeImg = new Image();
        this.explodeImg.src = "/images/Plasma_Drone_Explode.png";

        this.currentImage = this.explodeImg;
    }
}

module.exports = ExplodingRobot;