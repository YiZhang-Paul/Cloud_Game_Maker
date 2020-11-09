import { createAction, props } from '@ngrx/store';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

const spriteManagerSource = '[Sprite Manager]';

export const setActiveSprite = createAction(`${spriteManagerSource} Set Active Sprite`, props<SpriteFile>());
export const addSprites = createAction(`${spriteManagerSource} Add Sprites`, props<{ payload: SpriteFile[] }>());
export const addSprite = createAction(`${spriteManagerSource} Add Sprite`, props<SpriteFile>());
export const updateSprite = createAction(`${spriteManagerSource} Update Sprite`, props<{ payload: SpriteFile, index: number }>());
export const deleteSprite = createAction(`${spriteManagerSource} Delete Sprite`, props<SpriteFile>());
export const startGetSpritesRemote = createAction(`${spriteManagerSource} Start Get Sprites Remote`);
export const getSpritesRemote = createAction(`${spriteManagerSource} Get Sprites Remote`);
export const addSpriteRemote = createAction(`${spriteManagerSource} Add Sprite Remote`, props<SpriteFile>());
export const updateSpriteRemote = createAction(`${spriteManagerSource} Update Sprite Remote`, props<SpriteFile>());
export const editSpriteRemote = createAction(`${spriteManagerSource} Edit Sprite Remote`, props<{ payload: SpriteFile, isNew: boolean }>());
export const deleteSpriteRemote = createAction(`${spriteManagerSource} Delete Sprite Remote`, props<SpriteFile>());
export const setIsSpriteLoaded = createAction(`${spriteManagerSource} Set Is Sprite Loaded`, props<{ payload: boolean }>());
