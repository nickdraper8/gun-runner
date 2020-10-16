class GameView {
    constructor(game, ctx, color) {
        this.game = game;
        this.ctx = ctx;
        this.player = this.game.addPlayer(color)
    }

    bindKeyHandlers() {
        const player = this.player;
        const game = this.game;
        
        document.addEventListener('keydown', (e) => {
            // console.log(e.code);
            switch (e.code) {
                case "ArrowUp":
                    e.preventDefault();
                    player.jump();
                    break
                case "Space":
                    e.preventDefault();
                    player.fireBullet();
                    break
                case "ArrowRight":
                    e.preventDefault();
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
        
        document.getElementById("background-gif").src = "/images/winterbackground.gif"
        requestAnimationFrame(this.animate.bind(this));
    }

    showStartMenu(ctx) {
        this.game.drawStartMenu(ctx);
    }

    handleHighscore() {
        var highScore = localStorage.getItem('highScore') || 0;

        if (this.game.score > highScore) {
            highScore = parseInt(this.game.score);
            localStorage.setItem('highScore', highScore);
            document.getElementById("high-score").innerHTML = `Highscore: ${highScore}`;
            return true
        }
        return false;
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
            document.querySelectorAll("#game-music")[0].pause();
            document.getElementById("background-gif").src = "/images/winterbackground_still.gif"
            document.getElementById("gameover-screen").classList.add("show");
            document.getElementById("open-menu-btn-container").classList.add("show");
            // debugger
            if (this.handleHighscore()) {
                document.getElementById("high-score-alert").innerHTML = `NEW HIGHSCORE: ${this.game.score} points`;
                document.getElementById("victory").play();
            } else {
                document.getElementById("high-score-alert").innerHTML = ``;
                document.getElementById("game-over").play();
            }
        }
        
    }
}

module.exports = GameView;