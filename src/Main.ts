import { Application } from 'pixi.js';
import Assets from './utils/Assets';
import { Game } from './Game';

class Main {
    private app: Application;

    constructor() {
        this.app = new Application({
            width: 1024,
            height: 768,
            backgroundColor: 0xcccccc,
            view: document.getElementById('game') as HTMLCanvasElement,
        });

        this.app.view.addEventListener('contextmenu', (event) => event.preventDefault());

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.startLoading();
    }

    private async startLoading(): Promise<void> {
        await Assets.load();

        this.onLoaded();
    }

    private onLoaded(): void {
        this.app.stage.addChild(new Game());
    }
}

window.onload = () => {
    new Main();
};
