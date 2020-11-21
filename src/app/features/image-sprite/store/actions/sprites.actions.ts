import { createAction, props } from '@ngrx/store';

import { SpriteFile } from '../../../../../engine/core/data-model/sprite/sprite-file';

const source = '[Sprite Manager]';

export const addSprite = createAction(`${source} Add Sprite`, props<SpriteFile>());
export const updateSprite = createAction(`${source} Update Sprite`, props<{ payload: SpriteFile, index: number }>());
export const deleteSprite = createAction(`${source} Delete Sprite`, props<SpriteFile>());
export const setSprites = createAction(`${source} Set Sprites`, props<{ payload: SpriteFile[] }>());
export const getSpritesRemote = createAction(`${source} Get Sprites Remote`);
export const addSpriteRemote = createAction(`${source} Add Sprite Remote`, props<SpriteFile>());
export const updateSpriteRemote = createAction(`${source} Update Sprite Remote`, props<SpriteFile>());
export const deleteSpriteRemote = createAction(`${source} Delete Sprite Remote`, props<SpriteFile>());
export const setHasFetchedSprites = createAction(`${source} Set Has Fetched Sprites`, props<{ payload: boolean }>());
