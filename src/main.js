// Name: Gyungmin Roh
// Date: 25 JAN 2024
// Rocket Patrol: Asian mode
// Approximate time: 10hrs
// List of modifications
// Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)

// Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)

// Implement mouse control for player movement and left mouse click to fire (5)

// Display the time remaining (in seconds) on the screen (3)

// Randomize each spaceship's movement direction at the start of each play (1)

// Implement the speed increase that happens after 30 seconds in the original game (1)

"use strict"


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play, UI ]
}

let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

// SET US constructions
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let highScore = 0;


