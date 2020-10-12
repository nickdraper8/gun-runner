class MovingObject {
    constructor(options) {
        this.pos = options.pos
        this.vel = options.vel;
        this.height = options.height;
        this.width = options.width
        this.color = options.color;
        this.game = options.game;
    }

    collideWith(otherObject) {
        // default do nothing
    };

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height)
    }

    move(timeDelta) {
        const velocityScale = timeDelta / (1000/60);
        const offsetX = this.vel[0] * velocityScale;
        const offsetY = this.vel[1] * velocityScale;

        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
        if (this.game.isOutOfBounds(this.pos)) {
            this.remove();
        }
    }

    isCollidedWith(otherObject) {
        let r1 = {
            top: this.pos[1] + 10,
            left: this.pos[0] + 10,
            bottom: this.pos[1] + this.height - 10,
            right: this.pos[0] + this.width- 10
        }

        let r2 = {
            top: otherObject.pos[1],
            left: otherObject.pos[0],
            bottom: otherObject.pos[1] + otherObject.height,
            right: otherObject.pos[0] + otherObject.width
        }

        return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
    };

    remove() {
        this.game.remove(this);
    };
}

module.exports = MovingObject;