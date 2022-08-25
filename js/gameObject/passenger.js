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

    // Modal
    _identityModal;
    _boardingPassModal;

    _overlay;


	constructor(scene)
	{
		super(scene, -200, 875, 'Passenger')

        this._scene = scene;

        this.setTexture('boy');

        this.scene.add.existing(this);
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
        this._identity = this._scene.add.sprite(350, 1080, "identity")
        this._identity.setScale(.3)

        this._identity.setInteractive();

        this._identity.on('pointerdown', function (pointer) {
            
        });
    
        this._identity.on('pointerout', function (pointer) {

    
        });
    
        this._identity.on('pointerup', function (pointer) {
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
        this._boardingPass = this._scene.add.sprite(350, 1080, "boardingpass")
        this._boardingPass.setScale(.3)

        this._boardingPass.setInteractive();

        this._boardingPass.on('pointerdown', function (pointer) {
            
        });
    
        this._boardingPass.on('pointerout', function (pointer) {

    
        });
    
        this._boardingPass.on('pointerup', function (pointer) {
            this.clearTint();
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
        this._identityModal = this._scene.add.sprite(width/2, height/2, "identity")
        
        this._scene.tweens.add({
            targets: t._identityModal,
            scale: 2,
            ease: Phaser.Math.Easing.Sine.in,
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
            ease: Phaser.Math.Easing.Sine.in,
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
        this._boardingPassModal = this._scene.add.sprite(width/2, height/2, "identity")
        
        this._scene.tweens.add({
            targets: t._boardingPassModal,
            scale: 2,
            ease: Phaser.Math.Easing.Sine.in,
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
            ease: Phaser.Math.Easing.Sine.in,
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