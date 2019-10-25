//jshint esversion:6
class Menu extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'menu'});
    }
    
    create()
    {   
        let butOn = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'playIcon');
        
        butOn.setInteractive();
        butOn.on('pointerdown',(e)=>{
            this.scene.start(this.startPosition.startScene);
        });
    }
}
export default Menu;