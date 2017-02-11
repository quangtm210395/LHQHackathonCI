class Mexican{
    constructor(x, y, spriteName, configs) {
        this.sprite = AngryMexicans.playerGroup.create(
            x, y,
            spriteName,
            configs
        );
        this.configs = configs;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);

        this.timeSinceLastFire = 0;
    }

    update() {
        this.timeSinceLastFire += AngryMexicans.game.time.physicsElapsed;
        if(AngryMexicans.game.input.activePointer.isDown &&
            this.timeSinceLastFire > this.configs.cooldown){
              this.fire();
              console.log(2);
              this.timeSinceLastFire = 0;
        }
    }

    fire(){
        var bullet = new BulletController(
            this.sprite.position,
            "BulletType2.png",
            AngryMexicans.gun.rotation,
            AngryMexicans.bulletGroup
        ).sprite;
        bullet.reset(AngryMexicans.gun.x, AngryMexicans.gun.y);
        bullet.rotation = AngryMexicans.gun.rotation + Math.PI/2;

        // Shoot it in the right direction
        bullet.body.velocity.x = Math.cos(bullet.rotation - Math.PI/2) * AngryMexicans.configs.bulletSpeed;
        bullet.body.velocity.y = Math.sin(bullet.rotation - Math.PI/2) * AngryMexicans.configs.bulletSpeed;

    }
}
