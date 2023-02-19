class Game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.images = {};
        this.winWidth = 0;
        this.winHeight = 0;

        this.background = null;

        this.initialize();
    }

    initialize() {
        this.canvas = document.getElementById("_canvas");
        this.context = this.canvas.getContext("2d");
        this.winWidth = this.canvas.width;
        this.winHeight = this.canvas.height;
        this.canvasW = this.canvas.width;
        this.canvasH = this.canvas.height;

        this.cheatDiff = {
            level: 1,
            speed: 2,
            minPipeInterval: 80,
            maxPipeInterval: 160,
            minPipeGap: 200,      // 上下管道的间隙
            maxPipeGap: 330
        }

        this.loadImage(() => {
            this.start();
        });
    }

    start() {
        new SceneManager(this);

    }

    draw(image, imageX, imageY, x, y,  w, h) {
        this.context.drawImage(image, imageX, imageY, w, h, x, y, w, h);
    }

    save() {
        this.context.save();
    }

    restore() {
        this.context.restore();
    }

    translate(x,y){
        this.context.translate(x,y);
    }

    rotate(rotate){
        this.context.rotate(rotate);
    }

    clear(){
        this.context.clearRect(0,0, this.canvas.width,this.canvas.height);
    }

    fillRect(color,x,y,w,h){
        this.context.fillStyle = color;
        this.context.fillRect(x,y,w,h);
    }

    loadImage(handler) {
        let imgs = {
            "0": "./img/0.png",
            "1": "./img/1.png",
            "2": "./img/2.png",
            "3": "./img/3.png",
            "4": "./img/4.png",
            "5": "./img/5.png",
            "6": "./img/6.png",
            "7": "./img/7.png",
            "8": "./img/8.png",
            "9": "./img/9.png",
            "background-day": "./img/background-day.png",
            "background-night": "./img/background-night.png",
            "base": "./img/base.png",
            "bluebird-downflap": "./img/bluebird-downflap.png",
            "bluebird-midflap": "./img/bluebird-midflap.png",
            "bluebird-upflap": "./img/bluebird-upflap.png",
            "gameover": "./img/gameover.png",
            "message": "./img/message.png",
            "pipe-green-up": "./img/pipe-green-up.png",
            "pipe-green-down": "./img/pipe-green-down.png",
            "pipe-red": "./img/pipe-red.png",
            "redbird-downflap": "./img/redbird-downflap.png",
            "redbird-midflap": "./img/redbird-midflap.png",
            "redbird-upflap": "./img/redbird-upflap.png",
            "yellowbird-downflap": "./img/yellowbird-downflap.png",
            "yellowbird-midflap": "./img/yellowbird-midflap.png",
            "yellowbird-upflap": "./img/yellowbird-upflap.png"
        }

        let len = Object.keys(imgs).length, count = 0;

        for (let key in imgs) {
            let img = new Image();
            img.src = imgs[key];
            img.onload = () => {
                this.images[key] = img;
                if (++count >= len) {
                    handler();
                }
            }
        }
    }


}
