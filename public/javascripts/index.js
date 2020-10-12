const axios = require('axios');
const MovingObject = require("./moving_object.js");
const Player = require("./player.js");

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext('2d');

    // START OF TESTING
    window.ctx = ctx;
    window.MovingObject = MovingObject;
    window.Player = Player;
    // END OF TESTING
})
