const StaticSpriteObject = require("./static_sprite_object");
const Player = require("./player");

class Obsticle extends StaticSpriteObject {
    constructor({ pos = [799, 180], vel = [-10,0], color = '#FB921C', height = 100, width = 40, scale = .15}) {
        super({pos, vel, color, height, width, scale});

        this.setupImages();
        this.cycleLoop = [0];

        this.spriteHeight = 900;
        this.spriteWidth = 800;

        this.scale = scale;

        this.scaledHeight = this.scale * this.spriteHeight;
        this.scaledWidth = this.scale * this.spriteWidth;

        this.xOffset = 52;
        this.yOffset = 20;

    }

    setupImages() {
        this.treeImg = new Image();
        this.treeImg.src = "/images/obsticle.png";

        this.currentImage = this.treeImg
    }

    collideWith(otherObject) {
        if (otherObject instanceof Player) {
            console.log("Player collision with obsticle")
            return "gameover"
        }
        return false;
    };

}

module.exports = Obsticle;