import { Container, Sprite, Ticker } from 'pixi.js';
import Assets from './utils/Assets';
import { getRandomAngle } from './utils/Random';

export enum WheelStates {
    IDLE = 0,
    ACCELERATION = 1,
    ROTATION = 2,
    DECELERATION = 3,
}

export class Wheel extends Container {
    public static readonly EVENT_STATE_CHANGE: string = 'onStateChange';

    private static readonly INITIAL_SPEED: number = (2 * Math.PI) / 5000;
    private static readonly MAX_SPEED: number = (2 * Math.PI) / 1000;
    private static readonly ACCELERATION_TIME: number = 2000;
    private static readonly TOTAL_WHEEL_SECTORS: number = 12;

    private circle: Sprite;
    private isAcceleration: boolean;
    private isDeceleration: boolean;
    private acceleration: number;
    private speed: number;
    private startedSpeed: number;
    private time: number;
    private inactiveTimer: number;
    private stopSector: number;

    constructor() {
        super();

        this.speed = Wheel.INITIAL_SPEED;
        this.time = 0;

        this.circle = Assets.sprite('circle');
        this.circle.anchor.set(0.5);
        this.addChild(this.circle);

        const pointer = Assets.sprite('pointer');
        pointer.anchor.set(0.5);
        pointer.y = -this.circle.height / 2;
        this.addChild(pointer);

        Ticker.shared.add(this.rotate, this);
    }

    public start(stopSector: number): void {
        this.stopSector = stopSector;

        this.isAcceleration = true;
        this.startedSpeed = this.speed;
        this.acceleration = this.calcAcceleration(this.startedSpeed);
        this.time = 0;

        this.changeState(WheelStates.ACCELERATION);
    }

    public stop(): void {
        this.isDeceleration = true;
        this.startedSpeed = this.speed;
        this.acceleration = this.calcDeceleration(this.startedSpeed);
        this.time = 0;

        window.clearTimeout(this.inactiveTimer);

        this.changeState(WheelStates.DECELERATION);
    }

    private rotate(): void {
        if (this.isAcceleration) {
            this.accelerate();
        } else if (this.isDeceleration) {
            this.decelerate();
        }

        this.circle.rotation += this.speed * Ticker.shared.elapsedMS;
    }

    private getNewSpeed(): number {
        this.time += Ticker.shared.elapsedMS;
        return this.startedSpeed + this.acceleration * this.time;
    }

    private calcAcceleration(currentSpeed: number): number {
        return (Wheel.MAX_SPEED - currentSpeed) / Wheel.ACCELERATION_TIME;
    }

    private accelerate(): void {
        this.speed = this.speed = this.getNewSpeed();
        if (this.speed >= Wheel.MAX_SPEED) {
            this.speed = Wheel.MAX_SPEED;
            this.isAcceleration = false;

            this.startInactiveTimer();

            this.changeState(WheelStates.ROTATION);
        }
    }

    private decelerate(): void {
        this.speed = this.getNewSpeed();
        if (this.speed < 0) {
            this.speed = 0;
            this.isDeceleration = false;

            this.changeState(WheelStates.IDLE);
        }
    }

    private calcDeceleration(currentSpeed: number): number {
        return -(currentSpeed ** 2) / (this.getDistance() * 2);
    }

    private getEndingAngle(): number {
        const angleSweepPerSector = (Math.PI * 2) / Wheel.TOTAL_WHEEL_SECTORS;
        const endingAngle = Math.PI * 2 - angleSweepPerSector * this.stopSector;

        return endingAngle + getRandomAngle(10, 20);
    }

    private getDistance(): number {
        return Math.PI * 4 - this.getCurrentAngle() + this.getEndingAngle();
    }

    /**
     * returns normalized value from 0deg to 360deg
     */
    private getCurrentAngle(): number {
        return this.circle.rotation % (Math.PI * 2);
    }

    private startInactiveTimer(): void {
        this.inactiveTimer = window.setTimeout(() => {
            this.stop();
        }, 10000);
    }

    private changeState(newState: WheelStates): void {
        this.emit(Wheel.EVENT_STATE_CHANGE, newState);
    }
}
