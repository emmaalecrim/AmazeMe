//jshint esversion:6 
// removed phaser: building with a local version created too much weight for koji to handle properly
import Koji from '@withkoji/vcc';

// Loading of each of the plugins
import StartPosition from './plugins/StartPosition.js';
import SimplePlatformerControls from './plugins/SimplePlatformerControls.js';
import MazePlugin from './plugins/MazePlugin.js';
//Loading the scenes
import Preloader from './scenes/Preloader.js';
import Booter from './scenes/Booter.js';
import MazeLevel from './scenes/MazeLevel.js';

window.fadeColor = { r: 22, g: 25, b: 30 };

window.maxSize = 640;

let longestSide = Math.max(window.innerWidth, window.innerHeight);
let zoom = 2 * Math.max(1, Math.floor(longestSide / window.maxSize));

var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-game',
    width: window.innerWidth / zoom,
    height: window.innerHeight / zoom,
    backgroundColor: '#000000', // great candidate to be added to VCC. Starting screen color, before Camera is init
    pixelArt: true,
    zoom: zoom,
    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y : 500},
        }
    },
    plugins:{
        scene:[
            {
                key: 'simplePlatformerControls',plugin: SimplePlatformerControls, mapping: 'controls'
            }
        ],
        global: [
            {
                key: 'startPosition', plugin: StartPosition, mapping: 'startPosition', start: true
            },
            {
                key: 'mazePlugin',plugin: MazePlugin, mapping: 'maze', start: true
            }
        ]
    },
    input:{
        gamepad: true
    },
    scene: [
        Booter,
        Preloader,
        MazeLevel
    ]
};


window.game = new Phaser.Game(config);