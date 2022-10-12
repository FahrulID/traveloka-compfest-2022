import {width, height} from '../var.js';
import eventsCenter from '../eventsCenter.js'

var gateSheet = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'gateSheet', active: false });
        },

    preload: 
        function ()
        {
            this.load.setPath('assets/');

            this.load.image('gatePura', 'gatePura.png');
            this.load.image('gateMonas', 'gateMonas.png');
            this.load.image('gateGadang', 'gateGadang.png');
            this.load.image('gateSheet', 'gateSheet.png');
            
        },

    create: 
        function ()
        {
            const t = this

            this.createOverlay = () =>
            {
                this._overlay = this.add.rectangle(width/2, height/2, width, height, 0x000000, .7)
                this._overlay.setInteractive()                
    
                t.input.on('pointerup', function (pointer) {
                    t.scene.stop("gateSheet");
                });
            }

            this.destroyOverlay = () =>
            {
                if(this._overlay != null)
                    this._overlay.destroy(true)
                this._overlay = null
            }

            this.createOverlay()

            this._sheetBg = this.add.image(width/2, height/2, 'gateSheet');
            var img = []

            this._sheet = this.add.container(0, 0)
            this._sheet.setScale(.9)

            window.gate.forEach((v, i) => {
                img[i] = this.add.image(width/2, height/2 - 250 + ( i * 275 ), v)
            })

            this._sheet.add([this._sheetBg, img[0], img[1], img[2]])

            
            t.tweens.add({
                targets: t._sheet,
                scale: 1,
                duration: 100
            });

        },
    
    update:
        function()
        {
        }
})

export {gateSheet}; 