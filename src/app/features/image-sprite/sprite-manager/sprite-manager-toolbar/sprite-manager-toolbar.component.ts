import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
    selector: 'app-sprite-manager-toolbar',
    templateUrl: './sprite-manager-toolbar.component.html',
    styleUrls: ['./sprite-manager-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteManagerToolbarComponent {
    @Output() public fileSelect = new EventEmitter<NgxFileDropEntry[]>();
}
