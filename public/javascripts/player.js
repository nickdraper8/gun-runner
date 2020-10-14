const AnimatedObject = require ("./animated_object");
const Bullet = require ("./bullet");

class Player extends AnimatedObject {
    constructor({ vel = [0,0], pos = [100, 220], color = '#F9421A', height = 60, width = 48, scale = 2}) {
        super({vel, pos, color, height, width, scale});

        this.setupImages()
        this.cycleLoop = [0,1,2,3,4,5];

        this.isJumping = false;
        this.isFalling = false;
        this.isReloading = false;

        this.spriteHeight = 60;
        this.spriteWidth = 48;

        this.scaledHeight = this.scale * this.spriteHeight;
        this.scaledWidth = this.scale * this.spriteWidth;

        this.xOffset = 15;
        this.yOffset = 10;
    }

    update() {
        console.log(`Player POS: ${this.pos}`)
        console.log(`Player VEL: ${this.vel}`)
        if (this.isFalling) {
            // debugger
            this.vel[1] = this.vel[1] + (this.vel[1] * .1)
            // debugger
            if (this.pos[1] >= 200) {
                this.land()
            }
        } else if (this.isJumping) {
            this.vel[1] *= .9;
            if (this.vel[1] > -.5) {
                this.fall();
            }
        }
    }

    setupImages() {
        this.runningImg = new Image();
        this.runningImg.src = "/images/Gunner_Red_Run.png";
        this.jumpingImg = new Image();
        this.jumpingImg.src = "/images/Gunner_Red_Jump.png";

        this.currentImage = this.runningImg
    }

    jump() {
        if (!this.isJumping) {
            document.getElementById("jump").play();
            this.isJumping = true
            this.vel = [0,-17]
            this.currentImage = this.jumpingImg
            this.cycleLoop = [0];
            this.currentLoopIndex = 0;
        }
    }

    fall() { 
        this.isFalling = true;
        this.vel = [0,.5];
        this.cycleLoop = [1];
        this.currentLoopIndex = 0;
    }

    land() {
        this.isJumping = false;
        this.isFalling = false;
        this.vel = [0,0];
        this.pos = [100, 220];
        this.currentImage = this.runningImg
        this.cycleLoop = [0,1,2,3,4,5];
        this.currentLoopIndex = 0;
    }

    reload() {
        document.getElementById("gunshot").pause();
        document.getElementById("gunshot").currentTime = 0;
        this.isReloading = false;
    }

    fireBullet() {
        if (!this.isReloading) {
            document.getElementById("gunshot").play();
            let bulletPos = [this.pos[0], this.pos[1] + 25];
            const bullet = new Bullet({});
            bullet.pos = bulletPos;
            bullet.game = this.game;
            this.game.add(bullet);
            this.isReloading = true;
            setTimeout(this.reload.bind(this), 1000);
        }
    };


}

module.exports = Player;