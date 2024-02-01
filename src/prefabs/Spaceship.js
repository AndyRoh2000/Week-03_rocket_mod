class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed

        // this.direction = Math.random() < 0.5 ? 1 : -1;
        // if (this.direction === 1) {
        //     this.x = 0 - this.width // Start from left side
        // } else {
        //     this.x = game.config.width + this.width // Start from right side
        // }
    }

    update() {
        this.x -= this.moveSpeed

        // this.x += this.moveSpeed * this.direction;

        if (this.x <= 0- this.width) {
            this.x = game.config.width
        }

        // Reset when it goes off screen
        // if (this.x <= 0 - this.width || this.x >= game.config.width + this.width) {
        //     this.reset();
        // }
        
    }

    reset() {
        this.x = game.config.width
        // this.direction = Math.random() < 0.5 ? 1 : -1;
        // if (this.direction === 1) {
        //     this.x = 0 - this.width; // Start from left side
        // } else {
        //     this.x = game.config.width + this.width; // Start from right side
        // }
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