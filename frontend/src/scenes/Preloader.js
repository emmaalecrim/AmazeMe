//jshint esversion:6

class Preloader extends Phaser.Scene{
    constructor()
    {
        super({key: 'preloader' });
    }

    preload()
    {
        //maybe add loading graphics as VCC later?
        
        this.load.image('tiles', './assets/tiles.png');
        for(let i = 0;i < 16; i++)
        {
            this.load.tilemapTiledJSON('map' + i, './assets/map' + i + '.json');
        }

        //The player image will be VCC
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 20, frameHeight: 20});
        // the game paused image will also be a VCC
        this.load.image('gamepaused', './assets/gamepaused.png');

    }
    
    create()
    {
        this.scene.start(this.startPosition.startScene);
    }
}

export default Preloader;