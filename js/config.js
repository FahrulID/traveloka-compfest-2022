import {width, height} from './var.js';
import {mainMenu} from './scene/mainMenu.js';
import {game} from './scene/game.js';
import {background} from './scene/background.js';
import {gameOver} from './scene/gameOver.js';
import {gamePause} from './scene/gamePause.js';
import {bgm} from './scene/bgm.js';
import {preloadScene} from './scene/preloadScene.js';
import {tutorial} from './scene/tutorial.js';
import {credit} from './scene/credit.js';
import {gateSheet} from './scene/gateSheet.js';

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
    scene: [ preloadScene, background, mainMenu, bgm, game, credit, gateSheet, tutorial, gamePause, gameOver ]
};

export {config}; 