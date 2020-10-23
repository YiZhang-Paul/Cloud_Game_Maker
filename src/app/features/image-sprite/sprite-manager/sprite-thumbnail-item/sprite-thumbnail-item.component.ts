import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SpriteFile } from '../../../../core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-sprite-thumbnail-item',
    templateUrl: './sprite-thumbnail-item.component.html',
    styleUrls: ['./sprite-thumbnail-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteThumbnailItemComponent {
    @Input() public file: SpriteFile;
}
