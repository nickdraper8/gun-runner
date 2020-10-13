const Player = require("./player");
const Bullet = require("./bullet");
const Obsticle = require("./obsticle");
const Enemy = require("./enemy");
const FloorTile = require("./floor_tile");
const AnimatedObject = require("./animated_object");

class Game {
    constructor() {
        this.obsticles = [];
        this.players = [];
        this.bullets = [];
        this.enemies = [];
        this.floorTiles = [];
        this.animatedObjects = [];
        this.gameover = false;
        this.score = 0;
        this.dashReady = true;
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
        } else if (object instanceof AnimatedObject) {
            this.animatedObjects.push(object);
        } else if (object instanceof FloorTile) {
            this.floorTiles.push(object);
        } else {
            throw new Error("unknown type of object");
        }
    };

    remove(object) {
        if (object instanceof Player) {
            this.players.splice(this.players.indexOf(object), 1);
            console.log("Player Removed");
        } else if (object instanceof Bullet) {
            this.bullets.splice(this.bullets.indexOf(object), 1);
            console.log("Bullet Removed");
        } else if (object instanceof Obsticle) {
            this.obsticles.splice(this.obsticles.indexOf(object), 1);
            console.log("Obsticle Removed");
        } else if (object instanceof Enemy) {
            this.enemies.splice(this.enemies.indexOf(object), 1);
            console.log("Enemy Removed");
        } else if (object instanceof FloorTile) {
            this.floorTiles.splice(this.floorTiles.indexOf(object), 1);
            console.log("FloorTile Removed");
        } else {
            throw new Error("unknown type of object");
        }
    };

    checkCollisions() {
        const allObjects = this.allObjects();
        for (let i = 0; i < allObjects.length; i++) {
            for (let j = 0; j < allObjects.length; j++) {
                const obj1 = allObjects[i];
                const obj2 = allObjects[j];

                if (obj1.isCollidedWith(obj2)) {
                    const collision = obj1.collideWith(obj2);
                    if (collision === "gameover") {
                        this.gameover = true;
                    } else if (collision === "enemykill") {
                        this.score += 500;
                    } else if (collision) {
                        return;
                    }
                }
            }
        }
    };

    isOutOfBounds(pos) {
        return (pos[0] < 0) || (pos[1] < 0) ||
            (pos[0] > 800) || (pos[1] > 300);
    };

    addPlayer() {
        const player = new Player({});
        player.game = this
        this.add(player);
        return player
    }

    addObsticle() {
        const obsticle = new Obsticle({});
        obsticle.game = this
        this.add(obsticle);
    }

    addEnemy() {
        const enemy = new Enemy({});
        
        let randomYCoord = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        enemy.pos = [799, randomYCoord]
        enemy.game = this
        this.add(enemy);
    }

    addFloorTile() {
        const floorTile = new FloorTile({});
        floorTile.game = this;
        this.add(floorTile);
    }
    
    allObjects() {
        return [].concat(this.players, this.floorTiles, this.obsticles, this.enemies, this.bullets, this.animatedObjects);
    };

    draw(ctx) {
        ctx.clearRect(0, 0, 800, 300);
        ctx.fillStyle = '#ffffff00';
        ctx.fillRect(0, 0, 800, 300);

        this.allObjects().forEach(function(object) {
            object.draw(ctx);
        });

        this.drawScore(ctx);
    };

    moveObjects(delta) {
        this.allObjects().forEach(function(object) {
            object.move(delta);
        });
    };

    dash() {
        if (this.dashReady) {
            this.dashReady = false;
            this.allObjects().forEach(object => {
                if (object instanceof Player) {
                    object.vel = [0,0]
                } else if (object instanceof Obsticle || object instanceof Enemy) {
                    object.vel = [-20,0]
                }
            })
            setTimeout(this.allowDash.bind(this), 1000);
            setTimeout(this.stopDash.bind(this), 300);
        }
    }

    stopDash() {
        this.allObjects().forEach(object => {
            if (object instanceof Player) {
                if (object.isFalling) {
                    object.fall();
                }
            } else if (object instanceof Obsticle || object instanceof Enemy) {
                object.vel = [-10,0]
            }
        })
    }

    allowDash() {
        this.dashReady = true;
    }

    drawScore(ctx) {
        // debugger
        ctx.fillStyle = "black";
        ctx.font = "bold "+18+"pt Arial";
        ctx.fillText(`Score: ${this.score}`, 0, 30);
    }

    drawGameOver(ctx) {
        ctx.fillStyle = "black";
        ctx.font = "bold "+28+"pt Arial";
        ctx.fillText(`GAME OVER`, 285, 130);

        ctx.fillStyle = "black";
        ctx.font = "bold "+18+"pt Arial";
        ctx.fillText(`Press 'r' to try again`, 285, 180);
    }

    drawStartMenu(ctx) {
        ctx.fillStyle = "black";
        ctx.font = "bold "+28+"pt Arial";
        ctx.fillText(`WELCOME`, 305, 130);

        ctx.fillStyle = "black";
        ctx.font = "bold "+18+"pt Arial";
        ctx.fillText(`Press 'r' to start running`, 265, 180);
    }

    step(delta) {
        this.moveObjects(delta);
        this.players[0].update();
        this.checkCollisions();
        this.score += 1;
    };
}

module.exports = Game;