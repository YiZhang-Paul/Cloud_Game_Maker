import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';
import { ConfirmPopupOption } from '../../../core/data-model/generic/options/confirm-popup-option';
import { ConfirmActionOption } from '../../../core/data-model/generic/options/confirm-action-option';
import { ConfirmPopupComponent } from '../../../shared/components/popups/confirm-popup/confirm-popup.component';

@Component({
    selector: 'app-sprite-editor',
    templateUrl: './sprite-editor.component.html',
    styleUrls: ['./sprite-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteEditorComponent implements OnInit {
    @Input() public file: SpriteFile;
    @Input() public isEditMode = true;
    @Output() public overwrite = new EventEmitter<SpriteFile>();
    @Output() public saveAsNew = new EventEmitter<SpriteFile>();
    @Output() public cancel = new EventEmitter();
    @ViewChild('cropper') private _cropper: ImageCropperComponent;
    private _isCropperReady = false;
    private _transform: ImageTransform;
    private _modifiedFile: SpriteFile;

    constructor(private _dialog: MatDialog) { }

    get targetFile(): SpriteFile {
        return this._modifiedFile || this.file;
    }

    get isModified(): boolean {
        return Boolean(this._modifiedFile);
    }

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

    public onNameEdit(name: string): void {
        if (!this._modifiedFile) {
            this._modifiedFile = SpriteFile.fromSpriteFile(this.file);
        }

        this._modifiedFile.name = name;
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
        if (!this._modifiedFile) {
            this._modifiedFile = SpriteFile.fromSpriteFile(this.file);
        }

        const { base64 } = this._cropper.crop();
        this._modifiedFile.parseImageSrc(base64);
    }

    public onImageReset(): void {
        this._modifiedFile = null;
        this._transform = { scale: 1, rotate: 0, flipH: false, flipV: false };
    }

    public async onImageSave(): Promise<void> {
        const title = 'Overwrite existing sprite?';
        const message = 'You can save the changes as a new sprite.';
        const option = ['Overwrite', 'Save as New', 'Cancel'];
        const actions = option.map((_, i) => new ConfirmActionOption(_, i));

        const dialog = this._dialog.open(ConfirmPopupComponent, {
            data: new ConfirmPopupOption(title, message, actions),
            width: '350px',
            height: '175px'
        });

        const value = await dialog.afterClosed().toPromise();

        if (value === actions[0].value) {
            this.overwrite.emit(this._modifiedFile);
        }
        else if (value === actions[1].value) {
            this.saveAsNew.emit(this._modifiedFile);
        }
    }
}
