var bootState = {

    create : function(){
        AngryMexicans.game.physics.startSystem(Phaser.Physics.P2JS);

        AngryMexicans.game.state.start('load');
    }
}
