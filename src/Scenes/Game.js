class Gamertime extends Phaser.Scene{
    //TO DO: 
    //CREATE EACH ENEMY
    //PUT THEM IN GROUP
    //CREATE "WAVES"
    //CREATE WIN CONDITION
    //
    constructor() {
        super("game");
        this.my = {sprite: {}};   
        this.bulletActive = false;
        this.my.sprite.bullet = [];
        this.maxbullet = 5;
        this.temp = Math.abs(Math.random()*config.width - 50);
       
    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("Spaceship", 'playerShip1_blue.png'); //player sprite

        this.load.image("Space1","black.png"); //backgrounds
        this.load.image("Space2","blue.png");
        this.load.image("Space3","darkPurple.png");
        this.load.image("Space4","Purple.png");

        this.load.image("Lives", "playerLife1_blue.png");//lives 

        this.load.image("Laser", "laserBlue01.png"); //bullets

        this.load.audio("Musictime", "Space.mp3"); //main audio

        this.load.audio("pew", "laserSmall_003.ogg"); //laser audio
        this.load.audio("boom", "explosionCrunch_000.ogg"); //thing destroyed

        this.load.image("worm1", "snakeSlime.png"); //Worm Enemy

        this.load.image("fish1", "fishGreen.png"); //fish Enemy

        this.load.image("rock", "spaceMeteors_001.png");//Falling rocks 

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
        
        my.sprite.Worm = this.add.sprite(this.temp, 0, "worm1");
        my.sprite.Worm.flipY = true;

        my.sprite.Fish = this.add.sprite(this.temp, -250, "fish1");
        
        this.temp = Math.abs(Math.random()*config.width - 50);

        my.sprite.Rock = this.add.sprite(this.temp, -200, "rock");

        my.sprite.enemy = this.add.group({
            active: true,
            defaultKey: "enemies",
            maxSize: 10,
            runChildUpdate: true
        });

        my.sprite.enemy.add(my.sprite.Worm);
        my.sprite.enemy.add(my.sprite.Fish);

        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.win = this.input.keyboard.addKey("P");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.playerSpeed = 15;
        this.bulletSpeed = 10;
        this.scorecount = 0;
        this.count = 0;
        this.lives = 2;
        this.LastOneLeft = false;
        this.cooldown = 180;
        this.bob = 0;


        this.add.text(20, 10, "Score: ",{ //UI ELEMENTS STARTING FROM HERE...
            fontSize: 20
        });

        this.add.text(780, 10, "Lives: ",{ 
            fontSize: 20
        });

        this.bimmy =  this.add.text(100, 10, this.scorecount,{ 
            fontSize: 20
        });

        my.sprite.life1 = this.add.sprite(880, 20, "Lives");
        my.sprite.life2 = this.add.sprite(920, 20, "Lives");
        my.sprite.life3 = this.add.sprite(960, 20, "Lives"); //...TO HERE.

        my.sounds = this.sound.play("Musictime", {//music for taste, used outside one.
            volume: 0.5,
            loop: true
        });   

        
        document.getElementById('description').innerHTML = '<h2>Space Shooter Game</h2><br>A: left // D: right // Space: fire/emit // P: press 5 times to win instantly <br> To win: Get 20 points. // '
    }

    update(){
        let my = this.my;

        my.sprite.backless.y +=2; //scrolling background code
        my.sprite.backless2.y +=2;
        my.sprite.backless3.y +=2;
        my.sprite.backless4.y +=2;
        
        this.bob += 1;
        if(this.bob == 360) {
            this.bob = 0;
        }

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
            if(this.count == 5){
                this.LastOneLeft = true;
            }
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            if (my.sprite.bullet.length < this.maxbullet) {
                my.sprite.bullet.push(this.add.sprite(
                    my.sprite.Spaceship.x, my.sprite.Spaceship.y-(my.sprite.Spaceship.displayHeight/2), "Laser")
                );
                this.sound.play("pew");
            }
        }

        for(let bullet of my.sprite.bullet){
            bullet.y -= this.bulletSpeed; 
        }

        my.sprite.Rock.y += 5;
        my.sprite.Rock.x += Math.random()*2 - 1;
        if(my.sprite.Rock.y > 700) {
            my.sprite.Rock.y -= 900;
            my.sprite.Rock.x = Math.abs(Math.random()*config.width - 50);
        }
        
        my.sprite.Worm.y += 10;
        my.sprite.Worm.x += Math.random()*2 - 1;
        if(my.sprite.Worm.y > 700) {
            my.sprite.Worm.y -= 900;
            my.sprite.Worm.x = Math.abs(Math.random()*config.width - 50);
        }

        
        my.sprite.Fish.y += Math.random()*7;
        my.sprite.Fish.x += Math.random()*70 - 35;
        if(my.sprite.Fish.y > 700) {
            my.sprite.Fish.y -= 900;
            my.sprite.Fish.x = Math.abs(Math.random()*config.width - 50);
        }

        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));

        
        
        for (let bullet of my.sprite.bullet) {
            if(this.collides(my.sprite.Rock, bullet)){
                bullet.y = -100;
            }
            for(let enemy of my.sprite.enemy.getChildren()) {
                if(this.collides(enemy, bullet)){
                    bullet.y = -100;
                    enemy.visible = false;
                    enemy.y -= 400;
                    enemy.x = Math.abs(Math.random()*config.width - 50);
                    enemy.visible = true;
                    this.scorecount += 1;
                    this.sound.play("boom");
                }
            }
        }
            
        this.cooldown += 1; //cooldown is for getting damaged
        
        for(let enemy of my.sprite.enemy.getChildren()) {
            if((this.collides(enemy, my.sprite.Spaceship) || this.collides(my.sprite.Rock, my.sprite.Spaceship)) && this.cooldown > 120){ //lives system
                if(this.lives == 2) {    
                    my.sprite.life3.visible = false;
                    this.lives -= 1;
                }
                else if(this.lives == 1) {    
                    my.sprite.life2.visible = false;
                    this.lives -= 1;
                }
                else{    
                    this.game.sound.stopAll();
                    this.scene.start("ending2");
                }
                this.cooldown = 0;
            }
        }
        
        if(this.cooldown < 116 && this.cooldown % 5 == 0){
            my.sprite.Spaceship.visible = !my.sprite.Spaceship.visible; 
        }

        if(this.scorecount > 20 || this.LastOneLeft == true) {//If no enemies left, End the game.
            
            this.game.sound.stopAll();
            this.scene.start("ending");
        }
        
        this.bimmy.destroy(); 
        this.bimmy = this.add.text(100, 10, this.scorecount,{ //Resetting scorecount
            fontSize: 20
        });
    }
    
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
}