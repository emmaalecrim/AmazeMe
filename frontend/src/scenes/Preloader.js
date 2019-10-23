//jshint esversion:6
import Koji from '@withkoji/vcc';

class Preloader extends Phaser.Scene{
    constructor()
    {
        super({key: 'preloader' });
    }

    preload()
    {

        let progress = this.add.graphics();
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(Koji.config.settings.backgroundColor , 1);
            progress.fillRect(0, (this.sys.game.config.height / 2) - 30, this.sys.game.config.width * value, 60);
        });
        this.load.on('complete', () => {
            progress.destroy();
        });
        
        this.load.image('tiles', Koji.config.assets.tileset);
        
        for(let i = 0;i < 16; i++)
        {
            this.load.tilemapTiledJSON('map' + i, Koji.config.assets.mapArray[i]);
        }

        
        this.load.spritesheet('player', Koji.config.settings.playerImg, {frameWidth: Koji.config.settings.playerImgSize, frameHeight: Koji.config.settings.playerImgSize});
        
        this.load.image('gamepaused', Koji.config.assets.gamepaused );

    }
    
    create()
    {
        this.scene.start(this.startPosition.startScene);
    }
}

export default Preloader;