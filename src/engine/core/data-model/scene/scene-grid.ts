import { Color } from '../generic/color';

export class SceneGrid {
    public spriteId: string;
    public color = new Color();

    constructor(spriteId: string) {
        this.spriteId = spriteId;
    }
}
