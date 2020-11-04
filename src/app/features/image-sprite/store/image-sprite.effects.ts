import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import { CloudStorageHttpService } from '../../../core/service/http/cloud-storage-http/cloud-storage-http.service';

import * as actions from './image-sprite.actions';

@Injectable()
export class SpritesEffects {

    public startGetSpritesRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.startGetSpritesRemote),
        switchMap(() => [actions.toggleIsSpriteLoaded(), actions.getSpritesRemote()])
    ));

    public getSpritesRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.getSpritesRemote),
        mergeMap(() => this._cloudStorageHttp.getSprites()),
        switchMap(sprites => [actions.addSprites({ payload: sprites }), actions.toggleIsSpriteLoaded()])
    ));

    public deleteSpriteRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.deleteSpriteRemote),
        mergeMap(sprite => this._cloudStorageHttp.deleteSprite(sprite).pipe(
            map(isDeleted => ({ sprite, isDeleted }))
        )),
        map(result => {
            const { sprite, isDeleted } = result;
            const message = isDeleted ? 'Successfully removed the sprite.' : 'Failed to remove the sprite.';
            this._snackBar.open(message, isDeleted ? 'Ok' : 'Got it');

            return isDeleted ? actions.deleteSprite(sprite) : { type: 'no-op' };
        })
    ));

    constructor(private _actions$: Actions,
                private _cloudStorageHttp: CloudStorageHttpService,
                private _snackBar: MatSnackBar) { }
}
