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
    public activeScenes$: Observable<Scene[]>;
    public activeScene$: Observable<Scene>;

    constructor(private _store: Store) { }

    public ngOnInit(): void {
        this.activeScenes$ = this._store.select(store.selectors.getActiveScenes);
        this.activeScene$ = this._store.select(store.selectors.getActiveScene);
    }

    public onSceneSelected(scene: Scene): void {
        this._store.dispatch(store.actions.setActiveScene(scene));
    }

    public onSceneClose(scene: Scene): void {
        this._store.dispatch(store.actions.deleteActiveScene(scene));
    }
}
