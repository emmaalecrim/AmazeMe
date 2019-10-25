//jshint esversion:6

class GameOver extends Phaser.Scene
{
    constructor()
    {
        super({key: 'gameover'});
    }

    create()
    {   
        let butOn = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'retryIcon');

        butOn.setInteractive();
        butOn.on('pointerdown',(e)=>{
            butOn.destroy();
            this.scene.start(this.startPosition.startScene);
        });
    }
}

export default GameOver;