
var AngryMexicans = {};
AngryMexicans.configs = {
    minWidth: 640,
    minHeight: 360,
    gameWidth: 1280,
    gameHeight: 720,
    bulletSpeed: 1500,
    bulletStrength: 1,
    GRAVITY: 2000,
    MASS : 100,
    K : 5000
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
    AngryMexicans.game.load.image('bigwall', 'Assets/Wall.png');
    // AngryMexicans.game.load.image('trump', "Assets/trump.png");
    // AngryMexicans.game.load.image('mexican1', "Assets/mexican1.png");
    // AngryMexicans.game.load.image('mexican2', "Assets/mexican2.png");
    // AngryMexicans.game.load.image('mexican3', "Assets/mexican3.png");
    // AngryMexicans.game.load.image('wood', "Assets/wood.png");
    // AngryMexicans.game.load.image('wood-break', "Assets/wood-break.png");
    // AngryMexicans.game.load.image('woodType2', "Assets/woodType2.png");
    // AngryMexicans.game.load.image('woodType2-break', "Assets/woodType2-break.png");
    // AngryMexicans.game.load.image('mexican3', "Assets/mexican3.png");
    // AngryMexicans.game.load.image('woodType2', "Assets/woodType2.png");
    // AngryMexicans.game.load.image('glass', "Assets/glass.png");
    // AngryMexicans.game.load.image('glass-break', "Assets/glass-break.png");
    // AngryMexicans.game.load.image('rockCircle', "Assets/rockCircle.png");
    // AngryMexicans.game.load.image('rockCircle-break', "Assets/rockCircle-break.png");
    // AngryMexicans.game.load.image('rockRectangle', "Assets/rockRectangle.png")
    // AngryMexicans.game.load.image('bullet', "Assets/bullet.png");
    // AngryMexicans.game.load.image('bullet-upgraded', "Assets/bullet-upgraded.png");
    // AngryMexicans.game.load.image('gun', '/Assets/gun.png');
    // AngryMexicans.game.load.image('stand', '/Assets/stand.png');
    // AngryMexicans.game.load.image('button', '/Assets/button.jpg')
    AngryMexicans.game.load.spritesheet('explosion', '/assets/gfx/explosion.png', 128, 128);

    AngryMexicans.game.load.physics('spritePhysics', 'assets/sprite_physics.json');

}
// initialize the game
var create = function() {
    AngryMexicans.game.physics.startSystem(Phaser.Physics.P2JS);
    AngryMexicans.keyboard = AngryMexicans.game.input.keyboard;

    //  Turn on impact events for the world, without this we get no collision callbacks
    AngryMexicans.game.physics.p2.setImpactEvents(true);
    AngryMexicans.game.physics.p2.restitution = 0.5;
    AngryMexicans.game.physics.p2.updateBoundsCollisionGroup();

    //add map
    AngryMexicans.map = AngryMexicans.game.add.tileSprite(0, 0,
        AngryMexicans.configs.gameWidth,
        AngryMexicans.configs.gameHeight, 'background');

    //add collisionGroup
    AngryMexicans.playerCollisionGroup = AngryMexicans.game.physics.p2.createCollisionGroup();
    AngryMexicans.bulletCollisionGroup = AngryMexicans.game.physics.p2.createCollisionGroup();
    AngryMexicans.entityCollisionGroup = AngryMexicans.game.physics.p2.createCollisionGroup();
    AngryMexicans.enemyCollisionGroup = AngryMexicans.game.physics.p2.createCollisionGroup();

    //add phisicsGroups
    AngryMexicans.enemyGroup = AngryMexicans.game.add.physicsGroup(Phaser.Physics.P2JS);
    AngryMexicans.playerGroup = AngryMexicans.game.add.physicsGroup(Phaser.Physics.P2JS);
    AngryMexicans.bulletGroup = AngryMexicans.game.add.physicsGroup(Phaser.Physics.P2JS);
    AngryMexicans.entityGroup = AngryMexicans.game.add.physicsGroup(Phaser.Physics.P2JS);

    AngryMexicans.explosionGroup = AngryMexicans.game.add.group();

    //add GRAVITY to game
    AngryMexicans.game.physics.p2.gravity.y = AngryMexicans.configs.GRAVITY;

    //groups
    AngryMexicans.enemies = [];
    AngryMexicans.players = [];
    AngryMexicans.entities = [];

    //Button
    //AngryMexicans.button = AngryMexicans.game.add.button(AngryMexicans.game.world.centerX - 95, 400, callback, 'button', this, 2, 1, 0);

    AngryMexicans.enemies.push(
        new Trump(
            AngryMexicans.configs.gameWidth - 400,
            AngryMexicans.configs.gameHeight - 75,
            'trump', {}
        )
    );

    AngryMexicans.players.push(
        new Mexican(
            100,
            AngryMexicans.configs.gameHeight - 50,
            'mexican2', {
                cooldown: 0.15
            }
        )
    );

    createEntity();



    // Create an object representing our gun
    AngryMexicans.gun = AngryMexicans.game.add.sprite(200, AngryMexicans.game.height - 64, 'assets', 'gun.png');
    // Set the pivot point to the center of the gun
    AngryMexicans.gun.anchor.setTo(0.5, 0.5);
    AngryMexicans.stand = AngryMexicans.game.add.sprite(150, AngryMexicans.game.height - 80, 'assets', 'stand.png');

    AngryMexicans.bulletCheckKilled = true;

}

