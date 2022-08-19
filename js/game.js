import {width, height} from './var.js';

var game = Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'game', active: false });
        },

    preload: 
        function ()
        {
            this.load.image('bg', 'img/bg.png');
            this.load.image('desk', 'img/desk.png');
            this.load.image('crate', 'assets/sprites/crate.png');
            this.load.image('awan1', 'assets/sprites/awan1.png');
            this.load.image('awan2', 'assets/sprites/awan2.png');
            this.load.image('awan3', 'assets/sprites/awan3.png');
        },

    create: 
        function ()
        {    
            var bg = this.add.image(width/2, 320, 'bg');
            var desk = this.add.sprite(width/2, 980, 'desk');

            // for (var i = 0; i < 64; i++)
            // {
            //     var x = Phaser.Math.Between(0, width);
            //     var y = Phaser.Math.Between(0, height);
    
            //     var box = this.add.image(x, y, 'crate');
    
            //     //  Make them all input enabled
            //     box.setInteractive();
            // }
    
            this.input.on('gameobjectup', this.clickHandler, this);
        },
        
    clickHandler: 
        function (pointer, box)
        {
            //  Disable our box
            box.input.enabled = false;
            box.setVisible(false);

            //  Dispatch a Scene event
            this.events.emit('addScore');
        },  

})

export {game};