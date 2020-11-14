import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

import { Scene } from '../../../../core/data-model/scene/scene';

@Component({
    selector: 'app-scene-viewport',
    templateUrl: './scene-viewport.component.html',
    styleUrls: ['./scene-viewport.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneViewportComponent {
    @Input() public scene: Scene;
    @ViewChild('viewport') private _viewport: ElementRef;
    private _hasFocus = true;
    private _canDragPointer = false;
    private _canMoveCamera = false;
    private _deltaX = 0;
    private _deltaY = 0;
    private _pointerX = 0;
    private _pointerY = 0;

    get viewportStyle(): { [key: string]: boolean } {
        return {
            draggable: this._canDragPointer,
            moveable: this._canMoveCamera
        };
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
            [this._pointerX, this._pointerY] = [event.clientX, event.clientY];
        }
        else {
            this._hasFocus = this._viewport?.nativeElement?.contains(event.target);
        }
    }

    @HostListener('document:mouseup')
    public onDocumentMouseup(): void {
        if (this._canMoveCamera) {
            this._canMoveCamera = false;
            this.scene.viewportXY.x += this._deltaX;
            this.scene.viewportXY.y += this._deltaY;
            [this._deltaX, this._deltaY] = [0, 0];
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onDocumentMousemove(event: MouseEvent): void {
        if (this._canMoveCamera) {
            this._deltaX = event.clientX - this._pointerX;
            this._deltaY = event.clientY - this._pointerY;
        }
    }
}
