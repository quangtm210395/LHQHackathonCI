class RockRectangleController extends EntityController{
  constructor(x, y, configs){
    super(x, y, "rockRectangle", configs);
    this.sprite.father = this;
  }
}
