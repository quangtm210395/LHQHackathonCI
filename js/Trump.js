class Trump {
    constructor(x, y, spriteName, configs) {
        this.sprite = AngryMexicans.enemyGroup.create(
            x, y,
            spriteName,
            configs
        );
        this.configs = configs;
        // this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.setRectangle(92, 140);
        // this.sprite.collideWorldBounds = true;
        // this.sprite.body.setCircle(75, -25, 0, 0);

        this.sprite.body.setCollisionGroup(AngryMexicans.playerCollisionGroup);
    }

    update() {
        this.sprite.body.collides([AngryMexicans.bulletCollisionGroup, AngryMexicans.playerCollisionGroup, AngryMexicans.entityCollisionGroup]);
        console.log(2);
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
