class BulletController {
    constructor(position, spriteName, shooter) {
        this.sprite = AngryMexicans.bulletGroup.create(
            position.x,
            position.y,
             "assets",
            spriteName + ".png"
        );

        // this.sprite.body.debug = true;
        this.sprite.body.setRectangle(34, 54, 2, 3);
        this.sprite.father = this;
        this.sprite.body.mass = AngryMexicans.configs.MASS;

        this.sprite.body.collideWorldBounds = false;
        this.sprite.checkWorldBounds = true;
        this.sprite.events.onOutOfBounds.add(this.outOfBounds, this);
        // this.sprite.outOfBoundsKill = true;
        // this.sprite.body.clearShapes();
        // this.sprite.body.loadPolygon('spritePhysics', spriteName);
        //collides
        this.sprite.body.setCollisionGroup(AngryMexicans.bulletCollisionGroup);
        this.sprite.body.collides([AngryMexicans.enemyCollisionGroup, AngryMexicans.entityCollisionGroup, AngryMexicans.bulletCollisionGroup], this.bulletHit);

        this.sprite.bulletSpeed = AngryMexicans.configs.bulletSpeed;
        this.sprite.bulletStrength = AngryMexicans.configs.bulletStrength;

        this.sprite.reset(AngryMexicans.gun.x, AngryMexicans.gun.y);
        this.sprite.body.rotation = AngryMexicans.gun.rotation + Math.PI / 2;

        // Shoot it in the right direction
        this.sprite.body.velocity.x = Math.cos(this.sprite.body.rotation - Math.PI / 2) * this.sprite.bulletSpeed;
        this.sprite.body.velocity.y = Math.sin(this.sprite.body.rotation - Math.PI / 2) * this.sprite.bulletSpeed;

    }

    outOfBounds() {
        getExplosion(this.sprite.x, this.sprite.y);
        this.sprite.kill();
        this.sprite.body.removeFromWorld();
        AngryMexicans.bulletcheckkilled = true;
    }

    bulletHit(bullet, enemy) {
        getExplosion(bullet.sprite.x, bullet.sprite.y);
        bullet.sprite.kill();
        bullet.sprite.body.removeFromWorld();
        AngryMexicans.bulletcheckkilled = true;

        var v = AngryMexicans.configs.bulletSpeed;
        enemy.sprite.damage(bullet.sprite.body.mass * v*v
            / (4 * enemy.sprite.body.mass * AngryMexicans.configs.K));
            console.log( 'bullet damg: ' + bullet.sprite.body.mass * v*v
                / (4 * enemy.sprite.body.mass * AngryMexicans.configs.K));
            console.log( 'health: ' + enemy.sprite.health);
    }

    getExplosion(x, y) {
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

}
