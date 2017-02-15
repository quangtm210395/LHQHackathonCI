class EntityController {
    constructor(x, y, spriteName, configs) {
        this.sprite = AngryMexicans.entityGroup.create(
            x,
            y,
            spriteName
        );

        this.configs = configs;

        this.sprite.body.setRectangle(configs.width, configs.height);
        this.sprite.body.clearShapes();
        this.sprite.body.loadPolygon('spritePhysics', spriteName);
        this.sprite.body.setCollisionGroup(AngryMexicans.entityCollisionGroup);

    }

    update() {
        this.sprite.body.collides([AngryMexicans.bulletCollisionGroup, AngryMexicans.playerCollisionGroup, AngryMexicans.enemyCollisionGroup]);
    }
}
