var loadState = {
    preload : function(){
      AngryMexicans.game.scale.minWidth = AngryMexicans.configs.minWidth;
      AngryMexicans.game.scale.minHeight = AngryMexicans.configs.minHeight;
      AngryMexicans.game.scale.gameWidth = AngryMexicans.configs.gameWidth;
      AngryMexicans.game.scale.gameHeight = AngryMexicans.configs.gameHeight;

      AngryMexicans.game.scale.pageAlignHorizontally = true;
      AngryMexicans.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      AngryMexicans.game.time.advancedTiming = true;

      AngryMexicans.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
      AngryMexicans.game.load.image('borderbar', 'Assets/borderbar.png');
      AngryMexicans.game.load.image('powerbar', 'Assets/powerbar.png');
      AngryMexicans.game.load.image('background', 'Assets/map4.png');
      AngryMexicans.game.load.spritesheet('explosion', '/assets/gfx/explosion.png', 128, 128);

      AngryMexicans.game.load.physics('spritePhysics', 'assets/sprite_physics.json');

      AngryMexicans.game.load.audio('audioGunType1','/assets/sound/gunType1.mp3');
      AngryMexicans.game.load.audio('audioGunType2','/assets/sound/gunType2.mp3');
      AngryMexicans.game.load.audio('audioTrumpHit','/assets/sound/trumpHit.mp3');
      AngryMexicans.game.load.audio('audioUnlockStage','/assets/sound/unlockStage.mp3');
      AngryMexicans.game.load.audio('audioWonState','/assets/sound/won.mp3');
    },

    create : function(){
        AngryMexicans.game.state.start('menu');
    }
}
