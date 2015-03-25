window.onload = function() {
"use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.spritesheet( 'player', 'assets/dude.png', 32, 48 );
        game.load.image( 'dirt', 'assets/dirt.png' );
        game.load.audio('bks','assets/eerie.mp3');
        game.load.image('city', 'assets/city.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('sky', 'assets/bhg.jpg');
    }
    
    var player;
    var cursors;
    var music;
    var enmove=150;
    var bkg;
    var platforms;
    var timer, timerEvent, tim;

    function create() {
        music=game.add.audio('bks');
        music.play('',0,0.5,true);

        game.world.setBounds(0,0,2000,2000);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.add.tileSprite(0,0,2000,2000,'dirt');
        bkg=game.add.tileSprite(0,0,2000,2000,'sky');

        player = game.add.sprite(0, game.world.height-130, 'player');
        game.physics.arcade.enable(player);
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 300;

        platforms = game.add.group(); 
        platforms.enableBody = true; 
        var ground = platforms.create(0, game.world.height - 64, 'ground'); 
        ground.scale.setTo(20, 2); 
        ground.body.immovable = true;

        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player);

        timer = game.time.create(false);
        //timer.loop(300000, end, this);
        timer.loop(500, end, this);
    }

    function end(){
        timer.stop()
        game.add.text(player.body.x,player.body.y-300, 'Game Over', { fontSize: '64px', fill: '#000' });
        game.input.disabled=true;
    }
    
    function update() {
        game.physics.arcade.collide(player, platforms);
        player.body.velocity.x=0;
        if (cursors.left.isDown){
            player.body.velocity.x = -250;
            player.animations.play('left');
        }else if (cursors.right.isDown){
            player.body.velocity.x = 250;
            player.animations.play('right');
        }else{
            player.animations.stop();
            player.frame = 4;
        }
        if (cursors.up.isDown && player.body.touching.down){
            player.body.velocity.y = -350;
        }
    }
};
