
import eventsCenter from '../eventsCenter.js'
import {width, height} from '../var.js';

var gameOver = Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'gameOver', active: false });
        },

    init: function (data)
        {
            this._data = data
        },

    
    preload: 
        function ()
        {
            
        },

    create: 
        function ()
        {    
            const t = this;
        },

    update:
        function() 
        {
            
        }
})

export {gameOver};