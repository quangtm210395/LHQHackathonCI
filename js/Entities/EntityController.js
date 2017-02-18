class EntityController {
    constructor(x, y, spriteName, configs) {
        this.sprite = AngryMexicans.entityGroup.create(
            x,
            y,
            spriteName
        );

        this.configs = configs;

        //this.sprite.body.setRectangle(configs.width, configs.height);
        console.log(this.configs);
        // this.sprite.anchor = new Phaser.Pointer(0.5, 0.5);
        this.sprite.body.clearShapes();
        this.sprite.body.loadPolygon('spritePhysics', spriteName);
        this.sprite.body.rotation += configs.rotation;
        this.sprite.body.debug = true;
        //collides
        this.sprite.body.setCollisionGroup(AngryMexicans.entityCollisionGroup);
        this.sprite.body.collides([AngryMexicans.bulletCollisionGroup, AngryMexicans.entityCollisionGroup, AngryMexicans.playerCollisionGroup, AngryMexicans.enemyCollisionGroup]);
    }
  }
