const axios = require('axios');
const Game = require('./game.js');
const GameView = require('./game_view');

const newGame = (ctx) => {
    document.querySelectorAll(".show").forEach(element => {
        element.classList.remove("show");
    })

    document.getElementById("game-music").play();
    document.getElementById("game-over").pause();
    document.getElementById("game-over").currentTime = 0;
    document.getElementById("victory").pause();
    document.getElementById("victory").currentTime = 0;


    const game = new Game();
    new GameView(game, ctx).start();
}

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext('2d');

    const allSounds = document.querySelectorAll("audio");

    const muteBtn = document.getElementById("mute-btn");
    muteBtn.addEventListener("click", () => {
        if (muteBtn.classList.contains("muted")) {
            muteBtn.classList.remove("muted");
            muteBtn.innerHTML = "MUTE"
            allSounds.forEach(element => {
                element.muted = false;
            })
        } else {
            muteBtn.classList.add("muted");
            muteBtn.innerHTML = "UNMUTE"
            allSounds.forEach(element => {
                element.muted = true;
            })
        }
    })

    if (localStorage.highScore) {
        document.getElementById("high-score").innerHTML = `Highscore: ${localStorage.highScore}`;
    }
    

    const game = new Game();
    new GameView(game, ctx)

    document.addEventListener('keydown', (e) => {
            // e.preventDefault();
            // console.log(e.code);
            switch (e.code) {
                case "KeyR":
                    newGame(ctx)
                    break
            }
    })

})


