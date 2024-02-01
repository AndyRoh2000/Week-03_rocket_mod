class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true }) // 'active: true' makes the scene active alongside other scenes
    }

    create() {
        if (!this.registry.has('highScore')) {
            this.registry.set('highScore', highScore)
        }

        // Display the high score
        this.highScoreText = this.add.text(this.scale.width / 2, 10, 'High Score: ' + highScore, {
            fontSize: '28px',
            fill: '#FFF',
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "center",
            padding: {
                top:5,
                bottom:5
            }
        }).setOrigin(0.5, 0)
        
        this.registry.events.on('changedata', this.updateHighScore, this)
    }

    updateHighScore(parent, key, data) {
        if (key === 'highScore') {
            this.highScoreText.setText('High Score: ' + data)
        }
    }
}
