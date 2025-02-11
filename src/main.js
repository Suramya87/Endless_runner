// Code Practice: Just Blast em
// Name: Suramya Shakya
// Date: 02/5/2025

// I think this took me about 25 - 30 hours maybe more its kinda hard to tell but for sure its atleast 25



// I wanna say i spent a lot of time making 
// the assets as I think the fire ball looked 
// really cool and it was fun drawing fire in pixel art
// 
// I also think the use of pointerover was something I am proud of for the little parts 
// and teh tutorial, its not teh best but I feel like it was the best I could have done in this time


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
            debug: false,
        },
    },
    scene: [ Load , MenuScene, TutorialScene,Credits, Play, EnemyScene, GameOver ]
  }

let game = new Phaser.Game(config)
let cursors
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let { height, width } = game.config

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT