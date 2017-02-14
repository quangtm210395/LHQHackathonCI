class EntityController {
    constructor(x, y, spriteName, configs) {
        this.sprite = AngryMexicans.entityGroup.create(
            x,
            y,
            spriteName
        );

        this.configs = configs;
        // this.sprite.anchor = new Phaser.Point(0.5, 0.5);
          // this.sprite.collideWorldBounds = true;

        this.sprite.body.setRectangle(configs.width, configs.height);
        this.sprite.body.setCollisionGroup(AngryMexicans.entityCollisionGroup);

    }

    update(){
      this.sprite.body.collides([AngryMexicans.bulletCollisionGroup, AngryMexicans.playerCollisionGroup]);

    }
}
