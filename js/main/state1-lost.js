var lostState = {
  create : function() {
    var nameLabel = AngryMexicans.game.add.text(200, 200, 'GAME OVER',
    {font : '50px Arial', fill : '#fff'});

    var escLabel = AngryMexicans.game.add.text(200, 400, 'press ESC to back to menu',
    {font : '30px Arial', fill : '#fff'});
    var keyESC = AngryMexicans.keyboard.addKey(Phaser.Keyboard.ESC);
    keyESC.onDown.addOnce(this.escape, this);

  },

  escape : function() {
      AngryMexicans.game.state.start('menu');
  }
}
