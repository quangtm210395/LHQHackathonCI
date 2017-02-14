var AngryMexicans = {};
AngryMexicans.configs = {
    minWidth : 640,
    minHeight : 360,
    gameWidth : 1280,
    gameHeight : 720,
    mapSpeed: 3,
    bulletSpeed : 1500,
    bulletStrength : 1,
    GRAVITY : 2000
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
    AngryMexicans.game.load.image('background', 'Assets/map4.png');
    AngryMexicans.game.load.image('trump', "Assets/trump.png");
    AngryMexicans.game.load.image('mexican1', "Assets/mexican1.png");
    AngryMexicans.game.load.image('mexican2', "Assets/mexican2.png");
    AngryMexicans.game.load.image('mexican3', "Assets/mexican3.png");
    AngryMexicans.game.load.image('wood', "Assets/wood.png");
    AngryMexicans.game.load.image('wood-break', "Assets/wood-break.png");
    AngryMexicans.game.load.image('glass', "Assets/glass.png");
    AngryMexicans.game.load.image('glass-break', "Assets/glass-break.png");
    AngryMexicans.game.load.image('rockCircle', "Assets/rockCircle.png");
    AngryMexicans.game.load.image('rockCircle-break', "Assets/rockCircle-break.png");

}
//Sua
// initialize the game
var create = function() {
    AngryMexicans.game.physics.startSystem(Phaser.Physics.P2JS);
    AngryMexicans.keyboard = AngryMexicans.game.input.keyboard;

    //  Turn on impact events for the world, without this we get no collision callbacks
    AngryMexicans.game.physics.p2.setImpactEvents(true);
    AngryMexicans.game.physics.p2.restitution = 0.9;
    AngryMexicans.game.physics.p2.updateBoundsCollisionGroup();

    AngryMexicans.map = AngryMexicans.game.add.tileSprite(0, 0, AngryMexicans.configs.gameWidth, AngryMexicans.configs.gameHeight, 'background');


    //add collisionGroup
    AngryMexicans.playerCollisionGroup = AngryMexicans.game.physics.p2.createCollisionGroup();
    AngryMexicans.bulletCollisionGroup = AngryMexicans.game.physics.p2.createCollisionGroup();
    AngryMexicans.entityCollisionGroup = AngryMexicans.game.physics.p2.createCollisionGroup();
    AngryMexicans.ennemyCollisionGroup = AngryMexicans.game.physics.p2.createCollisionGroup();

    //add phisicsGroups
    AngryMexicans.enemyGroup = AngryMexicans.game.add.physicsGroup(Phaser.Physics.P2JS);
    AngryMexicans.playerGroup = AngryMexicans.game.add.physicsGroup(Phaser.Physics.P2JS);
    AngryMexicans.bulletGroup = AngryMexicans.game.add.physicsGroup(Phaser.Physics.P2JS);
    AngryMexicans.entityGroup = AngryMexicans.game.add.physicsGroup(Phaser.Physics.P2JS);

    //add GRAVITY to game
    AngryMexicans.game.physics.p2.gravity.y = AngryMexicans.configs.GRAVITY;

    // Create an object representing our gun
    AngryMexicans.gun = this.game.add.sprite(200, this.game.height - 64, 'bullet');

    // Set the pivot point to the center of the gun
    AngryMexicans.gun.anchor.setTo(0.5, 0.5);

    AngryMexicans.enemies = [];
    AngryMexicans.players = [];
    AngryMexicans.bullets = [];
    AngryMexicans.entities = [];

    AngryMexicans.enemies.push(
        new Trump(
            1100,
            AngryMexicans.configs.gameHeight - 152,
            'trump',
            {}
        )
    );
    AngryMexicans.players.push(
        new Mexican(
            150,
            AngryMexicans.configs.gameHeight - 150,
            'mexican1',
            {
                cooldown : 0.15
            }
        )
    );

    // create entity
    AngryMexicans.entities.push(new EntityController(1090, AngryMexicans.configs.gameHeight-205, 'wood', {width: 22, height : 205}));

    AngryMexicans.entities.push(new EntityController(1250, AngryMexicans.configs.gameHeight-205, 'wood', {width: 22, height : 205}));
}

// update game state each frame
var update = function() {
    // AngryMexicans.game.physics.arcade.collide(AngryMexicans.playerGroup, AngryMexicans.enemyGroup, null, null, this);
    // AngryMexicans.game.physics.arcade.collide(AngryMexicans.bulletGroup, AngryMexicans.enemyGroup, bulletEnemyCollider, null, this);
    // AngryMexicans.game.physics.arcade.collide(AngryMexicans.bulletGroup, AngryMexicans.entityGroup, bulletEntityCollider, null, this);
    // AngryMexicans.game.physics.arcade.collide(AngryMexicans.entityGroup, AngryMexicans.enemyGroup, null, null, this);

    //set gun angle to Mouse Pointer
    AngryMexicans.gun.rotation = AngryMexicans.game.physics.arcade.angleToPointer(AngryMexicans.gun);

    //updates
    AngryMexicans.players.forEach(function(player) {
        player.update();
    });
    AngryMexicans.enemies.forEach(function(enemy) {
        enemy.update();
    });
    AngryMexicans.entities.forEach(function(entity) {
        entity.update();
    });


    AngryMexicans.bulletGroup.forEachAlive(function(bullet) {
            // bullet.body.collides(AngryMexicans.enemyCollisionGroup, hitTrump);
            bullet.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x) + Math.PI/2;
       }, this);

}

function hitTrump(bullet, trump) {
    bullet.sprite.kill();
}

var bulletEnemyCollider = function(bulletSprite, enemySprite) {
    bulletSprite.kill();
}

var bulletEntityCollider = function(bulletSprite, entitySprite) {
    bulletSprite.kill();
}

var entityEnemyCollider = function(entitySprite, enemySprite) {

}


// before camera render (mostly for debug)
var render = function() {
    // AngryMexicans.game.body.debug(AngryMexicans.map);
    // AngryMexicans.bulletGroup.forEach(function(bullet){
    //     AngryMexicans.game.debug.body(bullet);
    // });
    // AngryMexicans.playerGroup.forEach(function(player){
    //     AngryMexicans.game.debug.body(player);
    // });
    // AngryMexicans.enemyGroup.forEach(function(enemy){
    //     AngryMexicans.game.debug.body(enemy);
    // });
}
