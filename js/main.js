var AngryMexicans = {};
AngryMexicans.configs = {
    minWidth : 640,
    minHeight : 360,
    gameWidth : 1280,
    gameHeight : 720,
    mapSpeed: 3,
    bulletSpeed : 1000,
    bulletStrength : 1,
    GRAVITY : 980
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
    AngryMexicans.game.load.image('bullet', '/Assets/gfx/bullet.png');

    AngryMexicans.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
<<<<<<< HEAD
    AngryMexicans.game.load.image('background', 'Assets/map4.png');
    AngryMexicans.game.load.image('trump', "Assets/trump.png");
    AngryMexicans.game.load.image('mexican1', "Assets/mexican1.png");
    AngryMexicans.game.load.image('mexican2', "Assets/mexican2.png");
    AngryMexicans.game.load.image('mexican3', "Assets/mexican3.png");

}
//Sua
// initialize the game
var create = function() {
    AngryMexicans.game.physics.startSystem(Phaser.Physics.ARCADE);
    AngryMexicans.keyboard = AngryMexicans.game.input.keyboard;

    AngryMexicans.map = AngryMexicans.game.add.tileSprite(0, 0, AngryMexicans.configs.gameWidth, AngryMexicans.configs.gameHeight, 'background');

    AngryMexicans.enemyGroup = AngryMexicans.game.add.physicsGroup();
    AngryMexicans.playerGroup = AngryMexicans.game.add.physicsGroup();
    AngryMexicans.bulletGroup = AngryMexicans.game.add.physicsGroup();


    AngryMexicans.game.physics.arcade.gravity.y = AngryMexicans.configs.GRAVITY;

    // Create an object representing our gun
    AngryMexicans.gun = this.game.add.sprite(200, this.game.height - 64, 'bullet');

    // Set the pivot point to the center of the gun
    AngryMexicans.gun.anchor.setTo(0.5, 0.5);

    AngryMexicans.enemies = [];
    AngryMexicans.players = [];

    AngryMexicans.enemies.push(
        new Trump(
            1100,
            480,
            'trump',
            {}
        )
    );
    AngryMexicans.players.push(
        new Mexican(
            150,
            480,
            'mexican1',
            {
                cooldown : 0.15
            }
        )
    );
}

// update game state each frame
var update = function() {
    //scrolling map
    // AngryMexicans.map.tilePosition.x -= AngryMexicans.configs.mapSpeed;

    AngryMexicans.gun.rotation = AngryMexicans.game.physics.arcade.angleToPointer(AngryMexicans.gun);

    AngryMexicans.players.forEach(function(player) {
        player.update();
    });

    AngryMexicans.bulletGroup.forEachAlive(function(bullet) {
           bullet.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x) + Math.PI/2;
       }, this);

}


// before camera render (mostly for debug)
var render = function() {}
