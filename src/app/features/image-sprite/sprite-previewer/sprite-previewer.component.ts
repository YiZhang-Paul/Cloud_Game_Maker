import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-sprite-previewer',
    templateUrl: './sprite-previewer.component.html',
    styleUrls: ['./sprite-previewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpritePreviewerComponent {
    @Input() public file: SpriteFile;
    @Input() public confirmAction = 'Confirm';
    @Output() public confirm = new EventEmitter();
    @Output() public cancel = new EventEmitter();
}
