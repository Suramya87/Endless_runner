class EnemyScene extends Phaser.Scene {
    constructor() {
        super("enemyScene");
    }

    init(data) {
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
        ).setScale(2);
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

    }

    

    update() {
        this.enemies.getChildren().forEach(enemy => {
            if (enemy.update) enemy.update();
        });

    }
}
