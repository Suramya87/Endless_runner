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
        this.snip = this.sound.add('SNIP', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: false
        });
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
            frames: this.anims.generateFrameNumbers('enemy', {
                start: 2,
                end: 1
            })
        });
        this.anims.create({
            key: 'bat',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('enemy', {
                start: 6,
                end: 9
            })
        });
        this.anims.create({
            key: 'frog_bullet',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('enemy', {
                start: 3,
                end: 5
            })
        });
        this.anims.create({
            key: 'bat_bullet',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('enemy', {
                start: 10,
                end: 11
            })
        });
        this.anims.create({
            key: 'AHH-',
            frameRate: 2,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('enemy', {
                start: 1,
                end: 3
            })
        });


        this.enemyBullets = this.physics.add.group();

        // Spawn the old enemy type
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        // Spawn the new enemy type
        this.time.addEvent({
            delay: 5000, 
            callback: this.spawnNewEnemy,
            callbackScope: this,
            loop: true // Spawn repeatedly
        });

        this.physics.add.collider(this.enemyBullets, this.player, this.hitPlayer, null, this);
    }

    // Froogs
    spawnEnemy() {
        const enemy = this.enemies.create(this.sys.game.config.width, Phaser.Math.Between(550, this.sys.game.config.height - 50), 'enemy',1).setScale(4);
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
            shootingTimer.remove(); 
        });
    }

    //Bats
    spawnNewEnemy() {
        const stopX = 1200; 
        const enemy = this.enemies.create(this.sys.game.config.width, Phaser.Math.Between(100, this.sys.game.config.height - 100), 'enemy',6).setScale(4);
        enemy.setSize(16, 16);
        enemy.setVelocityX(-150); 
        enemy.play('bat');
        enemy.stopX = stopX; 
        enemy.followingPlayer = false; 

        enemy.update = () => {
            if (enemy.x > enemy.stopX && !enemy.followingPlayer) {
                enemy.setVelocityX(-100);
            } else {
                enemy.setVelocityX(0); 
                enemy.followingPlayer = true; 
            }


            if (enemy.followingPlayer) {
                const Y = this.player.y - enemy.y;

                enemy.setVelocityY(Y > 0 ? 100 : -100);

            }

        };

        let shootingTimer = this.time.addEvent({
            delay: 2000, // Shoot every 2 seconds
            callback: () => {
                if (enemy.active && enemy.followingPlayer) {
                    this.snip.play();
                    this.shootStraightBullet(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });

        enemy.on('destroy', () => {
            shootingTimer.remove();
        });
    }

    shootHomingBullet(enemy) {
        const bullet = this.enemyBullets.create(enemy.x, enemy.y, 'enemy', 3).setScale(3);
        bullet.play('frog_bullet')
        bullet.setSize(4, 4);
        // bullet.setScale(0.5);

        // Move the bullet towards the player
        this.physics.moveToObject(bullet, this.player, 200);

        const homingDuration = 700; 
        const startTime = this.time.now;

        bullet.update = () => {
            const currentTime = this.time.now;

            // Continue homing for the specified duration
            if (currentTime - startTime < homingDuration) {
                this.physics.moveToObject(bullet, this.player, 300);
            }

            // Destroy the bullet if it goes off-screen
            if (bullet.x < 0 || bullet.x > this.sys.game.config.width ||
                bullet.y < 0 || bullet.y > this.sys.game.config.height) {
                bullet.destroy();
            }
        };
    }

    shootStraightBullet(enemy) {
        const bullet = this.enemyBullets.create(enemy.x, enemy.y, 'enemy', 10).setScale(2);
        bullet.setSize(4, 4);
        bullet.play('bat_bullet');
        // bullet.setScale(0.5);

        // Shoot the bullet straight to the left
        bullet.setVelocityX(-300); 

        // Destroy the bullet if it goes off-screen
        bullet.update = () => {
            if (bullet.x < 0 || bullet.x > this.sys.game.config.width ||
                bullet.y < 0 || bullet.y > this.sys.game.config.height) {
                bullet.destroy();
            }
        };
    }

    hitPlayer() {
        this.playScene.Gaming = false;
        // console.log('Player hit!');
        this.scene.stop();
    }

    update() {
        // Update bullets and enemies
        this.enemyBullets.getChildren().forEach(bullet => {
            if (bullet.update && bullet.active) bullet.update();
        });

        this.enemies.getChildren().forEach(enemy => {
            if (enemy.update && enemy.active) enemy.update();
        });
    }
}