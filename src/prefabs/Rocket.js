// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame)
  
      // add object to existing scene
      scene.add.existing(this)
      this.isFiring = false
      this.moveSpeed = 2

      this.playScene = scene
      this.sfxShot = scene.sound.add('pikasound')
    }

    update() {
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed
            }
            else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed
            }
        }

        if (!this.isFiring) {
            this.x = this.scene.input.mousePointer.x
        }

          // fire button
        if (Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) {
            this.isFiring = true
            this.sfxShot.play()
        }

        // if fired, move up
        if (this.isFiring && this.y >= borderUISize*3 + borderPadding) {
            this.y -= this.moveSpeed
        }

        // miss reset
        // if (this.y <= borderUISize*3 + borderPadding) {
        //     this.isFiring = false
        //     this.y = game.config.height - borderUISize - borderPadding
        // }

        if (this.y <= borderUISize * 3 + borderPadding && this.isFiring) {
            this.reset()
            this.playScene.missedShot()
        }
    }

    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
    }

    fire() {
        this.isFiring = true
        this.sfxShot.play()
    }

  }