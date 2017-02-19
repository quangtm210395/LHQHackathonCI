var winState = {
    create: function() {
        AngryMexicans.game.sound.setDecodedCallback([AngryMexicans.audioWonState], winState.startSound, this);
        var nameLabel = AngryMexicans.game.add.text(200, 200, 'YOU WIN', {
            font: '50px Arial',
            fill: '#fff'
        });

        var startLabel = AngryMexicans.game.add.text(200, 400, 'press ENTER to start map 2', {
            font: '30px Arial',
            fill: '#fff'
        });

        var escLabel = AngryMexicans.game.add.text(200, 600, 'press ESC to back to menu', {
            font: '30px Arial',
            fill: '#fff'
        });

        var keyEnter = AngryMexicans.keyboard.addKey(Phaser.Keyboard.ENTER);
        keyEnter.onDown.addOnce(this.start, this);
        var keyESC = AngryMexicans.keyboard.addKey(Phaser.Keyboard.ESC);
        keyESC.onDown.addOnce(this.escape, this);


    },

    start: function() {
        AngryMexicans.game.state.start('map2');
    },

    escape: function() {
        AngryMexicans.game.state.start('menu');
    },

    startSound : function(){
        AngryMexicans.audioWonState.volume = 1;
        AngryMexicans.audioWonState.loop = false;
    }
}
