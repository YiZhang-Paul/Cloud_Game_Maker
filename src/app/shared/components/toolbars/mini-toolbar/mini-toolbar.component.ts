import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';

import { MiniToolbarOption } from '../../../../core/enum/mini-toolbar-option.enum';

@Component({
    selector: 'app-mini-toolbar',
    templateUrl: './mini-toolbar.component.html',
    styleUrls: ['./mini-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniToolbarComponent {
    @Input() public activeOptions = [MiniToolbarOption.FilePick, MiniToolbarOption.Search];
    @Output() public filePick = new EventEmitter<NgxFileDropEntry[]>();
    @Output() public fileCreate = new EventEmitter();
    @Output() public fileSearch = new EventEmitter<string>();

    get options(): typeof MiniToolbarOption {
        return MiniToolbarOption;
    }
}
