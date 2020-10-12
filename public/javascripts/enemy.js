const MovingObject = require("./moving_object");
const Player = require("./player");
const Bullet = require("./bullet");

class Enemy extends MovingObject {
    constructor({ vel = [-10,0], color = '#B91C9C', height = 50, width = 50}) {
        super({vel, color, height, width});
    }

    collideWith(otherObject) {
        if (otherObject instanceof Player) {
            console.log("Player collision with obsticle")
            return "gameover"
        } else if (otherObject instanceof Bullet) { // to remove later, the rest will be used for enemy objects
            this.remove();
            otherObject.remove();
            debugger
            return "enemykill";
        }
        return false;
    };


}

module.exports = Enemy;