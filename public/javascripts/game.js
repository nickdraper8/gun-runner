const Player = require("./player");

class Game {
    constructor() {
        this.obsticles = [];
        this.players = [];
        this.bullets = [];
        this.enemies = [];
    }

    add(object) {
        if (object instanceof Player) {
            this.players.push(object);
        } else if (object instanceof Bullet) {
            this.bullets.push(object);
        } else if (object instanceof Obsticle) {
            this.obsticles.push(object);
        } else if (object instanceof Enemy) {
            this.enemies.push(object);
        } else {
            throw new Error("unknown type of object");
        }
    };

    remove(object) {
        if (object instanceof Player) {
            this.players.splice(this.players.indexOf(object), 1);
        } else if (object instanceof Bullet) {
            this.bullets.splice(this.bullets.indexOf(object), 1);
        } else if (object instanceof Obsticle) {
            this.obsticles.splice(this.obsticles.indexOf(object), 1);
        } else if (object instanceof Enemy) {
            this.enemies.splice(this.enemies.indexOf(object), 1);
        } else {
            throw new Error("unknown type of object");
        }
    };

    isOutOfBounds(pos) {
        return (pos[0] < 0) || (pos[1] < 0) ||
            (pos[0] > 800) || (pos[1] > 300);
    };

    addPlayer() {
        const player = new Player({});
        this.add(player);
        return player
    }
    
    allObjects() {
        return [].concat(this.players, this.obsticles, this.enemies, this.bullets);
    };

    draw(ctx) {
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = Game.BG_COLOR;
        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

        this.allObjects().forEach(function(object) {
            object.draw(ctx);
        });
    };

    moveObjects(delta) {
        this.allObjects().forEach(function(object) {
            object.move(delta);
        });
    };

    step(delta) {
        this.moveObjects(delta);
        this.checkCollisions();
    };
}