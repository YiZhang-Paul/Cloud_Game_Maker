import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

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
}
