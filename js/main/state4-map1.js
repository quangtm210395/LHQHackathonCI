var map1State = {
    create: function() {

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
        AngryMexicans.game.add.button(800, 20,'buttonMenu', map1State.onMenuClick, this);
        AngryMexicans.game.add.button(1000, 20,'buttonRestart', map1State.onRestartClick, this);

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

        //add Trump
        new Trump(
            AngryMexicans.configs.gameWidth - 400 + 200,
            AngryMexicans.configs.gameHeight - 75,
            'trump', {}
        );

        //add Mexican
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
        // AngryMexicans.timeSinceSpawn = 0;
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
            if (Math.abs(entity.body.velocity.x) >= 5 || Math.abs(entity.body.velocity.y) >= 5) moves = true;

        });
        AngryMexicans.enemyGroup.forEachAlive(function(enemy) {
            if (Math.abs(enemy.body.velocity.x) >= 5 || Math.abs(enemy.body.velocity.y) >= 5) moves = true;
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
         if (AngryMexicans.LOST == true){
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
      var wood = {
          width : 18 / 2,
          height: 200 / 2
      }
      var woodType2 = {
          width : 18 / 2,
          height: 160 / 2
      }
      var rockCircle = {
          width : 75 / 2,
          height: 75 / 2
      }
      var wood = {
          width : 18 / 2,
          height: 200 / 2
      }
      var rockRectangle = {
          width : 84 / 2 ,
          height: 40 / 2
      }

      new WoodController(AngryMexicans.configs.gameWidth - 120 - wood.height , AngryMexicans.configs.gameHeight - wood.width, {
          width: 212,
          height: 204,
          rotation: Math.PI / 2
      });
      new WoodController(AngryMexicans.configs.gameWidth - 120 - wood.width , AngryMexicans.configs.gameHeight - wood.height - wood.width, {
          width: 212,
          height: 204,
          rotation: 0
      });
      new WoodController(AngryMexicans.configs.gameWidth - 120 - 200 + wood.width, AngryMexicans.configs.gameHeight - wood.height - wood.width, {
          width: 212,
          height: 204,
          rotation: 0
      });

      new WoodController(AngryMexicans.configs.gameWidth - 120 - wood.height , AngryMexicans.configs.gameHeight - wood.width - wood.height * 2 - wood.width, {
          width: 212,
          height: 204,
          rotation: Math.PI / 2
      });
      new WoodType2Controller(AngryMexicans.configs.gameWidth - 120 - wood.height , AngryMexicans.configs.gameHeight - wood.width * 2 - woodType2.width, {
          width: 212,
          height: 204,
          rotation: Math.PI / 2
      });
      new WoodController(AngryMexicans.configs.gameWidth - 120 - wood.height ,
        AngryMexicans.configs.gameHeight - wood.width - wood.height * 2 - wood.width - wood.width * 2, {
          width: 212,
          height: 204,
          rotation: Math.PI / 2
      });
      // new WoodType2Controller(AngryMexicans.configs.gameWidth - 120 - wood.width - wood.width*2,
      //   AngryMexicans.configs.gameHeight - wood.height - wood.width - wood.height - wood.width * 4 - woodType2.height, {
      //     width: 212,
      //     height: 204,
      //     rotation: 0
      // }));
      // new WoodType2Controller(AngryMexicans.configs.gameWidth - 120 - 200 + wood.width*3,
      //   AngryMexicans.configs.gameHeight - wood.height - wood.width - wood.height - wood.width * 4 - woodType2.height, {
      //     width: 212,
      //     height: 204,
      //     rotation: 0
      // }));
      // new WoodType2Controller(AngryMexicans.configs.gameWidth - 120 - wood.height ,
      //   AngryMexicans.configs.gameHeight -wood.width * 6 - wood.height * 2 - woodType2.height* 2  , {
      //     width: 212,
      //     height: 204,
      //     rotation: Math.PI / 2
      // }));
      // new RockCircleController(AngryMexicans.configs.gameWidth - 120 - wood.height - rockCircle.width ,
      //   AngryMexicans.configs.gameHeight - wood.width - wood.height * 2 - wood.width - rockCircle.height - wood.width * 2, {
      //     width: 212,
      //     height: 204,
      //     rotation: Math.PI / 2
      // });
      // new RockCircleController(AngryMexicans.configs.gameWidth - 120 - wood.height + rockCircle.width ,
      //   AngryMexicans.configs.gameHeight - wood.width - wood.height * 2 - wood.width - rockCircle.height - wood.width * 2, {
      //     width: 212,
      //     height: 204,
      //     rotation: Math.PI / 2
      // });
    },

    render: function() {
        AngryMexicans.game.debug.text('POWER', 100, 40, "#0000ff", "20px Arial");
        AngryMexicans.game.debug.text('SHOOTING TIMES: ' + (Math.max(AngryMexicans.BULLETS, 0)), 100, 200, "#0000ff", "30px Arial");
    }


}
