var map2State = {
    create: function() {

        //
        AngryMexicans.BULLETS = 4;
        AngryMexicans.HEALTH;

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
        AngryMexicans.powerBar = AngryMexicans.game.add.sprite(100 , 50, 'powerbar');
        AngryMexicans.borderbar = AngryMexicans.game.add.sprite(98, 48, 'borderbar');
        AngryMexicans.powerBar.width =  0;
        
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
    },

    update: function() {
      if (AngryMexicans.BULLETS <= 0 && AngryMexicans.HEALTH > 0) {
          // AngryMexicans.game.add.text(500, 200, 'GAME OVER', {
          //     font: "50px Arial",
          //     fill: "#ecf0f1"
          // });
          AngryMexicans.BULLETS = 4;
          setTimeout(function() {
              AngryMexicans.game.state.start('lost');
          }, 1000);
      }
      if (AngryMexicans.HEALTH <= 0) {
          // AngryMexicans.game.add.text(500, 200, 'YOU WIN', {
          //     font: "50px Arial",
          //     fill: "#ecf0f1"
          // });
          AngryMexicans.BULLETS = 4;
          setTimeout(function() {
              AngryMexicans.game.state.start('win');
          }, 1000);
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

    createEntity : function(){
      // create entity
      AngryMexicans.entities.push(new WoodController(AngryMexicans.configs.gameWidth - 320 + 200, AngryMexicans.configs.gameHeight - 100, {
        width: 21,
        height: 204,
        rotation: 0
    }));
    AngryMexicans.entities.push(new GlassController(AngryMexicans.configs.gameWidth - 320 + 200 - 20, AngryMexicans.configs.gameHeight - 100, {
        width: 21,
        height: 21,
        rotation: 0
    }));
    AngryMexicans.entities.push(new GlassController(AngryMexicans.configs.gameWidth -100, AngryMexicans.configs.gameHeight - 100 - 110, {
        width: 21,
        height: 21,
        rotation: Math.PI/2
    }));
    // AngryMexicans.entities.push(new RockCircleController(AngryMexicans.configs.gameWidth - 300, AngryMexicans.configs.gameHeight - 37, {
    //     width: 21,
    //     height: 21,
    //     rotation: Math.PI/2
    // }));
    AngryMexicans.entities.push(new GlassController(AngryMexicans.configs.gameWidth - 10, AngryMexicans.configs.gameHeight - 100, {
        width: 21,
        height: 21,
        rotation: 0
    }));
    AngryMexicans.entities.push(new RockRectangleController(AngryMexicans.configs.gameWidth - 200, AngryMexicans.configs.gameHeight - 20, {
        width: 21,
        height: 21,
        rotation: 0
    }));
    AngryMexicans.entities.push(new RockRectangleController(AngryMexicans.configs.gameWidth - 200 - 85, AngryMexicans.configs.gameHeight - 20, {
        width: 21,
        height: 21,
        rotation: 0
    }));
    for (var i = 1; i <= 4; i++){
      AngryMexicans.entities.push(new RockRectangleController(AngryMexicans.configs.gameWidth - 200 - 85,
        AngryMexicans.configs.gameHeight - 20 - i*40, {
          width: 21,
          height: 21,
          rotation: 0
      }));
    }
  },

    render : function() {

      AngryMexicans.game.debug.text('SHOOTING TIMES: ' + (Math.max( AngryMexicans.BULLETS-1, 0)), 100, 100, "#fff" , "30px Arial" );
    }
}
