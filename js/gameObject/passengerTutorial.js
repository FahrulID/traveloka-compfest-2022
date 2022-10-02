import {width, height} from '../var.js';
import eventsCenter from '../eventsCenter.js'

class PassengerTutorial extends Phaser.GameObjects.Sprite
{
    _identityName;
    _boardingPassName;

    _identityAvatar;
    _avatar;

    _destination;

    // Parent scene
    _scene;

    // Desk
    _identity;
    _boardingPass;

    // Modal Groups
    _identityModal;
    _boardingPassModal;

    _overlay;

    _reject


	constructor(scene)
	{
		super(scene, -200, 875, 'Passenger')

        this._scene = scene;
        
        this.randomizePassenger();

        this._reject = this._scene.add.rectangle(385, 1010, 150, 100, 0xffffff, 0x00)
        this._reject.setAlpha(0)

        this.setTexture(this._avatar);

        this.scene.add.existing(this);

        eventsCenter.on('goToMainMenu', function(data)
        {
            if(data)
            {    
                if(this._identityModal != null)
                    this.hideIdentityModal()
                if(this._boardingPassModal != null)
                    this.hideBoardingPassModal()
                if(this._reject != null)
                    this._reject.destroy(true)
            }

            if(this._scan != null)
                this._scan.stop()
            
            if(this._boardingPassAnim != null)
                this._boardingPassAnim.stop()
        }, this)
	}

    randomizePassenger()
    {
        const avatarMale = [
            "boy",
            "male",
            "grandpa"
        ]
        const avatarFemale = [
            "girl",
            "female",
            "grandma"
        ]

        // random name
        const firstNameMale = [
            "Rangga",
            "Kevin",
            "Agus",
            "Budi",
            "Agung",
            "Dimas",
            "Bagus",
            "Muhammad",
            "Ahmad",
            "Andi",
            "Edwin",
        ]
        const lastNameMale = [
            "Putra",
            "Santoso",
            "Utama",
            "Wijaya",
            "Setiawan",
            "Hidayat",
            "Saputra",
            "Kurniawan",
            "Susanto",
            "Arifin",
            "Widodo",
            "Mukhlason"
        ]

        const firstNameFemale = [
            "Isyana",
            "Ayu",
            "Sri",
            "Dewi",
            "Siti",
            "Nur",
            "Maria",
            "Dian",
            "Ratna",
            "Fitri"
        ]

        const lastNameFemale = [
            "Lestari",
            "Maharani",
            "Putri",
            "Agatha",
            "Susanti",
            "Wati",
            "Sari",
            "Wulandari",
            "Yanti",
            "Suryani"
        ]

        let name;

        // 50% male or female
        if(Math.random() < 0.5)
        {
            // Male
            this._avatar = avatarMale[Math.floor(Math.random()*avatarMale.length)];
            name = firstNameMale[Math.floor(Math.random()*firstNameMale.length)] + " " + lastNameMale[Math.floor(Math.random()*lastNameMale.length)];
        }
        else 
        {
            // Female
            this._avatar = avatarFemale[Math.floor(Math.random()*avatarFemale.length)];
            name = firstNameFemale[Math.floor(Math.random()*firstNameFemale.length)] + " " + lastNameFemale[Math.floor(Math.random()*lastNameFemale.length)];
        }

        // 75% same photo
        if(Math.random() < 0.75)
            this._identityAvatar = this._avatar
        else 
            this._identityAvatar = (Math.random() < 0.5) ? avatarMale[Math.floor(Math.random()*avatarMale.length)] : avatarFemale[Math.floor(Math.random()*avatarFemale.length)];

        this._identityName = name

        // 75% same name
        if(Math.random() < 0.75)
            this._boardingPassName = name
        else {
            this._boardingPassName = (Math.random() < 0.5) ? firstNameMale[Math.floor(Math.random()*firstNameMale.length)] + " " + lastNameMale[Math.floor(Math.random()*lastNameMale.length)] : name = firstNameFemale[Math.floor(Math.random()*firstNameFemale.length)] + " " + lastNameFemale[Math.floor(Math.random()*lastNameFemale.length)];
        }
        // random destination
    }

    show()
    {
        this.visible = true
        if(this._identity != null)
            this._identity.visible = true
        if(this._boardingPass != null)
            this._boardingPass.visible = true
    }

    hide()
    {
        this.visible = false
        if(this._identity != null)
            this._identity.visible = false
        if(this._boardingPass != null)
            this._boardingPass.visible = false
    }

    accepted()
    {
        const t = this
        t.identitySlideOut()
        t.boardingPassSlideOut()
        
        t._scene.time.addEvent({ 
            delay: 200, 
            callback: function() {
                t._scene.tweens.add({
                    targets: t,
                    x: width + 200,
                    ease: Phaser.Math.Easing.Sine.in,
                    duration: 1750,
                    onStart: (tween, target) => {
                    },
                    onUpdate: (tween, target) => {
                        target.y -= 3*Math.sin(Math.PI/2 * ((tween.progress * 12))) // Every 4 means 1 wave, 8 means 2 wave, 1.1 is amplitudo
                    },
                    onComplete: () => {
                        t.isRight()
                        // Change Passenger
                    }
                });
            }, 
        });
    }

