import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { Point } from '../../../../../engine/core/data-model/generic/point';
import { SpriteFile } from '../../../../core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-sprite-thumbnail-item',
    templateUrl: './sprite-thumbnail-item.component.html',
    styleUrls: ['./sprite-thumbnail-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteThumbnailItemComponent {
    @Input() public file: SpriteFile;
    @Input() public isDragMode = false;
    @Output() public editStart = new EventEmitter<Point>();
    @Output() public delete = new EventEmitter();
    @Output() public nameChange = new EventEmitter<string>();
    @Output() public dragBegin = new EventEmitter();
    @Output() public dragCancel = new EventEmitter();
    @ViewChild('nameInput') private _nameInput: ElementRef;
    private _isEditingName = false;
    private _holdTimer: number;

    get isEditingName(): boolean {
        return this._isEditingName;
    }

    get editedName(): string {
        return this._nameInput?.nativeElement?.value?.trim() ?? '';
    }

    public onHoldStart(event: MouseEvent): void {
        this._holdTimer = setTimeout(() => {
            if (this._holdTimer) {
                this.dragBegin.emit(new Point(event.clientX, event.clientY));
                this._holdTimer = null;
            }
        }, 50);
    }

    public onHoldCancel(): void {
        this.dragCancel.emit();

        if (this._holdTimer) {
            clearTimeout(this._holdTimer);
            this._holdTimer = null;
        }
    }

    public ignoreDrag(event: MouseEvent): void {
        event.stopPropagation();
    }

    public toggleNameEdit(type: string): void {
        if (this.isDragMode || type === 'blur' && !this._isEditingName) {
            return;
        }

        this._isEditingName = !this._isEditingName;

        if (!this._isEditingName && this.editedName !== this.file.name) {
            this.nameChange.emit(this.editedName);
        }
        else {
            setTimeout(() => {
                if (this._isEditingName) {
                    this._nameInput.nativeElement.focus();
                }
            });
        }
    }
}
