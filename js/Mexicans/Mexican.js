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

        this.sprite.body.setCollisionGroup(AngryMexicans.playerCollisionGroup);
        this.timeSinceLastFire = 0;
    }

    update() {
        this.sprite.body.collides([AngryMexicans.bulletCollisionGroup, AngryMexicans.enemyCollisionGroup, AngryMexicans.entityCollisionGroup]);

        this.timeSinceLastFire += AngryMexicans.game.time.physicsElapsed;
        if(AngryMexicans.game.input.activePointer.isDown &&
            this.timeSinceLastFire > this.configs.cooldown){
              this.fire();
              this.timeSinceLastFire = 0;
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
        var bullet = new BulletController(
            this.sprite.position,
            'bullet-upgraded'
        ).sprite;
        bullet.reset(AngryMexicans.gun.x, AngryMexicans.gun.y);
        bullet.body.rotation = AngryMexicans.gun.rotation + Math.PI/2;
        bullet.body.collides([AngryMexicans.enemyCollisionGroup, AngryMexicans.entityCollisionGroup, AngryMexicans.bulletCollisionGroup], this.bulletHit);

        // Shoot it in the right direction
        bullet.body.velocity.x = Math.cos(bullet.body.rotation - Math.PI/2) * bullet.bulletSpeed;
        bullet.body.velocity.y = Math.sin(bullet.body.rotation - Math.PI/2) * bullet.bulletSpeed;

    }

    bulletHit(bullet, trump) {
        bullet.sprite.kill();
    }
}
