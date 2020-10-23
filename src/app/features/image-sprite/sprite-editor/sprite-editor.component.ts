import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';
import { SpriteEditorMode } from '../../../core/enum/sprite-editor-mode.enum';

@Component({
    selector: 'app-sprite-editor',
    templateUrl: './sprite-editor.component.html',
    styleUrls: ['./sprite-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteEditorComponent implements OnInit {
    @Input() public file: SpriteFile;
    @Output() public cancel = new EventEmitter();
    public modes = SpriteEditorMode;
    private _mode = SpriteEditorMode.Readonly;
    private _imageChangedEvent: { target: { files: Blob[] } };

    get mode(): SpriteEditorMode {
        return this._mode;
    }

    get imageChangedEvent(): { target: { files: Blob[] } } {
        return this._imageChangedEvent;
    }

    public ngOnInit(): void {
        this.file.raw.file(_ => {
            this._imageChangedEvent = { target: { files: [_] } };
            this._mode = SpriteEditorMode.Crop;
        });
    }

    public onImageCrop(event: ImageCroppedEvent): void {
        console.log(event);
    }
}
