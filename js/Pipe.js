class Pipe {
    constructor(game, speed = 2) {
        this.game = game;

        this.speed = speed;
        this.x = this.game.canvasW;
        this.pipeGap = Math.random() * (this.game.cheatDiff.maxPipeGap - this.game.cheatDiff.minPipeGap) + this.game.cheatDiff.minPipeGap;

        let pipeAvgHeight = (this.game.canvasH - this.game.land.height - this.game.cheatDiff.maxPipeGap) / 2;

        this.upPipeH = Math.random() * (pipeAvgHeight * 0.5) + pipeAvgHeight * 0.5;

        this.downPipeH = this.game.canvasH - this.game.land.height - this.upPipeH - this.pipeGap;

        this.imgDown = this.game.images["pipe-green-down"];
        this.imgUp = this.game.images["pipe-green-up"];

    }

    update(isRender) {

        if (this.x < -this.imgDown.width) {
            return false;
        }
        let bridX = this.game.bird.x + this.game.bird.width /2,
            birdY = this.game.bird.y - this.game.bird.height /2;

        if(this.x < bridX && this.x + this.imgDown.width > bridX && (birdY < this.upPipeH || birdY + this.game.bird.height >  this.upPipeH + this.pipeGap)) {
            throw Error('你输了！');
        }

        this.x -= this.speed;
        isRender && this.render();

        return true;

    }

    render() {

        this.game.draw(this.imgDown, 0, 0, this.x, this.game.canvasH - this.downPipeH - this.game.land.height, this.imgDown.width, this.downPipeH);
        if(this.downPipeH > this.imgDown.height) {
            this.game.draw(this.imgDown, 0, 30, this.x, this.game.canvasH - this.downPipeH - this.game.land.height + this.imgDown.height, this.imgDown.width, this.downPipeH - this.imgDown.height);
        }

        if (this.upPipeH > this.imgUp.height) {
            // 上管道不够长，上半部分接一段
            this.game.draw(this.imgUp, 0, 0, this.x, 0, this.imgUp.width, this.upPipeH - this.imgUp.height);
        }
        this.game.draw(this.imgUp, 0, this.imgDown.height - this.upPipeH, this.x, 0, this.imgDown.width, this.upPipeH);

    }


}
