class SceneManager {
    constructor(game) {
        this.game = game;
        this.score = 0;

        this.scene = 0;
        this.fps = 10;

        this.initialize();
    }

    initialize() {
        this.renderScene();
        this.initEvents();
    }

    renderScene() {
        switch (this.scene) {
            case SceneType.WELCOME:
                this.game.bg = new Background(this.game);
                this.game.land = new Land(this.game);
                this.game.bird = new Bird(this.game);
                this.game.pipes = [];
                let pipeInterval = 0,
                    nextPipeInterval = Math.random() * (this.game.cheatDiff.maxPipeInterval - this.game.cheatDiff.minPipeInterval) + this.game.cheatDiff.minPipeInterval;

                this.score = 0;

                let interval = this.getInterval(() => {
                    try {
                        this.game.clear();
                        this.game.bg.update(true);
                        this.game.context.font = '20pt 宋体';
                        this.game.context.fillStyle = '#fff';
                        this.game.context.fillText(this.score + '', 10, 30);
                        this.game.land.update(true);
                        this.game.bird.update(true);

                        if(this.score > 0 && this.score % 5 == 0) {
                            this.game.cheatDiff.minPipeGap > 80 && (this.game.cheatDiff.minPipeGap-=2);
                            this.game.cheatDiff.maxPipeGap > 120 && (this.game.cheatDiff.maxPipeGap-=2);
                            console.log(this.game.cheatDiff.minPipeGap, this.game.cheatDiff.maxPipeGap)
                        }

                        if (pipeInterval++ > nextPipeInterval) {
                            this.game.pipes.push(new Pipe(this.game));
                            pipeInterval = 0;
                            nextPipeInterval = Math.random() * (this.game.cheatDiff.maxPipeInterval - this.game.cheatDiff.minPipeInterval) + this.game.cheatDiff.minPipeInterval;
                        }


                        for (let i = 0, len = this.game.pipes.length; i < len; i++) {
                            if (!this.game.pipes[i].update(true)) {
                                this.game.pipes.splice(i, 1);
                                i--;
                                len--;
                                this.score++;
                                this.game.context.font = '20pt 宋体';
                                this.game.context.fillStyle = '#fff';
                                this.game.context.fillText(this.score + '', 10, 30);
                            }
                        }
                    } catch (e) {
                        this.scene = SceneType.OVER;
                        this.renderScene();
                        clearInterval(interval);
                    }
                });
                break;
            case SceneType.OVER:
                this.game.context.font = '20pt 宋体';
                this.game.context.fillStyle = '#fff';
                this.game.context.fillText('你也就只能到这里了！', this.game.canvasW / 2 - 120, this.game.canvasH / 2 - 30);
                break;
            default:
                break;
        }
    }

    getInterval(hanlder) {
        return setInterval(hanlder, this.fps);
    }

    initEvents() {
        this.game.canvas.addEventListener('click', (e) => {
            switch (this.scene) {
                case SceneType.WELCOME:
                    this.game.bird.birdState = 'up';
                    this.game.bird.speed = this.game.bird.initialSpeed;
                    break;
                case SceneType.OVER:
                    this.scene = SceneType.WELCOME;
                    this.renderScene();
                    break;
            }

        });

    }


}

class SceneType {
}

SceneType.WELCOME = 0;
SceneType.GAMING = 1;
SceneType.OVER = 2;



