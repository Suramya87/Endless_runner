class MenuScene extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.HAZE = this.add.tileSprite(0, 0, 640, 480,'menuHaze').setOrigin(0, 0).setScale(2);
        this.SPIKES1 = this.add.tileSprite(0, 0, 640, 480,'menu1').setOrigin(0, 0).setScale(2);
        this.FOG = this.add.tileSprite(0, 0, 640, 480,'menufog').setOrigin(0, 0).setScale(2);
        this.SPIKES2 = this.add.tileSprite(0, 0, 640, 480,'menu2').setOrigin(0, 0).setScale(2);

        this.add.text(this.cameras.main.centerX, 250, 'Just blast em', {
            fontSize: '64px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const tutorialButton = this.add.text(this.cameras.main.centerX, 450, 'Tutorial', {
            fontSize: '32px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive();

        tutorialButton.on('pointerdown', () => {
            this.scene.start('tutorialScene');
        });
        tutorialButton.on('pointerover', () => {
            tutorialButton.setStyle({ fill: '#ff0' });
        });
        tutorialButton.on('pointerout', () => {
            tutorialButton.setStyle({ fill: '#fff' });
        });

        const startButton = this.add.text(this.cameras.main.centerX, 550, 'Start Game', {
            fontSize: '32px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive();

        startButton.on('pointerdown', () => {
            this.showDifficultyPopup();
        });

        startButton.on('pointerover', () => {
            startButton.setStyle({ fill: '#ff0' });
        });

        startButton.on('pointerout', () => {
            startButton.setStyle({ fill: '#fff' });
        });

        const creditsButton = this.add.text(this.cameras.main.centerX, 650, 'Credits', {
            fontSize: '32px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive();

        creditsButton.on('pointerdown', () => {
            this.scene.start('creditsScene');
        });

        creditsButton.on('pointerover', () => {
            creditsButton.setStyle({ fill: '#ff0' });
        });
        creditsButton.on('pointerout', () => {
            creditsButton.setStyle({ fill: '#fff' });
        });
    }

    showDifficultyPopup() {
        const popup = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY, 400, 300, 0x000000, 0.8);
        const text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 70, 'Select Difficulty', {
            fontSize: '32px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const normalButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 10, 'Normal', {
            fontSize: '28px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        const glueButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'Glue in Wings', {
            fontSize: '28px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        const cleanup = () => {
            popup.destroy();
            text.destroy();
            normalButton.destroy();
            glueButton.destroy();
        };

        normalButton.on('pointerdown', () => {
            cleanup();
            this.scene.start('playScene', { playerSpeed: 400 });
        });

        glueButton.on('pointerdown', () => {
            cleanup();
            this.scene.start('playScene', { playerSpeed: 200 });
        });
    }

    update() {
        this.HAZE.tilePositionX += 0.5;
        this.SPIKES1.tilePositionX += 0.4;
        this.FOG.tilePositionX += 0.7;
        this.SPIKES2.tilePositionX += 1;
    }
}

class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        this.add.text(this.cameras.main.centerX, 100, 'Credits', {
            fontSize: '48px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const creditsText = `
        Sound Credits:
        - Bell Cave BGM: freesound.org (ADnova)
        https://freesound.org/people/ADnova/sounds/475300/
        - Fire Blast: pixabay.com
        https://pixabay.com/sound-effects/dragon-breathes-fire-1-191085/
        - Shot Sound: freesound.org (LiamG_SFX)
        https://freesound.org/people/LiamG_SFX/sounds/334234/
        - Frogus: pixabay.com
        https://pixabay.com/sound-effects/frog-85649/
        - Bat Shoot: pixabay.com
        https://pixabay.com/sound-effects/sword-slash-02-266315/

        Visual assets:
        Suramya Shakya 
        using https://www.pixilart.com
        I mostly used it because it can make sprite sheets and gifs
        `;

        this.add.text(this.cameras.main.centerX - 100, 450, creditsText, {
            fontSize: '32px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const backButton = this.add.text(this.cameras.main.centerX, 750, 'Back to Menu', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('menuScene');
        });

        backButton.on('pointerover', () => {
            backButton.setStyle({ fill: '#ff0' });
        });
        backButton.on('pointerout', () => {
            backButton.setStyle({ fill: '#fff' });
        });
    }
}