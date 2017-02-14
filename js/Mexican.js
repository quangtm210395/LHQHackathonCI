class Mexican{
    constructor(x, y, spriteName, configs) {
        this.sprite = AngryMexicans.playerGroup.create(
            x, y,
            spriteName,
            configs
        );
        this.configs = configs;
        // this.sprite.body.collideWorldBounds = true;
        // this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.setRectangle(120, 120);

        this.sprite.body.setCollisionGroup(AngryMexicans.playerCollisionGroup);
        this.timeSinceLastFire = 0;
    }

    update() {
        this.sprite.body.collides([AngryMexicans.bulletCollisionGroup, AngryMexicans.playerCollisionGroup, AngryMexicans.entityCollisionGroup]);

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
            "BulletType2.png"
        ).sprite;
        bullet.reset(AngryMexicans.gun.x, AngryMexicans.gun.y);
        bullet.rotation = AngryMexicans.gun.rotation + Math.PI/2;
        bullet.body.collides([AngryMexicans.playerCollisionGroup, AngryMexicans.entityCollisionGroup, AngryMexicans.bulletCollisionGroup]);

        // Shoot it in the right direction
        bullet.body.velocity.x = Math.cos(bullet.rotation - Math.PI/2) * AngryMexicans.configs.bulletSpeed;
        bullet.body.velocity.y = Math.sin(bullet.rotation - Math.PI/2) * AngryMexicans.configs.bulletSpeed;

    }
}
