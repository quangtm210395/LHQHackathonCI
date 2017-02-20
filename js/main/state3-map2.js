var map2State = {
    create: function() {

        //
        AngryMexicans.BULLETS = 3;
        AngryMexicans.HEALTH;
        AngryMexicans.OVER = false;
        AngryMexicans.LOST = false;
        AngryMexicans.OVERBULLETKILLTRUMP = false;

        //  Turn on impact events for the world, without this we get no collision callbacks
        AngryMexicans.game.physics.p2.setImpactEvents(true);
        AngryMexicans.game.physics.p2.restitution = 0.5;
        AngryMexicans.game.physics.p2.updateBoundsCollisionGroup();

        //add map
        AngryMexicans.map = AngryMexicans.game.add.tileSprite(0, 0,
            AngryMexicans.configs.gameWidth,
            AngryMexicans.configs.gameHeight, 'background');

        //addbutton
        AngryMexicans.game.add.button(800, 20, 'buttonMenu', map2State.onMenuClick, this);
        AngryMexicans.game.add.button(1000, 20, 'buttonRestart', map2State.onRestartClick, this);

        //add collisionGroup
        AngryMexicans.playerCollisionGroup = AngryMexicans.game.physics.p2.createCollisionGroup();
        AngryMexicans.bulletCollisionGroup = AngryMexicans.game.physics.p2.createCollisionGroup();
        AngryMexicans.entityCollisionGroup = AngryMexicans.game.physics.p2.createCollisionGroup();
        AngryMexicans.enemyCollisionGroup = AngryMexicans.game.physics.p2.createCollisionGroup();
        AngryMexicans.wallCollisionGroup = AngryMexicans.game.physics.p2.createCollisionGroup();

        //add phisicsGroups
        AngryMexicans.enemyGroup = AngryMexicans.game.add.physicsGroup(Phaser.Physics.P2JS);
        AngryMexicans.playerGroup = AngryMexicans.game.add.physicsGroup(Phaser.Physics.P2JS);
        AngryMexicans.bulletGroup = AngryMexicans.game.add.physicsGroup(Phaser.Physics.P2JS);
        AngryMexicans.entityGroup = AngryMexicans.game.add.physicsGroup(Phaser.Physics.P2JS);
        AngryMexicans.wallGroup = AngryMexicans.game.add.physicsGroup();
        AngryMexicans.explosionGroup = AngryMexicans.game.add.group();

        //add GRAVITY to game
        AngryMexicans.game.physics.p2.gravity.y = AngryMexicans.configs.GRAVITY;


        //powerBar
        AngryMexicans.powerBar = AngryMexicans.game.add.sprite(100, 50, 'powerbar');
        AngryMexicans.borderbar = AngryMexicans.game.add.sprite(98, 48, 'borderbar');
        AngryMexicans.powerBar.width = 0;


        //add trump
        new Trump(
            AngryMexicans.configs.gameWidth - 400 + 200,
            AngryMexicans.configs.gameHeight - 75,
            'trump', {}
        );

        //add mexican
        this.createMexican(AngryMexicans.game.rnd.integerInRange(1, 3));

        //add wall
        new WallController(AngryMexicans.configs.gameWidth - 490 - 200, AngryMexicans.configs.gameHeight - 157, "wall", {
            width: 21,
            height: 204,
            rotation: 0
        });

        this.createEntity();

        // Create an object representing our gun
        AngryMexicans.gun = AngryMexicans.game.add.sprite(200, AngryMexicans.game.height - 64, 'assets', 'gun.png');
        // Set the pivot point to the center of the gun
        AngryMexicans.gun.anchor.setTo(0.5, 0.5);
        AngryMexicans.stand = AngryMexicans.game.add.sprite(150, AngryMexicans.game.height - 80, 'assets', 'stand.png');

        AngryMexicans.bulletCheckKilled = true;
    },

    onMenuClick(){
        AngryMexicans.game.state.start('menu');
    },

    onRestartClick(){
        AngryMexicans.game.state.start(AngryMexicans.game.state.current);
    },

    createMexican(type) {
        if (type == 1)
            new MexicanType1(100,
                AngryMexicans.configs.gameHeight - 50);
        else if (type == 2)
            new MexicanType2(100,
                AngryMexicans.configs.gameHeight - 50);
        else
            new MexicanType3(100,
                AngryMexicans.configs.gameHeight - 50);
    },

    checkSpritesMove() {
        var moves = false;
        AngryMexicans.entityGroup.forEachAlive(function(entity) {
            if (Math.abs(entity.body.velocity.x) >= 1 || Math.abs(entity.body.velocity.y) >= 1) moves = true;

        });
        AngryMexicans.enemyGroup.forEachAlive(function(enemy) {
            if (Math.abs(enemy.body.velocity.x) >= 1 || Math.abs(enemy.body.velocity.y) >= 1) moves = true;
        });
        return moves;
    },

    loadWinState: function() {
        AngryMexicans.game.add.text(500, 200, 'YOU WIN', {
            font: "50px Arial",
            fill: "#00cc00"
        });
        AngryMexicans.audioWonState.play();
        // setTimeout(function() {
        //     AngryMexicans.game.state.start('menu');
        // }, 4000);
    },

    loadLostState: function() {
        AngryMexicans.game.add.text(500, 200, 'GAME OVER', {
            font: "50px Arial",
            fill: "#ff0000"
        });
        AngryMexicans.audioLostState.play();
        // setTimeout(function() {
        //     AngryMexicans.game.state.start('menu');
        // }, 4000);
    },

    actionOnClick: function() {
        AngryMexicans.game.state.start('menu');
    },

    update: function() {

        if (AngryMexicans.OVERBULLETKILLTRUMP) {
            map1State.loadWinState();
            AngryMexicans.OVERBULLETKILLTRUMP = null;
            console.log(1);
        } else if (AngryMexicans.OVER) {
            if (AngryMexicans.HEALTH <= 0) {
                map1State.loadWinState();
                AngryMexicans.OVER = null;
                console.log(2);
            }
        }
        if (AngryMexicans.LOST == true) {
            map1State.loadLostState();
            AngryMexicans.LOST = null;
            console.log(3);
        }

        //set gun angle to Mouse Pointer
        AngryMexicans.gun.rotation = AngryMexicans.game.physics.arcade.angleToPointer(AngryMexicans.gun);

        //updates
        AngryMexicans.playerGroup.forEach(function(player) {
            player.father.update();
        });
        AngryMexicans.enemyGroup.forEach(function(enemy) {
            enemy.father.update();
        });
        AngryMexicans.entityGroup.forEachAlive(function(entity) {
            entity.father.update();
        });

        //bullets rotation
        AngryMexicans.bulletGroup.forEachAlive(function(bullet) {
            bullet.body.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x) + Math.PI / 2;
        }, this);

    },

    createEntity: function() {
        // create entity
        new WoodController(AngryMexicans.configs.gameWidth - 320 + 200, AngryMexicans.configs.gameHeight - 100, {
            width: 21,
            height: 204,
            rotation: 0
        });
        new GlassController(AngryMexicans.configs.gameWidth - 320 + 200 - 20, AngryMexicans.configs.gameHeight - 100, {
            width: 21,
            height: 21,
            rotation: 0
        });
        new GlassController(AngryMexicans.configs.gameWidth - 100, AngryMexicans.configs.gameHeight - 100 - 110, {
            width: 21,
            height: 21,
            rotation: Math.PI / 2
        });
        new GlassController(AngryMexicans.configs.gameWidth - 10, AngryMexicans.configs.gameHeight - 100, {
            width: 21,
            height: 21,
            rotation: 0
        });
        new RockRectangleController(AngryMexicans.configs.gameWidth - 200, AngryMexicans.configs.gameHeight - 20, {
            width: 21,
            height: 21,
            rotation: 0
        });
        new RockRectangleController(AngryMexicans.configs.gameWidth - 200 - 85, AngryMexicans.configs.gameHeight - 20, {
            width: 21,
            height: 21,
            rotation: 0
        });
        for (var i = 1; i <= 4; i++) {
            new RockRectangleController(AngryMexicans.configs.gameWidth - 200 - 85,
                AngryMexicans.configs.gameHeight - 20 - i * 40, {
                    width: 21,
                    height: 21,
                    rotation: 0
                });
        }
    },

    render: function() {
        AngryMexicans.game.debug.text('POWER', 100, 40, "#0000ff", "20px Arial");

        AngryMexicans.game.debug.text('SHOOTING TIMES: ' + (Math.max(AngryMexicans.BULLETS, 0)), 100, 200, "#0000ff", "30px Arial");
    }

}
