import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';
import { FileUtility } from '../../../core/utility/file.utility';
import { CloudStorageHttpService } from '../../../core/service/http/cloud-storage-http/cloud-storage-http.service';

import * as selectors from './image-sprite.selectors';
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

    public addSpriteRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.addSpriteRemote),
        withLatestFrom(this._store.select(selectors.getAllSprites)),
        map(([sprite, sprites]) => this.setUniqueName(sprite, sprites)),
        mergeMap(sprite => this._cloudStorageHttp.addSprite(sprite).pipe(
            map(id => {
                sprite.id = id;

                return sprite;
            })
        )),
        map(sprite => {
            const isAdded = Boolean(sprite.id);
            const message = isAdded ? 'Successfully added the sprite.' : 'Failed to add the sprite.';
            this._snackBar.open(message, isAdded ? 'Ok' : 'Got it');

            return isAdded ? actions.addSprite(sprite) : { type: 'no-op' };
        })
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
                private _store: Store,
                private _cloudStorageHttp: CloudStorageHttpService,
                private _snackBar: MatSnackBar) { }

    private setUniqueName(sprite: SpriteFile, sprites: SpriteFile[]): SpriteFile {
        const names = sprites.map(_ => _.name);
        sprite.name = FileUtility.handleDuplicateName(names, sprite.name);

        return sprite;
    }
}
