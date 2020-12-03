import { Camera2D } from '../camera-2d/camera-2d';
import { SceneGrid } from '../../core/data-model/scene/scene-grid';
import { SceneLayer } from '../../core/data-model/scene/scene-layer';
import { Sprite } from '../../core/data-model/sprite/sprite';

export class EditorCamera2D extends Camera2D {

    public hasGridContent(x: number, y: number): boolean {
        const key = this.getTargetGrid(x, y).join();
        const { grids } = this._scene.layers.find(_ => _.isActive);

        return grids.hasOwnProperty(key) && Boolean(grids[key]);
    }

    public dropSprite(x: number, y: number, sprite: Sprite | null): void {
        let layer: SceneLayer;
        const { layers } = this._scene;
        const index = layers.findIndex(_ => _.isActive);
        const key = this.getTargetGrid(x, y).join();

        if (sprite) {
            const grids = { ...layers[index].grids, [key]: new SceneGrid(sprite.id) };
            const sprites = { ...layers[index].sprites, [sprite.id]: sprite };
            layer = { ...layers[index], grids, sprites };
        }
        else {
            const { [key]: deleted, ...grids } = layers[index].grids;
            layer = { ...layers[index], grids };
        }

        const updated = [...layers.slice(0, index), layer, ...layers.slice(index + 1)];
        this._scene = { ...this._scene, layers: updated };
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
