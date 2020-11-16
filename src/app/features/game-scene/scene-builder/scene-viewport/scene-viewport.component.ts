import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

import { Scene } from '../../../../core/data-model/scene/scene';
import { SpriteFile } from '../../../../core/data-model/sprite/sprite-file';
import { Point } from '../../../../../engine/core/data-model/generic/point';
import { EditorCamera2D } from '../../../../../engine/rendering/editor-camera-2d/editor-camera-2d';

@Component({
    selector: 'app-scene-viewport',
    templateUrl: './scene-viewport.component.html',
    styleUrls: ['./scene-viewport.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneViewportComponent implements AfterViewInit {
    @Input() public scene: Scene;
    @Input() public draggedSprite: SpriteFile;
    @Output() public sceneChange = new EventEmitter<Scene>();
    @ViewChild('viewport') private _viewport: ElementRef;
    private _hasFocus = true;
    private _canDragPointer = false;
    private _canMoveCamera = false;
    private _pointerXY = new Point();
    private _camera: EditorCamera2D;

    get viewportClass(): { [key: string]: boolean } {
        return {
            draggable: this._canDragPointer,
            moveable: this._canMoveCamera
        };
    }

    get layerStyle(): { [key: string]: string } {
        if (this._camera) {
            return {
                top: `${-this._camera.offsetY}px`,
                left: `${-this._camera.offsetX}px`,
                width: `${this._camera.renderWidth}px`,
                height: `${this._camera.renderHeight}px`
            };
        }
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            const { clientWidth: width, clientHeight: height } = this._viewport.nativeElement;
            const { scale, layers, viewportXY } = this.scene;
            const position = new Point(viewportXY.x, viewportXY.y);
            const rows = layers[0].grids.length;
            const columns = layers[0].grids[0].length;
            this._camera = new EditorCamera2D(width, height, position, rows, columns, scale);
            this.renderViewport();
        });
    }

    @HostListener('document:keydown', ['$event'])
    public onDocumentKeydown({ code }: KeyboardEvent): void {
        if (this._hasFocus && code === 'Space') {
            this._canDragPointer = true;
        }
    }

    @HostListener('document:keyup', ['$event'])
    public onDocumentKeyup({ code }: KeyboardEvent): void {
        if (code === 'Space') {
            this._canDragPointer = false;
            this._canMoveCamera = false;
        }
    }

    @HostListener('document:mousedown', ['$event'])
    public onDocumentMousedown({ clientX, clientY, target }: MouseEvent): void {
        if (this._canDragPointer) {
            this._canMoveCamera = true;
            this._pointerXY = new Point(clientX, clientY);
        }
        else {
            this._hasFocus = this._viewport?.nativeElement?.contains(target);
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onDocumentMousemove({ clientX, clientY }: MouseEvent): void {
        if (this._canMoveCamera) {
            this._camera.move(this._pointerXY.x - clientX, this._pointerXY.y - clientY);
            this._pointerXY = new Point(clientX, clientY);
            this.renderViewport();
        }
        else if (this.draggedSprite) {
            const { left, top } = this._viewport.nativeElement.getBoundingClientRect();
            const [x, y] = [Math.ceil(clientX - left), Math.ceil(clientY - top)];
            this._camera.highlightGrid(x, y, 'highlight-grid-layer');
        }
    }

    public onMoveEnd(): void {
        if (this._canMoveCamera) {
            const { x, y } = this._camera.position;
            this.scene = { ...this.scene, viewportXY: new Point(x, y) };
            this.sceneChange.emit(this.scene);
            this._canMoveCamera = false;
        }
    }

    public onScaleChange(event: WheelEvent): void {
        this._camera.changeScale(event.deltaY > 0 ? 10 : -10);
        this.scene = { ...this.scene, scale: this._camera.scale };
        this.sceneChange.emit(this.scene);
        this.renderViewport();
    }

    private renderViewport(): void {
        this._camera.drawGridLines('grid-line-layer');
    }
}
