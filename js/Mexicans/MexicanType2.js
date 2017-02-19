class MexicanType2 extends Mexican{
  constructor(x, y){
    super(x, y, "mexican2");

    this.audio = AngryMexicans.audioGunType2;
  }

  fire(speed){
      new BulletController(
          this.sprite.position,
          'bullet-upgraded',
          {bulletSpeed: speed * AngryMexicans.configs.bulletMaxSpeed}
      );
      this.audio.play();
  }
}
