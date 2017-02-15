class BulletController {
    constructor (position, spriteName){
        this.sprite = AngryMexicans.bulletGroup.create(
            position.x,
            position.y,
            spriteName
        );

        this.sprite.body.setRectangle(34,54, 2, 3);
        // this.sprite.body.clearShapes();
        // this.sprite.body.loadPolygon('spritePhysics', spriteName);

        this.sprite.body.setCollisionGroup(AngryMexicans.bulletCollisionGroup);

        this.sprite.bulletSpeed = AngryMexicans.configs.bulletSpeed;
        this.sprite.bulletStrength = AngryMexicans.configs.bulletStrength;
    }

}
