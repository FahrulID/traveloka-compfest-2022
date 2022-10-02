import {width, height} from '../var.js';
import eventsCenter from '../eventsCenter.js'

var bgm = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'bgm', active: false });
        },

    preload: 
        function ()
        {
            this.load.setPath('img/');

            this.load.image('musicOn', 'musicOn.png');
            this.load.image('musicOff', 'musicOff.png');
            // this.load.audio('bgm', ['img/music.mp3', 'img/music.ogg']);
            this.load.audio('bgm', 'music.mp3');
            this.load.audio('beep', 'Beep.mp3');
            this.load.audio('hop', 'Hop.mp3');
            this.load.audio('pageturn', 'Pageturn.mp3');
        },

    create: 
        function ()
        {
            const t = this

            // BGM
            this._bgm = this.sound.add("bgm")
            this._bgm.loop = true
            this._beep = this.sound.add("beep")
            this._hop = this.sound.add("hop")
            this._pageturn = this.sound.add("pageturn")

            eventsCenter.on('beep', function(data)
            {
                if(data)
                {    
                    this._beep.play()
                }
            }, this)

            eventsCenter.on('hop', function(data)
            {
                if(data)
                {    
                    this._hop.play()
                }
            }, this)

            eventsCenter.on('pageturn', function(data)
            {
                if(data)
                {    
                    this._pageturn.play()
                }
            }, this)

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
                    targets: t._mute,
                    scale: .9,
                    duration: 100
                });
        
            });

            this._mute.on('pointerup', function (pointer) {
                eventsCenter.emit('hop', true)
                t.tweens.add({
                    targets: t._mute,
                    scale: 1,
                    duration: 100
                });

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