// update game state each frame


var update = function() {

    //set gun angle to Mouse Pointer
    AngryMexicans.gun.rotation = AngryMexicans.game.physics.arcade.angleToPointer(AngryMexicans.gun);

    //updates
    AngryMexicans.players.forEach(function(player) {
        player.update();
    });
    AngryMexicans.enemies.forEach(function(enemy) {
        enemy.update();
    });
    AngryMexicans.entityGroup.forEachAlive(function(entity) {
        entity.father.update();
    });

    //bullets rotation
    AngryMexicans.bulletGroup.forEachAlive(function(bullet) {
        bullet.body.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x) + Math.PI / 2;
    }, this);

}

var getExplosion = function(x, y) {
    var explosion = AngryMexicans.explosionGroup.getFirstDead();

    // If there aren't any available, create a new one
    if (explosion === null) {
        explosion = AngryMexicans.game.add.sprite(0, 0, 'explosion');
        explosion.anchor.setTo(0.5, 0.5);

        // Add an animation for the explosion that kills the sprite when the
        // animation is complete
        var animation = explosion.animations.add('boom', [0, 1, 2, 3], 60, false);
        animation.killOnComplete = true;

        // Add the explosion sprite to the group
        AngryMexicans.explosionGroup.add(explosion);
    }

    // Revive the explosion (set it's alive property to true)
    // You can also define a onRevived event handler in your explosion objects
    // to do stuff when they are revived.
    explosion.revive();

    // Move the explosion to the given coordinates
    explosion.x = x;
    explosion.y = y;

    // Set rotation of the explosion at random for a little variety
    explosion.angle = AngryMexicans.game.rnd.integerInRange(0, 360);

    // Play the animation
    explosion.animations.play('boom');

    // Return the explosion itself in case we want to do anything else with it
    return explosion;
}

var createEntity = function() {
    // create entity
    AngryMexicans.entities.push(new WoodController(AngryMexicans.configs.gameWidth - 320, AngryMexicans.configs.gameHeight - 100, {
        width: 21,
        height: 204,
        rotation: 0
    }));
    AngryMexicans.entities.push(new WoodController(AngryMexicans.configs.gameWidth - 490, AngryMexicans.configs.gameHeight - 100, {
        width: 21,
        height: 204,
        rotation: 0
    }));
    AngryMexicans.entities.push(new WoodController(AngryMexicans.configs.gameWidth - 500 + 100, AngryMexicans.configs.gameHeight - 200 - 10, {
        width: 21,
        height: 204,
        rotation: Math.PI / 2
    }));
    // AngryMexicans.entities.push(new RockCircleController(AngryMexicans.configs.gameWidth - 490 - 10 - 37, AngryMexicans.configs.gameHeight-37, {
    //     width: 21,
    //     height: 204,
    //     rotation: 0
    // }));
    // AngryMexicans.entities.push(new RockCircleController(AngryMexicans.configs.gameWidth - 490 - 10 - 37 - 75, AngryMexicans.configs.gameHeight-37, {
    //     width: 21,
    //     height: 204,
    //     rotation: 0
    // }));

    AngryMexicans.entities.push(new WallController(AngryMexicans.configs.gameWidth - 490 - 200, AngryMexicans.configs.gameHeight-214, {
        width: 21,
        height: 204,
        rotation: 0
    }));


}

// before camera render (mostly for debug)
var render = function() {

  // AngryMexicans.game.debug.text("abc", 200, 200);
}
