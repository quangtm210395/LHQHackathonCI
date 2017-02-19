class RockCircleController extends EntityController{
  constructor(x, y, configs){
    super(x, y, "rockCircle", configs);
    this.sprite.father = this;
  }
}
