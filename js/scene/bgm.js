import {width, height} from '../var.js';
import eventsCenter from '../eventsCenter.js'

var bgm = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'bgm', active: true });
        },

    preload: 
        function ()
        {
            this.load.image('musicOn', 'img/musicOn.png');
            this.load.image('musicOff', 'img/musicOff.png');
            this.load.audio('bgm', ['img/music.mp3', 'img/music.ogg']);
        },

    create: 
        function ()
        {
            const t = this

            // BGM
            this._bgm = this.sound.add("bgm")
            this._bgm.loop = true
            
            console.log(this._bgm)

            eventsCenter.on('startGame', function(data, scene)
            {
                if(data)
                {
                    if(!window._mute)
                        this._bgm.play()

                    eventsCenter.emit('startGame', false, scene)
                }
            }, this)

            eventsCenter.on('stopGame', function(data, scene)
            {
                if(data)
                {
                    t._bgm.stop()

                    t.tweens.add({
                        targets: t._mute,
                        y: -175,
                        duration: 500
                    });

                    eventsCenter.emit('stopGame', false, scene)
                }
            }, this)

            // Mute Button
            this._isMute = false
            this._mute = this.add.sprite(width - 175, -175, "musicOff")
            this._mute.setInteractive()
                        
            t.tweens.add({
                targets: this._mute,
                y: 75,
                duration: 500
            });

            this._mute.on('pointerdown', function (pointer) {
                
                t.tweens.add({
                    targets: t._exit,
                    scale: .9,
                    duration: 100
                });
        
            });
        
            this._mute.on('pointerout', function (pointer) {

                t.tweens.add({
                    targets: t._exit,
                    scale: 1,
                    duration: 100
                });
        
            });

            this._mute.on('pointerup', function (pointer) {
                if(!this._isMute)
                {
                    t._mute.setTexture("musicOn")
                    window.mute = true
                    t._bgm.mute = true
                }
                if(this._isMute)
                {
                    t._mute.setTexture("musicOff")
                    window.mute = false
                    t._bgm.mute = false
                }
                this._isMute = !this._isMute
            });

            eventsCenter.on('scroll-bg', function(data)
            {
                if(data)
                {
                    t.tweens.add({
                        targets: this._mute,
                        y: -175,
                        duration: 500
                    });
                    window._muteButton = this._mute
                }
            }, this)
        },
    
    update:
        function()
        {
        }
})

export {bgm}; 