    getIn()
    {
        const t = this
        this._scene.tweens.add({
            targets: t,
            x: 375,
            ease: Phaser.Math.Easing.Sine.in,
            duration: 1750,
            onStart: (tween, target) => {
            },
            onUpdate: (tween, target) => {
                target.y -= 3*Math.sin(Math.PI/2 * ((tween.progress * 12))) // Every 4 means 1 wave, 8 means 2 wave, 1.1 is amplitudo
            },
            onComplete: () => {
                t.identitySlideIn()
                t.boardingPassSlideIn()

                if(!t._scene._gameover)
                {  
                    t._reject.setAlpha(1)
                }
            }
        });
    }

    getOut()
    {
        const t = this
        this._scene.tweens.add({
            targets: t,
            x: -200,
            ease: Phaser.Math.Easing.Sine.in,
            duration: 1750,
            onStart: (tween, target) => {
            },
            onUpdate: (tween, target) => {
                target.y -= 3*Math.sin(Math.PI/2 * ((tween.progress * 12))) // Every 4 means 1 wave, 8 means 2 wave, 1.1 is amplitudo
            },
            onComplete: () => {
                t.isRight(false)
                // Change Passenger
            }
        });
    }

    identitySlideIn()
    {
        if(this.visible)
        {
            const t = this
        
            this._identity = this._scene.add.container(350, 1080)
            let bg = this._scene.add.rectangle(-25, 0, 46.875, 46.875, 0xffffff)
            let identityCard = this._scene.add.sprite(0, 0, "identity")
            let avatar = this._scene.add.sprite(-25, 0, this._identityAvatar)

            avatar.setScale(.0875)
            identityCard.setScale(.15)

            this._identity.add([bg, avatar, identityCard])
            
            this._scene.tweens.add({
                targets: t._identity,
                x: 200,
                y: 1140,
                ease: Phaser.Math.Easing.Sine.in,
                duration: 200,
                onComplete: () => {
                    // t.identitySlideOut()
                }
            });
            eventsCenter.emit('pageturn', true)
        }
    }

    identitySlideOut()
    {
        const t = this
        this._scene.tweens.add({
            targets: t._identity,
            x: 350,
            y: 1080,
            ease: Phaser.Math.Easing.Sine.in,
            duration: 200,
            onComplete: () => {
                if(t._identity != null)
                    t._identity.destroy(true)
            }
        });
        eventsCenter.emit('pageturn', true)
    }

    boardingPassSlideIn()
    {
        if(this.visible)
        {
            const t = this
            this._boardingPass = this._scene.add.container(350, 1080)

            let boardingpassleft = this._scene.add.sprite(-25, 0, "boardingpassleft")
            let boardingpassright = this._scene.add.sprite(50, 0, "boardingpassright")

            boardingpassleft.setScale(.1) // .48 from 200dpi to 96dpi, .28 from .48/2
            boardingpassright.setScale(.1)

            this._boardingPass.add([boardingpassleft, boardingpassright])
            
            this._scene.tweens.add({
                targets: t._boardingPass,
                x: 550,
                y: 1140,
                ease: Phaser.Math.Easing.Sine.in,
                duration: 200,
                onComplete: () => {
                    // t.boardingPassSlideOut()
                }
            });
            eventsCenter.emit('pageturn', true)
        }
    }

    boardingPassSlideOut()
    {
        const t = this
        this._scene.tweens.add({
            targets: t._boardingPass,
            x: 350,
            y: 1080,
            ease: Phaser.Math.Easing.Sine.in,
            duration: 200,
            onComplete: () => {
                if(t._boardingPass != null)
                    t._boardingPass.destroy(true)
            }
        });
        eventsCenter.emit('pageturn', true)
    }

    createOverlay()
    {
        this._overlay = this._scene.add.rectangle(width/2, height/2, width, height, 0x000000, .7)
    }

    destroyOverlay()
    {
        if(this._overlay != null)
        {
            this._overlay.destroy(true)
            this._overlay = null
        }
    }

    showIdentityModal()
    {
        const t = this
        this.createOverlay()
        
        this._identityModal = this._scene.add.container(width/2, height/2)
        let bg = this._scene.add.rectangle(-80, 0, 150, 150, 0xffffff)
        let identityCard = this._scene.add.sprite(0, 0, "identity")
        let avatar = this._scene.add.sprite(-80, 0, this._identityAvatar)

        avatar.setScale(.28)
        identityCard.setScale(.48)

        this._identityModal.add([bg, avatar, identityCard])
        
        this._scene.tweens.add({
            targets: t._identityModal,
            scaleX: { value: 2, ease: 'Quad.easeInOut' },
            scaleY: { value: 2, ease: 'Quad.easeInOut' },
            duration: 200,
            onComplete: () => {
                t._identityNamePassenger = this._scene.add.text(370, height/2 - 50, this._identityName, { font: '40px roboto, sans-serif', align: 'left'});
            }
        });
    }

