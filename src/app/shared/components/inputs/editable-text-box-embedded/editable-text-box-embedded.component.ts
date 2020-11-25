import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-editable-text-box-embedded',
    templateUrl: './editable-text-box-embedded.component.html',
    styleUrls: ['./editable-text-box-embedded.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableTextBoxEmbeddedComponent {
    @Input() public content = '';
    @Output() public contentChange = new EventEmitter<string>();
    @ViewChild('contentInput') private _contentInput: ElementRef;
    private _isEditMode = false;

    get isEditMode(): boolean {
        return this._isEditMode;
    }

    public toggleEdit(type: string): void {
        if (type === 'blur' && !this._isEditMode) {
            return;
        }

        const content = this._contentInput?.nativeElement?.value?.trim() ?? '';
        this._isEditMode = !this._isEditMode;

        if (!this._isEditMode && content !== this.content) {
            this.contentChange.emit(content);
        }
        else {
            setTimeout(() => {
                if (this._isEditMode) {
                    this._contentInput.nativeElement.focus();
                }
            });
        }
    }
}
