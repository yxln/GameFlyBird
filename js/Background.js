class Background {
    constructor(game, speend= 2) {
        this.game = game;
        this.x = 0;
        this.speed = speend;

        this.img = this.game.images["background-day"];

    }

    update(isRender) {
        this.x -= this.speed;

        if (this.x < - this.img.width) {
            this.x = 0;
        }

        if (isRender) {
            this.render();
        }
    }

    render() {
        this.game.fillRect("#4dc1cb", 0, 0, this.game.canvasW, this.game.canvasH);

        let bgImg = this.img;
        this.game.draw(bgImg, 0, 0, this.x, this.game.winHeight - bgImg.height, bgImg.width, bgImg.height)
        this.game.draw(bgImg, 0, 0, this.x + bgImg.width, this.game.winHeight - bgImg.height, bgImg.width, bgImg.height)
        this.game.draw(bgImg, 0, 0, this.x + bgImg.width * 2, this.game.winHeight - bgImg.height, bgImg.width, bgImg.height)
        this.game.draw(bgImg, 0, 0, this.x + bgImg.width * 3, this.game.winHeight - bgImg.height, bgImg.width, bgImg.height)
        this.game.draw(bgImg, 0, 0, this.x + bgImg.width * 4, this.game.winHeight - bgImg.height, bgImg.width, bgImg.height)
        this.game.draw(bgImg, 0, 0, this.x + bgImg.width * 5, this.game.winHeight - bgImg.height, bgImg.width, bgImg.height)
    }

}