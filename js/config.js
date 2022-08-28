import {width, height} from './var.js';
import {mainMenu} from './scene/mainMenu.js';
import {game} from './scene/game.js';
import {background} from './scene/background.js';

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: width,
        height: height
    },
    render: {
        batchSize: 1024,
        maxTextures: 15
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    backgroundColor: '#000000',
    scene: [ background, mainMenu, game ]
};

export {config}; 