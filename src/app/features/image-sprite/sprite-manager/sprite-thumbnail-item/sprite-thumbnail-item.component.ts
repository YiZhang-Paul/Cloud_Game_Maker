import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { SpriteFile } from '../../../../core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-sprite-thumbnail-item',
    templateUrl: './sprite-thumbnail-item.component.html',
    styleUrls: ['./sprite-thumbnail-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteThumbnailItemComponent {
    @Input() public file: SpriteFile;
    @Output() public editStart = new EventEmitter();
    @Output() public delete = new EventEmitter();
    @Output() public nameChange = new EventEmitter<string>();
    @ViewChild('nameInput') private _nameInput: ElementRef;
    private _isEditingName = false;

    get isEditingName(): boolean {
        return this._isEditingName;
    }

    public toggleNameEdit(): void {
        this._isEditingName = !this._isEditingName;

        if (!this._isEditingName) {
            this.nameChange.emit(this._nameInput.nativeElement.value);
        }
        else {
            setTimeout(() => this._nameInput.nativeElement.focus());
        }
    }
}
