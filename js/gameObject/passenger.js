import {width, height} from '../var.js';

class Passenger extends Phaser.GameObjects.Sprite
{
    _identityName;
    _ticketName;

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


	constructor(scene)
	{
		super(scene, -200, 875, 'Passenger')

        this._scene = scene;
        
        this.randomizePassenger();

        this.setTexture(this._avatar);

        this.scene.add.existing(this);
	}

    randomizePassenger()
    {
        this._avatar = "girl"

        if(Math.random() < 0.75)
            this._identityAvatar = this._avatar
        else 
            this._identityAvatar = "boy"

        // random name

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
            }
        });
    }

    getOut()
    {
        this.x = -200
    }

    identitySlideIn()
    {
        const t = this
        
        this._identity = this._scene.add.container(350, 1080)
        let bg = this._scene.add.rectangle(-25, 0, 46.875, 46.875, 0xffffff)
        let identityCard = this._scene.add.sprite(0, 0, "identity")
        let avatar = this._scene.add.sprite(-25, 0, this._identityAvatar)

        avatar.setScale(.0875)
        identityCard.setScale(.15)

        this._identity.add([bg, avatar, identityCard])

        identityCard.setInteractive();
    
        identityCard.on('pointerup', function (pointer) {
            this.clearTint();
            if(t._identityModal == null)
                t.showIdentityModal()
        });
        
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
                t._identity.destroy(true)
            }
        });
    }

    boardingPassSlideIn()
    {
        const t = this
        this._boardingPass = this._scene.add.container(350, 1080)

        let boardingpassleft = this._scene.add.sprite(-25, 0, "boardingpassleft")
        let boardingpassright = this._scene.add.sprite(50, 0, "boardingpassright")

        boardingpassleft.setScale(.1) // .48 from 200dpi to 96dpi, .28 from .48/2
        boardingpassright.setScale(.1)

        this._boardingPass.add([boardingpassleft, boardingpassright])

        boardingpassleft.setInteractive();
        boardingpassright.setInteractive();
    
        boardingpassleft.on('pointerup', function (pointer) {
            if(t._boardingPassModal == null)
                t.showBoardingPassModal()
        });
    
        boardingpassright.on('pointerup', function (pointer) {
            if(t._boardingPassModal == null)
                t.showBoardingPassModal()
        });
        
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
                t._boardingPass.destroy(true)
            }
        });
    }

    createOverlay()
    {
        this._overlay = this._scene.add.rectangle(0, 0, width*2, height*2, 0x000000, .7)
        this._overlay.setInteractive()
    }

    destroyOverlay()
    {
        this._overlay.destroy(true)
        this._overlay = null
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
                t._scene.input.on('pointerdown', () =>
                {
                    t.hideIdentityModal()
                })
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
                t._identityModal.destroy(true)
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
        
        this._boardingPassModal = this._scene.add.container(width/2, height/2)

        let boardingpassleft = this._scene.add.sprite(325 - width/2, 0, "boardingpassleft")
        let boardingpassright = this._scene.add.sprite(width - 260 - width/2, 0, "boardingpassright")

        boardingpassleft.setScale(.24) // .48 from 200dpi to 96dpi, .28 from .48/2
        boardingpassright.setScale(.24)

        this._boardingPassModal.add([boardingpassleft, boardingpassright])

        // console.log(this._boardingPassModal)
        
        this._scene.tweens.add({
            targets: t._boardingPassModal, 
            scaleX: { value: 2, ease: 'Quad.easeInOut' },
            scaleY: { value: 2, ease: 'Quad.easeInOut' },
            duration: 200,
            onComplete: () => {
                t._scene.input.on('pointerdown', () =>
                {
                    t.hideBoardingPassModal()
                })
            }
        });
    }

    hideBoardingPassModal()
    {
        const t = this
        this._scene.tweens.add({
            targets: t._boardingPassModal,
            scale: 1,
            ease: Phaser.Math.Easing.Quadratic.InOut,
            duration: 200,
            onComplete: () => {
                t._boardingPassModal.destroy(true)
                t._boardingPassModal = null
                t._scene.input.off('pointerdown')
                t.destroyOverlay()
            }
        });
    }
}

export default Passenger;