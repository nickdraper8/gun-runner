class GameView {
    constructor(game, ctx) {
        this.game = game;
        this.ctx = ctx;
        this.player = this.game.addPlayer()
    }

    bindKeyHandlers() {
        const player = this.player;
        
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
            }
        })
    }

    generateObsticles() {
        let randomTime = Math.floor(Math.random() * (2000 - 1000 + 1) + 1000);

        this.game.addObsticle();
        setTimeout(this.generateObsticles.bind(this), randomTime);
    }

    start() {
        this.bindKeyHandlers();
        this.lastTime = 0;
        this.generateObsticles();
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        if (!this.game.gameover) {
            const timeDelta = time - this.lastTime;
    
            this.game.step(timeDelta);
            this.game.draw(this.ctx);
            this.lastTime = time;
    
            // every call to animate requests causes another call to animate
            requestAnimationFrame(this.animate.bind(this));
        }
    }
}

module.exports = GameView;