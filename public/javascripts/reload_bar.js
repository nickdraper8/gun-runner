const MovingObject = require("./moving_object");

const MovingObject = require("./moving_object");

class ReloadBar extends MovingObject {
    constructor({ pos= [200,200], vel= [0, 0] }) {
        super({ pos, vel })

        this.outerHeight = 20;
        this.outerWidth = 60;

        this.innerHeight = 10;
        this.innerWidth = 50;
    }

    draw(ctx) {
        ctx.fillStyle = 'gray';
        ctx.fillRect(this.pos[0], this.pos[1], this.outerWidth, this.outerHeight)

        ctx.fillStyle = 'red';
        ctx.fillRect(this.pos[0] + 5, this.pos[1] + 5, this.innerWidth, this.innerHeight)
    }

}

module.exports = ReloadBar;