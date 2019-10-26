//jshint esversion:6
import Koji from '@withkoji/vcc';

class Level extends Phaser.Scene {

    constructor (config)
    {
        super((config) ? config : { key: 'level' });
        this.gamepaused = undefined;

        this.player = undefined;
        this.exits = undefined;
        this.counter = 0;
        
    }

    create()
    {
        this.cameras.main.setRoundPixels(true);
        
        
        this.cursors = this.input.keyboard.addKeys({
                up: 'W',
                left: 'A',
                right: 'D'
            });
        this.exits = [];
        this.cameras.main.setBackgroundColor(Koji.config.settings.backgroundColor || "#d76b6b");

        this.swipe = this.rexGestures.add.swipe({
            direction: 1, 
            enable: true
        });
    }

    

    postCreate()
    {

        this.gamepaused = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'gamepaused').setInteractive();
        this.gamepaused.visible = false;
        this.gamepaused.setScrollFactor(0);
        this.gamepaused.setDepth(3);

       
        this.resizeField(this.sys.game.config.width, this.sys.game.config.height);
        
    }

    addPlayer({
        x = 64,
        y = 64
    } = {}) {
        
       
        this.player = this.physics.add.image(x, y, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(300);
        this.player.alive = true;
        this.player.disappear = ()=>{
            this.player.alive = false;
            this.player.visible = false;
            this.player.body.enable = false;
        };
        //Considering a default img that's faced to the left, flipX = true will make it face right.
        this.player.flipX = true;
        this.cameras.main.startFollow(this.player, true);

        this.timer = undefined;
        
    }

    addExit({
        x = -480,
        y = 0,
        w = 512,
        h = 2048,
        startX = 64,
        startY = 64,
        facing = 'right',
        scene = false
    } = {}) {
        if (!scene) {
            return;
        }
        let exit = {
            rect: new Phaser.Geom.Rectangle(x, y, w, h),
            startX: startX,
            startY: startY,
            facing: facing,
            scene: scene
        };
        this.exits.push(exit);
    }

    checkExits()
    {
        if (!this.exits || !this.exits.length || !this.player) {
            return;
        }
        for (let exit of this.exits) {
            if (Phaser.Geom.Rectangle.ContainsPoint(exit.rect, this.player)) {
                //console.log('time to go');
                this.leaveThroughExit(exit);
                this.player.disappear();
                this.counter++;
                this.exits = [];

                break;
            }
        }
    }

    leaveThroughExit({
        startX = 0,
        startY = 0,
        facing = 'right',
        scene = false
    } = {}) {
        if (!scene) {
            return;
        }
        this.startPosition.setExit({ x: startX, y: startY, facing: facing, scene: scene });
        this.cameras.main.once('camerafadeoutcomplete', (camera) => {
            this.scene.start(scene);
        }, this);
        fadeColor = { r: 5, g: 4, b: 4 };
        this.cameras.main.fadeOut(3000, fadeColor.r, fadeColor.g, fadeColor.b);

        this.timer.remove();
    }

    resizeField(w, h)
    {
       
        this.gamepaused.x = w / 2;
        this.gamepaused.y = h / 2;
        if (this.centerMap) {
            this.cameras.main.setBounds((this.centerMap.widthInPixels - w) / 2, (this.centerMap.heightInPixels - h) / 2, w, h);
        }
    }

     onGamePause()
     {
         this.timer.paused = true;
         this.gamepaused.visible = true;
     }
     onGameResume()
     {
         this.timer.paused = false;
         this.gamepaused.visible = false;
     }

  
}

export default Level;