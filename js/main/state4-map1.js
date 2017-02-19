var map1State = {
    create: function() {
        //setSound
        AngryMexicans.audioGunType1 = AngryMexicans.game.add.audio('audioGunType1');
        AngryMexicans.audioGunType2 = AngryMexicans.game.add.audio('audioGunType2');
        AngryMexicans.audioTrumpHit = AngryMexicans.game.add.audio('audioTrumpHit');
        AngryMexicans.audioUnlockStage = AngryMexicans.game.add.audio('audioUnlockStage');

        AngryMexicans.game.sound.setDecodedCallback([AngryMexicans.audioGunType1,
            AngryMexicans.audioGunType2,
            AngryMexicans.audioTrumpHit,
            AngryMexicans.audioUnlockStage
        ], map1State.startSound, this);

        AngryMexicans.BULLETS = 3;
        AngryMexicans.HEALTH;
        AngryMexicans.OVER = false;
        AngryMexicans.OVERBULLETKILLTRUMP = false;

        //  Turn on impact events for the world, without this we get no collision callbacks
        AngryMexicans.game.physics.p2.setImpactEvents(true);
        AngryMexicans.game.physics.p2.restitution = 0.8;
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

        //groups
        AngryMexicans.enemies = [];
        AngryMexicans.players = [];
        AngryMexicans.entities = [];
        AngryMexicans.walls = [];

        //powerBar
        AngryMexicans.powerBar = AngryMexicans.game.add.sprite(100, 50, 'powerbar');
        AngryMexicans.borderbar = AngryMexicans.game.add.sprite(98, 48, 'borderbar');
        AngryMexicans.powerBar.width = 0;

        //Button
        //AngryMexicans.button = AngryMexicans.game.add.button(AngryMexicans.game.world.centerX - 95, 400, callback, 'button', this, 2, 1, 0);

        AngryMexicans.enemies.push(
            new Trump(
                AngryMexicans.configs.gameWidth - 400 + 200,
                AngryMexicans.configs.gameHeight - 75,
                'trump', {}
            )
        );

        AngryMexicans.players.push(
            new Mexican(
                100,
                AngryMexicans.configs.gameHeight - 50,
                'mexican' + AngryMexicans.game.rnd.integerInRange(1, 3), {
                    cooldown: 0.15
                }
            )
        );

        AngryMexicans.walls.push(new WallController(AngryMexicans.configs.gameWidth - 490 - 200, AngryMexicans.configs.gameHeight - 157, "wall", {
            width: 21,
            height: 204,
            rotation: 0
        }));

        this.createEntity();

        // Create an object representing our gun
        AngryMexicans.gun = AngryMexicans.game.add.sprite(200, AngryMexicans.game.height - 64, 'assets', 'gun.png');
        // Set the pivot point to the center of the gun
        AngryMexicans.gun.anchor.setTo(0.5, 0.5);
        AngryMexicans.stand = AngryMexicans.game.add.sprite(150, AngryMexicans.game.height - 80, 'assets', 'stand.png');

        AngryMexicans.bulletCheckKilled = true;
        // AngryMexicans.timeSinceSpawn = 0;
    },

    checkSpritesMove() {
        var moves = false;
        AngryMexicans.entityGroup.forEachAlive(function(entity) {
            console.log(Math.abs(entity.body.velocity.x) + ' aaa ' + Math.abs(entity.body.velocity.y));
            if (Math.abs(entity.body.velocity.x) >= 1 || Math.abs(entity.body.velocity.y) >= 1) moves = true;

        });
        AngryMexicans.enemyGroup.forEachAlive(function(enemy) {
            if (Math.abs(enemy.body.velocity.x) >= 1 || Math.abs(enemy.body.velocity.y) >= 1) moves = true;
        });
        return moves;
    },

    loadWinState : function() {
      AngryMexicans.game.add.text(500, 200, 'YOU WIN', {
          font: "50px Arial",
          fill: "#ecf0f1"
      });
      console.log(AngryMexicans.HEALTH);
      setTimeout(function() {
          AngryMexicans.game.state.start('win');
      }, 1000);
    },

    loadLostState : function() {
      AngryMexicans.game.add.text(500, 200, 'GAME OVER', {
          font: "50px Arial",
          fill: "#ecf0f1"
      });
      console.log('game health: ' + AngryMexicans.HEALTH);
      setTimeout(function() {
          AngryMexicans.game.state.start('lost');
      }, 1000);
    },

    update: function() {

        if (AngryMexicans.OVERBULLETKILLTRUMP) {
            map1State.loadWinState();
        } else {
            var moves = map1State.checkSpritesMove();
            console.log(moves);

            if (moves == false && AngryMexicans.OVER) {
                if (AngryMexicans.HEALTH <= 0) {
                    map1State.loadWinState();
                } else {
                    map1State.loadLostState();
                }
            }
        }

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

    },

    getExplosion: function(x, y) {
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
    },

    createEntity: function() {
        // create entity
        AngryMexicans.entities.push(new WoodController(AngryMexicans.configs.gameWidth - 320 + 200, AngryMexicans.configs.gameHeight - 100, {
            width: 21,
            height: 204,
            rotation: 0
        }));
        AngryMexicans.entities.push(new WoodController(AngryMexicans.configs.gameWidth - 490 + 200, AngryMexicans.configs.gameHeight - 100, {
            width: 21,
            height: 204,
            rotation: 0
        }));
        AngryMexicans.entities.push(new WoodController(AngryMexicans.configs.gameWidth - 500 + 100 + 200, AngryMexicans.configs.gameHeight - 200 - 10, {
            width: 21,
            height: 204,
            rotation: Math.PI / 2
        }));
        AngryMexicans.entities.push(new RockCircleController(AngryMexicans.configs.gameWidth - 490 - 10 - 37 + 200, AngryMexicans.configs.gameHeight - 37, {
            width: 21,
            height: 204,
            rotation: 0
        }));

        AngryMexicans.entities.push(new RockCircleController(AngryMexicans.configs.gameWidth - 490 - 10 - 37 + 200 + 180 + 80, AngryMexicans.configs.gameHeight - 37, {
            width: 21,
            height: 204,
            rotation: 0
        }));
        AngryMexicans.entities.push(new WoodType2Controller(AngryMexicans.configs.gameWidth - 320 + 200 - 20, AngryMexicans.configs.gameHeight - 100 - 210, {
            width: 21,
            height: 204,
            rotation: 0
        }));
        AngryMexicans.entities.push(new WoodType2Controller(AngryMexicans.configs.gameWidth - 490 + 200 + 20, AngryMexicans.configs.gameHeight - 100 - 210, {
            width: 21,
            height: 204,
            rotation: 0
        }));
        AngryMexicans.entities.push(new WoodType2Controller(AngryMexicans.configs.gameWidth - 500 + 100 + 200, AngryMexicans.configs.gameHeight - 100 - 210 - 80, {
            width: 21,
            height: 204,
            rotation: Math.PI / 2
        }));

    },

    render: function() {

        AngryMexicans.game.debug.text('SHOOTING TIMES: ' + (Math.max(AngryMexicans.BULLETS, 0)), 100, 100, "#fff", "30px Arial");
    },

    startSound: function() {

        AngryMexicans.audioGunType1.volume = 1;
        AngryMexicans.audioGunType1.loop = false;
        AngryMexicans.audioGunType2.volume = 1;
        AngryMexicans.audioGunType2.loop = false;
        AngryMexicans.audioTrumpHit.volume = 1;
        AngryMexicans.audioTrumpHit.loop = false;
        AngryMexicans.audioUnlockStage.volume = 1;
        AngryMexicans.audioUnlockStage.loop = false;

    }


}
