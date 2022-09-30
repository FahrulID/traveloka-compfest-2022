import {width, height} from '../var.js';
import eventsCenter from '../eventsCenter.js'

var tutorial = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'tutorial', active: false });
        },

    preload: 
        function ()
        {
        },

    create: 
        function ()
        {
        },
    
    update:
        function()
        {
        }
})

export {tutorial}; 