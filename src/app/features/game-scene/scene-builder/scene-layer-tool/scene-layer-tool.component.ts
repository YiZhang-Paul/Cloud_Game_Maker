import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SceneLayer } from '../../../../../engine/core/data-model/scene/scene-layer';
import { ConfirmActionOption } from '../../../../core/data-model/options/confirm-action-option';
import { ConfirmPopupOption } from '../../../../core/data-model/options/confirm-popup-option';
import { ConfirmPopupComponent } from '../../../../shared/components/popups/confirm-popup/confirm-popup.component';
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

    constructor(private _dialog: MatDialog) { }

    public onLayerAdd(): void {
        const layer = new SceneLayer();
        const names = this.layers.map(_ => _.name);
        layer.name = FileUtility.handleDuplicateName(names, layer.name, '_', '');
        layer.rows = this.layers[0].rows;
        layer.columns = this.layers[0].columns;
        this.onLayersChange([...this.layers, layer]);
    }

    public onLayerDelete(layer: SceneLayer): void {
        const title = 'Are you sure?';
        const message = 'The layer will be removed permanently.';
        const option = ['Proceed', 'Cancel'];
        const actions = option.map((_, i) => new ConfirmActionOption(_, i));

        const dialog = this._dialog.open(ConfirmPopupComponent, {
            data: new ConfirmPopupOption(title, message, actions),
            width: '350px',
            height: '175px'
        });

        dialog.afterClosed().subscribe(result => {
            if (result === actions[0].value) {
                this.onLayersChange(this.layers.filter(_ => _.name !== layer.name));
            }
        });
    }

    public onVisibilityChange(value: boolean, layer: SceneLayer): void {
        const updated = { ...layer, isVisible: value };
        const index = this.layers.findIndex(_ => _.name === layer.name);
        this.onLayersChange(GenericUtility.replaceAt(this.layers, updated, index));
    }

    public isLastVisible(layer: SceneLayer): boolean {
        return layer.isVisible && this.layers.filter(_ => _.isVisible).length === 1;
    }

    private onLayersChange(layers: SceneLayer[]): void {
        this.layers = layers;
        this.layersChange.emit(this.layers);
    }
}
