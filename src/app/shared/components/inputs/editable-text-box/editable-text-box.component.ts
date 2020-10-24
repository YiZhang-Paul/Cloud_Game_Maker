import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-editable-text-box',
    templateUrl: './editable-text-box.component.html',
    styleUrls: ['./editable-text-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableTextBoxComponent implements OnInit {
    @Input() public content = '';
    @Input() public isEditMode = false;
    @Output() public contentEdit = new EventEmitter<string>();
    public edited = '';

    public ngOnInit(): void {
        this.edited = this.content;
    }

    public onEditToggle(emit = false): void {
        this.isEditMode = !this.isEditMode;

        if (emit) {
            this.contentEdit.emit(this.edited);
        }
    }
}
