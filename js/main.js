var AngryMexicans = {};
AngryMexicans.configs = {
    mapSpeed: 3
};

window.onload = function() {
    AngryMexicans.game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    }, false, false);
}

// preparations before game starts
var preload = function() {
    AngryMexicans.game.scale.minWidth = 400;
    AngryMexicans.game.scale.minHeight = 300;
    AngryMexicans.game.scale.maxWidth = 800;
    AngryMexicans.game.scale.maxHeight = 600;
    AngryMexicans.game.scale.pageAlignHorizontally = true;
    AngryMexicans.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    AngryMexicans.game.time.advancedTiming = true;

    AngryMexicans.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    AngryMexicans.game.load.image('background', 'Assets/map2.jpg');
}

// initialize the game
var create = function() {
    AngryMexicans.game.physics.startSystem(Phaser.Physics.ARCADE);
    AngryMexicans.keyboard = AngryMexicans.game.input.keyboard;

    AngryMexicans.map = AngryMexicans.game.add.tileSprite(0, 0, 800, 600, 'background');
}

// update game state each frame
var update = function() {
    //scrolling map
    // AngryMexicans.map.tilePosition.x -= AngryMexicans.configs.mapSpeed;
}

// before camera render (mostly for debug)
var render = function() {}
