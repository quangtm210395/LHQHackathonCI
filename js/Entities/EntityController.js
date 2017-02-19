class EntityController {
    constructor(x, y, spriteName, configs) {
        this.sprite = AngryMexicans.entityGroup.create(
            x,
            y,
            "assets",
            spriteName + ".png"
        );

        this.configs = configs;
        this.sprite.father = this;
        this.spriteName = spriteName;
        this.sprite.body.mass = AngryMexicans.configs.MASS;
        this.sprite.health = 150;

        // this.sprite.body.debug = true;
        // this.sprite.body.setRectangle(configs.width, configs.height);
        this.sprite.body.clearShapes();
        this.sprite.body.loadPolygon('spritePhysics', spriteName);
        this.sprite.body.rotation += configs.rotation;
        // this.sprite.body.debug = true;
        //collides
        this.sprite.body.setCollisionGroup(AngryMexicans.entityCollisionGroup);

        this.sprite.body.collides([AngryMexicans.enemyCollisionGroup], this.onCollides);
        this.sprite.body.collides([AngryMexicans.bulletCollisionGroup, AngryMexicans.entityCollisionGroup, AngryMexicans.wallCollisionGroup]);

    }

    update() {
        if (this.sprite.health < 100 && this.sprite.alive) {
            this.sprite.frameName = this.spriteName + '-break.png';
            // this.sprite.body.loadPolygon('spritePhysics', this.spriteName + '-break');
        }
    }

    onCollides(entity, anotherSprite) {
        var v = Math.sqrt(Math.pow(entity.sprite.body.velocity.y, 2) + Math.pow(entity.sprite.body.velocity.x, 2));
        anotherSprite.sprite.damage(entity.sprite.body.mass * v * v /
            (4 * anotherSprite.sprite.body.mass * AngryMexicans.configs.K));

        // console.log('entity damg: ' + entity.sprite.body.mass * v * v /
        //     (4 * anotherSprite.sprite.body.mass * AngryMexicans.configs.K));
        // console.log('health: ' + anotherSprite.sprite.health)
    }
}
