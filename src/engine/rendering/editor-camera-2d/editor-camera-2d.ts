import { Camera2D } from '../camera-2d/camera-2d';
import { SceneGrid } from '../../core/data-model/scene/scene-grid';
import { SceneLayer } from '../../core/data-model/scene/scene-layer';
import { SpriteFile } from '../../core/data-model/sprite/sprite-file';

export class EditorCamera2D extends Camera2D {

    public dropSprite(x: number, y: number, layer: SceneLayer, sprite: SpriteFile): SceneLayer {
        const [row, column] = this.getTargetGrid(x, y);
        const key = `${row},${column}`;
        const grid = new SceneGrid();
        grid.spriteId = sprite.id;
        grid.thumbnail = sprite.thumbnailUrl;
        grid.content = sprite.content;

        return { ...layer, grids: { ...layer.grids, [key]: grid } };
    }

    public highlightGrid(x: number, y: number, id: string): void {
        const canvas = this.getCanvas(id);
        const context = canvas.getContext('2d');
        const [row, column] = this.getTargetGrid(x, y, true);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'rgb(255, 255, 0)';
        context.strokeRect(row * this._scale, column * this._scale, this._scale, this._scale);
    }

    public drawGridLines(id: string): void {
        const canvas = this.getCanvas(id);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'rgb(0, 255, 0)';

        for (let i = 0; i <= this._visibleColumns; ++i) {
            const x = i * this._scale;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            context.stroke();
        }

        for (let i = 0; i <= this._visibleRows; ++i) {
            const y = i * this._scale;
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
            context.stroke();
        }
    }
}
