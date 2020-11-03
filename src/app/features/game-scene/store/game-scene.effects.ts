import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { Scene } from '../../../core/data-model/scene/scene';
import { FileUtility } from '../../../core/utility/file.utility';
import { CloudStorageHttpService } from '../../../core/service/http/cloud-storage-http/cloud-storage-http.service';

import * as selectors from './game-scene.selectors';
import * as actions from './game-scene.actions';

@Injectable()
export class ScenesEffects {

    public getScenesRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.getScenesRemote),
        mergeMap(() => this._cloudStorageHttp.getScenes()),
        map(scenes => actions.addScenes({ payload: scenes }))
    ));

    public addSceneRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.addSceneRemote),
        withLatestFrom(this._store.select(selectors.getAllScenes)),
        map(([scene, scenes]) => this.setUniqueName(scene, scenes)),
        mergeMap(scene => this._cloudStorageHttp.addScene(scene).pipe(
            map(id => ({ ...scene, id }))
        )),
        map(scene => {
            const isAdded = Boolean(scene.id);
            const message = isAdded ? 'Successfully added the scene.' : 'Failed to add the scene.';
            this._snackBar.open(message, isAdded ? 'Ok' : 'Got it');

            return isAdded ? actions.addScene(scene) : { type: 'no-op' };
        })
    ));

    constructor(private _actions$: Actions,
                private _store: Store,
                private _cloudStorageHttp: CloudStorageHttpService,
                private _snackBar: MatSnackBar) { }

    private setUniqueName(scene: Scene, scenes: Scene[]): Scene {
        const names = scenes.map(_ => _.name);
        const name = FileUtility.handleDuplicateName(names, scene.name, '_', '');

        return { ...scene, name };
    }
}
