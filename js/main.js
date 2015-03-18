window.onload = function() {
"use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'logo', 'assets/phaser.png' );
    }
    
    var bouncy;
    
    function create() {
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        bouncy.anchor.setTo( 0.5, 0.5 );
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        bouncy.body.collideWorldBounds = true;
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something awesome.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
    }
};
