import { Container } from 'pixi.js';
import { Wheel, WheelStates } from './Wheel';
import { Button } from './Button';
import Assets from './utils/Assets';
import { SectorSelector } from './SectorSelector';
import { getRandomInt } from './utils/Random';

export class Game extends Container {
    private wheel: Wheel;
    private startButton: Button;
    private stopButton: Button;
    private sectorSelector: SectorSelector;

    constructor() {
        super();

        this.wheel = new Wheel();
        this.wheel.position.set(400);
        this.wheel.on(Wheel.EVENT_STATE_CHANGE, this.onWheelChangeState, this);
        this.addChild(this.wheel);

        const controlsContainer = new Container();
        controlsContainer.position.set(800, 250);
        this.addChild(controlsContainer);

        this.sectorSelector = new SectorSelector();
        controlsContainer.addChild(this.sectorSelector);

        this.startButton = new Button(Assets.sprite('btn_start'), Assets.sprite('btn_start_disable'));
        this.startButton.y = this.sectorSelector.height + 20;
        this.startButton.on(Button.EVENT_CLICK, this.onStartButtonClicked, this);
        controlsContainer.addChild(this.startButton);

        this.stopButton = new Button(Assets.sprite('btn_stop'), Assets.sprite('btn_stop_disable'));
        this.stopButton.y = this.startButton.y + this.startButton.height + 10;
        this.stopButton.on(Button.EVENT_CLICK, this.onStopButtonClicked, this);
        this.stopButton.setEnabled(false);
        controlsContainer.addChild(this.stopButton);
    }

    private onWheelChangeState(state: WheelStates): void {
        switch (state) {
            case WheelStates.IDLE:
                this.startButton.setEnabled(true);
                this.sectorSelector.setEnabled(true);
                break;
            case WheelStates.ACCELERATION:
                this.startButton.setEnabled(false);
                this.sectorSelector.setEnabled(false);
                break;
            case WheelStates.ROTATION:
                this.stopButton.setEnabled(true);
                break;
            case WheelStates.DECELERATION:
                this.stopButton.setEnabled(false);
                break;
        }
    }

    private onStartButtonClicked(): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        let stopSector = this.sectorSelector.getValue();
        if (isNaN(stopSector)) {
            stopSector = getRandomInt(1, 12);
        }

        this.wheel.start(stopSector);
    }

    private onStopButtonClicked(): void {
        this.wheel.stop();
    }
}
