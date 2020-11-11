import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import { Scene } from '../../../core/data-model/scene/scene';
import { FileUtility } from '../../../core/utility/file.utility';
import { CloudStorageHttpService } from '../../../core/service/http/cloud-storage-http/cloud-storage-http.service';

import * as selectors from './selectors';
import { actions } from './actions';

@Injectable()
export class ScenesEffects {

    public startGetScenesRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.startGetScenesRemote),
        switchMap(() => [
            actions.setHasFetchedScenes({ payload: false }),
            actions.getScenesRemote()
        ])
    ));

    public getScenesRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.getScenesRemote),
        mergeMap(() => this._cloudStorageHttp.getScenes()),
        switchMap(scenes => [
            actions.setScenes({ payload: scenes }),
            actions.setHasFetchedScenes({ payload: true })
        ])
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

    public deleteSceneRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.deleteSceneRemote),
        mergeMap(scene => this._cloudStorageHttp.deleteScene(scene).pipe(
            switchMap(isDeleted => {
                const message = isDeleted ? 'Successfully removed the scene.' : 'Failed to remove the scene.';
                this._snackBar.open(message, isDeleted ? 'Ok' : 'Got it');

                if (!isDeleted) {
                    return [{ type: 'no-op' }];
                }

                return [actions.deleteScene(scene), actions.deleteActiveScene(scene)];
            })
        ))
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
