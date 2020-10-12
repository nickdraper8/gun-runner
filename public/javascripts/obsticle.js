const MovingObject = require("./moving_object");
const Player = require("./player");
const Bullet = require("./bullet");

class Obsticle extends MovingObject {
    constructor({ pos = [799, 160], vel = [-10,0], color = '#FB921C', height = 100, width = 50}) {
        super({pos, vel, color, height, width});
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