class MovingObject {
    constructor(options) {
        this.pos = options.pos
        this.vel = options.vel;
        this.height = options.height;
        this.width = options.width
        this.color = options.color;
        this.game = options.game;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height)
    }

    move(timeDelta) {
        const velocityScale = timeDelta / (1000/60);
        const offsetX = this.vel[0] * velocityScale;
        const offswtY = thisvel[1] * velocityScale;
        
        this.pos = this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

        if (this.game.isOutOfBounds(this.pos)) {
            this.remove();
        }
    }

    remove() {
        this.game.remove(this);
    };
}

module.exports = MovingObject;