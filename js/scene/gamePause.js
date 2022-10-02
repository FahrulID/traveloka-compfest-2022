
import eventsCenter from '../eventsCenter.js'
import {width, height} from '../var.js';

var gamePause = Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'gamePause', active: false });
        },

    init: function (data)
        {
            this._data = data
        },

    
    preload: 
        function ()
        {
            this.load.setPath('img/');
            this.load.image('gamePause', 'gamePause.png');
            this.load.image('home', 'home.png');
        },

    create: 
        function ()
        {    
            const t = this;

            this.createOverlay = () =>
            {
                this._overlay = this.add.rectangle(width/2, height/2, width, height, 0x000000, .7)
                this._overlay.setInteractive()

                this._pause = this.add.sprite(width/2, height/2 - 100, 'gamePause')

                
    
                this._overlay.on('pointerup', function (pointer) {
                    t.scene.stop("gamePause").resume('game');
                });
            }

            this.destroyOverlay = () =>
            {
                if(this._overlay != null)
                    this._overlay.destroy(true)
                this._overlay = null
            }

            this.createOverlay()
            var home = this.add.image(width/2, height + 270, 'home');

            home.on('pointerdown', function (pointer) {
                
                t.tweens.add({
                    targets: home,
                    scale: .9,
                    duration: 100
                });
        
            });
        
            home.on('pointerout', function (pointer) {

                t.tweens.add({
                    targets: home,
                    scale: 1,
                    duration: 100
                });
        
            });
        
            home.on('pointerup', function (pointer) {
                this.clearTint();

                t.scene.stop()

                eventsCenter.emit('goToMainMenu', true)
            });

            home.setInteractive()

            this.tweens.add({
                targets: home,
                y: height/2 + 100,
                duration: 200,
                ease: Phaser.Math.Easing.Sine.in,
                onComplete: () => {

                }
            });
        },

    update:
        function() 
        {
            
        }
})

export {gamePause};