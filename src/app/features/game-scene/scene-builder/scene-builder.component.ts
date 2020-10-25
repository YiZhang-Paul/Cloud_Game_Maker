import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Scene } from '../../../core/data-model/scene/scene';

@Component({
    selector: 'app-scene-builder',
    templateUrl: './scene-builder.component.html',
    styleUrls: ['./scene-builder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneBuilderComponent {
    @Input() public scene: Scene;
}
