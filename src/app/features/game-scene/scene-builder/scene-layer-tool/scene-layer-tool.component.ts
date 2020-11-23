import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SceneLayer } from '../../../../../engine/core/data-model/scene/scene-layer';

@Component({
    selector: 'app-scene-layer-tool',
    templateUrl: './scene-layer-tool.component.html',
    styleUrls: ['./scene-layer-tool.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneLayerToolComponent {
    @Input() public layers: SceneLayer[] = [];
}
