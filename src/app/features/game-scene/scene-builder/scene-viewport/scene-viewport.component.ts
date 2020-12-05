import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { AfterViewInit, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

import { Point } from '../../../../../engine/core/data-model/generic/point';
import { Scene } from '../../../../../engine/core/data-model/scene/scene';
import { Sprite } from '../../../../../engine/core/data-model/sprite/sprite';
import { EditorCamera2D } from '../../../../../engine/rendering/editor-camera-2d/editor-camera-2d';

@Component({
    selector: 'app-scene-viewport',
    templateUrl: './scene-viewport.component.html',
    styleUrls: ['./scene-viewport.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneViewportComponent implements AfterViewInit, OnChanges {
    @Input() public scene: Scene;
    @Input() public draggedSprite: Sprite;
    @Output() public sceneChange = new EventEmitter<Scene>();
    @ViewChild('viewport') private _viewport: ElementRef;
    public contextMenuStyle = { top: '0', left: '0' };
    private _lastDraggedSprite: Sprite;
    private _isHovering = false;
    private _canDragPointer = false;
    private _canMoveCamera = false;
    private _pointerXY = new Point();
    private _isContextMenuOn = false;
    private _camera: EditorCamera2D;

    get isContextMenuOn(): boolean {
        return this._isContextMenuOn;
    }

    get viewportClass(): { [key: string]: boolean } {
        return {
            draggable: this._canDragPointer,
            moveable: this._canMoveCamera
        };
    }

    get layerStyle(): { [key: string]: string } {
        return this._camera?.viewportStyle ?? null;
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            const { clientWidth, clientHeight } = this._viewport.nativeElement;
            this._camera = new EditorCamera2D(clientWidth, clientHeight, this.scene);
            this.renderViewport();
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('scene') && this._camera) {
            this.ngAfterViewInit();
        }
    }

    @HostListener('document:keydown', ['$event'])
    public onDocumentKeydown({ code }: KeyboardEvent): void {
        if (this._isHovering && code === 'Space') {
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

    public onScaleChange({ deltaY }: WheelEvent): void {
        this._camera.scale(deltaY > 0 ? 10 : -10);
        this.onViewportChange(this._camera.scene);
    }

    public onMouseEnter(): void {
        this._isHovering = true;
    }

    public onMouseLeave(): void {
        if (this._canMoveCamera) {
            this.onViewportChange(this._camera.scene);
        }

        this._isHovering = false;
        this._canDragPointer = false;
        this._canMoveCamera = false;
    }

    public onMouseDown({ clientX, clientY }: MouseEvent): void {
        if (this._canDragPointer) {
            this._canMoveCamera = true;
            this._pointerXY = new Point(clientX, clientY);
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onDocumentMouseMove({ clientX, clientY }: MouseEvent): void {
        if (this._canMoveCamera) {
            this._camera.move(this._pointerXY.x - clientX, this._pointerXY.y - clientY);
            this._pointerXY = new Point(clientX, clientY);
            this.onViewportChange(this._camera.scene);
        }
        else if (this.isHovering(clientX, clientY) && this.draggedSprite) {
            const { left, top } = this._viewport.nativeElement.getBoundingClientRect();
            const [x, y] = [Math.ceil(clientX - left), Math.ceil(clientY - top)];
            this._camera.highlightGrid(x, y, 'highlight-grid-layer');
            this._lastDraggedSprite = this.draggedSprite;
        }
    }

    @HostListener('document:mouseup', ['$event'])
    public onDocumentMouseUp({ clientX, clientY }: MouseEvent): void {
        if (this.isHovering(clientX, clientY) && this._lastDraggedSprite) {
            const { left, top } = this._viewport.nativeElement.getBoundingClientRect();
            const [x, y] = [Math.ceil(clientX - left), Math.ceil(clientY - top)];
            this._camera.dropSprite(x, y, this._lastDraggedSprite);
            this.onViewportChange(this._camera.scene);
        }

        this._isContextMenuOn = false;
        this._canMoveCamera = false;
        this._lastDraggedSprite = null;
    }

    public onRightClick(event: MouseEvent): void {
        event.preventDefault();
        const { left, top } = this._viewport.nativeElement.getBoundingClientRect();
        const [x, y] = [event.clientX - left, event.clientY - top];

        if (!this._camera.hasGridContent(x, y)) {
            return;
        }

        this.contextMenuStyle.top = `${y}px`;
        this.contextMenuStyle.left = `${x}px`;
        this._isContextMenuOn = true;
    }

    public removeGridContent(): void {
        const { left, top } = this.contextMenuStyle;
        const [x, y] = [left, top].map(_ => Number(_.replace('px', '')));
        this._camera.removeSprite(x, y);
        this.onViewportChange(this._camera.scene);
    }

    private isHovering(x: number, y: number): boolean {
        const { left, top, right, bottom } = this._viewport.nativeElement.getBoundingClientRect();

        return x >= left && x <= right && y >= top && y <= bottom;
    }

    private onViewportChange(scene: Scene, render = true): void {
        this.scene = scene;
        this.sceneChange.emit(this.scene);

        if (render) {
            this.renderViewport();
        }
    }

    private renderViewport(): void {
        this._camera.clearView('highlight-grid-layer');
        this._camera.drawGridLines('grid-line-layer');

        setTimeout(() => {
            for (let i = this._camera.scene.layers.length - 1; i >= 0; --i) {
                if (this._camera.scene.layers[i].isVisible) {
                    this._camera.renderLayer(i);
                }
            }
        });
    }
}
