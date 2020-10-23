import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileSystemFileEntry } from 'ngx-file-drop';

@Component({
    selector: 'app-sprite-previewer',
    templateUrl: './sprite-previewer.component.html',
    styleUrls: ['./sprite-previewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpritePreviewerComponent implements OnInit {
    @Input() public file: FileSystemFileEntry;
    @Input() public confirmAction = 'Confirm';
    @Output() public confirm = new EventEmitter();
    @Output() public cancel = new EventEmitter();
}
