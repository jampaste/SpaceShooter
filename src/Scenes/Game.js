class Gamertime extends Phaser.Scene{
    constructor() {
        super("game");
        this.my = {sprite: {}};   
        this.bulletActive = false;
        this.my.sprite.bullet = [];
        this.maxbullet = 5;
    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("Spaceship", 'playerShip1_blue.png');

        this.load.image("Space1","black.png"); //backgrounds
        this.load.image("Space2","blue.png");
        this.load.image("Space3","darkPurple.png");
        this.load.image("Space4","Purple.png");

        this.load.image("Lives", "playerLife1_blue.png");

        this.load.image("Laser", "laserBlue01.png"); //bullets

        this.load.audio("Musictime", "The_Coming_of_the_Future.mp3"); //main audio

        this.load.audio("pew", "laserSmall_003.ogg"); //laser audio
        this.load.audio("boom", "explosionCrunch_000.ogg"); //thing destroyed

        this.load.image("worm1", "snakeSlime.png"); //Worm Enemy
        this.load.image("worm2", "snakeSlime_ani.png");

        this.load.image("fish1", "fishGreen.png"); //fish Enemy
        this.load.image("fish2", "fishGreen_swim.png");
        this.load.image("fishshot", "worm.png"); //Fish projectile

        this.load.image("rock1", "spaceMeteors_001.png");//Falling rocks 
        this.load.image("rock2", "spaceMeteors_002.png");
        this.load.image("rock3", "spaceMeteors_003.png");
        this.load.image("rock4", "spaceMeteors_004.png");
        
        this.load.image("UFO", "ShipBlue_manned.png"); //UFO ENEMY
        //this.load.image(); //projectile  //also not sure which one for now

        this.load.image("spin1", "spinner.png");//spinner ENEMy
        this.load.image("spin2", "spinner_spin.png");


    }

    create(){
        let my = this.my;
        my.sprite.backless4 = this.add.sprite(game.config.width/2, game.config.height/2-2991, "Space4"); //backgrounds
        my.sprite.backless3 = this.add.sprite(game.config.width/2, game.config.height/2-1995, "Space3");
        my.sprite.backless2 = this.add.sprite(game.config.width/2, game.config.height/2-999, "Space2");
        my.sprite.backless = this.add.sprite(game.config.width/2, game.config.height/2, "Space1");
        my.sprite.backless.setScale(3.90);
        my.sprite.backless2.setScale(3.90);
        my.sprite.backless3.setScale(3.90);
        my.sprite.backless4.setScale(3.90);

        my.sprite.Spaceship = this.add.sprite(game.config.width/2, game.config.height - 40, "Spaceship"); //player ship
/*
        my.sprite.bullet = this.add.sprite(-10, -10, "Laser"); //player projectile
        my.sprite.bullet.visible = false;
        */
        my.sprite.Worm = this.add.sprite(500, 100, "worm1");
        my.sprite.Worm2 = this.add.sprite(500, 100, "worm2");
        my.sprite.Worm2.flipY = true;
        my.sprite.Worm.flipY = true;
        my.sprite.Worm2.visible = false;

        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.win = this.input.keyboard.addKey("P");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.playerSpeed = 15;
        this.bulletSpeed = 10;
        this.scorecount = 0;
        this.count = 0;
        this.lives = 3;
        this.LastOneLeft = false;
        this.second = 0;
        this.cooldown = 180;

        this.add.text(20, 10, "Score: ",{ 
            fontSize: 20
        });


        this.add.text(780, 10, "Lives: ",{ 
            fontSize: 20
        });

        my.sprite.life1 = this.add.sprite(880, 20, "Lives");
        my.sprite.life2 = this.add.sprite(920, 20, "Lives");
        my.sprite.life3 = this.add.sprite(960, 20, "Lives");

        /* temp
        my.sounds = this.sound.play("Musictime", {
            volume: 0.5,
            loop: true
        });
        */

    }

    update(){
        let my = this.my;

        my.sprite.backless.y +=2; //scrolling background code
        my.sprite.backless2.y +=2;
        my.sprite.backless3.y +=2;
        my.sprite.backless4.y +=2;
        

        if(my.sprite.backless.y > 3000) {
            my.sprite.backless.y -= 4000;
        }
        if(my.sprite.backless2.y > 3000) {
            my.sprite.backless2.y -= 4000;
        }
        if(my.sprite.backless3.y > 3000) {
            my.sprite.backless3.y -= 4000;
        }
        if(my.sprite.backless4.y > 3000) {
            my.sprite.backless4.y -= 4000;
        }


        if(this.second == 30) {//worm "Animation"
            my.sprite.Worm.visible = !my.sprite.Worm.visible;
            my.sprite.Worm2.visible = !my.sprite.Worm2.visible;
            this.second = 0;
        }
        else{
            this.second += 1;
        }


        if (this.left.isDown) {//go left
            if (my.sprite.Spaceship.x > (my.sprite.Spaceship.displayWidth/2)) {
                my.sprite.Spaceship.x -= this.playerSpeed;
            }
        }

        if (this.right.isDown) {//go right
            if (my.sprite.Spaceship.x < (game.config.width - (my.sprite.Spaceship.displayWidth/2))) {
                my.sprite.Spaceship.x += this.playerSpeed;
            }
        }
        
        if ((Phaser.Input.Keyboard.JustDown(this.win)) ) { //game may be hard, so this option is just to see the end.
            this.count += 1;
            if(this.count == 10){
                this.game.sound.stopAll();
                this.LastOneLeft = true;
            }
        }

        
        if (Phaser.Input.Keyboard.JustDown(this.space)) {// CHANGE THIS!!!!!!!!
            if (my.sprite.bullet.length < this.maxbullet) {
                my.sprite.bullet.push(this.add.sprite(
                    my.sprite.Spaceship.x, my.sprite.Spaceship.y-(my.sprite.Spaceship.displayHeight/2), "Laser")
                );
            }
        }

        for(let bullet of my.sprite.bullet){
            bullet.y -= this.bulletSpeed; 
        }

        my.sprite.Worm.y += 5;
        my.sprite.Worm2.y += 5;
        if(my.sprite.Worm.y > 700) {
            my.sprite.Worm.y -= 900;
            my.sprite.Worm2.y -= 900;
            my.sprite.Worm.x = Math.random()*config.width;
            my.sprite.Worm2.x = my.sprite.Worm.x;
        }

        
        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));

        
        for (let bullet of my.sprite.bullet) {
            if(this.collides(my.sprite.Worm, bullet)){
                bullet.y = -100;
                my.sprite.Worm.visible = false;
                my.sprite.Worm2.visible = true;
                my.sprite.Worm.y -= 400;
                my.sprite.Worm2.y -= 400;
                my.sprite.Worm.x = Math.random()*config.width;
                my.sprite.Worm2.x = my.sprite.Worm.x;
                this.scorecount += 1;
            }
        }

            
        this.cooldown += 1;
        /*
        for(let enemy of my.sprite.enemy) {

        }
        */
        if(this.collides(my.sprite.Worm, my.sprite.Spaceship) && this.cooldown > 120){ //lives system
            if(this.lives == 3) {    
                my.sprite.life3.visible = false;
                this.lives -= 1;
            }
            else if(this.lives == 2) {    
                my.sprite.life2.visible = false;
                this.lives -= 1;
            }
            else if(this.lives == 1) {    
                my.sprite.life1.visible = false;
                this.lives -= 1;
            }
            else{

                this.scene.start("ending");
            }
            this.cooldown = 0;

        }
        else if(this.cooldown < 114 && this.cooldown % 5 == 0){
            my.sprite.Spaceship.visible = !my.sprite.Spaceship.visible; 
        }

        if(this.LastOneLeft) {//If no enemies left, End the game.
            this.scene.start("ending");
        }
        
        this.add.text(100, 10, this.scorecount,{ //
            fontSize: 20
        });

    }

    
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
}