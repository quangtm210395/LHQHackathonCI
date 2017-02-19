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

      //add map
      // AngryMexicans.map = AngryMexicans.game.add.tileSprite(0, 0,
      //     AngryMexicans.configs.gameWidth,
      //     AngryMexicans.configs.gameWidth,
      //      'background');

      var nameLabel = AngryMexicans.game.add.text(200, 200, 'AngryMexicans Game',
      {font : '50px Arial', fill : '#fff'});

      var startLabel = AngryMexicans.game.add.text(200, 400, 'press 1 to start map 1',
      {font : '30px Arial', fill : '#fff'});
      var start2Label = AngryMexicans.game.add.text(200, 600, 'press 2 to start map 2',
      {font : '30px Arial', fill : '#fff'});

      var keyONE = AngryMexicans.keyboard.addKey(Phaser.Keyboard.ONE);
      keyONE.onDown.addOnce(this.start, this);
      var keyTWO = AngryMexicans.keyboard.addKey(Phaser.Keyboard.TWO);
      keyTWO.onDown.addOnce(this.start2, this);


    },

    start : function() {
        AngryMexicans.game.state.start('map1');
    },

    start2 : function() {
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
