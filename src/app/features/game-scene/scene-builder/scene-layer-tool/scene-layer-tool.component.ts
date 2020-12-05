import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { ValueChange } from '../../../../core/data-model/generic/value-change';
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
    @Output() public layerAdd = new EventEmitter<SceneLayer>();
    @Output() public layerDelete = new EventEmitter<SceneLayer>();
    @Output() public layerChange = new EventEmitter<ValueChange>();
    @Output() public layerSelect = new EventEmitter<SceneLayer>();
    @Output() public layersReorder = new EventEmitter<SceneLayer[]>();

    constructor(private _dialog: MatDialog) { }

    public onLayerAdd(): void {
        const layer = new SceneLayer();
        const names = this.layers.map(_ => _.name);
        layer.name = FileUtility.handleDuplicateName(names, layer.name, '_', '');
        layer.rows = this.layers[0].rows;
        layer.columns = this.layers[0].columns;
        this.layerAdd.emit(layer);
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
                this.layerDelete.emit(layer);
            }
        });
    }

    public onReorder({ previousIndex, currentIndex }: CdkDragDrop<SceneLayer[]>): void {
        const layer = this.layers[previousIndex];
        const layers = this.layers.filter(_ => _.name !== layer.name);
        const index = currentIndex <= previousIndex ? currentIndex : currentIndex - 1;
        this.layersReorder.emit(GenericUtility.insertAt(layers, layer, index));
    }

    public onNameChange(name: string, layer: SceneLayer): void {
        const current: SceneLayer = { ...layer, name };
        this.layerChange.emit({ previous: layer, current });
    }

    public onVisibilityChange(isVisible: boolean, layer: SceneLayer): void {
        const current: SceneLayer = { ...layer, isVisible };
        this.layerChange.emit({ previous: layer, current });
    }

    public canToggleVisibility(layer: SceneLayer): boolean {
        return !layer.isVisible || this.layers.filter(_ => _.isVisible).length > 1;
    }
}
