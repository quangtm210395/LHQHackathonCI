class BulletController {
    constructor (position, spriteName, direction, physicsGroup){
        this.sprite = physicsGroup.create(
            position.x,
            position.y,
            "assets",
            spriteName
        );

        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;

        this.bulletSpeed = AngryMexicans.configs.bulletSpeed;
        this.bulletStrength = AngryMexicans.configs.bulletStrength;

        // this.sprite.angle = -Math.tan(
        //   direction.x / direction.y
        // ) * 180 / Math.PI;
        // this.sprite.body.velocity = direction.setMagnitude(this.bulletSpeed);

    }
}
