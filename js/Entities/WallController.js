class WallController {
    constructor(x, y, spriteName, configs){
      this.sprite = AngryMexicans.entityGroup.create(
          x,
          y,
          spriteName
      );
    this.configs = configs;
    this.sprite.father = this;
    this.spriteName = spriteName;
    this.sprite.body.mass = AngryMexicans.configs.MASS;
    this.sprite.health = 500;

    // this.sprite.body.debug = true;
    // this.sprite.body.setRectangle(configs.width, configs.height);
    this.sprite.body.clearShapes();
    this.sprite.body.loadPolygon('spritePhysics', spriteName);
    this.sprite.body.rotation += configs.rotation;
    // this.sprite.body.debug = true;
    //collides
    this.sprite.body.setCollisionGroup(AngryMexicans.entityCollisionGroup);
  }
}
