import { Dimension2D } from '../../core/data-model/generic/dimension-2d';
import { Point } from '../../core/data-model/generic/point';
import { GenericUtility } from '../../core/utility/generic-utility/generic.utility';

export class Camera {
    private _dimension = new Dimension2D();
    private _position = new Point();
    private _totalRows = 0;
    private _totalColumns = 0;
    private _renderRows = 0;
    private _renderColumns = 0;
    private _scale = 100;

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
    }

    get position(): Point {
        return this._position;
    }

    get scale(): number {
        return this._scale;
    }

    get renderColumns(): number {
        return this._renderColumns;
    }

    get renderRows(): number {
        return this._renderRows;
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
    }

    public changeScale(delta: number): void {
        this._scale = GenericUtility.limitValue(this._scale + delta, 30, 200);
    }

    public setRenderArea(): void {
        const { width, height } = this._dimension;
        this._renderRows = Math.ceil(height / this._scale) + 1;
        this._renderColumns = Math.ceil(width / this._scale) + 1;
    }
}
