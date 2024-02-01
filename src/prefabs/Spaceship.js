class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed
    }

    update() {
        this.x -= this.moveSpeed

        if (this.x <= 0- this.width) {
            this.x = game.config.width
        }
    }

    reset() {
        this.x = game.config.width
    }
}

class FastShip extends Spaceship {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
        super(scene, x, y, texture, frame, pointValue)
        this.moveSpeed = 6 // Faster speed than the normal spaceship
    }
  
    update() {
        // Update the position of the ship
        this.x -= this.moveSpeed
        if (this.x < -this.width) {
            this.reset()
        }
    }
  
    // Override the reset function if necessary to change how the ship resets
  }