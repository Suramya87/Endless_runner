// Code Practice: Making a Scene
// Name: Suramya Shakya
// Date: 02/5/2025


"use strict"


let config = {
    type: Phaser.AUTO,
    // width: 640,
    // height: 480,
    width: 1280,
    height: 960,
    render:{
      pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade:{
            debug: true,
        },
    },
    scene: [ Load , Play, EnemyScene, GameOver ]
  }

let game = new Phaser.Game(config)
let cursors
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let { height, width } = game.config

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT