var AngryMexicans = {};
AngryMexicans.configs = {
    minWidth: 640,
    minHeight: 360,
    gameWidth: 1280,
    gameHeight: 720,
    bulletMaxSpeed: 2000,
    bulletStrength: 1,
    GRAVITY: 2000,
    MASS : 100,
    K : 5000
};

window.onload = function() {
    AngryMexicans.game = new Phaser.Game(AngryMexicans.configs.gameWidth,
       AngryMexicans.configs.gameHeight,
       Phaser.AUTO, '', {}, false, false);
    AngryMexicans.game.state.add('boot', bootState);
    AngryMexicans.game.state.add('load', loadState);
    AngryMexicans.game.state.add('menu', menuState);
    AngryMexicans.game.state.add('map1', map1State);
    AngryMexicans.game.state.add('map2', map2State);
    AngryMexicans.game.state.add('win', winState);
    AngryMexicans.game.state.add('lost', lostState);

    AngryMexicans.game.state.start('boot');
}

// AngryMexicans.game = new Phaser.Game(AngryMexicans.configs.gameWidth, AngryMexicans.configs.gameHeight, Phaser.AUTO, 'gameDiv');
