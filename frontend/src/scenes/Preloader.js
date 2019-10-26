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

        
        this.load.image('player', Koji.config.settings.playerImg || "https://images.koji-cdn.com/f852518e-69be-4b7d-9c6d-c224dfe35cd0/rhp2y-player.png" ); 
        
        //this.load.image('gamepaused', Koji.config.assets.gamepaused );

        this.load.image('playIcon', Koji.config.settings.menuIcon ||"https://images.koji-cdn.com/f852518e-69be-4b7d-9c6d-c224dfe35cd0/s51bz-playIcon.png");

        this.load.image('retryIcon', Koji.config.settings.retryIcon ||"https://images.koji-cdn.com/f852518e-69be-4b7d-9c6d-c224dfe35cd0/nvuhq-retryIcon.png");
    }
    
    create()
    {
        this.scene.start('menu');
    }
}

export default Preloader;