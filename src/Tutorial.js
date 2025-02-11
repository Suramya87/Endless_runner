class TutorialScene extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    create() {
        this.BG = this.add.tileSprite(0, 0, 640, 480,'Void').setOrigin(0, 0).setScale(2);

        // Add tutorial text
        this.add.text(this.cameras.main.centerX, 100, 'Tutorial', {
            fontSize: '64px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Add instructions
        this.add.text(this.cameras.main.centerX, 200, 'Use the UP and DOWN arrows to move.', {
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.add.text(this.cameras.main.centerX, 250, 'Press SPACE to shoot.', {
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5);


        // Add a practice area
        this.player = this.physics.add.sprite(this.cameras.main.centerX, 400, 'Player',1).setScale(3);
        this.player.setSize(32, 32).setOffset(16, 12);

        this.enemy = this.physics.add.sprite(this.cameras.main.centerX + 800, 400, 'enemy',1).setScale(4);
        this.enemy.setVelocityX(-100);

        const startGameButton = this.add.text(this.cameras.main.centerX, 500, 'Start Game', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        startGameButton.on('pointerdown', () => {
            this.scene.start('playScene');
        });

        startGameButton.on('pointerover', () => {
            startGameButton.setStyle({ fill: '#ff0' });
        });
        startGameButton.on('pointerout', () => {
            startGameButton.setStyle({ fill: '#fff' });
        });
    }

    update() {
        if (this.input.keyboard.createCursorKeys().up.isDown) {
            this.player.setVelocityY(-200);
        } else if (this.input.keyboard.createCursorKeys().down.isDown) {
            this.player.setVelocityY(200);
        } else {
            this.player.setVelocityY(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))) {
            this.shootBullet();
        }
    }

    shootBullet() {
        const bullet = this.physics.add.sprite(this.player.x + 55, this.player.y - 15, 'FIRE_BALL').setScale(0.25);
        bullet.setVelocityX(500);

        // Destroy the bullet if it hits the enemy
        this.physics.add.overlap(bullet, this.enemy, () => {
            bullet.destroy();
            this.enemy.destroy();
        });
    }
}