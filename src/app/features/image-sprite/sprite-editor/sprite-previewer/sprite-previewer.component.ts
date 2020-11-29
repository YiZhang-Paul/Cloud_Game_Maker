import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Sprite } from '../../../../../engine/core/data-model/sprite/sprite';

@Component({
    selector: 'app-sprite-previewer',
    templateUrl: './sprite-previewer.component.html',
    styleUrls: ['./sprite-previewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpritePreviewerComponent {
    @Input() public file: Sprite;
    @Output() public cancel = new EventEmitter();
}
