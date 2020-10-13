const axios = require('axios');
const Game = require('./game.js');
const GameView = require('./game_view');

// START OF TESTING
const MovingObject = require("./moving_object.js");
const Player = require("./player.js");
// END OF TESTING

const newGame = (ctx) => {
    document.querySelectorAll(".show").forEach(element => {
        element.classList.remove("show");
    })

    const game = new Game();
    new GameView(game, ctx).start();
}

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext('2d');

    // START OF TESTING
    window.ctx = ctx;
    window.MovingObject = MovingObject;
    window.Player = Player;
    // END OF TESTING

    const game = new Game();
    // new GameView(game, ctx).showStartMenu(ctx);
    new GameView(game, ctx)

    document.addEventListener('keydown', (e) => {
            // e.preventDefault();
            console.log(e.code);
            switch (e.code) {
                case "KeyR":
                    newGame(ctx)
                    break
            }
    })

})


