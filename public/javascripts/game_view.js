class GameView {
    constructor(game, ctx) {
        this.game = game;
        this.ctx = ctx;
        this.player = this.game.addPlayer()
    }

    bindKeyHandlers() {
        const player = this.player;
        const game = this.game;
        
        document.addEventListener('keydown', (e) => {
            // e.preventDefault();
            console.log(e.code);
            switch (e.code) {
                case "ArrowUp":
                    player.jump();
                    break
                case "Space":
                    player.fireBullet();
                    break
                case "ArrowRight":
                    game.dash();
            }
        })
    }

    generateObsticles() {
        let randomTime = Math.floor(Math.random() * (2000 - 1000 + 1) + 1000);

        this.game.addObsticle();
        setTimeout(this.generateObsticles.bind(this), randomTime);
    }

    generateEnemies() {
        let randomTime = Math.floor(Math.random() * (4000 - 2000 + 1) + 1000);

        if (this.lastTime > 5000) {
            this.game.addEnemy();
        }
        setTimeout(this.generateEnemies.bind(this), randomTime);
    }

    start() {
        this.bindKeyHandlers();
        this.lastTime = 0;
        this.generateEnemies();
        this.generateObsticles();
        requestAnimationFrame(this.animate.bind(this));
    }

    showStartMenu(ctx) {
        this.game.drawStartMenu(ctx);
    }

    animate(time) {
        if (!this.game.gameover) {
            const timeDelta = time - this.lastTime;
    
            this.game.step(timeDelta);
            this.game.draw(this.ctx);
            this.lastTime = time;
    
            // every call to animate requests causes another call to animate
            requestAnimationFrame(this.animate.bind(this));
        } else {
            this.game.drawGameOver(this.ctx)
        }
        
    }
}

module.exports = GameView;