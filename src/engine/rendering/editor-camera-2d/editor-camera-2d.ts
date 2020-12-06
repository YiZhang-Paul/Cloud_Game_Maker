import { Camera2D } from '../camera-2d/camera-2d';
import { SceneGrid } from '../../core/data-model/scene/scene-grid';
import { Sprite } from '../../core/data-model/sprite/sprite';
import { GenericUtility } from '../../core/utility/generic-utility/generic.utility';

export class EditorCamera2D extends Camera2D {
    public readonly highlightLayerId = 'highlight-layer';
    public readonly gridLinesLayerId = 'grid-lines-layer';

    public hasGridContent(x: number, y: number): boolean {
        const key = this.getTargetGrid(x, y).join();
        const { grids } = this._scene.layers.find(_ => _.isActive);

        return grids.hasOwnProperty(key) && Boolean(grids[key]);
    }

    public dropSprite(x: number, y: number, sprite: Sprite): void {
        const index = this._scene.layers.findIndex(_ => _.isActive);
        const active = this._scene.layers[index];
        const key = this.getTargetGrid(x, y).join();
        const grids = { ...active.grids, [key]: new SceneGrid(sprite.id) };
        const layers = GenericUtility.replaceAt(this._scene.layers, { ...active, grids }, index);
        const sprites = { ...this._scene.sprites, [sprite.id]: sprite };
        this._scene = { ...this._scene, sprites, layers };
    }

    public removeSprite(x: number, y: number): void {
        const index = this._scene.layers.findIndex(_ => _.isActive);
        const active = this._scene.layers[index];
        const key = this.getTargetGrid(x, y).join();
        const { [key]: deleted, ...grids } = active.grids;
        const layers = GenericUtility.replaceAt(this._scene.layers, { ...active, grids }, index);
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

    public renderLayers(): void {
        setTimeout(() => {
            for (let i = this._scene.layers.length - 1; i >= 0; --i) {
                if (this._scene.layers[i].isVisible) {
                    this.renderLayer(i);
                }
            }

            this.clearView(this.highlightLayerId);
            this.drawGridLines(this.gridLinesLayerId);
        }, 500);
    }
}
