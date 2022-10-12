import PassengerTutorial from '../gameObject/passengerTutorial.js';
import eventsCenter from '../eventsCenter.js'
import {width, maxPassenger, timer, height} from '../var.js';

var tutorial = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'tutorial', active: false });
        },

    preload: 
        function ()
        {
            this.load.setPath('assets/');

            this.load.image('desk', 'desk.png');
            this.load.image('girl', 'girl.png');
            this.load.image('female', 'female.png');
            this.load.image('grandma', 'grandma.png');
            this.load.image('boy', 'boy.png');
            this.load.image('male', 'male.png');
            this.load.image('grandpa', 'grandpa.png');
            this.load.image('identity', 'identity.png');
            this.load.image('boardingpassleft', 'boardingPassLeft.png');
            this.load.image('boardingpassright', 'boardingPassRight.png');
            this.load.image('passengersRight', 'passengersRight.png');
            this.load.image('passengersWrong', 'passengersWrong.png');
            this.load.image('exit', 'exit.png');
            this.load.image('clock', 'clock.png');
            this.load.image('scanner', 'scanner.png');
            this.load.image('next', 'next.png');

            this.load.image('overlayAvatar', 'overlayAvatar.png');
            this.load.image('overlayBarcode', 'overlayBarcode.png');
            this.load.image('overlayBenar', 'overlayBenar.png');
            this.load.image('overlayExit', 'overlayExit.png');
            this.load.image('overlayKTP', 'overlayKTP.png');
            this.load.image('overlayMute', 'overlayMute.png');
            this.load.image('overlayNamaKTP', 'overlayNamaKTP.png');
            this.load.image('overlayNamaPass', 'overlayNamaPass.png');
            this.load.image('overlayPass', 'overlayPass.png');
            this.load.image('overlaySalah', 'overlaySalah.png');
            this.load.image('overlayTimer', 'overlayTimer.png');
            this.load.image('overlayNPC', 'overlayNPC.png');
            this.load.image('overlayReject', 'overlayReject.png');
        },

        create: 
        function ()
        {
            const t = this;
    
            t._time = 0;
            t._timer = timer
            t._gameover = false
            t._maxPassenger = maxPassenger;
            t._currentPassenger = 0
            t._passengers = []
    
            t._canNext = true
            t._tutorialStep = 0
    
            t.started = false;
    
            for(var x = 0; x < t._maxPassenger; x++)
            {
                let passenger = new PassengerTutorial(t)
                t._passengers.push(passenger)
                t._passengers[x].hide()
            }
    
            var desk = t.add.sprite(width/2, 1960, 'desk');
    
            t.showScore = () =>
            {
                t._clock = t.add.sprite(width/2, -175, "clock")
                t._passengersRight = t.add.sprite(125, -175, "passengersRight")
                t._passengersWrong = t.add.sprite(375, -175, "passengersWrong")
                t._exit = t.add.sprite(width - 75, -175, "exit")
                t._exit.setInteractive()
    
                t._transparentOverlay = t.add.rectangle(width/2, height/2, width*2, height*2, 0xffffff, 0x00);
                t._transparentOverlay.setInteractive()
    
                t._exit.on('pointerdown', function (pointer) {
                    
                    t.tweens.add({
                        targets: t._exit,
                        scale: .9,
                        duration: 100
                    });
            
                });
    
                t._exit.on('pointerout', function (pointer) {
                    
                    t.tweens.add({
                        targets: t._exit,
                        scale: 1,
                        duration: 100
                    });
            
                });
    
                t._exit.on('pointerup', function (pointer) {
    
                    t.tweens.add({
                        targets: t._exit,
                        scale: 1,
                        duration: 100
                    });
                    
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
    
                        if(t._passengersRightCounter != null)
                            t._passengersRightCounter.destroy(true)
                        if(t._passengersWrongCounter != null)
                            t._passengersWrongCounter.destroy(true)
                        if(t._clockCounter != null)
                            t._clockCounter.destroy(true)
                    
                        t.tweens.add({
                            targets: [ t._passengersRight, t._passengersWrong, t._exit, t._clock ],
                            y: -175,
                            ease: Phaser.Math.Easing.Sine.in,
                            duration: 500,
                        });
                    
                        t.tweens.add({
                            targets: t._next,
                            x: width + 175,
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
                        eventsCenter.emit('exit', true, t)
                    }
                }, t)
                
                t.tweens.add({
                    targets: [ t._passengersRight, t._passengersWrong, t._exit, window._muteButton ],
                    y: 75,
                    ease: Phaser.Math.Easing.Sine.in,
                    duration: 500,
                    onComplete: () => {
                        t._passengersRightCounter = t.add.text(105, 50, '0', { font: '40px roboto, sans-serif', align: 'center'});
                        t._passengersRightCounter.setStroke("#33333385", 6);
                        t._passengersWrongCounter = t.add.text(355, 50, '0', { font: '40px roboto, sans-serif', align: 'center'});
                        t._passengersWrongCounter.setStroke("#33333385", 6);
    
                        Phaser.Display.Align.In.Center(t._passengersRightCounter, t._passengersRight);
                        Phaser.Display.Align.In.Center(t._passengersWrongCounter, t._passengersWrong);
                    }
                });
                
                t.tweens.add({
                    targets: t._clock,
                    y: 125,
                    ease: Phaser.Math.Easing.Sine.in,
                    duration: 500,
                    onComplete: () => {
                        t._clockCounter = t.add.text(105, 125, '0 0 : 0 0', { font: '50px roboto, sans-serif', align: 'center'});
                        t._clockCounter.setStroke("#33333385", 6);
    
                        Phaser.Display.Align.In.Center(t._clockCounter, t._clock);
                        t._clockCounter.y = 215
                        t.started = true
    
                        let minutes = String(Math.floor(t._timer / 60000)).padStart(2, '0').split('')
                        let seconds = String(Math.floor(t._timer % 60000 / 1000)).padStart(2, '0').split('')
                        t._clockCounter.text = minutes[0] + ' ' + minutes[1] + ' : ' + seconds[0] + ' ' + seconds[1];
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
    
                    t.showScore()
    
                    t.time.addEvent({
                        delay: 2000,
                        callback: () => {
    
                            t._transparentOverlay = t.add.rectangle(0, 0, width*2, height*2, 0xffffff, 0x00);
                            t._transparentOverlay.setInteractive()
    
                            t._overlayAvatar = t.add.sprite(width/2, height/2, "overlayAvatar");
                            t._overlayAvatar.setScale(1.4)
                            t._overlayAvatar.alpha = 0
                            t._overlayBarcode = t.add.sprite(width/2, height/2, "overlayBarcode");
                            t._overlayBarcode.setScale(1.4)
                            t._overlayBarcode.alpha = 0
                            t._overlayBenar = t.add.sprite(width/2 + 3, height/2 + 5, "overlayBenar");
                            t._overlayBenar.setScale(1.4)
                            t._overlayBenar.alpha = 0
                            t._overlayExit = t.add.sprite(width/2 - 5, height/2 + 5, "overlayExit");
                            t._overlayExit.setScale(1.4)
                            t._overlayExit.alpha = 0
                            t._overlayKTP = t.add.sprite(width/2, height/2 - 9, "overlayKTP");
                            t._overlayKTP.setScale(1.4)
                            t._overlayKTP.alpha = 0
                            t._overlayMute = t.add.sprite(width/2 - 5, height/2 + 5, "overlayMute");
                            t._overlayMute.setScale(1.4)
                            t._overlayMute.alpha = 0
                            t._overlayNamaKTP = t.add.sprite(width/2, height/2, "overlayNamaKTP");
                            t._overlayNamaKTP.setScale(1.4)
                            t._overlayNamaKTP.alpha = 0
                            t._overlayNamaPass = t.add.sprite(width/2, height/2, "overlayNamaPass");
                            t._overlayNamaPass.setScale(1.4)
                            t._overlayNamaPass.alpha = 0
                            t._overlayPass = t.add.sprite(width/2, height/2 - 9, "overlayPass");
                            t._overlayPass.setScale(1.4)
                            t._overlayPass.alpha = 0
                            t._overlaySalah = t.add.sprite(width/2 + 3, height/2 + 5, "overlaySalah");
                            t._overlaySalah.setScale(1.4)
                            t._overlaySalah.alpha = 0
                            t._overlayTimer = t.add.sprite(width/2 - 2, height/2 + 2, "overlayTimer");
                            t._overlayTimer.setScale(1.4)
                            t._overlayTimer.alpha = 0
                            t._overlayNPC = t.add.sprite(width/2, height/2, "overlayNPC");
                            t._overlayNPC.setScale(1.4)
                            t._overlayNPC.alpha = 0
                            t._overlayReject = t.add.sprite(width/2, height/2, "overlayReject");
                            t._overlayReject.setScale(1.4)
                            t._overlayReject.alpha = 0
    
                            t._order = [
                                t._overlayNPC,
                                t._overlayKTP,
                                t._overlayAvatar,
                                t._overlayNamaKTP,
                                t._overlayPass,
                                t._overlayNamaPass,
                                t._overlayBarcode,
                                t._overlayReject,
                                t._overlayBenar,
                                t._overlaySalah,
                                t._overlayMute,
                                t._overlayTimer,
                                t._overlayExit
                            ]
    
                            t._next = t.add.sprite(width + 175, height/2 - 75, "next")
                            t._next.setInteractive()
            
                            t._next.on('pointerdown', function (pointer) {
                                
                                t.tweens.add({
                                    targets: t._next,
                                    scale: .9,
                                    duration: 100
                                });
                        
                            });
            
                            t._next.on('pointerout', function (pointer) {
                                
                                t.tweens.add({
                                    targets: t._next,
                                    scale: 1,
                                    duration: 100
                                });
                        
                            });
                
                            t._next.on('pointerup', function (pointer) {
                                eventsCenter.emit('hop', true)
                
                                t.tweens.add({
                                    targets: t._next,
                                    scale: 1,
                                    duration: 100
                                });
                                
                                if(t._canNext)
                                {
                                    t._canNext = false
                                    if(t._tutorialStep == 1)
                                    {
                                        t._passengers[0].showIdentityModal()

                                        t._order[t._tutorialStep].alpha = 0
                                        t.time.addEvent({
                                            delay: 250,
                                            callback: () => {
                                                t._overlayAvatar.setDepth(1);
                                                t._overlayNamaKTP.setDepth(1);

                                                t._tutorialStep++
                                                t._order[t._tutorialStep].alpha = 1
    
                                                t.time.addEvent({
                                                    delay: 100,
                                                    callback: () => {
                                                        t._next.setDepth(1);
                                                        t._canNext = true
                                                    }
                                                })
                                            }
                                        })
                                    }
                                    if(t._tutorialStep == 3)
                                    {
                                        t._passengers[0].hideIdentityModal()
                                        t._order[t._tutorialStep].alpha = 0

                                        t.time.addEvent({
                                            delay: 250,
                                            callback: () => {
                                                t._tutorialStep++
                                                t._order[t._tutorialStep].alpha = 1
    
                                                t.time.addEvent({
                                                    delay: 100,
                                                    callback: () => {
                                                        t._next.setDepth(1);
                                                        t._canNext = true
                                                    }
                                                })
                                            }
                                        })

                                    }
                                    if(t._tutorialStep == 4)
                                    {
                                        t._passengers[0].showBoardingPassModal()

                                        t._order[t._tutorialStep].alpha = 0
                                        t.time.addEvent({
                                            delay: 250,
                                            callback: () => {
                                                t._overlayNamaPass.setDepth(1);
                                                t._overlayBarcode.setDepth(1);

                                                t._tutorialStep++
                                                t._order[t._tutorialStep].alpha = 1
    
                                                t.time.addEvent({
                                                    delay: 100,
                                                    callback: () => {
                                                        t._next.setDepth(1);
                                                        t._canNext = true
                                                    }
                                                })
                                            }
                                        })
                                    }
                                    if(t._tutorialStep == 6)
                                    {
                                        t._passengers[0].scan(225, height/2 + 150)

                                        t._order[t._tutorialStep].alpha = 0
                                        t.time.addEvent({
                                            delay: 6200,
                                            callback: () => {
                                                t._overlayReject.setDepth(1);

                                                t._tutorialStep++
                                                t._order[t._tutorialStep].alpha = 1
    
                                                t.time.addEvent({
                                                    delay: 100,
                                                    callback: () => {
                                                        t._next.setDepth(1);
                                                        t._canNext = true
                                                    }
                                                })
                                            }
                                        })
                                    }
                                    if(t._tutorialStep == 7)
                                    {
                                        t._passengers[1].identitySlideOut()
                                        t._passengers[1].boardingPassSlideOut()
                                        t._passengers[1]._reject.destroy(true)
                
                                        
                                        t._passengers[1]._scene.time.addEvent({ 
                                            delay: 200, 
                                            callback: function() {
                                                t._passengers[1].getOut()
                                            }, 
                                        });

                                        t._order[t._tutorialStep].alpha = 0
                                        t.time.addEvent({
                                            delay: 3950,
                                            callback: () => {

                                                t._overlayBenar.setDepth(1);
                                                t._overlaySalah.setDepth(1);
                                                t._overlayMute.setDepth(1);
                                                t._overlayTimer.setDepth(1);
                                                t._overlayExit.setDepth(1);

                                                t._tutorialStep++
                                                t._order[t._tutorialStep].alpha = 1
                                                t.time.addEvent({
                                                    delay: 100,
                                                    callback: () => {
                                                        t._next.setDepth(1);
                                                        t._canNext = true
                                                    }
                                                })
                                            }
                                        })
                                    }
                                    if(t._tutorialStep == 12)
                                    {
                                        t._next.setInteractive(false)
                                        eventsCenter.emit('goToMainMenu', true)
                                    }

    
                                    if(t._tutorialStep <= 12 && t._tutorialStep != 1 && t._tutorialStep != 3 && t._tutorialStep != 4 && t._tutorialStep != 6 && t._tutorialStep != 7)
                                    {
                                        t._order[t._tutorialStep].alpha = 0
                                        t._tutorialStep++
                                        t._order[t._tutorialStep].alpha = 1
    
                                        t._next.setDepth(1);
                                        t._canNext = true
                                    }
                                }
                            });
    
                            t.tweens.add({
                                targets: t._next,
                                x: width - 95,
                                ease: Phaser.Math.Easing.Sine.in,
                                duration: 500,
                                onComplete: () => {
                                    
                                }
                            });
    
                            t._order[t._tutorialStep].alpha = 1
                        }
                    })
                }
            });
    
            eventsCenter.on('gameOver', function(data)
            {
                t._gameover = true
            }, t)
    
            eventsCenter.on('passengerPoint', function(right)
            {
                if(!t._gameover)
                {
                    if(right)
                    {
                        if(t._passengersRightCounter != null)
                            t._passengersRightCounter.text = parseInt(t._passengersRightCounter.text) + 1
                    } else {
                        if(t._passengersWrongCounter != null)
                            t._passengersWrongCounter.text = parseInt(t._passengersWrongCounter.text) + 1
                    }
    
                    if(t._passengers[t._currentPassenger] != null)
                        t._passengers[t._currentPassenger].destroy(true)
                    t._currentPassenger++
                    t._passengers[t._currentPassenger].show()
                    t._passengers[t._currentPassenger].getIn()
                }
    
            }, t)
    
            eventsCenter.on('stopGame', function(data, scene)
            {
                if(data)
                {
                    if(t.registry != null)
                        t.registry.destroy();
                    t.events.off();
    
                    eventsCenter.emit('stopGame', false, scene)
                }
            }, t)
    
            eventsCenter.emit('startGame', true, t)
        },
    
    update:
        function()
        {
        }
})

export {tutorial}; 