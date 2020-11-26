import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
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
export class SceneLayerToolComponent implements OnInit {
    @Input() public layers: SceneLayer[] = [];
    @Output() public layersChange = new EventEmitter<SceneLayer[]>();
    @Output() public layerSelect = new EventEmitter<SceneLayer>();
    private _activeLayer: SceneLayer;

    constructor(private _dialog: MatDialog) { }

    public ngOnInit(): void {
        this.onLayerSelect(this.layers[0]);
    }

    public onLayerSelect(layer: SceneLayer): void {
        this._activeLayer = layer;
        this.layerSelect.emit(layer);
    }

    public onLayerAdd(): void {
        const layer = new SceneLayer();
        const names = this.layers.map(_ => _.name);
        layer.name = FileUtility.handleDuplicateName(names, layer.name, '_', '');
        layer.rows = this.layers[0].rows;
        layer.columns = this.layers[0].columns;
        this.onLayersChange([...this.layers, layer]);
        this.onLayerSelect(layer);
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
            if (result !== actions[0].value) {
                return;
            }

            this.onLayersChange(this.layers.filter(_ => _.name !== layer.name));

            if (this.isActiveLayer(layer)) {
                this.onLayerSelect(this.layers[0]);
            }
        });
    }

    public onReorder(event: CdkDragDrop<SceneLayer[]>): void {
        const { previousIndex, currentIndex } = event;
        const previous = this.layers[previousIndex];
        const current = this.layers[currentIndex];
        this.layers = GenericUtility.replaceAt(this.layers, previous, currentIndex);
        this.layers = GenericUtility.replaceAt(this.layers, current, previousIndex);
        this.onLayersChange(this.layers);
    }

    public onNameChange(name: string, layer: SceneLayer): void {
        const isActive = this.isActiveLayer(layer);
        const updated: SceneLayer = { ...layer, name };
        const index = this.layers.findIndex(_ => _.name === layer.name);
        this.onLayersChange(GenericUtility.replaceAt(this.layers, updated, index));

        if (isActive) {
            this.onLayerSelect(updated);
        }
    }

    public onVisibilityChange(value: boolean, layer: SceneLayer): void {
        const updated: SceneLayer = { ...layer, isVisible: value };
        const index = this.layers.findIndex(_ => _.name === layer.name);
        this.onLayersChange(GenericUtility.replaceAt(this.layers, updated, index));
    }

    public canToggleVisibility(layer: SceneLayer): boolean {
        return !layer.isVisible || this.layers.filter(_ => _.isVisible).length > 1;
    }

    public isActiveLayer(layer: SceneLayer): boolean {
        return this._activeLayer.name === layer.name;
    }

    private onLayersChange(layers: SceneLayer[]): void {
        this.layers = layers;
        this.layersChange.emit(this.layers);
    }
}
