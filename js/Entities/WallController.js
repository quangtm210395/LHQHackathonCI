class WallController{
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
      this.sprite.health = 5000;

      // this.sprite.body.debug = true;
      // this.sprite.body.setRectangle(configs.width, configs.height);
      this.sprite.body.clearShapes();
      this.sprite.body.loadPolygon('spritePhysics', spriteName);
      this.sprite.body.setCollisionGroup(AngryMexicans.wallCollisionGroup);
      this.sprite.body.collides([AngryMexicans.bulletCollisionGroup, AngryMexicans.entityCollisionGroup]);
      this.sprite.body.kinematic = true;

    }
    update(){
        }
}
