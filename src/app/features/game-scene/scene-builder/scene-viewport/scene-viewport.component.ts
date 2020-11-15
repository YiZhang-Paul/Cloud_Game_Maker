import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

import { Point } from '../../../../core/data-model/generic/point';
import { Scene } from '../../../../core/data-model/scene/scene';

@Component({
    selector: 'app-scene-viewport',
    templateUrl: './scene-viewport.component.html',
    styleUrls: ['./scene-viewport.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneViewportComponent {
    @Input() public scene: Scene;
    @Output() public sceneChange = new EventEmitter<Scene>();
    @ViewChild('viewport') private _viewport: ElementRef;
    private _hasFocus = true;
    private _canDragPointer = false;
    private _canMoveCamera = false;
    private _pointerXY = new Point();
    private _deltaX = 0;
    private _deltaY = 0;

    get viewportStyle(): { [key: string]: boolean } {
        return {
            draggable: this._canDragPointer,
            moveable: this._canMoveCamera
        };
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
            this._canMoveCamera = false;
            const { x, y } = this.scene.viewportXY;
            const point = new Point(x + this._deltaX, y + this._deltaY);
            this.sceneChange.emit({ ...this.scene, viewportXY: point });
            [this._deltaX, this._deltaY] = [0, 0];
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onDocumentMousemove(event: MouseEvent): void {
        if (this._canMoveCamera) {
            this._deltaX = event.clientX - this._pointerXY.x;
            this._deltaY = event.clientY - this._pointerXY.y;
        }
    }
}
