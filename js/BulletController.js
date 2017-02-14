class BulletController {
    constructor (position, spriteName){
        this.sprite = AngryMexicans.bulletGroup.create(
            position.x,
            position.y,
            "assets",
            spriteName
        );

        // this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        // this.sprite.body.setCircle(25, 0, 0, 0);
        this.sprite.body.setRectangle(38,60);
        // this.sprite.checkWorldBounds = true;
        // this.sprite.outOfBoundsKill = false;

        this.sprite.body.setCollisionGroup(AngryMexicans.bulletCollisionGroup);

        this.bulletSpeed = AngryMexicans.configs.bulletSpeed;
        this.bulletStrength = AngryMexicans.configs.bulletStrength;

        // this.sprite.angle = -Math.tan(
        //   direction.x / direction.y
        // ) * 180 / Math.PI;
        // this.sprite.body.velocity = direction.setMagnitude(this.bulletSpeed);
    }

    update() {
        this.sprite.body.collides(AngryMexicans.playerCollisionGroup, this.hitTrump);
    }

    hitTrump(bullet, trump) {
        bullet.sprite.kill();
    }
}
