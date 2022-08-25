import Passenger from '../gameObject/passenger.js';
import eventsCenter from '../eventsCenter.js'
import {width, height} from '../var.js';

var game = Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'game', active: false });
        },

    init: function (data)
        {
            this._data = data
        },

    preload: 
        function ()
        {
            this.load.image('desk', 'img/desk.png');
            this.load.image('boy', 'img/girl.png');
            this.load.image('identity', 'img/ktp.png');
            this.load.image('boardingpass', 'img/ktp.png');
            this.load.image('passengersRight', 'img/passengersRight.png');
            this.load.image('passengersWrong', 'img/passengersWrong.png');
            this.load.image('exit', 'img/exit.png');
            this.load.image('clock', 'img/clock.png');
        },

    create: 
        function ()
        {    
            const t = this;

            this._time = 0;
            this._timer = 60 * 1000; // 1 menit

            this.started = false;

            let passenger = new Passenger(this)
            passenger.hide()

            var desk = this.add.sprite(width/2, 1960, 'desk');

            this.showScore = () =>
            {
                this._clock = this.add.sprite(width/2, -175, "clock")
                this._passengersRight = this.add.sprite(125, -175, "passengersRight")
                this._passengersWrong = this.add.sprite(375, -175, "passengersWrong")
                this._exit = this.add.sprite(width - 75, -175, "exit")
                this._exit.setInteractive()

                this._exit.on('pointerdown', function (pointer) {
                    
                    t.tweens.add({
                        targets: t._exit,
                        scale: .9,
                        duration: 100
                    });
            
                });
            
                this._exit.on('pointerout', function (pointer) {
    
                    t.tweens.add({
                        targets: t._exit,
                        scale: 1,
                        duration: 100
                    });
            
                });
    
                this._exit.on('pointerup', function (pointer) {
                    this.clearTint();

                    t.started = false

                    passenger.hide()

                    t._passengersRightCounter.destroy(true)
                    t._passengersWrongCounter.destroy(true)
                    t._clockCounter.destroy(true)
                
                    t.tweens.add({
                        targets: [ t._passengersRight, t._passengersWrong, t._exit, t._clock ],
                        y: -175,
                        ease: Phaser.Math.Easing.Sine.in,
                        duration: 500,
                    });
                    
                    t.tweens.add({
                        targets: desk,
                        y: 1960,
                        duration: 2000,
                        onComplete: () => {

                        }
                    });
                    eventsCenter.emit('exit', true)
                });
                
                this.tweens.add({
                    targets: [ this._passengersRight, this._passengersWrong, this._exit ],
                    y: 75,
                    ease: Phaser.Math.Easing.Sine.in,
                    duration: 500,
                    onComplete: () => {
                        t._passengersRightCounter = this.add.text(105, 50, '0', { font: '40px roboto, sans-serif', align: 'center'});
                        t._passengersRightCounter.setStroke("#33333385", 6);
                        t._passengersWrongCounter = this.add.text(355, 50, '0', { font: '40px roboto, sans-serif', align: 'center'});
                        t._passengersWrongCounter.setStroke("#33333385", 6);

                        Phaser.Display.Align.In.Center(t._passengersRightCounter, t._passengersRight);
                        Phaser.Display.Align.In.Center(t._passengersWrongCounter, t._passengersWrong);
                    }
                });
                
                this.tweens.add({
                    targets: this._clock,
                    y: 125,
                    ease: Phaser.Math.Easing.Sine.in,
                    duration: 500,
                    onComplete: () => {
                        t._clockCounter = this.add.text(105, 125, '0 0 : 0 0', { font: '50px roboto, sans-serif', align: 'center'});
                        t._clockCounter.setStroke("#33333385", 6);

                        Phaser.Display.Align.In.Center(t._clockCounter, t._clock);
                        t._clockCounter.y = 215
                        this.started = true
                    }
                });
            }

            t.tweens.add({
                targets: desk,
                y: 1000,
                duration: 2000,
                onComplete: () => {
                    passenger.show()
                    passenger.getIn()

                    this.showScore()
                }
            });
        },

    update:
        function(time, delta) 
        {
            if(this.started)
            {
                this._time += delta;
                while (this._time > 1000) {
                    this._time -= 1000;
                    this._timer -= 1000;
                }

                // Show clock
                let minutes = String(Math.floor(this._timer / 60000)).padStart(2, '0').split('')
                let seconds = String(Math.floor(this._timer % 60000 / 1000)).padStart(2, '0').split('')
                this._clockCounter.text = minutes[0] + ' ' + minutes[1] + ' : ' + seconds[0] + ' ' + seconds[1];

                if(this._timer <= 0)
                {
                    this.started = false;
                }
            }
        }
})

export {game};