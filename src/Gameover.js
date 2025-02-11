class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }

    init(data) {
        this.score = data.score || 0;
    }


    create() {
        const highScore = localStorage.getItem('highScore') || 0;
    
        this.add.text(width / 2, height / 2 - 100, 'Game Over', {
            fontSize: '64px',
            fill: '#ff0000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    
        this.add.text(width / 2, height / 2, `Score: ${Math.floor(this.score)}m`, {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    
        this.add.text(width / 2, height / 2 + 50, `High Score: ${highScore}m`, {
            fontSize: '32px',
            fill: '#00ff00',
            fontFamily: 'Arial'
        }).setOrigin(0.5);


        const restartButton = this.add.text(width / 2, height / 2 + 150, 'Restart', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.start('playScene'); // Restart the game
        });

        // menu Button
        const menuButton = this.add.text(width / 2, height / 2 + 200, 'Menu', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5).setInteractive();
        
        menuButton.on('pointerdown', () => {
            this.scene.start('menuScene'); 
        });
    }
}