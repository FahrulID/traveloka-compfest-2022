import {width, height} from './var.js';

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
            this.load.image('desk', 'img/desk.png');
            this.load.image('bg', 'img/bg.png');
            this.load.image('awan1', 'img/awan1.png');
            this.load.image('awan2', 'img/awan2.png');
            this.load.image('awan3', 'img/awan3.png');
        },

    create: 
        function ()
        {
            const t = this;
            var bg = this.add.sprite(width/2, 960, 'bg');

            var awan1 = this.add.sprite(-300, 300, 'awan1');
            var awan2 = this.add.sprite(-500, 700, 'awan2');

            var desk = this.add.sprite(width/2, 1960, 'desk');
            var play = this.add.image(width/2, height/2, 'play');

            // Awan
            var awanAnim1 = t.tweens.add({
                targets: awan1,
                x: 1000,
                duration: 10000
            });

            var awanAnim2 = t.tweens.add({
                targets: awan2,
                x: 1300,
                duration: 20000
            });

            t.time.addEvent({ 
                delay: 10000, 
                callback: function() {
                    awanAnim1.restart()
                }, 
                callbackScope: this, 
                loop: true
            });

            t.time.addEvent({ 
                delay: 20000, 
                callback: function() {
                    awanAnim2.restart()
                }, 
                callbackScope: this, 
                loop: true
            });



            play.setInteractive();

            play.on('pointerdown', function (pointer) {

                this.setTint(0xff0000);
        
            });
        
            play.on('pointerout', function (pointer) {
        
                this.clearTint();
        
            });
        
            play.on('pointerup', function (pointer) {
                this.clearTint();

                play.input.enabled = false;
                play.setVisible(false);

                // t.add.tween(bg).to( { y: 300 }, 2000, 'Bounce.easeOut', true, 0, -1, true);

                console.log(t)

                t.tweens.add({
                    targets: bg,
                    y: 320,
                    duration: 2000
                });

                t.tweens.add({
                    targets: desk,
                    y: 980,
                    duration: 2000
                });

                t.time.addEvent({ 
                    delay: 2000, 
                    callback: function() {
                        t.scene.stop('mainMenu').launch('game');
                    }, 
                });
            });
        },
})

export {mainMenu}; 