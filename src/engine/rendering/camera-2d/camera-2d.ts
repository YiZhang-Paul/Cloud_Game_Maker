import { v4 as uuid } from 'uuid';

import { Point } from '../../core/data-model/generic/point';
import { Dimension2D } from '../../core/data-model/generic/dimension-2d';
import { Scene } from '../../core/data-model/scene/scene';
import { SpriteFile } from '../../core/data-model/sprite/sprite-file';
import { GenericUtility } from '../../core/utility/generic-utility/generic.utility';

export class Camera2D {
    protected _dimension = new Dimension2D();
    protected _scene: Scene;
    protected _visibleRows = 0;
    protected _visibleColumns = 0;
    protected _renderId: string;

    constructor(width: number, height: number, scene: Scene) {
        this._dimension = new Dimension2D(width, height);
        this._scene = scene;
        this.setRenderArea();
    }

    get scene(): Scene {
        return this._scene;
    }

    get viewportStyle(): { [key: string]: string } {
        return {
            top: `${-this.offsetY}px`,
            left: `${-this.offsetX}px`,
            width: `${this.renderWidth}px`,
            height: `${this.renderHeight}px`
        };
    }

    get renderWidth(): number {
        return this._visibleColumns * this._scene.scale;
    }

    get renderHeight(): number {
        return this._visibleRows * this._scene.scale;
    }

    get offsetX(): number {
        return this._scene.viewportXY.x % this._scene.scale;
    }

    get offsetY(): number {
        return this._scene.viewportXY.y % this._scene.scale;
    }

    public scale(delta: number): void {
        const scale = GenericUtility.limitValue(this._scene.scale + delta, 30, 200);
        this._scene = { ...this._scene, scale };
        this.setRenderArea();
    }

    public move(deltaX: number, deltaY: number): void {
        const { scale, viewportXY, layers } = this._scene;
        const { rows, columns } = layers[0];
        const maxX = columns * scale - this._dimension.width;
        const maxY = rows * scale - this._dimension.height;
        const x = GenericUtility.limitValue(viewportXY.x + deltaX, 0, maxX);
        const y = GenericUtility.limitValue(viewportXY.y + deltaY, 0, maxY);
        this._scene = { ...this._scene, viewportXY: new Point(x, y) };
        this.setRenderArea();
    }

    public renderLayer(index: number): void {
        this._renderId = uuid();
        const renderId = this._renderId;
        const layer = this._scene.layers[index];
        const canvas = this.getCanvas(layer.name);
        const context = canvas.getContext('2d');
        const { scale, viewportXY } = this._scene;
        const startColumn = Math.floor(viewportXY.x / scale);
        const startRow = Math.floor(viewportXY.y / scale);
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < this._visibleColumns; ++i) {
            for (let j = 0; j < this._visibleRows; ++j) {
                const key = `${i + startColumn},${j + startRow}`;
                const hasGrid = layer.grids.hasOwnProperty(key) && layer.grids[key];

                if (hasGrid && renderId === this._renderId) {
                    const { spriteId } = layer.grids[key];
                    const sprite = layer.sprites[spriteId];
                    this.drawGrid(sprite, i, j, context, renderId);
                }
            }
        }
    }

    public clearView(id: string): void {
        const canvas = this.getCanvas(id);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    public hasGridContent(x: number, y: number, index: number): boolean {
        const key = this.getTargetGrid(x, y).join();
        const { grids } = this._scene.layers[index];

        return grids.hasOwnProperty(key) && Boolean(grids[key]);
    }

    protected drawGrid(sprite: SpriteFile, column: number, row: number, context: CanvasRenderingContext2D, renderId: string): void {
        const image = new Image();
        image.src = sprite.thumbnailUrl;

        image.onload = () => {
            if (renderId === this._renderId) {
                const { scale } = this._scene;
                const [x, y] = [column * scale, row * scale];
                context.drawImage(image, x, y, scale, scale);
            }
        };
    }

    protected getCanvas(id: string): HTMLCanvasElement {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        canvas.width = this.renderWidth;
        canvas.height = this.renderHeight;

        return canvas;
    }

    protected getTargetGrid(x: number, y: number, isRelative = false): [number, number] {
        const { scale, viewportXY } = this._scene;
        const column = Math.floor((viewportXY.x + x) / scale);
        const row = Math.floor((viewportXY.y + y) / scale);

        return [
            isRelative ? column - Math.floor(viewportXY.x / scale) : column,
            isRelative ? row - Math.floor(viewportXY.y / scale) : row
        ];
    }

    protected setRenderArea(): void {
        const { scale } = this._scene;
        const { width, height } = this._dimension;

        if (this.offsetY) {
            this._visibleRows = Math.ceil((height - scale + this.offsetY) / scale) + 1;
        }
        else {
            this._visibleRows = Math.ceil(height / scale);
        }

        if (this.offsetX) {
            this._visibleColumns = Math.ceil((width - scale + this.offsetX) / scale) + 1;
        }
        else {
            this._visibleColumns = Math.ceil(width / scale);
        }
    }
}
