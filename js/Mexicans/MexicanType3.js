class MexicanType3 extends Mexican{
  constructor(x, y){
    super(x, y, "mexican3");

    this.audio = AngryMexicans.audioGunType3;
  }

  fire(speed){
      new BulletController(
          this.sprite.position,
          'bulletType3',
          {bulletSpeed: speed * AngryMexicans.configs.bulletMaxSpeed}
      );
      this.audio.play();
  }
}
