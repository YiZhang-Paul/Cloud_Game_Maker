import { Point } from '../../core/data-model/generic/point';
import { Dimension2D } from '../../core/data-model/generic/dimension-2d';
import { SceneGrid } from '../../core/data-model/scene/scene-grid';
import { SceneLayer } from '../../core/data-model/scene/scene-layer';
import { GenericUtility } from '../../core/utility/generic-utility/generic.utility';

export class Camera2D {
    protected _dimension = new Dimension2D();
    protected _position = new Point();
    protected _rows = 0;
    protected _columns = 0;
    protected _visibleRows = 0;
    protected _visibleColumns = 0;
    protected _scale = 100;

    constructor(
        width: number,
        height: number,
        position: Point,
        rows: number,
        columns: number,
        scale: number
    ) {
        this._dimension = new Dimension2D(width, height);
        this._position = position;
        this._rows = rows;
        this._columns = columns;
        this._scale = scale;
        this.setRenderArea();
    }

    get position(): Point {
        return this._position;
    }

    get scale(): number {
        return this._scale;
    }

    get renderWidth(): number {
        return this._visibleColumns * this._scale;
    }

    get renderHeight(): number {
        return this._visibleRows * this._scale;
    }

    get offsetX(): number {
        return this._position.x % this._scale;
    }

    get offsetY(): number {
        return this._position.y % this._scale;
    }

    public move(deltaX: number, deltaY: number): void {
        const maxX = this._columns * this._scale - this._dimension.width;
        const maxY = this._rows * this._scale - this._dimension.height;
        this._position.x = GenericUtility.limitValue(this.position.x + deltaX, 0, maxX);
        this._position.y = GenericUtility.limitValue(this.position.y + deltaY, 0, maxY);
        this.setRenderArea();
    }

    public changeScale(delta: number): void {
        this._scale = GenericUtility.limitValue(this._scale + delta, 30, 200);
        this.setRenderArea();
    }

    public render(id: string, layer: SceneLayer): void {
        const canvas = this.getCanvas(id);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (const key of Object.keys(layer.grids)) {
            const [x, y] = key.split(',').map(_ => Number(_) * this._scale);
            const [column, row] = this.getTargetGrid(x, y, true);
            this.drawGrid(layer.grids[key], column, row, context);
        }
    }

    public clearView(id: string): void {
        const canvas = this.getCanvas(id);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    protected drawGrid(grid: SceneGrid, column: number, row: number, context: CanvasRenderingContext2D): void {
        const { content, thumbnail } = grid;

        if (!content && !thumbnail) {
            return;
        }

        const image = new Image();
        image.src = content ? URL.createObjectURL(content) : thumbnail;

        image.onload = () => {
            const [x, y] = [column * this._scale, row * this._scale];
            context.drawImage(image, x, y, this._scale, this._scale);

            if (content) {
                URL.revokeObjectURL(image.src);
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
        const column = Math.floor((this._position.x + x) / this._scale);
        const row = Math.floor((this._position.y + y) / this._scale);

        return [
            isRelative ? column - Math.floor(this._position.x / this._scale) : column,
            isRelative ? row - Math.floor(this._position.y / this._scale) : row
        ];
    }

    protected setRenderArea(): void {
        const { width, height } = this._dimension;

        if (this.offsetY) {
            this._visibleRows = Math.ceil((height - this._scale + this.offsetY) / this._scale) + 1;
        }
        else {
            this._visibleRows = Math.ceil(height / this._scale);
        }

        if (this.offsetX) {
            this._visibleColumns = Math.ceil((width - this._scale + this.offsetX) / this._scale) + 1;
        }
        else {
            this._visibleColumns = Math.ceil(width / this._scale);
        }
    }
}
