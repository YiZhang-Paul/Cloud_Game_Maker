import { Dimension2D } from '../../core/data-model/generic/dimension-2d';
import { Point } from '../../core/data-model/generic/point';
import { GenericUtility } from '../../core/utility/generic-utility/generic.utility';

export class Camera2D {
    protected _dimension = new Dimension2D();
    protected _position = new Point();
    protected _totalRows = 0;
    protected _totalColumns = 0;
    protected _renderRows = 0;
    protected _renderColumns = 0;
    protected _scale = 100;

    constructor(
        width: number,
        height: number,
        position: Point,
        totalRows: number,
        totalColumns: number,
        scale: number
    ) {
        this._dimension = new Dimension2D(width, height);
        this._position = position;
        this._totalRows = totalRows;
        this._totalColumns = totalColumns;
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
        return this._renderColumns * this._scale;
    }

    get renderHeight(): number {
        return this._renderRows * this._scale;
    }

    get offsetX(): number {
        return this._position.x % this._scale;
    }

    get offsetY(): number {
        return this._position.y % this._scale;
    }

    public move(deltaX: number, deltaY: number): void {
        const maxX = this._totalColumns * this._scale - this._dimension.width;
        const maxY = this._totalRows * this._scale - this._dimension.height;
        this._position.x = GenericUtility.limitValue(this.position.x + deltaX, 0, maxX);
        this._position.y = GenericUtility.limitValue(this.position.y + deltaY, 0, maxY);
        this.setRenderArea();
    }

    public changeScale(delta: number): void {
        this._scale = GenericUtility.limitValue(this._scale + delta, 30, 200);
        this.setRenderArea();
    }

    public getCanvas(id: string): HTMLCanvasElement {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        canvas.width = this.renderWidth;
        canvas.height = this.renderHeight;

        return canvas;
    }

    protected setRenderArea(): void {
        const { width, height } = this._dimension;

        if (this.offsetY) {
            this._renderRows = Math.ceil((height - this._scale + this.offsetY) / this._scale) + 1;
        }
        else {
            this._renderRows = Math.ceil(height / this._scale);
        }

        if (this.offsetX) {
            this._renderColumns = Math.ceil((width - this._scale + this.offsetX) / this._scale) + 1;
        }
        else {
            this._renderColumns = Math.ceil(width / this._scale);
        }
    }
}
