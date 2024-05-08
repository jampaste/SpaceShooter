class Introduction extends Phaser.Scene{

    constructor() {
        super("introduction");
        this.my = {sprite: {}};   
        this.bulletActive = false;
    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("button", "buttonBlue.png");
        this.load.image("background", "blue.png");
        this.load.audio("yay", "yay.mp3");
    }

    create(){
        let my = this.my;
        my.sprite.background = this.add.sprite(game.config.width/2, game.config.height/2, "background"); //main background
        my.sprite.background.setScale(3.90);

        my.sprite.button = this.add.sprite(game.config.width/2, game.config.height/2, "button"); //start button
        my.sprite.credit = this.add.sprite(game.config.width/2, game.config.height/2 + 100, "button"); //credits button

        this.add.text(500, 70, "Space Shooter!",{  //title
            fontSize: 80
        }).setOrigin(0.5);

        this.add.text(500, 250, "START",{ 
            fontSize: 30,
            color: "#000"
        }).setOrigin(0.5);
        
        this.add.text(500, 350, "CREDITS/CONTROLS",{ 
            fontSize: 20,
            color: "#000"
        }).setOrigin(0.5);

        my.sprite.button.setInteractive({useHandCursor: true}); //for making pointerdown work 
        my.sprite.credit.setInteractive({useHandCursor: true});

        my.sprite.button.on("pointerdown", () => {
            this.scene.start("game");
        });

        my.sprite.credit.on("pointerdown", () => { //shows credit scene without making new scene.
            my.sprite.creds = this.add.sprite(500, 250, "background"); //covers previous options 
            my.sprite.creds.setScale(3.9);
            my.sprite.creds.setInteractive({useHandCursor: true}); //makes credits background interactible
    
            my.credits = this.add.text(50, 50, "CREDITS:\nMade by James Chen          Assets by Kenney Assets     Work for CMPM 120            Made with Phaser in Javascript Press A to move left\nPress D to move right\nPress Space to shoot a bullet",{ 
                fontSize: 50,
                wordWrap: {
                    width: 950
                }
            });   //credits

            my.sprite.creds.on("pointerdown", () => { //removes the credits screen.
                my.sprite.creds.destroy();
                my.credits.destroy();
            });
        });
    }

    update(){
    }
}