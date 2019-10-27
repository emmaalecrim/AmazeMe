//jshint esversion:6 
// removed phaser: building with a local version created too much weight for koji to handle properly
import Koji from '@withkoji/vcc';
// Loading of each of the plugins
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin';
import StartPosition from './plugins/StartPosition.js';
import MazePlugin from './plugins/MazePlugin.js';
//Loading the scenes
import Preloader from './scenes/Preloader.js';
import Booter from './scenes/Booter.js';
import MazeLevel from './scenes/MazeLevel.js';
import Menu from './scenes/Menu.js';
import GameOver from './scenes/GameOver';

window.fadeColor = { r: 22, g: 25, b: 30 };

window.maxSize = 920;

let longestSide = Math.max(window.innerWidth, window.innerHeight);
let zoom = 2 * Math.max(1, Math.floor(longestSide / window.maxSize));

var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-game',
    width: window.innerWidth / zoom,
    height: window.innerHeight / zoom,
    mode: Phaser.Scale.FIT,
    backgroundColor: (Koji.config.settings.backgroundColor ||"#d76b6b"), // great candidate to be added to VCC. Starting screen color, before Camera is init
    pixelArt: true,
    zoom: zoom,
    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y : 500},
        }
    },
    plugins:{
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }
        ],
        global: [
            {
                key: 'startPosition',
                plugin: StartPosition, 
                mapping: 'startPosition',
                start: true
            },
            {
                key: 'mazePlugin',
                plugin: MazePlugin,
                mapping: 'maze',
                start: true
            }
        ]
    },
    input:{ 
        queue: true
    },
    scene: [

        Booter,
        Preloader,
        Menu,
        MazeLevel,
        GameOver
        
    ]
};


window.game = new Phaser.Game(config);