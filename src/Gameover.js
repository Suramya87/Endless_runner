class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }

    init(data) {
        this.score = data.score || 0;
    }

    create() {
        // Add "Game Over" text
        this.add.text(width / 2, height / 2 - 100, 'Game Over', {
            fontSize: '64px',
            fill: '#ff0000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // // Show high scorethis.scoreText.setText('Score: ' + Math.floor(this.score));
        this.add.text(width / 2, height / 2 + 50, `High Score: ${Math.floor(this.score)}m`, {
            fontSize: '32px',
            fill: '#00ff00',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Restart Button
        const restartButton = this.add.text(width / 2, height / 2 + 150, 'Restart', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.start('playScene'); // Restart the game
        });
    }
}