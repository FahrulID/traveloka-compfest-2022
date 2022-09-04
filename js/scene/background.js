import {width, height} from '../var.js';
import eventsCenter from '../eventsCenter.js'

var background = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'background', active: true });
        },

    preload: 
        function ()
        {
            this.load.image('sky', 'img/sky.png');
            this.load.image('bg', 'img/bg.png');
            this.load.image('awan1', 'img/awan1.png');
            this.load.image('awan2', 'img/awan2.png');
            this.load.image('awan3', 'img/awan3.png');
        },

    create: 
        function ()
        {

            const t = this;
            this.awanDown = false
            this.awanUp = false

            var sky = this.add.sprite(width/2, 960, 'sky');

            this.awan1 = this.add.sprite(-300, 300, 'awan1');
            this.awan2 = this.add.sprite(-500, 700, 'awan2');
            this.awan3 = this.add.sprite(-700, 900, 'awan3');

            var bg = this.add.sprite(width/2, 960, 'bg');

            eventsCenter.on('scroll-bg', function(data)
            {
                if(data)
                {
                    t.awanDown = true

                    t.tweens.add({
                        targets: bg,
                        y: 320,
                        duration: 2000
                    });

                    t.tweens.add({
                        targets: sky,
                        y: 320,
                        duration: 2000
                    });

                    t.scene.stop("mainMenu");
                    t.scene.launch('game')

                    t.time.addEvent({ 
                        delay: 2000, 
                        callback: function() {
                            t.awanDown = false
                            eventsCenter.emit('scroll-bg', false)
                        }, 
                    });
                }
            }, this)

            eventsCenter.on('exit', function(data, scene)
            {
                if(data)
                {
                    t.awanUp = true

                    t.tweens.add({
                        targets: bg,
                        y: 960,
                        duration: 2000
                    });

                    t.tweens.add({
                        targets: sky,
                        y: 900,
                        duration: 2000
                    });

                    t.time.addEvent({ 
                        delay: 2000, 
                        callback: function() {
                            t.awanUp = false
                            t.scene.stop("game").launch('mainMenu');
                            scene.registry.destroy();
                            eventsCenter.emit('stopGame', true, t)
                            eventsCenter.emit('exit', false)

                            location.reload();
                        }, 
                    });
                }
            }, this)
        },
    
    update:
        function(time, delta)
        {
            if(this.awan1.x >= 1000)
                this.awan1.x = -300
            if(this.awan2.x >= 1300)
                this.awan2.x = -500
            if(this.awan3.x >= 1700)
                this.awan3.x = -700
            this.awan1.x += 3 * delta / 17
            this.awan2.x += 2 * delta / 17
            this.awan3.x += 1 * delta / 17

            if(this.awanDown)
            {
                this.awan1.y -= 5.5 * delta / 17
                this.awan2.y -= 5.5 * delta / 17
                this.awan3.y -= 5.5 * delta / 17
            }

            if(this.awanUp)
            {
                this.awan1.y += 5.5 * delta / 17
                this.awan2.y += 5.5 * delta / 17
                this.awan3.y += 5.5 * delta / 17
            }
        }
})

export {background}; 