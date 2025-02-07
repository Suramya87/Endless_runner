class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() {
        this.gameSpeed = 0;
        this.score = 0;
        this.PLAYER_VELOCITY = 200;
        this.playerBullets;
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.bgm = this.sound.add('BGM', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        });
        // this.bgm.play();

        this.anims.create({
            key: 'chilling',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', {
                start: 1,
                end: 6
            })
        });

        this.anims.create({
            key: 'going-down',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', {
                start: 3,
                end: 5
            })
        });

        this.anims.create({
            key: 'going-up',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', {
                start: 7,
                end: 11
            })
        });

        const PLAYER = () => {
            this.player = this.physics.add.sprite(width / 6, height / 2, 'Player', 1).setScale(3);
            this.player.setSize(64, 48);
            this.player.body.setBounce(2);
        };

        // Paralax
        this.VOID = this.add.tileSprite(0, 0, 640, 480, 'Void').setOrigin(0, 0).setScale(2);
        this.BACKGROUND = this.add.tileSprite(0, 0, 640, 480, 'Background').setOrigin(0, 0).setScale(2);
        this.FLOOR = this.add.tileSprite(0, 0, 640, 480, 'Floor').setOrigin(0, 0).setScale(2);
        PLAYER();
        this.FOREGROUND = this.add.tileSprite(0, 0, 640, 480, 'Foreground').setOrigin(0, 0).setScale(2);

        this.playerBullets = this.physics.add.group();

        // Start the EnemyScene and pass the player object
        this.scene.launch('enemyScene', { player: this.player });

        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff'
        });
    }

    update() {
        this.VOID.tilePositionX += 1 + (1 * this.gameSpeed);
        this.BACKGROUND.tilePositionX += 2 + (2 * this.gameSpeed);
        this.FLOOR.tilePositionX += 4 + (4 * this.gameSpeed);
        this.FOREGROUND.tilePositionX += 5 + (5 * this.gameSpeed);

        let playerVector = new Phaser.Math.Vector2(0, 0);
        playerVector.y = 0.01;

        if (this.cursors.up.isDown) {
            playerVector.y = -1;
            this.playerMovement = 'going-up';
        } else if (this.cursors.down.isDown) {
            playerVector.y = 1;
            this.playerMovement = 'going-down';
        } else {
            this.playerMovement = 'chilling';
        }

        this.player.setVelocity(this.PLAYER_VELOCITY * 0, this.PLAYER_VELOCITY * playerVector.y);
        this.player.play(this.playerMovement, true);

        this.score += 0.05 + this.gameSpeed;
        this.scoreText.setText('Score: ' + Math.floor(this.score));
        this.gameSpeed += 0.00025;
    }

    hitEnemy(bullet, enemy) {
        // Destroy the bullet and enemy on collision
        bullet.destroy();
        enemy.destroy();

        // Increase score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }
}