class Trump {
    constructor(x, y, spriteName, configs) {
        this.sprite = AngryMexicans.enemyGroup.create(
            x, y,
            spriteName,
            configs
        );
        this.configs = configs;
        // this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        // this.sprite.collideWorldBounds = true;
        this.sprite.body.setRectangle(50, 90, 5, 5);
        this.sprite.body.clearShapes();
        this.sprite.body.loadPolygon('spritePhysics', spriteName);
        this.sprite.body.setCollisionGroup(AngryMexicans.enemyCollisionGroup);
    }

    update() {
        this.sprite.body.collides([AngryMexicans.bulletCollisionGroup, AngryMexicans.playerCollisionGroup, AngryMexicans.entityCollisionGroup]);

        this.sprite.body.setZeroVelocity();
        if (AngryMexicans.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.sprite.body.moveLeft(200);
        }
        if (AngryMexicans.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.body.moveRight(200);
        }
        if (AngryMexicans.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.sprite.body.moveUp(200);
        }
        if (AngryMexicans.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.sprite.body.moveDown(200);
        }
    }
}
