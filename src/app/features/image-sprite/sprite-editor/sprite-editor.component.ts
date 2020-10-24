import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-sprite-editor',
    templateUrl: './sprite-editor.component.html',
    styleUrls: ['./sprite-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteEditorComponent implements OnInit {
    @Input() public file: SpriteFile;
    @Input() public isEditMode = true;
    @Output() public cancel = new EventEmitter();
    @ViewChild('cropper') private _cropper: ImageCropperComponent;
    private _isCropperReady = false;
    private _transform: ImageTransform;

    get isCropperReady(): boolean {
        return this._isCropperReady;
    }

    get transform(): ImageTransform {
        return this._transform;
    }

    get scale(): string {
        const scale = this._transform.scale * 100;

        return `${scale.toFixed(0)}%`;
    }

    public ngOnInit(): void {
        this.onImageReset();
    }

    public onCropperReady(): void {
        this._isCropperReady = true;
    }

    public onImageRotate(): void {
        const rotate = (this._transform.rotate + 90) % 360;
        this._transform = { ...this._transform, rotate };
    }

    public onImageFlip(isVertical = false): void {
        const { flipH, flipV } = this._transform;

        this._transform = {
            ...this._transform,
            flipH: isVertical ? flipH : !flipH,
            flipV: isVertical ? !flipV : flipV
        };
    }

    public onImageScale(value: number): void {
        this._transform = { ...this._transform, scale: value / 20 };
    }

    public onImageCropped(): void {
        const cropped = this._cropper.crop();
        this.file.type = 'image/png';
        this.file.base64 = cropped.base64;
    }

    public onImageReset(): void {
        this._transform = { scale: 1, rotate: 0, flipH: false, flipV: false };
    }
}
