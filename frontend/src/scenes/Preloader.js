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
            progress.fillStyle(Koji.config.settings.backgroundColor || "#d76b6b", 1);
            progress.fillRect(0, (this.sys.game.config.height / 2) - 30, this.sys.game.config.width * value, 60);
        });
        this.load.on('complete', () => {
            progress.destroy();
        });
        
        this.load.image('tiles', Koji.config.assets.tileset || "https://images.koji-cdn.com/f852518e-69be-4b7d-9c6d-c224dfe35cd0/pbnvu-tiles.png");
        
        for(let i = 0;i < 16; i++)
        {
            this.load.tilemapTiledJSON('map' + i, Koji.config.assets.mapArray[i] || ("./assets/map" + i + ".josn" ));
        }

        
        this.load.spritesheet('player', Koji.config.settings.playerImg || "https://images.koji-cdn.com/f852518e-69be-4b7d-9c6d-c224dfe35cd0/vla98-player1.png", {frameWidth: Koji.config.settings.playerImgSize || 20, frameHeight: Koji.config.settings.playerImgSize || 20});
        
        this.load.image('gamepaused', Koji.config.assets.gamepaused ||"https://images.koji-cdn.com/f852518e-69be-4b7d-9c6d-c224dfe35cd0/i0eh8-gamepaused.png");

    }
    
    create()
    {
        this.scene.start(this.startPosition.startScene);
    }
}

export default Preloader;