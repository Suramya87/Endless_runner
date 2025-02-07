class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.Gaming = true;
    }

    init() {
        // this.gaming = true;
        this.gameSpeed = 0;
        this.score = 0;
        this.PLAYER_VELOCITY = 200;
        this.playerBullets;
        this.BULLET_SPEED = 500;
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.bgm = this.sound.add('BGM', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        });
        // this.bgm.play();

        this.anims.create({
            key: 'BAAA',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', {
                start: 12,
                end: 12
            })
        });
        this.anims.create({
            key: 'fire_blast',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('FIRE_BALL', {
                start: 0,
                end: 5
            })
        });

        this.anims.create({
            key: 'GGs',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', {
                start: 0,
                end: 0
            })
        });
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
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', {
                start: 3,
                end: 4
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
            this.player.setSize(32, 32).setOffset(16,12);
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
    shootBullet() {
        if (this.isShooting) return; 

        this.isShooting = true;
        // const bullet = this.playerBullets.create(this.player.x + 30, this.player.y, '');
        const bullet = this.playerBullets.create(this.player.x + 30, this.player.y, 'FIRE_BALL',5).setScale(0.25);
        bullet.play('fire_blast')
        bullet.setVelocityX(this.BULLET_SPEED);
        bullet.setCollideWorldBounds(true);
        bullet.body.onWorldBounds = true;
        bullet.body.world.on('worldbounds', (body) => {
            if (body.gameObject === bullet) {
                bullet.destroy();
            }
        });

        // Play fire_blast animation
        this.player.play('BAAA');
        this.time.delayedCall(300, () => { // 300ms cooldown (adjust as needed)
            this.isShooting = false;
        }, [], this);
    }

    update() {
        this.VOID.tilePositionX += 1 + (1 * this.gameSpeed);
        this.BACKGROUND.tilePositionX += 2 + (2 * this.gameSpeed);
        this.FLOOR.tilePositionX += 4 + (4 * this.gameSpeed);
        this.FOREGROUND.tilePositionX += 5 + (5 * this.gameSpeed);

        let playerVector = new Phaser.Math.Vector2(0, 0);
        playerVector.y = 0.01;

        if (!this.isShooting) { 
            if (this.cursors.up.isDown) {
                playerVector.y = -1;
                this.playerMovement = 'going-up';
            } else if (this.cursors.down.isDown) {
                playerVector.y = 1;
                this.playerMovement = 'going-down';
            } else {
                this.playerMovement = 'chilling';
            }

            this.player.play(this.playerMovement, true);
        }

        this.player.setVelocity(this.PLAYER_VELOCITY * 0, this.PLAYER_VELOCITY * playerVector.y);

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.shootBullet();
        }

        this.score += 0.05 + this.gameSpeed;
        this.scoreText.setText('Score: ' + Math.floor(this.score));
        this.gameSpeed += 0.00025;

        if (!this.Gaming) {
            this.Gaming = true;
            this.scene.start('gameOver', { score: this.score });
        }
    }
}
