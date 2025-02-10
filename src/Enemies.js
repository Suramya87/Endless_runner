class EnemyScene extends Phaser.Scene {
    constructor() {
        super("enemyScene");
    }

    init(data) {
        this.playScene = this.scene.get('playScene');
        this.player = data.player; 
        this.enemies = data.enemies;
        this.enemiesBullets = data.enemiesBullets;
    }

    create() {
        this.froog = this.sound.add('frogus', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: false
        });
        this.anims.create({
            key: 'shoot',
            frameRate: 2,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('FROG', {
                start: 1,
                end: 0
            })
        });
        this.anims.create({
            key: 'AHH-',
            frameRate: 2,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('FROG', {
                start: 0,
                end: 2
            })
        });

        this.enemyBullets = this.physics.add.group();
        // this.enemies = this.physics.add.group();

        this.time.addEvent({
            delay: 2000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.enemyBullets, this.player, this.hitPlayer, null, this);

    }

    spawnEnemy() {
        const enemy = this.enemies.create(this.sys.game.config.width, Phaser.Math.Between(550, this.sys.game.config.height - 50), 'FROG').setScale(4);
        enemy.setSize(16, 16);
        enemy.setVelocityX(-100);
    
        enemy.ahh = false;
        enemy.body.onCollide = true;
    
        enemy.update = () => {
            if (enemy.x < 200 && !enemy.ahh) {
                enemy.play('AHH-');
                console.log('AHHH-');
                enemy.ahh = true;
            }
            if (enemy.x < 50) {
                enemy.destroy();
            }
        };
    
        let shootingTimer = this.time.addEvent({
            delay: 2000, 
            callback: () => {
                enemy.play('shoot');
                this.froog.play();
                if (enemy.active) {
                    this.shootHomingBullet(enemy);
                }
            },
            callbackScope: this,
            loop: true 
        });
    
        enemy.on('destroy', () => {
            // console.log('Enemy destroyed, stopping bullet fire.');
            shootingTimer.remove(); 
        });
    }

    shootHomingBullet(enemy) {
        const bullet = this.enemyBullets.create(enemy.x, enemy.y, 'FROG', 2);
        bullet.setScale(0.5);

        this.physics.moveToObject(bullet, this.player, 200);

        const homingDuration = 1000;
        const startTime = this.time.now;

        bullet.update = () => {
            const currentTime = this.time.now;

            if (currentTime - startTime < homingDuration) {
                this.physics.moveToObject(bullet, this.player, 200);
            }

            if (bullet.x < 0 || bullet.x > this.sys.game.config.width ||
                bullet.y < 0 || bullet.y > this.sys.game.config.height) {
                bullet.destroy();
                console.log('GG');
            }
        };
    }

    // hitPlayer(bullet, player) {
    hitPlayer() {
        this.playScene.Gaming = false;
        console.log('Player hit!');
        this.scene.stop()
    }

    update() {
        this.enemyBullets.getChildren().forEach(bullet => {
            if (bullet.update && bullet.active) bullet.update();
        });

        this.enemies.getChildren().forEach(enemy => {
            if (enemy.update && enemy.active) enemy.update();
        });
    }
}
