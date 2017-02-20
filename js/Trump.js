class Trump {
    constructor(x, y, spriteName, configs) {
        this.sprite = AngryMexicans.enemyGroup.create(
            x, y,
             "assets",
            spriteName + ".png",
            configs
        );
        this.configs = configs;
        this.sprite.father = this;

        this.sprite.body.mass = AngryMexicans.configs.MASS;
        this.sprite.health = 100;
        AngryMexicans.HEALTH = this.sprite.health;
        // this.sprite.body.debug = true;
        this.sprite.body.setRectangle(50, 90, 5, 5);
        this.sprite.body.clearShapes();
        this.sprite.body.loadPolygon('spritePhysics', spriteName);
        //collide
        this.sprite.body.setCollisionGroup(AngryMexicans.enemyCollisionGroup);
        this.sprite.body.collides([AngryMexicans.bulletCollisionGroup, AngryMexicans.wallCollisionGroup, AngryMexicans.playerCollisionGroup, AngryMexicans.entityCollisionGroup], this.onCollides);
    }

    onCollides() {
    }

    update() {
        // AngryMexicans.HEALTH = this.sprite.health;

        this.sprite.body.setZeroVelocity();
        // if (AngryMexicans.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        //     this.sprite.body.moveLeft(200);
        // }
        // if (AngryMexicans.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        //     this.sprite.body.moveRight(200);
        // }
        // if (AngryMexicans.keyboard.isDown(Phaser.Keyboard.UP)) {
        //     this.sprite.body.moveUp(200);
        // }
        // if (AngryMexicans.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        //     this.sprite.body.moveDown(200);
        // }
    }
}
