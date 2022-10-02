import {width, height} from '../var.js';
import eventsCenter from '../eventsCenter.js';
import {ls} from '../localStorage.js'

var mainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'mainMenu', active: false });
        },

    preload: 
        function ()
        {
            this.load.setPath('img/');
            this.load.image('play', 'play.png');
            this.load.image('tutorial', 'tutorial.png');
            this.load.image('title', 'title.png');
        },

    create: 
        function ()
        {
            this.awanMove = false

            window._mute = false

            const t = this;
            var title = this.add.image(width/2, -200, 'title');
            title.setScale(1.2)
            var play = this.add.image(width/2, height + 180, ((ls.get('tutorial') != null) ? 'play' : 'tutorial'));

            var highScoreRect = this.add.rectangle(0, height - 200, 0, 60, 0x000000, .5)
            highScoreRect.setOrigin(0, 0)

            t.tweens.add({
                targets: play,
                y: height*2/3,
                ease: Phaser.Math.Easing.Quadratic.InOut,
                duration: 1000,
                onComplete: () =>
                {
                    t.tweens.add({
                        targets: highScoreRect,
                        width: width,
                        ease: Phaser.Math.Easing.Quadratic.InOut,
                        duration: 1000,
                        onComplete: () =>
                        {
                            let highScoreText = t.add.text(0, height - 210, "High Score : " + ((ls.get('highscore') != null) ? ls.get('highscore') : 0), { font: '40px roboto, sans-serif', align: 'center', color: 'white'})
                            highScoreText.setStroke("#33333385", 6);
                            Phaser.Display.Align.In.Center(highScoreText, highScoreRect);
                        }
                    });
                }
            });
            t.tweens.add({
                targets: title,
                y: height*1/3,
                ease: Phaser.Math.Easing.Quadratic.InOut,
                duration: 1000,
                onComplete: () =>
                {
                    t.tweens.add({
                        targets: title,
                        angle: -5,
                        ease: Phaser.Math.Easing.Quadratic.InOut,
                        duration: 1000,
                        onComplete: () =>
                        {
                            t.tweens.addCounter({
                                from: -5,
                                to: 5,
                                duration: 2000,
                                repeat: -1,
                                yoyo: true,
                                ease: Phaser.Math.Easing.Quadratic.InOut,
                                onUpdate: function (tween)
                                {
                                    //  tween.getValue = range between 0 and 360
                        
                                    title.setAngle(tween.getValue());
                                }
                            });
                        }
                    });
                }
            });

            if(window._muteButton != null)
            {
                t.tweens.add({
                    targets: window._muteButton,
                    y: 75,
                    duration: 500
                });
            }

            play.setInteractive();

            play.on('pointerdown', function (pointer) {
                
                t.tweens.add({
                    targets: play,
                    scale: .9,
                    duration: 100
                });
        
            });
        
            play.on('pointerup', function (pointer) {

                t.tweens.add({
                    targets: play,
                    scale: 1,
                    duration: 100
                });

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