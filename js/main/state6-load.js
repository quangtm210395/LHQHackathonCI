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
      AngryMexicans.game.load.image('background', 'Assets/map3.png');
      AngryMexicans.game.load.image('button', 'Assets/button.png');
      AngryMexicans.game.load.image('backgroundMenu','Assets/background.png');
      AngryMexicans.game.load.image('buttonPlay','Assets/buttonPlay.png');
      AngryMexicans.game.load.image('buttonPlay1','Assets/buttonPlay1.png');
      AngryMexicans.game.load.image('buttonPlay2','Assets/buttonPlay2.png');
      AngryMexicans.game.load.image('buttonPause','Assets/buttonPause.png');
      AngryMexicans.game.load.image('buttonMenu','Assets/buttonMenu.png');
      AngryMexicans.game.load.image('buttonRestart','Assets/buttonRestart.png');
      AngryMexicans.game.load.spritesheet('explosion', '/Assets/gfx/explosion.png', 128, 128);

      AngryMexicans.game.load.physics('spritePhysics', 'Assets/sprite_physics.json');

      AngryMexicans.game.load.audio('audioGunType1','/Assets/sound/gunType1.mp3');
      AngryMexicans.game.load.audio('audioGunType2','/Assets/sound/gunType2.mp3');
      AngryMexicans.game.load.audio('audioGunType3','/Assets/sound/gunType3.mp3');
      AngryMexicans.game.load.audio('audioTrumpHit','/Assets/sound/trumpHit.mp3');
      AngryMexicans.game.load.audio('audioUnlockState','/Assets/sound/unlockStage.mp3');
      AngryMexicans.game.load.audio('audioWonState','/Assets/sound/won.mp3');
      AngryMexicans.game.load.audio('audioLostState','/Assets/sound/lost.mp3');
      AngryMexicans.game.load.audio('audioCrash','/Assets/sound/crash.mp3');
    },

    create : function(){
        AngryMexicans.game.state.start('menu');
    }
}
