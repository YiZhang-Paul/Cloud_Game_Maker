import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import { Scene } from '../../../../engine/core/data-model/scene/scene';
import { FileUtility } from '../../../core/utility/file-utility/file.utility';
import { GameSceneHttpService } from '../../../core/service/http/game-scene-http/game-scene-http.service';

import * as selectors from './selectors';
import { actions } from './actions';

@Injectable()
export class ScenesEffects {

    public getDescriptorsRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.getDescriptorsRemote),
        mergeMap(() => this._gameSceneHttp.getDescriptors()),
        switchMap(descriptors => [
            actions.setDescriptors({ payload: descriptors }),
            actions.setHasFetchedDescriptors({ payload: true })
        ])
    ));

    public addSceneRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.addSceneRemote),
        withLatestFrom(this._store.select(selectors.getAllDescriptors)),
        map(([scene, descriptors]) => this.setUniqueName(scene, descriptors.map(_ => _.name))),
        mergeMap(scene => this._gameSceneHttp.addScene(scene)),
        switchMap(descriptor => {
            const isAdded = Boolean(descriptor);
            const message = isAdded ? 'Successfully added the scene.' : 'Failed to add the scene.';
            this._snackBar.open(message, isAdded ? 'Ok' : 'Got it');

            if (!isAdded) {
                return [actions.setCanAddScene({ payload: true })];
            }

            return [
                actions.addDescriptor(descriptor),
                actions.setCanAddScene({ payload: true })
            ];
        })
    ));

    public updateSceneRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.updateSceneRemote),
        mergeMap(scene => this._gameSceneHttp.updateScene(scene)),
        map(updated => {
            if (!updated) {
                this._snackBar.open('Failed to update the scene.', 'Got it');
            }
        })
    ), { dispatch: false });

    public deleteSceneRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.deleteSceneRemote),
        mergeMap(descriptor => this._gameSceneHttp.deleteScene(descriptor).pipe(
            switchMap(isDeleted => {
                const message = isDeleted ? 'Successfully removed the scene.' : 'Failed to remove the scene.';
                this._snackBar.open(message, isDeleted ? 'Ok' : 'Got it');

                if (!isDeleted) {
                    return [actions.setCanAddScene({ payload: true })];
                }

                return [
                    actions.deleteOpenedScene(descriptor),
                    actions.deleteDescriptor(descriptor),
                    actions.setCanAddScene({ payload: true })
                ];
            })
        ))
    ));

    public openScene$ = createEffect(() => this._actions$.pipe(
        ofType(actions.openScene),
        mergeMap(descriptor => this._gameSceneHttp.getScene(descriptor)),
        switchMap(scene => {
            if (!scene) {
                this._snackBar.open('Failed to fetch the scene from remote server.', 'Got it');

                return [{ type: 'no-op' }];
            }

            return [
                actions.addOpenedScene(scene),
                actions.setActiveScene({ payload: scene })
            ];
        })
    ));

    constructor(private _actions$: Actions,
                private _store: Store,
                private _gameSceneHttp: GameSceneHttpService,
                private _snackBar: MatSnackBar) { }

    private setUniqueName(scene: Scene, names: string[]): Scene {
        const name = FileUtility.handleDuplicateName(names, scene.name, '_', '');

        return { ...scene, name };
    }
}
