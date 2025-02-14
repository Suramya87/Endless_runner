class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        // let loadingBar = this.add.graphics();
        // this.load.on('progress', (value) => {
            // loadingBar.clear();                                 // reset fill/line style
            // loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            // loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        // });
        // this.load.on('complete', () => {
            // loadingBar.destroy();
        // });

        this.load.path = './assets/';
        // load graphics assets
        this.load.spritesheet('Player', 'img/Dragone.png',{
            frameWidth: 64});
        this.load.spritesheet('enemy', 'img/enemy_2.0.png', {
            frameWidth: 100 });
        this.load.spritesheet('FIRE_BALL', 'img/Fire_Blast.png', {
            frameWidth: 400 });
        this.load.image('Background', 'img/background.png');
        this.load.image('Floor', 'img/floor.png');
        this.load.image('Foreground', 'img/foreground.png');
        this.load.image('Void', 'img/void.png');

        // this.load.image('menuBackground', 'img/menu.png');
        this.load.image('menuHaze', 'img/haze.png');
        this.load.image('menu1', 'img/back spikes.png');
        this.load.image('menufog', 'img/fog.png');
        this.load.image('menu2', 'img/fornt spikes.png');

        // loading audio    
        this.load.audio('BGM', 'sfx/bell-cave.wav');
        this.load.audio('FIRE_BLAST', 'sfx/Blast.mp3');
        this.load.audio('FIRE_SHOT', 'sfx/shot_sound.wav');
        this.load.audio('frogus', 'sfx/Froog.mp3')
        this.load.audio('SNIP', 'sfx/Bat_shoot.mp3')
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}