import { Camera2D } from '../camera-2d/camera-2d';
import { SceneGrid } from '../../core/data-model/scene/scene-grid';
import { SpriteFile } from '../../core/data-model/sprite/sprite-file';

export class EditorCamera2D extends Camera2D {

    public dropSprite(x: number, y: number, index: number, sprite: SpriteFile): void {
        const key = this.getTargetGrid(x, y).join();
        const grid = new SceneGrid();
        grid.spriteId = sprite.id;
        grid.thumbnail = sprite.thumbnailUrl;
        grid.content = sprite.content;
        const grids = { ...this._scene.layers[index].grids, [key]: grid };
        const layer = { ...this._scene.layers[index], grids };
        const layers = [...this._scene.layers.slice(0, index), layer, ...this._scene.layers.slice(index + 1)];
        this._scene = { ...this._scene, layers };
    }

    public highlightGrid(x: number, y: number, id: string): void {
        const { scale } = this._scene;
        const canvas = this.getCanvas(id);
        const context = canvas.getContext('2d');
        const [column, row] = this.getTargetGrid(x, y, true);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'rgb(255, 255, 0)';
        context.strokeRect(column * scale, row * scale, scale, scale);
    }

    public drawGridLines(id: string): void {
        const { scale } = this._scene;
        const canvas = this.getCanvas(id);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'rgb(0, 255, 0)';

        for (let i = 0; i <= this._visibleColumns; ++i) {
            const x = i * scale;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            context.stroke();
        }

        for (let i = 0; i <= this._visibleRows; ++i) {
            const y = i * scale;
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
            context.stroke();
        }
    }
}
