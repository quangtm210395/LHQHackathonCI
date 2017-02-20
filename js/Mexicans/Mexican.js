class Mexican{
    constructor(x, y, spriteName) {
        this.sprite = AngryMexicans.playerGroup.create(
            x, y,
             "assets",
            spriteName + ".png"
        );
        this.sprite.father = this;
        this.sprite.body.mass = AngryMexicans.configs.MASS;

        // this.sprite.body.debug = true;
        this.sprite.body.setCircle(80, 10, 10, 0);
        this.sprite.body.clearShapes();
        this.sprite.body.loadPolygon('spritePhysics', spriteName);

        this.audio = AngryMexicans.audioGunType1;
        //collides
        this.sprite.body.setCollisionGroup(AngryMexicans.playerCollisionGroup);
        this.sprite.body.collides([AngryMexicans.bulletCollisionGroup, AngryMexicans.enemyCollisionGroup, AngryMexicans.entityCollisionGroup]);
        this.timeSinceFire = 0;
    }

    update() {
      //AngryMexicans.powerBar.width = 0;
      if(AngryMexicans.game.input.mousePointer.isDown && AngryMexicans.OVER == false&& AngryMexicans.bulletCheckKilled == true){
          this.timeSinceFire += AngryMexicans.game.time.physicsElapsed;
          AngryMexicans.powerBar.width = Math.abs(420* Math.sin(this.timeSinceFire * Math.PI * 2 / 5));

      }

      if(AngryMexicans.game.input.mousePointer.isUp && AngryMexicans.bulletCheckKilled == true && AngryMexicans.powerBar.width > 0) {
              AngryMexicans.bulletCheckKilled = false;
              if (AngryMexicans.BULLETS > 0)
              this.fire(AngryMexicans.powerBar.width/420);
              AngryMexicans.BULLETS--;
              this.timeSinceFire = 0;
              AngryMexicans.powerBar.width = 0;

        }

        this.sprite.body.setZeroVelocity();
        // if(AngryMexicans.keyboard.isDown(Phaser.Keyboard.A)){
        //     this.sprite.body.moveLeft(200);
        // }
        // if(AngryMexicans.keyboard.isDown(Phaser.Keyboard.D)){
        //     this.sprite.body.moveRight(200);
        // }
        // if(AngryMexicans.keyboard.isDown(Phaser.Keyboard.W)){
        //     this.sprite.body.moveUp(200);
        // }
        // if(AngryMexicans.keyboard.isDown(Phaser.Keyboard.S)){
        //     this.sprite.body.moveDown(200);
        // }
    }

    fire(speed){
        new BulletController(
            this.sprite.position,
            'bullet-upgraded',
            {bulletSpeed: speed * AngryMexicans.configs.bulletMaxSpeed}
        );
        this.audio.play();
    }



}
