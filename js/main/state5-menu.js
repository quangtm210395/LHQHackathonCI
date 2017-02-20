var menuState = {
    create : function() {
      AngryMexicans.keyboard = AngryMexicans.game.input.keyboard;
      //setSound
      AngryMexicans.audioGunType1 = AngryMexicans.game.add.audio('audioGunType1');
      AngryMexicans.audioGunType2 = AngryMexicans.game.add.audio('audioGunType2');
      AngryMexicans.audioGunType3 = AngryMexicans.game.add.audio('audioGunType3');
      AngryMexicans.audioTrumpHit = AngryMexicans.game.add.audio('audioTrumpHit');
      AngryMexicans.audioUnlockState = AngryMexicans.game.add.audio('audioUnlockState');
      AngryMexicans.audioWonState = AngryMexicans.game.add.audio('audioWonState');
      AngryMexicans.audioLostState = AngryMexicans.game.add.audio('audioLostState');
      AngryMexicans.audioCrash = AngryMexicans.game.add.audio('audioCrash');

      AngryMexicans.game.sound.setDecodedCallback([AngryMexicans.audioGunType1,
          AngryMexicans.audioGunType2,
          AngryMexicans.audioGunType3,
          AngryMexicans.audioTrumpHit,
          AngryMexicans.audioUnlockState,
          AngryMexicans.audioWonState,
          AngryMexicans.audioLostState,
          AngryMexicans.audioCrash
      ], menuState.setUpSound, this);

      //add backgroundMenu
      AngryMexicans.backgroundMenu = AngryMexicans.game.add.tileSprite(0, 0,
          AngryMexicans.configs.gameWidth,
          AngryMexicans.configs.gameHeight, 'backgroundMenu');

      var nameLabel = AngryMexicans.game.add.text(400, 100, 'AngryMexicans Game',
      {font : '50px Cambira', fill : '#ff0000'});

      var buttonPlay1 = AngryMexicans.game.add.button(400, 200,'buttonPlay1', menuState.onPlayClick, this);
      var buttonPlay2 = AngryMexicans.game.add.button(730, 200,'buttonPlay2', menuState.onPauseClick, this);

      var keyONE = AngryMexicans.keyboard.addKey(Phaser.Keyboard.ONE);
      // keyONE.onDown.addOnce(this.start, this);
      var keyTWO = AngryMexicans.keyboard.addKey(Phaser.Keyboard.TWO);
      // keyTWO.onDown.addOnce(this.start2, this);

    },

    onPlayClick: function(){
        AngryMexicans.game.state.start('map1');
    },

    onPauseClick: function(){
        AngryMexicans.game.state.start('map2');
    },

    setUpSound: function() {

        AngryMexicans.audioGunType1.volume = 1;
        AngryMexicans.audioGunType1.loop = false;
        AngryMexicans.audioGunType2.volume = 1;
        AngryMexicans.audioGunType2.loop = false;
        AngryMexicans.audioGunType3.volume = 1;
        AngryMexicans.audioGunType3.loop = false;
        AngryMexicans.audioTrumpHit.volume = 1;
        AngryMexicans.audioTrumpHit.loop = false;
        AngryMexicans.audioUnlockState.volume = 1;
        AngryMexicans.audioUnlockState.loop = false;
        AngryMexicans.audioWonState.volume = 1;
        AngryMexicans.audioWonState.loop = false;
        AngryMexicans.audioLostState.volume = 1;
        AngryMexicans.audioLostState.loop = false;
        AngryMexicans.audioCrash.volume = 1;
        AngryMexicans.audioCrash.loop = false;

    }


}
