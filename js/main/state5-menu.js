var menuState = {
    create : function() {
      AngryMexicans.keyboard = AngryMexicans.game.input.keyboard;
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
    }


}
