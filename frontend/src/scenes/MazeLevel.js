//jshint esversion:6
import Level from './Level.js';
import Koji from '@withkoji/vcc';

class MazeLevel extends Level {
    constructor(config) {
        super((config) ? config : { key: 'mazelevel' });
        this.prefabShardWidth = 128;
        this.prefabShardHeight = 128;
        this.prefabMapWidth = 0;
        this.prefabMapHeight = 0;
    }

    create() {
        super.create();
        // adds the player per Level.js
        this.addPlayer({ x: this.startPosition.x, y: this.startPosition.y });

        //generates the maze
        let maze = this.maze.generate(32, 8);

        //creates entry and exit points
        // this.maze.openTopLeft();
        this.maze.openBottomRight();

        this.prefabMapWidth = this.prefabShardWidth * this.maze.gridWidth;
        this.prefabMapHeight = this.prefabShardHeight * this.maze.gridHeight;

        this.cameras.main.setBounds(16, 0, this.prefabMapWidth - 32, this.prefabMapHeight);
        this.physics.world.setBounds(0, 0, this.prefabMapWidth, this.prefabMapHeight);

        let tiledata = this.maze.createMapData({ key: 'map', shardW: 16, shardH: 16 });

        let map = this.make.tilemap({ data: tiledata, tileWidth: 8, tileHeight: 8 });
        let tiles = map.addTilesetImage('tiles', 'tiles', 8, 8, 0, 0);
        let layer = map.createStaticLayer(0, tiles, 0, 0);
        map.setCollisionBetween(192, 255);
        this.physics.add.collider(this.player, layer);

        // this.addExit({ scene: 'mazelevel', w: 496, startX: 4032, startY: 960, facing: 'left' });
        this.addExit({ scene: 'mazelevel', x: 4080, startX: 64, startY: 64, facing: 'right' });

        //this is the background color to be added as VCC
        this.cameras.main.setBackgroundColor(Koji.config.settings.backgroundColor || "#d76b6b");
        



        this.postCreate();

        //Timer is created here: needs the if added to check if the game needs it
        if(Koji.config.settings.countdown && true)
        {
            this.timer = this.time.delayedCall(((Koji.config.settings.time) ?(Koji.config.settings.time)*1000 : 60000), ()=>{
                this.cameras.main.flash(1500,255,0,0);
                setTimeout(()=>{
                    this.scene.start('gameover');
                },600);
                
            });
        }
        

        this.txt = this.add.text(5,10);
        this.txt.setScrollFactor(0,0);
    }

    update(time, delta) {
       
        if(Koji.config.settings.countdown && true)
        {
            let timeLeft = Math.round(((Koji.config.settings.time)? Koji.config.settings.time : 60) - this.timer.getElapsedSeconds());
            this.txt.setText('Time left:' + timeLeft  + '\nMazes solved:' + this.counter);
            this.txt.setColor( Koji.config.settings.textColor ||"#000");
        }
        

        // flipX = true considers that it's looking right (and that the original img is looking left)
        
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.flipX = false;
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.flipX = true;
        }
        else {
            this.player.setVelocityX(0);

        }

        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-350);
        }
        else if (this.cursors.up.isDown && this.player.body.onWall()) {
            this.player.setVelocityY(-305);
        }

            
            if(this.input.activePointer.wasTouch)
            { 
                if(this.input.activePointer.isDown)
                {
                    this.player.setVelocityX(((this.player.flipX)? 250 : -250));                    
                    if (this.player.body.onFloor()) {
                        this.player.setVelocityY(-350);
                    }
                    else if (this.player.body.onWall()) {
                        this.player.setVelocityY(-305);
                    }
                }
                
                
                this.swipe.on('swipe', ()=> {
                   
                    
                    if(this.swipe.right === true)
                    {
                        this.player.flipX = true;
                    }
                    else
                    {
                        this.player.flipX = false;
                    }
                },this);              
                
            }
            

        


        this.checkExits();

        
    }

    
}

export default MazeLevel;