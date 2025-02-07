class EnemyScene extends Phaser.Scene {
    constructor() {
        super("enemyScene");
    }

    init(data) {
        this.playScene = this.scene.get('playScene')
        this.player = data.player; 
    }

    create() {

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
        this.enemies = this.physics.add.group();

        // Spawn enemies periodically
        this.time.addEvent({
            delay: 2000, // Spawn an enemy every 2 seconds
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        // Collision detection
        this.physics.add.collider(this.enemyBullets, this.player, this.hitPlayer, null, this);
    }

    spawnEnemy() {
        const enemy = this.enemies.create(
            this.sys.game.config.width,
            Phaser.Math.Between(50, this.sys.game.config.height - 50),
            'FROG'
        ).setScale(4);
        enemy.setSize(16,16);
        enemy.setVelocityX(-100);


        enemy.ahh = false; 

        enemy.update = () => {
            if (enemy.x < 200 && !enemy.ahh) {
                enemy.play('AHH-');
                console.log('AHHH-');
                enemy.ahh= true; 
            }
            if (enemy.x < 50) {
                enemy.destroy();
            }
        };

            // enemy.update = () => {
        //     if (enemy.x == 200) {
        //         enemy.play('AHH-');
        //         console.log('AHHH-');
        //     }
        //     if (enemy.x < 50) {
        //         enemy.destroy();
        //     }
        // };

        this.time.addEvent({
            delay: 4000,
            callback: () => this.shootHomingBullet(enemy),
            // this.enemy.destroy()
            callbackScope: this,
            loop: true
        });
    }


    shootHomingBullet(enemy) {
        const bullet = this.enemyBullets.create(enemy.x, enemy.y, 'FROG', 2);
        bullet.setScale(0.5);

        // Set initial velocity towards the player
        this.physics.moveToObject(bullet, this.player, 200);

        // Homing duration
        const homingDuration = 1000; // 2 seconds
        const startTime = this.time.now;

        bullet.update = () => {
            const currentTime = this.time.now;

            // Continue homing if within homing duration
            if (currentTime - startTime < homingDuration) {
                this.physics.moveToObject(bullet, this.player, 200);
            }

            // Destroy bullet if it goes off-screen
            if (bullet.x < 0 || bullet.x > this.sys.game.config.width ||
                bullet.y < 0 || bullet.y > this.sys.game.config.height) {
                bullet.destroy();
                console.log('GG');
            }
        };
    }

    hitPlayer(bullet, player) {
        this.playScene.Gaming = false;
        console.log('Player hit!');

    }
    

    update() {
        // Update all bullets and enemies for off-screen cleanup
        this.enemyBullets.getChildren().forEach(bullet => {
            if (bullet.update && bullet.active) bullet.update();
        });

        this.enemies.getChildren().forEach(enemy => {
            if (enemy.update && enemy.active) enemy.update();
        });
    }
}
