// James Chen
// Created: 5/3/2024
// Phaser: 3.70.0
//
// Space Shooter
//
// Code by 
// 
// Art assets from Kenny Assets:
// https://kenney.nl/assets/

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    fps: { forceSetTimeOut: true, target: 60 },   // ensure consistent timing across machines
    width: 1000,
    height: 500,
    scene: [Introduction, Ending, Ending2, Gamertime]
}


const game = new Phaser.Game(config);