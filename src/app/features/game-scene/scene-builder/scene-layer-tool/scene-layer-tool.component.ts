import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { SceneLayer } from '../../../../../engine/core/data-model/scene/scene-layer';
import { GenericUtility } from '../../../../core/utility/generic-utility/generic.utility';

@Component({
    selector: 'app-scene-layer-tool',
    templateUrl: './scene-layer-tool.component.html',
    styleUrls: ['./scene-layer-tool.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneLayerToolComponent {
    @Input() public layers: SceneLayer[] = [];
    @Output() public layersChange = new EventEmitter<SceneLayer[]>();

    public onVisibilityChange(value: boolean, layer: SceneLayer): void {
        const updated = { ...layer, isVisible: value };
        const index = this.layers.findIndex(_ => _.name === layer.name);
        this.layers = GenericUtility.replaceAt(this.layers, updated, index);
        this.layersChange.emit(this.layers);
    }
}
