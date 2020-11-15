import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

import { Point } from '../../../../core/data-model/generic/point';
import { Scene } from '../../../../core/data-model/scene/scene';

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

    get viewportStyle(): { [key: string]: boolean } {
        return {
            draggable: this._canDragPointer,
            moveable: this._canMoveCamera
        };
    }

    public ngAfterViewInit(): void {
        setTimeout(() => this.renderLayer());
    }

    @HostListener('document:wheel', ['$event'])
    public onDocumentScroll(event: WheelEvent): void {
        if (this._viewport?.nativeElement?.contains(event.target)) {
            const delta = event.deltaY > 0 ? 10 : -10;
            const scale = Math.max(10, this.scene.scale + delta);
            this.sceneChange.emit({ ...this.scene, scale: Math.min(250, scale) });
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
            this._canDragPointer = false;
        }
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

    @HostListener('document:mouseup')
    public onDocumentMouseup(): void {
        if (this._canMoveCamera) {
            const viewportXY = Point.add(this.scene.viewportXY, this._deltaXY);
            this.sceneChange.emit({ ...this.scene, viewportXY });
            this._deltaXY = new Point(0, 0);
            this._canMoveCamera = false;
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onDocumentMousemove({ clientX, clientY }: MouseEvent): void {
        if (this._canMoveCamera) {
            this._deltaXY = new Point(this._pointerXY.x - clientX, this._pointerXY.y - clientY);
            this.renderLayer();
        }
    }

    private renderLayer(): void {
        if (!this._viewport) {
            return;
        }

        const startX = this.scene.viewportXY.x + this._deltaXY.x;
        const startY = this.scene.viewportXY.y + this._deltaXY.y;
        const endX = startX + this._viewport.nativeElement.clientWidth;
        const endY = startY + this._viewport.nativeElement.clientHeight;
        const startColumn = Math.floor(startX / this.scene.scale);
        const startRow = Math.floor(startY / this.scene.scale);
        const endColumn = Math.floor(endX / this.scene.scale);
        const endRow = Math.floor(endY / this.scene.scale);
        this.columns = new Array(endColumn - startColumn + 1).fill(0).map((_, i) => i + startColumn);
        this.rows = new Array(endRow - startRow + 1).fill(0).map((_, i) => i + startRow);
    }
}
