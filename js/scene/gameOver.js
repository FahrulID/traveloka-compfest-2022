import eventsCenter from '../eventsCenter.js'
import {ls} from '../localStorage.js'
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
            this._overlay = null
        },

    
    preload: 
        function ()
        {
            this.load.image('gameOverBest', 'img/gameOverBest.png');
            this.load.image('gameOverGood', 'img/gameOverGood.png');
            this.load.image('gameOverBad', 'img/gameOverBad.png');
            this.load.image('home', 'img/home.png');
        },

    create: 
        function ()
        {    
            const t = this;

            this.createOverlay = () =>
            {
                this._overlay = this.add.rectangle(width/2, height/2, width, height, 0x000000, .7)
                this._overlay.setInteractive()

                this._overlay.on('pointerup', function (pointer) {
                });
            }

            this.destroyOverlay = () =>
            {
                if(this._overlay != null)
                    this._overlay.destroy(true)
                this._overlay = null
            }

            this.createOverlay()

            let gameOverState = (parseInt(this._data.score) <= 50) ? 'gameOverBad' : (parseInt(this._data.score) <= 100) ? 'gameOverGood' : 'gameOverBest';

            var gameOver = this.add.image(width/2, -100, gameOverState);
            var home = this.add.image(width/2, height + 100 + 270, 'home');

            if(ls.get('highscore') != null && parseInt(this._data.score) > parseInt(ls.get('highscore')))
            {
                ls.set('highscore', this._data.score)
            } else if(ls.get('highscore') == null) {
                ls.set('highscore', this._data.score)
            }
            
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
                y: height/2 + 240,
                duration: 200,
                ease: Phaser.Math.Easing.Sine.in,
                onComplete: () => {

                }
            });
            
            eventsCenter.emit('gameOver', true)

            this.tweens.add({
                targets: gameOver,
                y: height/2-180,
                duration: 200,
                ease: Phaser.Math.Easing.Sine.in,
                onComplete: () => {
                    t._score = t.add.text(225, 326, t._data.score, { font: '50px roboto, sans-serif', align: 'left', color: '#2f2f40'});
                    t._highscore = t.add.text(350, 416, (ls.get('highscore') != null) ? ls.get('highscore') : 0, { font: '50px roboto, sans-serif', align: 'left', color: '#2f2f40'});
                }
            });
        },

    update:
        function() 
        {
            
        }
})

export {gameOver};