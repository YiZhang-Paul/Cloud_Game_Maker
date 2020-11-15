import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

import { Scene } from '../../../../core/data-model/scene/scene';
import { Point } from '../../../../../engine/core/data-model/generic/point';
import { Camera } from '../../../../../engine/rendering/camera/camera';

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
    private _hasFocus = true;
    private _canDragPointer = false;
    private _canMoveCamera = false;
    private _pointerXY = new Point();
    private _camera: Camera;

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
            this._camera = new Camera(width, height, position, rows, columns, scale);
            this.renderViewport();
        });
    }

    @HostListener('document:wheel', ['$event'])
    public onDocumentScroll(event: WheelEvent): void {
        if (this._viewport?.nativeElement?.contains(event.target)) {
            this._camera.changeScale(event.deltaY > 0 ? 10 : -10);
            this.scene = { ...this.scene, scale: this._camera.scale };
            this.sceneChange.emit(this.scene);
            this.renderViewport();
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
            this._canMoveCamera = false;
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
            this._camera.move(this._pointerXY.x - clientX, this._pointerXY.y - clientY);
            this._pointerXY = new Point(clientX, clientY);
            this.renderViewport();
        }
    }

    @HostListener('document:mouseup')
    public onDocumentMouseup(): void {
        if (this._canMoveCamera) {
            const { x, y } = this._camera.position;
            this.scene = { ...this.scene, viewportXY: new Point(x, y) };
            this.sceneChange.emit(this.scene);
            this._canMoveCamera = false;
        }
    }

    private renderViewport(): void {
        for (let i = 0; i < this.scene.layers.length; ++i) {
            this.drawViewport(i);
        }

        this.drawGridLines();
    }

    private drawViewport(index: number): void { }

    private drawGridLines(): void {
        const canvas = this._camera.getCanvas('grid-line-layer');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'rgb(0, 255, 0)';

        for (let i = 0; i < this._camera.renderColumns; ++i) {
            const x = i * this._camera.scale;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            context.stroke();
        }

        for (let i = 0; i < this._camera.renderRows; ++i) {
            const y = i * this._camera.scale;
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
            context.stroke();
        }
    }
}
