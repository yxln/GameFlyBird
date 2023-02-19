class Land {
    constructor(game, speend = 2) {
        this.game = game;
        this.x = 0;
        this.speed = speend;
        this.img = this.game.images["base"];

        this.height = this.img.height;

    }

    update(isRender) {
        this.x -= this.speed;
        if (this.x < -this.img.width) {
            this.x = 0;
        }

        isRender && this.render();
    }

    render() {

        let bgImg = this.img;

        this.game.draw(bgImg, 0, 0, this.x, this.game.canvasH - bgImg.height, bgImg.width, bgImg.height);
        this.game.draw(bgImg, 0, 0, this.x + bgImg.width * 1, this.game.canvasH - bgImg.height, bgImg.width, bgImg.height);
        this.game.draw(bgImg, 0, 0, this.x + bgImg.width * 2, this.game.canvasH - bgImg.height, bgImg.width, bgImg.height);
        this.game.draw(bgImg, 0, 0, this.x + bgImg.width * 3, this.game.canvasH - bgImg.height, bgImg.width, bgImg.height);
        this.game.draw(bgImg, 0, 0, this.x + bgImg.width * 4, this.game.canvasH - bgImg.height, bgImg.width, bgImg.height);
    }

}