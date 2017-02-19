class GlassController extends EntityController{
  constructor(x, y, configs){
    super(x, y, "glass", configs);
    this.sprite.father = this;
  }
}
