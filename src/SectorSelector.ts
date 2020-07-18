/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Container, Text, TextStyle } from 'pixi.js';
import TextInput from 'pixi-text-input';

export class SectorSelector extends Container {
    private input: TextInput;

    constructor() {
        super();

        const style = new TextStyle({
            fill: '#ffffff',
            fontSize: 36,
            fontStyle: 'italic',
            strokeThickness: 4,
        });
        const label = new Text('Sector', style);
        label.anchor.set(0.5, 0);
        label.roundPixels = true;
        label.position.set(81, 0);
        this.addChild(label);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.input = new TextInput({
            input: {
                fontSize: '30px',
                padding: '12px',
                width: '138px',
                color: '#3399ff',
                textAlign: 'center',
                fontWeight: 'bold',
            },
            box: {
                default: { fill: 0xe8e9f3, stroke: { color: 0x000000, width: 1 } },
                focused: { fill: 0xe1e3ee, stroke: { color: 0x000000, width: 1 } },
                disabled: { fill: 0xdbdbdb },
            },
        });
        this.input.restrict = /^([1-9]|1[0-2]|)$/;
        this.input.position.set(0, 50);
        this.addChild(this.input);
    }

    public getValue(): number {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return parseInt(this.input.text);
    }

    public setEnabled(value: boolean): void {
        this.input.disabled = !value;
    }
}
