class Mexican{
    constructor(x, y, spriteName, configs) {
        this.sprite = AngryMexicans.playerGroup.create(
            x, y,
            spriteName,
            configs
        );
        this.configs = configs;
        this.sprite.body.setCircle(80, 10, 10, 0);
        this.sprite.body.clearShapes();
        this.sprite.body.loadPolygon('spritePhysics', spriteName);

        this.timeSinceLastFire = 0;
        //collides
        this.sprite.body.setCollisionGroup(AngryMexicans.playerCollisionGroup);
        this.sprite.body.collides([AngryMexicans.bulletCollisionGroup, AngryMexicans.enemyCollisionGroup, AngryMexicans.entityCollisionGroup]);
    }

    update() {

        this.timeSinceLastFire += AngryMexicans.game.time.physicsElapsed;
        if(AngryMexicans.game.input.activePointer.isDown &&
            //this.timeSinceLastFire > this.configs.cooldown){
            bulletcheckkilled == true){
              this.fire();
              this.timeSinceLastFire = 0;
              bulletcheckkilled = false;
        }

        this.sprite.body.setZeroVelocity();
        if(AngryMexicans.keyboard.isDown(Phaser.Keyboard.A)){
            this.sprite.body.moveLeft(200);
        }
        if(AngryMexicans.keyboard.isDown(Phaser.Keyboard.D)){
            this.sprite.body.moveRight(200);
        }
        if(AngryMexicans.keyboard.isDown(Phaser.Keyboard.W)){
            this.sprite.body.moveUp(200);
        }
        if(AngryMexicans.keyboard.isDown(Phaser.Keyboard.S)){
            this.sprite.body.moveDown(200);
        }
    }

    fire(){
        new BulletController(
            this.sprite.position,
            'bullet-upgraded'
        )
    }



}
