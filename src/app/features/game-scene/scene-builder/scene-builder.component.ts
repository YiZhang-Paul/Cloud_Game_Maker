import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { store } from '../store';
import { store as globalStore } from '../../../store';
import { Scene } from '../../../../engine/core/data-model/scene/scene';
import { SpriteFile } from '../../../../engine/core/data-model/sprite/sprite-file';

@Component({
    selector: 'app-scene-builder',
    templateUrl: './scene-builder.component.html',
    styleUrls: ['./scene-builder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneBuilderComponent implements OnInit {
    public activeScene$: Observable<Scene>;
    public openedScenes$: Observable<Scene[]>;
    public draggedSprite$: Observable<SpriteFile>;
    private _sceneChanges$ = new Subject<Scene>().pipe(debounceTime(5000));

    constructor(private _store: Store) { }

    public ngOnInit(): void {
        this.activeScene$ = this._store.select(store.selectors.getActiveScene);
        this.openedScenes$ = this._store.select(store.selectors.getOpenedScenes);
        this.draggedSprite$ = this._store.select(globalStore.selectors.getDraggedSprite);
        this._sceneChanges$.subscribe(scene => this._store.dispatch(store.actions.updateSceneRemote(scene)));
    }

    public onSceneSelected(scene: Scene): void {
        this._store.dispatch(store.actions.setActiveSceneId({ payload: scene.id }));
    }

    public onSceneClose(scene: Scene): void {
        this._store.dispatch(store.actions.deleteOpenedSceneId({ payload: scene.id }));
    }

    public onSceneChange(scene: Scene): void {
        this._store.dispatch(store.actions.updateScene(scene));
        this._sceneChanges$.next(scene);
    }
}
