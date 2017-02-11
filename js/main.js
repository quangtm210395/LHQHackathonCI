var AngryMexicans = {};
AngryMexicans.configs = {
    minWidth : 640,
    minHeight : 360,
    gameWidth : 1280,
    gameHeight : 720,
    mapSpeed: 3
};


window.onload = function() {
    AngryMexicans.game = new Phaser.Game(AngryMexicans.configs.gameWidth, AngryMexicans.configs.gameHeight, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    }, false, false);
}

// preparations before game starts
var preload = function() {
    AngryMexicans.game.scale.minWidth = AngryMexicans.configs.minWidth;
    AngryMexicans.game.scale.minHeight = AngryMexicans.configs.minHeight;
    AngryMexicans.game.scale.gameWidth = AngryMexicans.configs.gameWidth;
    AngryMexicans.game.scale.gameHeight = AngryMexicans.configs.gameHeight;
    AngryMexicans.game.scale.pageAlignHorizontally = true;
    AngryMexicans.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    AngryMexicans.game.time.advancedTiming = true;

    AngryMexicans.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    AngryMexicans.game.load.image('background', 'Assets/map4.png');

}
//Sua
// initialize the game
var create = function() {
    AngryMexicans.game.physics.startSystem(Phaser.Physics.ARCADE);
    AngryMexicans.keyboard = AngryMexicans.game.input.keyboard;

    AngryMexicans.map = AngryMexicans.game.add.tileSprite(0, 0, AngryMexicans.configs.gameWidth, AngryMexicans.configs.gameHeight, 'background');
}

// update game state each frame
var update = function() {
    //scrolling map
    // AngryMexicans.map.tilePosition.x -= AngryMexicans.configs.mapSpeed;
}

// before camera render (mostly for debug)
var render = function() {}
