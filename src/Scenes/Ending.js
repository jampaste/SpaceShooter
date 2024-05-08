class Ending extends Phaser.Scene{

    constructor() {
        super("ending");
        this.my = {sprite: {}};   
        this.bulletActive = false;
    }


    create(){
        
        let my = this.my;


        my.sprite.background = this.add.sprite(game.config.width/2, game.config.height/2, "background"); //main background
        my.sprite.background.setScale(3.90);

        my.sprite.restart = this.add.sprite(game.config.width/2, game.config.height/2, "button"); //Restart button
        my.sprite.return= this.add.sprite(game.config.width/2, game.config.height/2 + 100, "button"); //Return to main menu button

        
        this.add.text(500, 70, "YOU WIN!!!!!",{  //title
            fontSize: 80
        }).setOrigin(0.5);

        this.add.text(500, 250, "RESTART",{ 
            fontSize: 30,
            color: "#000"
        }).setOrigin(0.5);
        
        this.add.text(500, 350, "MAIN MENU",{ 
            fontSize: 30,
            color: "#000"
        }).setOrigin(0.5);

        my.sprite.restart.setInteractive({useHandCursor: true}); //for making pointerdown work 
        my.sprite.return.setInteractive({useHandCursor: true});

        my.sprite.restart.on("pointerdown", () => {
            this.scene.start("game");
        });

        my.sprite.return.on("pointerdown", () => { //Return to main menu
            this.scene.start("introduction");
        });

        this.sound.play("yay");
    }
}
