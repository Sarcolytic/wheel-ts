import { Container, Rectangle, Sprite } from 'pixi.js';

export class Button extends Container {
    public static readonly EVENT_CLICK: string = 'onClick';

    private sprite: Sprite;
    private spriteDisable: Sprite;

    constructor(sprite: Sprite, spriteDisable: Sprite) {
        super();

        this.sprite = sprite;
        this.sprite.anchor.set(0.5);
        this.sprite.position.set(sprite.width / 2, sprite.height / 2);
        this.addChild(this.sprite);

        this.spriteDisable = spriteDisable;
        this.spriteDisable.anchor.set(0.5);
        this.spriteDisable.position.set(spriteDisable.width / 2, spriteDisable.height / 2);
        this.addChild(this.spriteDisable);

        this.setEnabled(true);
        this.on('pointerdown', this.onPointerDown, this);
        this.on('pointerup', this.onPointerUp, this);
        this.on('pointerupoutside', this.onPointerUp, this);
        this.on('pointertap', this.onPointerTap, this);
        this.hitArea = new Rectangle(0, 0, sprite.width, sprite.height);
    }

    public setEnabled(value: boolean): void {
        this.interactive = value;

        this.sprite.visible = value;
        this.spriteDisable.visible = !value;
    }

    private onPointerDown(): void {
        this.sprite.scale.set(0.9);
    }

    private onPointerUp(): void {
        this.sprite.scale.set(1);
    }

    private onPointerTap(): void {
        this.onPointerUp();

        this.emit(Button.EVENT_CLICK);
    }
}
