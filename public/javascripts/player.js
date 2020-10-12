const MovingObject = require ("./moving_object");
const Bullet = require ("./bullet");

class Player extends MovingObject {
    constructor({ vel = [0,0], pos = [100, 200], color = '#F9421A', height = 60, width = 50}) {
        super({vel, pos, color, height, width});

        this.isJumping = false;
        this.isReloading = false;
    }

    update() {
        // console.log(`Velocity: ${this.vel}, Position: ${this.pos}`)
        if (this.isJumping) {
            if (this.pos[1] < 20) {
                this.fall()
            } else if (this.pos[1] >= 200) {
                this.land()
            }
        }
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true
            this.vel = [0,-10]
        }
    }

    fall() { 
        this.vel = [0,5];
    }

    land() {
        this.isJumping = false
        this.vel = [0,0];
    }

    reload() {
        this.isReloading = false;
    }

    fireBullet() {
        if (!this.isReloading) {
            let bulletPos = [this.pos[0], this.pos[1] + 10];
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