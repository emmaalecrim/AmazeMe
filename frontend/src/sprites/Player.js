//jshint esversion:6
// This file contains creation and updating settings for the Player Sprite.
// This is great because it separates the sprite and it's game mechanics in two abstraction layers

class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key, frame, facing) {
        super(scene, x, y, key, frame);
        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.setDepth(1);
        this.setSize(20, 20 , true);
        this.setCollideWorldBounds(true);

        // tweak stuff
        this.speedMax = 120;
        this.speedChange = 10;
        this.jumpPower = 278;

        // not tweakable
        this.facing = facing || 'right';
        this.idle = false;
        this.jumpTimer = 0;
        this.moveSpeed = 0;
        this.ani = 'idle-left';
        this.alive = true;

        let anims = this.anims.animationManager;

        if (!anims.get('idle-left')) {
            anims.create({
                key: 'idle-left',
                frames: anims.generateFrameNumbers('player', { start: 0, end: 0 }),
                frameRate: 4,
                repeat: -1
            });
        }
        if (!anims.get('idle-right')) {
            anims.create({
                key: 'idle-right',
                frames: anims.generateFrameNumbers('player', { start: 1, end: 1 }),
                frameRate: 4,
                repeat: -1
            });
        }

        
    }

    update(controls, time, delta) {

        if (!this.alive) {
            return;
        }

        
        this.runAndJump(controls, time, delta);

        this.anims.play(this.ani, true);
        
    }

    runAndJump(controls, time, delta)
    {
        this.body.setVelocityX(0);
        this.body.allowGravity = true;

        if (controls.left) {

            this.moveSpeed -= this.speedChange;
            this.moveSpeed = Math.max(this.moveSpeed, -this.speedMax);
            this.body.setVelocityX(this.moveSpeed);
            this.ani = 'idle-left';
            

        } else if (controls.right) {

            this.moveSpeed += this.speedChange;
            this.moveSpeed = Math.min(this.moveSpeed, this.speedMax);
            this.body.setVelocityX(this.moveSpeed);

            this.ani = 'idle-right';

        } else {

            this.moveSpeed += (0 - this.moveSpeed) / 2;
            this.body.setVelocityX(this.moveSpeed);

            this.idle = true;

        }

        if (controls.aDown && (this.body.onFloor() || this.body.onWall()) && time > this.jumpTimer) {
            this.body.setVelocityY(-this.jumpPower);
            this.jumpTimer = time + 250;
        }

        // if (this.body.onFloor()) {

        //     if (this.idle) {

        //         if (this.facing === 'left') {
        //             this.ani = 'idle-left';
        //         } else {
        //             this.ani = 'idle-right';
        //         }

        //     } else {

        //         if (this.facing === 'left') {
        //             this.ani = 'run-left';
        //         } else {
        //             this.ani = 'run-right';
        //         }

        //     }

        // }

    }

    disappear()
    {
        this.alive = false;
        this.visible = false;
        this.body.enable = false;
    }
}

export default Player;