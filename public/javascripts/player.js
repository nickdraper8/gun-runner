const MovingObject = require ("./moving_object");

class Player extends MovingObject {
    constructor({ vel = 0, pos = [100, 200], color = '#F9421A', height = 60, width = 50}) {
        super({vel, pos, color, height, width});

        this.isJumping = false;
    }


}

module.exports = Player;