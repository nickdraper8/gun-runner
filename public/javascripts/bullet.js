const MovingObject = require("./moving_object");

class Bullet extends MovingObject{
    constructor({ vel = [20,0], color = '#000000', height = 5, width = 10}) {
        super({vel, color, height, width});
    }
}

module.exports = Bullet;