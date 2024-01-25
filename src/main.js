// Name: Gyungmin Roh
// Date: 18 JAN 2024

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

// SET US constructions
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