    hideIdentityModal()
    { 
        const t = this
        this._scene.tweens.add({
            targets: t._identityModal,
            scale: 1,
            ease: Phaser.Math.Easing.Quadratic.InOut,
            duration: 200,
            onComplete: () => {
                if(t._identityModal != null)
                    t._identityModal.destroy(true)
                t._identityNamePassenger.destroy(true)
                t._identityModal = null
                t._scene.input.off('pointerdown')
                t.destroyOverlay()
            }
        });
    }

    showBoardingPassModal()
    {
        const t = this
        this.createOverlay()

        t.boardingScan = this._scene.add.rectangle(150, height/2 + 70, 250, 50, 0xffffff)
        t.boardingScan2 = this._scene.add.rectangle(width - 130, height/2 + 70, 200, 50, 0xffffff)
        t.boardingScan.setAlpha(0);
        t.boardingScan2.setAlpha(0);
        
        this._boardingPassModal = this._scene.add.container(width/2, height/2)

        let boardingpassleft = this._scene.add.sprite(325 - width/2, 0, "boardingpassleft")
        let boardingpassright = this._scene.add.sprite(width - 260 - width/2, 0, "boardingpassright")

        boardingpassleft.setScale(.24) // .48 from 200dpi to 96dpi, .28 from .48/2
        boardingpassright.setScale(.24)

        this._boardingPassModal.add([boardingpassleft, boardingpassright])
        
        this._scene.tweens.add({
            targets: t._boardingPassModal, 
            scaleX: { value: 2, ease: 'Quad.easeInOut' },
            scaleY: { value: 2, ease: 'Quad.easeInOut' },
            duration: 200,
            onComplete: () => {
                t.boardingScan.setAlpha(1);
                t.boardingScan2.setAlpha(1);
                t.firstname = this._scene.add.text(50, height/2 - 50, this._boardingPassName.split(' ')[0], { font: '40px roboto, sans-serif', align: 'left', color: '#3f3f4e'});
                t.lastname = this._scene.add.text(50, height/2, this._boardingPassName.split(' ')[1], { font: '40px roboto, sans-serif', align: 'left', color: '#3f3f4e'});
            }
        });
    }

    hideBoardingPassModal()
    {
        const t = this
        if(t.firstname != null)
            t.firstname.destroy(true)
        if(t.lastname != null)
            t.lastname.destroy(true)
        if(t.boardingScan != null)
            t.boardingScan.destroy(true)
        if(t.boardingScan2 != null)
            t.boardingScan2.destroy(true)
        this._boardingPassAnim = this._scene.tweens.add({
            targets: t._boardingPassModal,
            scale: 1,
            ease: Phaser.Math.Easing.Quadratic.InOut,
            duration: 200,
            onComplete: () => {
                if(t._boardingPassModal != null)
                    t._boardingPassModal.destroy(true)
                t._boardingPassModal = null
                t._scene.input.off('pointerdown')
                t.destroyOverlay()
            }
        });
    }

    scan(x, y)
    {
        const t = this
        t._scanning = true
        let scanner = this._scene.add.sprite(width/2, height + 300, "scanner")
        scanner.setScale(.5)

        this._scan = this._scene.tweens.add({
            targets: scanner,
            x: x,
            y: y,
            ease: Phaser.Math.Easing.Quadratic.InOut,
            duration: 750,
            onComplete: () => {
                t._scene.time.addEvent({ 
                    delay: 1000, 
                    callback: function() {
                        t._scene.tweens.add({
                            targets: scanner,
                            x: width/2,
                            y: height + 300,
                            ease: Phaser.Math.Easing.Quadratic.InOut,
                            duration: 500,
                            onComplete: () => {
                                t._scanning = false
                                if(t._reject != null)
                                    t._reject.destroy(true)
                                t.hideBoardingPassModal()
                                t.accepted()
                            }
                        });
                    }, 
                });
            }
        });
    }

    isRight(letIn = true)
    {
        let nameRight = this._identityName == this._boardingPassName
        let avatarRight = this._identityAvatar == this._avatar
        if(letIn)
        {

            if(nameRight && avatarRight)
            {
                // Emit add passenger right
                eventsCenter.emit('passengerPoint', true)
            } else {
                // Emit add passenger wrong
                eventsCenter.emit('passengerPoint', false)
            }
        } else {
            if(!nameRight || !avatarRight)
            {
                // Emit add passenger right
                eventsCenter.emit('passengerPoint', true)
            } else {
                // Emit add passenger wrong
                eventsCenter.emit('passengerPoint', false)
            }
        }
    }
}

export default PassengerTutorial;