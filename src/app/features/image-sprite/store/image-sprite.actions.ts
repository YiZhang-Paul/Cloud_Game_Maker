import { createAction, props } from '@ngrx/store';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

const spriteManagerSource = '[Sprite Manager]';

export const addSprites = createAction(`${spriteManagerSource} Add Sprites`, props<{ payload: SpriteFile[] }>());
export const addSprite = createAction(`${spriteManagerSource} Add Sprite`, props<SpriteFile>());
export const deleteSprite = createAction(`${spriteManagerSource} Delete Sprite`, props<SpriteFile>());
export const startGetSpritesRemote = createAction(`${spriteManagerSource} Start Get Sprites Remote`);
export const getSpritesRemote = createAction(`${spriteManagerSource} Get Sprites Remote`);
export const addSpriteRemote = createAction(`${spriteManagerSource} Add Sprite Remote`, props<SpriteFile>());
export const deleteSpriteRemote = createAction(`${spriteManagerSource} Delete Sprite Remote`, props<SpriteFile>());
export const toggleIsSpriteLoaded = createAction(`${spriteManagerSource} Toggle Is Sprite Loaded`);