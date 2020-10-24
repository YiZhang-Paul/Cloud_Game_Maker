import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';
import { SpriteEditorMode } from '../../../core/enum/sprite-editor-mode.enum';

@Component({
    selector: 'app-sprite-editor',
    templateUrl: './sprite-editor.component.html',
    styleUrls: ['./sprite-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteEditorComponent {
    @Input() public file: SpriteFile;
    @Output() public cancel = new EventEmitter();
    public mode = SpriteEditorMode.Readonly;
    public modes = SpriteEditorMode;
    private _targetImage: Blob;
    private _imageTransform: ImageTransform = { scale: 1, rotate: 0, flipH: false, flipV: false };

    get targetImage(): Blob {
        return this._targetImage;
    }

    get imageTransform(): ImageTransform {
        return this._imageTransform;
    }

    public onImageCropStart(): void {
        this.mode = this.modes.Crop;
        this.file.raw.file(_ => this._targetImage = _);
    }

    public onImageRotate(): void {
        const rotate = (this._imageTransform.rotate + 90) % 360;
        this._imageTransform = { ...this._imageTransform, rotate };
    }

    public onImageFlip(isVertical = false): void {
        const { flipH, flipV } = this._imageTransform;

        this._imageTransform = {
            ...this._imageTransform,
            flipH: isVertical ? flipH : !flipH,
            flipV: isVertical ? !flipV : flipV
        };
    }

    public onImageCropped(event: ImageCroppedEvent): void {
        console.log(event);
    }
}
