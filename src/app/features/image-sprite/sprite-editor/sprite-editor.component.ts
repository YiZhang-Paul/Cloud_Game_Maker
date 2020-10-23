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
    private _imageChangedEvent: { target: { files: Blob[] } };

    get imageChangedEvent(): { target: { files: Blob[] } } {
        return this._imageChangedEvent;
    }

    public onImageCropStart(): void {
        this.mode = this.modes.Crop;

        this.file.raw.file(_ => {
            this._imageChangedEvent = { target: { files: [_] } };
        });
    }

    public onImageCropped(event: ImageCroppedEvent): void {
        console.log(event);
    }
}
