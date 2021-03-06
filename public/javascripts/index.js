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

    let color = localStorage.getItem('playerColor') || undefined;

    const game = new Game();
    new GameView(game, ctx, color).start();
}

document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('gameover', 'true');
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

    const colorMenuBtn = document.getElementById("open-color-menu-btn");
    colorMenuBtn.addEventListener("click", () => {
        document.getElementById("player-color-select-menu").classList.add("show");
    })

    const controlsMenuBtn = document.getElementById("open-controls-menu-btn");
    controlsMenuBtn.addEventListener("click", () => {
        document.getElementById("controls-menu").classList.add("show");
    })

    const closeColorsMenuBtn = document.getElementById("exit-colors-menu-btn");
    closeColorsMenuBtn.addEventListener("click", () => {
        document.getElementById("player-color-select-menu").classList.remove("show");
    })

    const closeControlsMenuBtn = document.getElementById("exit-controls-menu-btn");
    closeControlsMenuBtn.addEventListener("click", () => {
        document.getElementById("controls-menu").classList.remove("show");
    })
    

    const redColorBtn = document.getElementById("player-color-red");
    const blueColorBtn = document.getElementById("player-color-blue");
    const greenColorBtn = document.getElementById("player-color-green");
    const yellowColorBtn = document.getElementById("player-color-yellow");

    if (localStorage.playerColor) {
        let color = localStorage.playerColor
        color = color.toLowerCase();
        document.getElementById(`player-color-${color}`).classList.add("selected");
    }
    
    redColorBtn.addEventListener("click", () => {
        if (!redColorBtn.classList.contains("selected")) {
            document.getElementsByClassName("selected")[0].classList.remove("selected")
            redColorBtn.classList.add("selected");
            localStorage.setItem('playerColor', "Red");
        }
    })
    blueColorBtn.addEventListener("click", () => {
        if (!blueColorBtn.classList.contains("selected")) {
            document.getElementsByClassName("selected")[0].classList.remove("selected")
            blueColorBtn.classList.add("selected");
            localStorage.setItem('playerColor', "Blue");
        }
    })
    greenColorBtn.addEventListener("click", () => {
        if (!greenColorBtn.classList.contains("selected")) {
            document.getElementsByClassName("selected")[0].classList.remove("selected")
            greenColorBtn.classList.add("selected");
            localStorage.setItem('playerColor', "Green");
        }
    })
    yellowColorBtn.addEventListener("click", () => {
        if (!yellowColorBtn.classList.contains("selected")) {
            document.getElementsByClassName("selected")[0].classList.remove("selected")
            yellowColorBtn.classList.add("selected");
            localStorage.setItem('playerColor', "Yellow");
        }
    })

    const game = new Game();
    new GameView(game, ctx);

    const newGameListener = (e) => {
        switch (e.code) {
                case "KeyR":
                    debugger
                    if (localStorage.getItem('gameover') === 'true') {
                        debugger
                        newGame(ctx)
                    }
                    break
        }
    }

    document.addEventListener('keydown', newGameListener)

    document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case "KeyM":
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
                    break
            }
    })

})


