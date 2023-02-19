class Bird{
    constructor(game) {
        this.game = game;
        this.downbirdImg = this.game.images['bluebird-downflap'];
        this.width = this.downbirdImg.width;
        this.height = this.downbirdImg.height;

        this.accSpeed = 0.1; // 加速度
        this.upAccSpeed = 0.3; // 上升加速度
        this.initialSpeed = 5.5; // 加速度
        this.speed = 0;
        this.rotate = 0.1 ;
        this.x = this.game.canvasW / 2 - 100;
        this.y = (this.game.canvasH - this.game.land.height) / 2 - 200;

        this.birdState = 'down';

    }

    update() {
        if(this.birdState == 'up') {
            this.speed-=this.upAccSpeed;
            if(this.speed<=0) {
                this.birdState = 'down';
                this.speed = 0;
            }
            this.y-=this.speed;
        }else if(this.birdState == 'down') {
            this.speed+=this.accSpeed;
            this.y+=this.speed;
        }

        if(this.y > this.game.canvasH - this.game.land.height- 20) {
            this.y = this.game.canvasH - this.game.land.height- 20;
        }

        this.rotate += 0.1;
        if(this.rotate > Math.PI * 100) {
            this.rotate = 0;
        }
        this.render();
    }

    render(){

        if(this.rotate > 0) {
            this.game.save();
            this.game.translate(this.x, this.y);
            this.game.rotate(this.rotate);
            this.game.draw(this.downbirdImg, 0, 0, 0 - this.downbirdImg.width / 2,0 - this.downbirdImg.height / 2, this.downbirdImg.width,this.downbirdImg.height);
            this.game.restore();
        }else {
            this.game.draw(this.downbirdImg, 0, 0, this.x, this.y, this.downbirdImg.width,this.downbirdImg.height);
        }

    }

}