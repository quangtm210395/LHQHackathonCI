class BulletController {
    constructor (position, spriteName){
        this.sprite = AngryMexicans.bulletGroup.create(
            position.x,
            position.y,
            spriteName
        );

        // this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        // this.sprite.body.setCircle(25, 0, 0, 0);
        // this.sprite.checkWorldBounds = true;
        // this.sprite.outOfBoundsKill = false;

        this.sprite.body.setRectangle(34,54, 2, 3);
        // this.sprite.body.clearShapes();
        // this.sprite.body.loadPolygon('spritePhysics', spriteName);

        this.sprite.body.setCollisionGroup(AngryMexicans.bulletCollisionGroup);

        this.bulletSpeed = AngryMexicans.configs.bulletSpeed;
        this.bulletStrength = AngryMexicans.configs.bulletStrength;

        // this.sprite.angle = -Math.tan(
        //   direction.x / direction.y
        // ) * 180 / Math.PI;
        // this.sprite.body.velocity = direction.setMagnitude(this.bulletSpeed);
    }

}
