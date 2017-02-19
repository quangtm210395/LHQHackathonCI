class WoodController extends EntityController{
  constructor(x, y, configs){
    super(x, y, "wood", configs);
    this.sprite.father = this;
  }
}
