import {width, height} from './var.js';
import {mainMenu} from './mainMenu.js';
import {game} from './game.js';

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: width,
        height: height
    },
    backgroundColor: '#000000',
    scene: [ mainMenu, game ]
};

export {config}; 