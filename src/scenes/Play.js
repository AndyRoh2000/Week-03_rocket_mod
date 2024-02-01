class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
        console.log("Play: constructor")
        this.timeRemaining = 60
    }

    init(stats) {
        console.log("Play: init")
        this.timeRemaining = 60
        this.gameOver = false
    }

    create() {
        console.log("Play: create")
        
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

        // green background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)

         // add rocket (p1)
         this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0, 0.5)
       
        //   add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)
        this.ship04 = new FastShip(this, game.config.width + borderUISize*9, borderUISize*7 + borderPadding*7, "fastship", 0, 40).setOrigin(0,0)

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)


        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        

        //30 seconds timer for the speed increase
        this.time.addEvent({
            delay: 30000, // 30 seconds
            callback: this.speedIncrease,
            callbackScope: this,
            loop: false
        })

        this.p1Score = 0
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)


        // GAME OVER flag
        this.gameOver = false

        // 60-second play clock
        scoreConfig.fixedWidth = 0
        // this.clock = this.time.delayedCall(60000, () => {
        //     this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
        //     this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for menu ', scoreConfig).setOrigin(0.5)
        //     this.gameOver = true
        // }, null, this)

        // this.timeDisplay = this.add.text(this.scale.width - 150, 16, `Time: ${this.timeRemaining}`, {
        //     fontSize: '40px',
        //     fill: '#FFF'
        // }).setOrigin(1, 0)
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTime,
            callbackScope: this,
            loop: true
        })
        // this.p1Rocket.on('miss', () => {
        //     this.timeRemaining -= 3
        //     this.updateTimeDisplay()
        // })

        this.timeDisplay = this.add.text(this.scale.width - 200, 70, '', { fontSize: '32px', fill: '#FFF' })
        this.updateTimeDisplay()
 

        this.input.on('pointerdown', () => {
            if (!this.p1Rocket.isFiring) {
                this.p1Rocket.fire()
            }
        })

        this.scoreText = this.add.text(this.scale.width / 2, -500, 'Score: 0', {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }).setOrigin(0.5, 0) // Centered at the top

    }

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
          this.scene.restart()
        }

        this.starfield.tilePositionX -= 4

        this.p1Rocket.update()

        if(!this.gameOver) {               
          this.p1Rocket.update()         // update rocket sprite
          this.ship01.update()           // update spaceships (x3)
          this.ship02.update()
          this.ship03.update()
          this.ship04.update()
        } 

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)  
            this.timeRemaining += 5
            this.updateTimeDisplay()
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
            this.timeRemaining += 5
            this.updateTimeDisplay()
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
            this.timeRemaining += 5
            this.updateTimeDisplay()
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship04)
            this.timeRemaining += 5
            this.updateTimeDisplay()
        }

        // if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //     this.scene.start("menuScene")
        // }

        if (this.gameOver) {
            if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
                this.scene.restart()
            }
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start('menuScene')
            }
        }

    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
        boom.anims.play('explode')           // play explode animation
        boom.on('animationcomplete', () => { // callback after ani completes
          ship.reset()                       // reset ship position
          ship.alpha = 1                     // make ship visible again
          boom.destroy()                     // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points // Increase score
        this.scoreText.setText('Score: ' + this.p1Score) // Update score display

        // Check and update high score
        if (this.p1Score > this.registry.get('highScore')) {
            this.registry.set('highScore', this.p1Score)
        }

        this.scoreLeft.text = this.p1Score      

        this.sound.play('pokeball') 
    }

    missedShot() {
        this.timeRemaining -= 3
        this.updateTimeDisplay()
    }

    updateTimeDisplay() {
        this.timeDisplay.text = `Time: ${this.timeRemaining}`
    }

    updateTime() {
        if (this.timeRemaining > 0) {
            this.timeRemaining--
            this.updateTimeDisplay()
        } else if (!this.gameOver) {
            let gameOverConfig = {
                fontFamily: 'TimesNewRoman',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'center',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }
    
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', gameOverConfig).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu', gameOverConfig).setOrigin(0.5)
            this.gameOver = true
        }
    }

    speedIncrease() {
        this.ship01.moveSpeed *= 1.5 
        this.ship02.moveSpeed *= 1.5
        this.ship03.moveSpeed *= 1.5
        this.ship04.moveSpeed *= 1.5
        // speedIncrease function after 30seconds
    }
    
    

}