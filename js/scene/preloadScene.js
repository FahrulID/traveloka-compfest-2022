import {width, height} from '../var.js';
import eventsCenter from '../eventsCenter.js'

var preloadScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function mainMenu ()
        {
            Phaser.Scene.call(this, { key: 'preloadScene', active: true });
        },

    preload: 
        function ()
        {
            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(240, 270, 320, 50);
            
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(250, 280, 300 * value, 30);
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });
            this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });
            
            this.load.setPath('img/');

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
            this.load.image('musicOn', 'musicOn.png');
            this.load.image('musicOff', 'musicOff.png');
            this.load.image('gameOverBest', 'gameOverBest.png');
            this.load.image('gameOverGood', 'gameOverGood.png');
            this.load.image('gameOverBad', 'gameOverBad.png');
            this.load.image('home', 'home.png');
            this.load.image('gamePause', 'gamePause.png');
            this.load.image('sky', 'sky.png');
            this.load.image('bg', 'bg.png');
            this.load.image('awan1', 'awan1.png');
            this.load.image('awan2', 'awan2.png');
            this.load.image('awan3', 'awan3.png');
            this.load.image('play', 'play.png');
            this.load.image('title', 'title.png');
            this.load.audio('bgm', 'music.mp3');
            this.load.audio('beep', 'Beep.mp3');
            this.load.audio('hop', 'Hop.mp3');
            this.load.audio('pageturn', 'Pageturn.mp3');
            this.load.image('tutorial', 'tutorial.png');
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
            this.scene.launch("background")
            this.scene.launch("bgm")
            this.scene.launch("mainMenu")
        },
    
    update:
        function()
        {
        }
})

export {preloadScene}; 