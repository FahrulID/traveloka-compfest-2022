
import eventsCenter from '../eventsCenter.js'
import {width, height} from '../var.js';

var credit = Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'credit', active: false });
        },

    init: function (data)
        {
            this._data = data
        },

    
    preload: 
        function ()
        {
            this.load.setPath('assets/');
            this.load.image('credit', 'license.png');
        },

    create: 
        function ()
        {    
            const t = this;
            var credit;

            this.createOverlay = () =>
            {
                this._overlay = this.add.rectangle(width/2, height/2, width, height, 0x000000, .7)
                this._overlay.setInteractive()                
    
                this._overlay.on('pointerup', function (pointer) {

                    t.tweens.add({
                        targets: credit,
                        scale: 0.8,
                        duration: 100,
                        ease: Phaser.Math.Easing.Sine.in,
                        onComplete: () => {
                            t.scene.stop("credit");
                        }
                    });
                });
            }

            this.destroyOverlay = () =>
            {
                if(this._overlay != null)
                    this._overlay.destroy(true)
                this._overlay = null
            }

            this.createOverlay()
            
            credit = this.add.image(width/2, height/2, 'credit');
            credit.setScale(0.8)


            this.tweens.add({
                targets: credit,
                scale: 1,
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

export {credit};