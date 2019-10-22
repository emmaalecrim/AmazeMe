//jshint esversion:6
import Level from './Level.js';
import Koji from '@withkoji/vcc';

class MazeLevel extends Level
{
    constructor(config)
    {
        super((config) ? config : { key: 'mazelevel' });
        this.prefabShardWidth = 128;
        this.prefabShardHeight = 128;
        this.prefabMapWidth = 0;
        this. prefabMapHeight = 0;
    }

    create()
    {
        super.create();
        // adds the player  per Level.js
        this.addPlayer({x: this.startPosition.x, y: this.startPosition.y});
        //generates the maze
        let maze = this.maze.generate(32,8);
        //creates entry and exit points
        this.maze.openTopLeft();
        this.maze.openBottomRight();

        this.prefabMapWidth = this.prefabShardWidth * this.maze.gridWidth;
        this.prefabMapHeight = this.prefabShardHeight * this.maze.gridHeight;

        this.cameras.main.setBounds(16,0,this.prefabMapWidth - 32, this.prefabMapHeight);
        this.physics.world.setBounds(0,0,this.prefabMapWidth, this.prefabMapHeight);

        let tiledata = this.maze.createMapData({ key: 'map', shardW: 16, shardH: 16});

        let map = this.make.tilemap({data: tiledata, tileWidth: 8, tileHeight: 8});
        let tiles = map.addTilesetImage('tiles', 'tiles',8,8,0,0);
        let layer = map.createStaticLayer(0,tiles,0,0);
        map.setCollisionBetween(192,255);
        this.physics.add.collider(this.player, layer);

        this.addExit({ scene: 'mazelevel', w: 496, startX: 4032, startY: 960, facing: 'left' });
        this.addExit({ scene: 'mazelevel', x: 4080, startX: 64, startY: 64, facing: 'right' });

        //this is the background color to be added as VCC
        this.cameras.main.setBackgroundColor(Koji.config.settings.backgroundColor) ; 

        this.postCreate();
    }

    update(time,delta)
    {
        this.player.update(this.controls,time,delta);
        this.checkExits();
    }
}

export default MazeLevel;