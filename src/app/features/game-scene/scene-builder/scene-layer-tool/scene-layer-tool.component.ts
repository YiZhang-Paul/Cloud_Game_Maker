import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { SceneLayer } from '../../../../../engine/core/data-model/scene/scene-layer';
import { FileUtility } from '../../../../core/utility/file-utility/file.utility';
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

    public onLayerAdd(): void {
        const layer = new SceneLayer();
        const names = this.layers.map(_ => _.name);
        layer.name = FileUtility.handleDuplicateName(names, layer.name, '_', '');
        layer.rows = this.layers[0].rows;
        layer.columns = this.layers[0].columns;
        this.layers = [...this.layers, layer];
        this.layersChange.emit(this.layers);
    }

    public onVisibilityChange(value: boolean, layer: SceneLayer): void {
        const updated = { ...layer, isVisible: value };
        const index = this.layers.findIndex(_ => _.name === layer.name);
        this.layers = GenericUtility.replaceAt(this.layers, updated, index);
        this.layersChange.emit(this.layers);
    }
}
