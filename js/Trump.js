class Trump{
    constructor(x, y, spriteName, configs) {
        this.sprite = AngryMexicans.enemyGroup.create(
            x, y,
            spriteName,
            configs
        );
        this.configs = configs;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    }
}
