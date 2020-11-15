import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { store } from '../store';
import { Scene } from '../../../core/data-model/scene/scene';

@Component({
    selector: 'app-scene-builder',
    templateUrl: './scene-builder.component.html',
    styleUrls: ['./scene-builder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneBuilderComponent implements OnInit {
    public activeScene$: Observable<Scene>;
    public openedScenes$: Observable<Scene[]>;

    constructor(private _store: Store) { }

    public ngOnInit(): void {
        this.activeScene$ = this._store.select(store.selectors.getActiveScene);
        this.openedScenes$ = this._store.select(store.selectors.getOpenedScenes);
    }

    public onSceneSelected(scene: Scene): void {
        this._store.dispatch(store.actions.setActiveSceneId({ payload: scene.id }));
    }

    public onSceneClose(scene: Scene): void {
        this._store.dispatch(store.actions.deleteOpenedSceneId({ payload: scene.id }));
    }

    public onSceneChange(scene: Scene): void {
        this._store.dispatch(store.actions.updateScene(scene));
    }
}
