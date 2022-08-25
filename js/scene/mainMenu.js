import {width, height} from '../var.js';
import eventsCenter from '../eventsCenter.js';

var mainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'mainMenu', active: true });
        },

    preload: 
        function ()
        {
            this.load.image('play', 'img/play.png');
        },

    create: 
        function ()
        {
            this.awanMove = false

            const t = this;
            var play = this.add.image(width/2, height + 180, 'play');

            t.tweens.add({
                targets: play,
                y: height*2/3,
                ease: Phaser.Math.Easing.Quadratic.InOut,
                duration: 1000
            });

            play.setInteractive();

            play.on('pointerdown', function (pointer) {
                
                t.tweens.add({
                    targets: play,
                    scale: .9,
                    duration: 100
                });
        
            });
        
            play.on('pointerout', function (pointer) {

                t.tweens.add({
                    targets: play,
                    scale: 1,
                    duration: 100
                });
        
            });
        
            play.on('pointerup', function (pointer) {
                this.clearTint();

                play.input.enabled = false;
                play.setVisible(false);

                eventsCenter.emit('scroll-bg', true)
            });
        },
    
    update:
        function()
        {
        }
})

export {mainMenu}; 