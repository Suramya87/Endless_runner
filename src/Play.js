class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.Gaming = true;
    }

    init() {
        this.gameSpeed = 0;
        this.score = 0;
        this.PLAYER_VELOCITY = 200;
        this.playerBullets;
        this.BULLET_SPEED = 500;
        this.COOLDOWN_TIME = 3000;
        // this.isShooting = true;
        this.isOnCooldown = false;
    }

    create() {
        // this.isOnCooldown = false;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.bgm = this.sound.add('BGM', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        });
        this.blast = this.sound.add('FIRE_BLAST', {
            mute: false,
            volume: 0.25,
            rate: 2,
            loop: false
        });
        this.shot = this.sound.add('FIRE_SHOT', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: false
        });
        this.bgm.play();

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
            key: 'impact', 
            frameRate: 15, 
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('FIRE_BALL', { 
                start: 6, 
                end: 6 
            }) 
        });
        this.anims.create({ 
            key: 'explosion', 
            frameRate: 15, 
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('FIRE_BALL', { 
                start: 7, 
                end: 9 
            }) 
        });
        this.anims.create({ 
            key: 'GGs', frameRate: 0, 
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
            this.player.setSize(32, 32).setOffset(16, 12);
            this.player.body.setBounce(2);
        };

        this.VOID = this.add.tileSprite(0, 0, 640, 480, 'Void').setOrigin(0, 0).setScale(2);
        this.BACKGROUND = this.add.tileSprite(0, 0, 640, 480, 'Background').setOrigin(0, 0).setScale(2);
        this.FLOOR = this.add.tileSprite(0, 0, 640, 480, 'Floor').setOrigin(0, 0).setScale(2);
        PLAYER();
        this.FOREGROUND = this.add.tileSprite(0, 0, 640, 480, 'Foreground').setOrigin(0, 0).setScale(2);

        this.playerBullets = this.physics.add.group();
        this.playerBlast = this.physics.add.group();
        this.enemies = this.physics.add.group(); 
        this.enemiesBullets = this.physics.add.group();

        this.physics.add.collider(this.playerBullets, this.enemies, this.hitEnemy, null, this);
        this.physics.add.collider(this.playerBlast, this.enemies, this.blastEnemy, null, this);

        // this.physics.add.collider(this.playerBlast, this.enemiesBullets, this.blastEnemy, null, this);

        this.scene.launch('enemyScene', { player: this.player, enemies: this.enemies });


        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    }

    // shootBullet() {
    //     if (this.isShooting) return;

    //     this.isShooting = true;
    //     const bullet = this.playerBullets.create(this.player.x + 55, this.player.y - 15, 'FIRE_BALL', 5).setScale(0.25);
    //     bullet.play('fire_blast');
    //     bullet.setVelocityX(this.BULLET_SPEED);
    //     bullet.setCollideWorldBounds(true);
    //     bullet.body.onWorldBounds = true;

    //     bullet.body.world.on('worldbounds', (body) => {
    //         if (body.gameObject === bullet) {
    //             bullet.destroy();
    //             // console.log('bye')
    //         }
    //     });

    //     this.player.play('BAAA');
    //     this.shot.play();

    //     // Reset shooting cooldown after a short delay
    //     this.time.delayedCall(300, () => {
    //         this.isShooting = false;
    // });
    // }

    shootBullet() {
        if (this.isShooting || this.isOnCooldown) return;

        this.isShooting = true;
        this.isOnCooldown = true;
    
        const bullet = this.playerBullets.create(this.player.x + 55, this.player.y - 15, 'FIRE_BALL', 5).setScale(0.25);
        bullet.play('fire_blast');
        bullet.setVelocityX(this.BULLET_SPEED);
        bullet.setCollideWorldBounds(true);
        bullet.body.onWorldBounds = true;
    
        bullet.body.world.on('worldbounds', (body) => {
            if (body.gameObject === bullet) {
                bullet.destroy();
                // console.log('bye')
            }
        });

        this.player.play('BAAA');
        this.shot.play();

        this.time.delayedCall(300, () => {
            this.isShooting = false;
        });
 
        this.time.delayedCall(this.COOLDOWN_TIME, () => {
            this.isOnCooldown = false;
        });
    }

    hitEnemy(bullet, enemy) {
        bullet.destroy();
        enemy.destroy();
    
        this.createExplosion(enemy.x, enemy.y);

        // this.burnBullets(bullet, enemyBullet);
    
        this.score += 100; 
        this.scoreText.setText('Score: ' + Math.floor(this.score));
    }

    blastEnemy(bullet, enemy) { // I gave up on this for now
        console.log('byebye')
        // bullet.destroy();
        enemy.destroy();
    
        // this.createExplosion(enemy.x, enemy.y);
    
        // this.score += 10; 
        // this.scoreText.setText('Score: ' + Math.floor(this.score));
    }


    createExplosion(x, y) {
        // const explosionRadius = 100;
        const explosion = this.playerBlast.create(x, y, 'FIRE_BALL').setScale(1);
        explosion.play('explosion');
        this.blast.play();

        // this.burnBullets(bullet, enemyBullet);

        this.time.delayedCall(500, () => { explosion.destroy(); });

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
            this.bgm.stop()
            this.Gaming = true;
            this.scene.start('gameOver', { score: this.score });
        }

        this.playerBullets.getChildren().forEach(bullet => {
            if (bullet.update && bullet.active) bullet.update();
        });
        
    }
}
