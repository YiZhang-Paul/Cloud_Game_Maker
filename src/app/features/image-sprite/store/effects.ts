import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import imageCompression from 'browser-image-compression';

import { SpriteFile } from '../../../../engine/core/data-model/sprite/sprite-file';
import { FileUtility } from '../../../core/utility/file-utility/file.utility';
import { CloudStorageHttpService } from '../../../core/service/http/cloud-storage-http/cloud-storage-http.service';

import * as selectors from './selectors';
import { actions } from './actions';

@Injectable()
export class SpritesEffects {

    public setActiveSpriteLazyLoad$ = createEffect(() => this._actions$.pipe(
        ofType(actions.setActiveSpriteLazyLoad),
        mergeMap(sprite => this._cloudStorageHttp.getSpriteContent(sprite).pipe(
            switchMap(content => [
                actions.updateSprite({ ...sprite, content }),
                actions.setActiveSprite({ ...sprite, content })
            ])
        ))
    ));

    public getSpritesRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.getSpritesRemote),
        mergeMap(() => this._cloudStorageHttp.getSprites()),
        switchMap(sprites => [
            actions.setSprites({ payload: sprites }),
            actions.setHasFetchedSprites({ payload: true })
        ])
    ));

    public addSpriteRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.addSpriteRemote),
        mergeMap(sprite => this.compressFile(sprite)),
        withLatestFrom(this._store.select(selectors.getAllSprites)),
        map(([sprite, sprites]) => this.setUniqueName(sprite, sprites)),
        mergeMap(sprite => this._cloudStorageHttp.addSprite(sprite).pipe(
            map(id => ({ ...sprite, id }))
        )),
        switchMap(sprite => {
            const isAdded = Boolean(sprite.id);
            const message = isAdded ? 'Successfully added the sprite.' : 'Failed to add the sprite.';
            this._snackBar.open(message, isAdded ? 'Ok' : 'Got it');

            if (!isAdded) {
                return [{ type: 'no-op' }];
            }

            return [actions.addSprite(sprite), actions.resetActiveSprite()];
        })
    ));

    public updateSpriteRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.updateSpriteRemote),
        mergeMap(sprite => this.ensureCompressedFile(sprite)),
        withLatestFrom(this._store.select(selectors.getAllSprites)),
        map(([sprite, sprites]) => {
            const id = sprite.originated ?? sprite.id;

            return ({ sprite, sprites, index: sprites.findIndex(_ => _.id === id) });
        }),
        filter(result => result.index !== -1),
        map(({ sprite, sprites, index }) => ({ sprite: this.ensureUniqueName(sprite, sprites, index), index })),
        mergeMap(result => this._cloudStorageHttp.updateSprite(result.sprite).pipe(
            map(id => ({ ...result, sprite: { ...result.sprite, id } }))
        )),
        switchMap(({ sprite, index }) => {
            const isUpdated = Boolean(sprite.id);
            const message = isUpdated ? 'Successfully updated the sprite.' : 'Failed to update the sprite.';
            this._snackBar.open(message, isUpdated ? 'Ok' : 'Got it');

            if (!isUpdated) {
                return [{ type: 'no-op' }];
            }

            return [
                actions.updateSpriteByIndex({ payload: sprite, index }),
                actions.resetActiveSprite()
            ];
        })
    ));

    public deleteSpriteRemote$ = createEffect(() => this._actions$.pipe(
        ofType(actions.deleteSpriteRemote),
        mergeMap(sprite => this._cloudStorageHttp.deleteSprite(sprite).pipe(
            map(isDeleted => {
                const message = isDeleted ? 'Successfully removed the sprite.' : 'Failed to remove the sprite.';
                this._snackBar.open(message, isDeleted ? 'Ok' : 'Got it');

                return isDeleted ? actions.deleteSprite(sprite) : { type: 'no-op' };
            })
        ))
    ));

    constructor(private _actions$: Actions,
                private _store: Store,
                private _cloudStorageHttp: CloudStorageHttpService,
                private _snackBar: MatSnackBar) { }

    private ensureUniqueName(sprite: SpriteFile, sprites: SpriteFile[], index: number): SpriteFile {
        const hasNewName = sprite.name !== sprites[index].name;

        return hasNewName ? this.setUniqueName(sprite, sprites) : sprite;
    }

    private setUniqueName(sprite: SpriteFile, sprites: SpriteFile[]): SpriteFile {
        const names = sprites.map(_ => _.name);
        const name = FileUtility.handleDuplicateName(names, sprite.name);

        return { ...sprite, name };
    }

    private ensureCompressedFile(sprite: SpriteFile): Observable<SpriteFile> {
        if (sprite.content) {
            return this.compressFile(sprite);
        }

        return this._cloudStorageHttp.getSpriteContent(sprite).pipe(
            map(content => ({ ...sprite, content }))
        );
    }

    private compressFile(sprite: SpriteFile): Observable<SpriteFile> {
        const promise = imageCompression(sprite.content, { maxSizeMB: 0.12 });

        return from(promise).pipe(
            mergeMap(content => of(new Blob([content], { type: content.type }))),
            map(content => ({ ...sprite, content }))
        );
    }
}
