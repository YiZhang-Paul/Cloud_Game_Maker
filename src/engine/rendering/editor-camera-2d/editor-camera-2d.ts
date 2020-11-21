import { Camera2D } from '../camera-2d/camera-2d';
import { SceneLayer } from '../../core/data-model/scene/scene-layer';
import { SpriteFile } from '../../core/data-model/sprite/sprite-file';

export class EditorCamera2D extends Camera2D {

    public dropSprite(x: number, y: number, layer: SceneLayer, sprite: SpriteFile): void {
        const [row, column] = this.getTargetGrid(x, y);
        const grid = layer.grids[row][column];
        grid.spriteId = sprite.id;
        grid.thumbnail = sprite.thumbnailUrl;
        grid.content = sprite.content;
    }

    public highlightGrid(x: number, y: number, id: string): void {
        const canvas = this.getCanvas(id);
        const context = canvas.getContext('2d');
        const [row, column] = this.getTargetGrid(x, y);
        const left = column - Math.floor(this._position.x / this._scale);
        const top = row - Math.floor(this._position.y / this._scale);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'rgb(255, 255, 0)';
        context.strokeRect(left * this._scale, top * this._scale, this._scale, this._scale);
    }

    public drawGridLines(id: string): void {
        const canvas = this.getCanvas(id);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'rgb(0, 255, 0)';

        for (let i = 0; i <= this._renderColumns; ++i) {
            const x = i * this._scale;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            context.stroke();
        }

        for (let i = 0; i <= this._renderRows; ++i) {
            const y = i * this._scale;
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
            context.stroke();
        }
    }

    private getTargetGrid(x: number, y: number): [number, number] {
        const row = Math.floor((this._position.y + y) / this._scale);
        const column = Math.floor((this._position.x + x) / this._scale);

        return [row, column];
    }
}
