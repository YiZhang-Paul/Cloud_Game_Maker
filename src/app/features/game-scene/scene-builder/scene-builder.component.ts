import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { store } from '../store';
import { store as globalStore } from '../../../store';
import { Scene } from '../../../../engine/core/data-model/scene/scene';
import { SceneLayer } from '../../../../engine/core/data-model/scene/scene-layer';
import { Sprite } from '../../../../engine/core/data-model/sprite/sprite';
import { IconButtonOption } from '../../../core/data-model/options/icon-button-option';
import { GenericUtility } from '../../../core/utility/generic-utility/generic.utility';

@Component({
    selector: 'app-scene-builder',
    templateUrl: './scene-builder.component.html',
    styleUrls: ['./scene-builder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneBuilderComponent implements OnInit {
    public toolOptions = [new IconButtonOption('fas fa-layer-group', 'layers', true)];
    public activeScene$: Observable<Scene>;
    public openedScenes$: Observable<Scene[]>;
    public draggedSprite$: Observable<Sprite>;
    private _sceneChanges$ = new Subject<Scene>();
    private _pendingChange: Scene | null;

    constructor(private _store: Store) { }

    public ngOnInit(): void {
        this.activeScene$ = this._store.select(store.selectors.getActiveScene);
        this.openedScenes$ = this._store.select(store.selectors.getOpenedScenes);
        this.draggedSprite$ = this._store.select(globalStore.selectors.getDraggedSprite);
        this._sceneChanges$.pipe(debounceTime(5000)).subscribe(() => this.updateScene());
    }

    public onSceneSelected(scene: Scene): void {
        this._store.dispatch(store.actions.setActiveScene({ payload: scene }));

        if (this._pendingChange && this._pendingChange.storageKey !== scene.storageKey) {
            this.updateScene();
        }
    }

    public onSceneClose(scene: Scene): void {
        this._store.dispatch(store.actions.deleteOpenedScene(scene));

        if (this._pendingChange?.storageKey === scene.storageKey) {
            this.updateScene();
        }
    }

    public onSceneChange(scene: Scene): void {
        this._store.dispatch(store.actions.updateOpenedScene(scene));
        this._store.dispatch(store.actions.updateActiveScene(scene));
        this._pendingChange = scene;
        this._sceneChanges$.next(this._pendingChange);
    }

    public onToolToggle(tool: IconButtonOption): void {
        const index = this.toolOptions.findIndex(_ => _.icon === tool.icon);
        this.toolOptions = GenericUtility.replaceAt(this.toolOptions, tool, index);
    }

    public onLayerAdd(scene: Scene, layer: SceneLayer): void {
        const added: SceneLayer = { ...layer, isActive: true };
        const existing = scene.layers.map(_ => ({ ..._, isActive: false }));
        this.onSceneChange({ ...scene, layers: [added, ...existing] });
    }

    public onLayerDelete(scene: Scene, layer: SceneLayer): void {
        const layers = scene.layers.filter(_ => _.name !== layer.name);

        if (!layer.isActive) {
            this.onSceneChange({ ...scene, layers });

            return;
        }

        const active: SceneLayer = { ...layers[0], isActive: true };
        this.onSceneChange({ ...scene, layers: GenericUtility.replaceAt(layers, active, 0) });
    }

    public onLayerChange(scene: Scene, change: { previous: SceneLayer, current: SceneLayer }): void {
        const { previous, current } = change;
        const index = scene.layers.findIndex(_ => _.name === previous.name);
        const layers = GenericUtility.replaceAt(scene.layers, current, index);
        this.onSceneChange({ ...scene, layers });
    }

    public onLayerSelect(scene: Scene, layer: SceneLayer): void {
        const active: SceneLayer = { ...layer, isActive: true };
        const layers = scene.layers.map(_ => ({ ..._, isActive: false }));
        const index = layers.findIndex(_ => _.name === layer.name);
        this.onSceneChange({ ...scene, layers: GenericUtility.replaceAt(layers, active, index) });
    }

    public onLayersReorder(scene: Scene, layers: SceneLayer[]): void {
        this.onSceneChange({ ...scene, layers });
    }

    private updateScene(): void {
        if (this._pendingChange) {
            this._store.dispatch(store.actions.updateSceneRemote(this._pendingChange));
            this._pendingChange = null;
        }
    }
}
