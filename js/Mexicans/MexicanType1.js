class MexicanType1 extends Mexican{
  constructor(x, y){
    super(x, y, "mexican1");

    this.audio = AngryMexicans.audioGunType1;
  }

  fire(speed){
      new BulletController(
          this.sprite.position,
          'bullet',
          {bulletSpeed: speed * AngryMexicans.configs.bulletMaxSpeed}
      );
      this.audio.play();
  }
}
