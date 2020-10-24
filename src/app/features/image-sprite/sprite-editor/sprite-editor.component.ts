import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

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

    get targetImage(): Blob {
        return this._targetImage;
    }

    public onImageCropStart(): void {
        this.mode = this.modes.Crop;
        this.file.raw.file(_ => this._targetImage = _);
    }

    public onImageCropped(event: ImageCroppedEvent): void {
        console.log(event);
    }
}
