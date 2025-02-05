class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.anims.create({
            key: 'chilling',
            frameRate: 10,
            repeat: -1,
            frames:this.anims.generateFrameNumbers('Player',{
                start: 1,
                end: 6
            })
    });
        const PLAYER = () => {
            this.player = this.physics.add.sprite(width / 2, height / 2, 'Player', 1).setScale(2);
            this.player.body.setCollideWorldBounds(false);
            this.player.setSize(56, 64);
            this.player.body.setBounce(2)
            this.player.play('chilling');
            // this.player.body.setDamping(true).setDrag(0.5)
            this.isCooldown = false;
            this.cooldownTime = 2000;
            this.player_isTouching = false;

            this.physics.add.overlap(this.player, this.lanes, () => {
                this.player_isTouching = true;

                if (!this.isCooldown && this.LANES) {
                    // this.scene.get('DA_POLICE').play('not-chillin');
                    this.sound.play('death', { volume: 0.1 });
                    console.log('death');
                    this.isCooldown = true;
                    this.time.delayedCall(this.cooldownTime, () => {
                        this.isCooldown = false;
                    });
                }
            });
        };
        //paralex
        this.VOID = this.add.tileSprite(0, 0, 640, 480, 'Void').setOrigin(0, 0).setScale(2)
        this.BACKGROUND = this.add.tileSprite(0, 0, 640, 480, 'Background').setOrigin(0, 0).setScale(2)
        this.FLOOR = this.add.tileSprite(0, 0, 640, 480, 'Floor').setOrigin(0, 0).setScale(2)
        PLAYER();
        this.FOREGROUND = this.add.tileSprite(0, 0, 640, 480, 'Foreground').setOrigin(0, 0).setScale(2)
        // this.FLOOR = this.add.tileSprite(0, 0, 640, 480, 'Floor').setOrigin(0, 0).setScale(2)
    }

    update() {
        this.VOID.tilePositionX += 1
        this.BACKGROUND.tilePositionX += 2
        this.FLOOR.tilePositionX += 4
        this.FOREGROUND.tilePositionX += 5
    }
}
