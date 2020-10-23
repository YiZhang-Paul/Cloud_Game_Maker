import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
    selector: 'app-file-picker',
    templateUrl: './file-picker.component.html',
    styleUrls: ['./file-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilePickerComponent {
    @Input() public buttonText = 'Browse Files';
    @Input() public allowExtension: string[] = [];
    @Input() public allowMultiple = false;
    @Output() public fileSelect = new EventEmitter<NgxFileDropEntry[]>();

    get accepted(): string {
        return this.allowExtension.map(_ => `.${_.toLowerCase()}`).join();
    }
}
