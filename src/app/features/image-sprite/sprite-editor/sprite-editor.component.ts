import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dimensions, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';

import { SpriteFile } from '../../../../engine/core/data-model/sprite/sprite-file';
import { ConfirmPopupOption } from '../../../core/data-model/options/confirm-popup-option';
import { ConfirmActionOption } from '../../../core/data-model/options/confirm-action-option';
import { ConfirmPopupComponent } from '../../../shared/components/popups/confirm-popup/confirm-popup.component';
import { FileUtility } from '../../../core/utility/file-utility/file.utility';

@Component({
    selector: 'app-sprite-editor',
    templateUrl: './sprite-editor.component.html',
    styleUrls: ['./sprite-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteEditorComponent implements OnInit {
    @Input() public file: SpriteFile;
    @Output() public importNew = new EventEmitter<SpriteFile>();
    @Output() public overwrite = new EventEmitter<SpriteFile>();
    @Output() public saveAsNew = new EventEmitter<SpriteFile>();
    @Output() public cancel = new EventEmitter();
    @ViewChild('cropper') private _cropper: ImageCropperComponent;
    public transform: ImageTransform;
    public isPreviewing = false;
    private _isCropperReady = false;
    private _isCorrectRatio = false;
    private _modifiedFile: SpriteFile;

    constructor(private _dialog: MatDialog) { }

    get targetFile(): SpriteFile {
        return this._modifiedFile || this.file;
    }

    get isImported(): boolean {
        return SpriteFile.isImported(this.file);
    }

    get isModified(): boolean {
        return Boolean(this._modifiedFile);
    }

    get isCropperReady(): boolean {
        return this._isCropperReady;
    }

    get scale(): string {
        const scale = this.transform.scale * 100;

        return `${scale.toFixed(0)}%`;
    }

    public ngOnInit(): void {
        this.onImageReset();
    }

    public onNameEdit(name: string): void {
        this._modifiedFile = this._modifiedFile ?? SpriteFile.fromSpriteFile(this.file);
        this._modifiedFile.name = name;
    }

    public onCropperReady({ width, height }: Dimensions): void {
        this._isCropperReady = true;
        this._isCorrectRatio = width === height;
    }

    public onImageRotate(): void {
        const rotate = (this.transform.rotate + 90) % 360;
        this.transform = { ...this.transform, rotate };
    }

    public onImageFlip(isVertical = false): void {
        const { flipH, flipV } = this.transform;

        this.transform = {
            ...this.transform,
            flipH: isVertical ? flipH : !flipH,
            flipV: isVertical ? !flipV : flipV
        };
    }

    public onImageScale(value: number): void {
        this.transform = { ...this.transform, scale: value / 20 };
    }

    public onImageCropped(): void {
        const { base64, width, height } = this._cropper.crop();
        this._isCorrectRatio = width === height;
        this._modifiedFile = this._modifiedFile ?? SpriteFile.fromSpriteFile(this.file);
        this._modifiedFile.mime = 'image/jpeg';
        this._modifiedFile.extension = 'jpg';
        this._modifiedFile.content = FileUtility.base64ToBlob(base64, this._modifiedFile.mime);
        this.transform = { scale: 1, rotate: 0, flipH: false, flipV: false };
    }

    public onImageReset(): void {
        this._modifiedFile = null;
        this.transform = { scale: 1, rotate: 0, flipH: false, flipV: false };
    }

    public onImageSave(isNew = true): void {
        if (!this._isCorrectRatio) {
            this.alertInvalidRatio();
        }
        else if (isNew) {
            this.importNew.emit(this.targetFile);
        }
        else {
            this.saveExistingImage();
        }
    }

    private alertInvalidRatio(): void {
        const title = 'Invalid aspect ratio';
        const message = 'Please crop the image to ensure 1:1 ratio.';
        const actions = [new ConfirmActionOption('Got It', null)];

        this._dialog.open(ConfirmPopupComponent, {
            data: new ConfirmPopupOption(title, message, actions),
            width: '350px',
            height: '175px'
        });
    }

    private saveExistingImage(): void {
        const title = 'Overwrite existing sprite?';
        const message = 'You can save the changes as a new sprite.';
        const option = ['Overwrite', 'Save as New', 'Cancel'];
        const actions = option.map((_, i) => new ConfirmActionOption(_, i));

        const dialog = this._dialog.open(ConfirmPopupComponent, {
            data: new ConfirmPopupOption(title, message, actions),
            width: '350px',
            height: '175px'
        });

        dialog.afterClosed().subscribe(_ => {
            if (_ === actions[0].value) {
                this.overwrite.emit(this._modifiedFile);
            }
            else if (_ === actions[1].value) {
                this.saveAsNew.emit(this._modifiedFile);
            }
        });
    }
}
