import Passenger from '../gameObject/passenger.js';
import eventsCenter from '../eventsCenter.js'
import {width, maxPassenger, timer} from '../var.js';

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
            this.load.image('girl', 'img/girl.png');
            this.load.image('female', 'img/female.png');
            this.load.image('grandma', 'img/grandma.png');
            this.load.image('boy', 'img/boy.png');
            this.load.image('male', 'img/male.png');
            this.load.image('grandpa', 'img/grandpa.png');
            this.load.image('identity', 'img/identity.png');
            this.load.image('boardingpassleft', 'img/boardingPassLeft.png');
            this.load.image('boardingpassright', 'img/boardingPassRight.png');
            this.load.image('passengersRight', 'img/passengersRight.png');
            this.load.image('passengersWrong', 'img/passengersWrong.png');
            this.load.image('exit', 'img/exit.png');
            this.load.image('clock', 'img/clock.png');
            this.load.image('scanner', 'img/scanner.png');

            this.load.audio('bgm', ['img/music.mp3', 'img/music.ogg']);
        },

    create: 
        function ()
        {    
            const t = this;

            this._time = 0;
            this._timer = timer
            this._gameover = false
            this._maxPassenger = maxPassenger;
            this._currentPassenger = 0
            this._passengers = []

            this._bgm = this.sound.add("bgm")
            this._bgm.loop = true

            if(!window._mute)
                this._bgm.play()

            console.log(this._bgm)

            this.started = false;

            for(var x = 0; x < this._maxPassenger; x++)
            {
                let passenger = new Passenger(this)
                this._passengers.push(passenger)
                this._passengers[x].hide()
            }

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
                    t.scene.pause('game').launch('gamePause')
                });

                eventsCenter.on('goToMainMenu', function(data)
                {
                    if(data)
                    {    
                        t._gameover = true;
                        t.started = false

                        t.scene.resume();

                        t._passengers.forEach((passenger) => {
                            passenger.hide()
                        })
    
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
                        
                        eventsCenter.emit('goToMainMenu', false)
                        eventsCenter.emit('exit', true, this)
                    }
                }, this)
                
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
                    t._passengers[t._currentPassenger].show()
                    t._passengers[t._currentPassenger].getIn()

                    this.showScore()
                }
            });

            eventsCenter.on('gameOver', function(data)
            {
                this._gameover = true
            }, this)

            eventsCenter.on('passengerPoint', function(right)
            {
                if(!this._gameover)
                {
                    if(right)
                    {
                        if(t._passengersRightCounter != null)
                            t._passengersRightCounter.text = parseInt(t._passengersRightCounter.text) + 1
                    } else {
                        if(t._passengersWrongCounter != null)
                            t._passengersWrongCounter.text = parseInt(t._passengersWrongCounter.text) + 1
                    }
    
                    t._passengers[t._currentPassenger].destroy(true)
                    t._currentPassenger++
                    t._passengers[t._currentPassenger].show()
                    t._passengers[t._currentPassenger].getIn()
                }

            }, this)

            eventsCenter.on('stopGame', function(data, scene)
            {
                if(data)
                {
                    t._bgm.stop()
                    t.registry.destroy();
                    t.events.off();

                    eventsCenter.emit('stopGame', false, scene)
                }
            }, this)
        },

    update:
        function(time, delta) 
        {
            const t = this
            if(!this._gameover)
            {
                if(this._timer <= 0)
                {
                    //GameOver
                    this._gameover = true;
                    this.scene.pause();
                    this.scene.launch('gameOver', {
                        score: (parseInt(t._passengersRightCounter.text) * 10) - (parseInt(t._passengersWrongCounter.text) * 10)
                    });
                }
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
        }
})

export {game};