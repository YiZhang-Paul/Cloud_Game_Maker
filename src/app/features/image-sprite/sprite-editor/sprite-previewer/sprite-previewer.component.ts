import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { SpriteFile } from '../../../../core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-sprite-previewer',
    templateUrl: './sprite-previewer.component.html',
    styleUrls: ['./sprite-previewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpritePreviewerComponent {
    @Input() public file: SpriteFile;
    @Output() public cancel = new EventEmitter();
}
