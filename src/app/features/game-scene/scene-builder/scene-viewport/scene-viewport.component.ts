import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

import { Point } from '../../../../core/data-model/generic/point';
import { Scene } from '../../../../core/data-model/scene/scene';
import { GenericUtility } from '../../../../core/utility/generic-utility/generic.utility';

@Component({
    selector: 'app-scene-viewport',
    templateUrl: './scene-viewport.component.html',
    styleUrls: ['./scene-viewport.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneViewportComponent implements AfterViewInit {
    @Input() public scene: Scene;
    @Output() public sceneChange = new EventEmitter<Scene>();
    @ViewChild('viewport') private _viewport: ElementRef;
    public columns: number[] = [];
    public rows: number[] = [];
    private _hasFocus = true;
    private _canDragPointer = false;
    private _canMoveCamera = false;
    private _pointerXY = new Point();
    private _deltaXY = new Point();

    get viewportX(): number {
        const { layers, scale, viewportXY } = this.scene;
        const totalWidth = layers[0].grids[0].length * scale;
        const maxX = totalWidth - this._viewport?.nativeElement?.clientWidth ?? 0;

        return GenericUtility.limitValue(viewportXY.x + this._deltaXY.x, 0, maxX);
    }

    get viewportY(): number {
        const { layers, scale, viewportXY } = this.scene;
        const totalHeight = layers[0].grids.length * scale;
        const maxY = totalHeight - this._viewport?.nativeElement?.clientHeight ?? 0;

        return GenericUtility.limitValue(viewportXY.y + this._deltaXY.y, 0, maxY);
    }

    get viewportClass(): { [key: string]: boolean } {
        return {
            draggable: this._canDragPointer,
            moveable: this._canMoveCamera
        };
    }

    get layerStyle(): { [key: string]: string } {
        return {
            top: `${-this.viewportY % this.scene.scale}px`,
            left: `${-this.viewportX % this.scene.scale}px`,
            width: `${this.columns.length * this.scene.scale}px`,
            height: `${this.rows.length * this.scene.scale}px`
        };
    }

    public ngAfterViewInit(): void {
        setTimeout(() => this.renderLayer());
    }

    @HostListener('document:wheel', ['$event'])
    public onDocumentScroll(event: WheelEvent): void {
        if (this._viewport?.nativeElement?.contains(event.target)) {
            const delta = event.deltaY > 0 ? 10 : -10;
            const scale = GenericUtility.limitValue(this.scene.scale + delta, 30, 200);
            this.scene = { ...this.scene, scale };
            this.sceneChange.emit(this.scene);
            this.renderLayer();
        }
    }

    @HostListener('document:keydown', ['$event'])
    public onDocumentKeydown(event: KeyboardEvent): void {
        if (this._hasFocus && event.code === 'Space') {
            this._canDragPointer = true;
        }
    }

    @HostListener('document:keyup', ['$event'])
    public onDocumentKeyup(event: KeyboardEvent): void {
        if (event.code === 'Space') {
            this._canMoveCamera = false;
            this._canDragPointer = false;
        }
    }

    @HostListener('document:dragstart', ['$event'])
    public onDocumentDragstart(event: DragEvent): void {
        event.preventDefault();
    }

    @HostListener('document:mousedown', ['$event'])
    public onDocumentMousedown(event: MouseEvent): void {
        if (this._canDragPointer) {
            this._canMoveCamera = true;
            this._pointerXY = new Point(event.clientX, event.clientY);
        }
        else {
            this._hasFocus = this._viewport?.nativeElement?.contains(event.target);
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onDocumentMousemove({ clientX, clientY }: MouseEvent): void {
        if (this._canMoveCamera) {
            this._deltaXY = new Point(this._pointerXY.x - clientX, this._pointerXY.y - clientY);
            this.renderLayer();
        }
    }

    @HostListener('document:mouseup')
    public onDocumentMouseup(): void {
        if (this._canMoveCamera) {
            const viewportXY = new Point(this.viewportX, this.viewportY);
            this.scene = { ...this.scene, viewportXY };
            this.sceneChange.emit(this.scene);
            this._deltaXY = new Point(0, 0);
            this._canMoveCamera = false;
        }
    }

    private renderLayer(): void {
        if (!this._viewport) {
            return;
        }

        this.setViewportArea();

        for (let i = 0; i < this.scene.layers.length; ++i) {
            this.drawViewport(i);
        }

        this.drawGridLines();
    }

    private setViewportArea(): void {
        const { clientWidth, clientHeight } = this._viewport.nativeElement;
        const startColumn = Math.floor(this.viewportX / this.scene.scale);
        const startRow = Math.floor(this.viewportY / this.scene.scale);
        const endColumn = Math.floor((this.viewportX + clientWidth) / this.scene.scale);
        const endRow = Math.floor((this.viewportY + clientHeight) / this.scene.scale);
        this.columns = GenericUtility.getValueRange(startColumn, endColumn);
        this.rows = GenericUtility.getValueRange(startRow, endRow);
    }

    private drawViewport(index: number): void { }

    private drawGridLines(): void {
        const canvas = document.getElementById('grid-line-layer') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        const gridWidth = this.scene.scale;
        canvas.width = this.columns.length * gridWidth;
        canvas.height = this.rows.length * gridWidth;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'lime';

        for (const column of this.columns) {
            const x = (column - this.columns[0]) * gridWidth;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            context.stroke();
        }

        for (const row of this.rows) {
            const y = (row - this.rows[0]) * gridWidth;
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
            context.stroke();
        }
    }
}
