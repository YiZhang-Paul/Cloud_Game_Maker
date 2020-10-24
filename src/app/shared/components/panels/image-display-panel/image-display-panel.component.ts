import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SpriteFile } from '../../../../core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-image-display-panel',
    templateUrl: './image-display-panel.component.html',
    styleUrls: ['./image-display-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageDisplayPanelComponent {
    @Input() public file: SpriteFile;
}
