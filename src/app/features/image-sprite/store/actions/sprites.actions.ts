import { createAction, props } from '@ngrx/store';

import { Sprite } from '../../../../../engine/core/data-model/sprite/sprite';

const source = '[Sprite Manager]';

export const addSprite = createAction(`${source} Add Sprite`, props<Sprite>());
export const updateSprite = createAction(`${source} Update Sprite`, props<Sprite>());
export const updateSpriteByIndex = createAction(`${source} Update Sprite By Index`, props<{ payload: Sprite; index: number }>());
export const deleteSprite = createAction(`${source} Delete Sprite`, props<Sprite>());
export const setSprites = createAction(`${source} Set Sprites`, props<{ payload: Sprite[] }>());
export const getSpritesRemote = createAction(`${source} Get Sprites Remote`);
export const addSpriteRemote = createAction(`${source} Add Sprite Remote`, props<Sprite>());
export const updateSpriteRemote = createAction(`${source} Update Sprite Remote`, props<Sprite>());
export const deleteSpriteRemote = createAction(`${source} Delete Sprite Remote`, props<Sprite>());
export const setHasFetchedSprites = createAction(`${source} Set Has Fetched Sprites`, props<{ payload: boolean }>());
