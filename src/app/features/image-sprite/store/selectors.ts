import { createSelector } from '@ngrx/store';

import { SpriteFile } from '../../../core/data-model/sprite/sprite-file';

import { IImageSpriteState, key } from './state';

function matchSprites(sprites: SpriteFile[], filter: string): SpriteFile[] {
    return sprites.filter(_ => _.name.toLowerCase().includes(filter ?? ''));
}

export const getFeatureState = (state: { [key]: IImageSpriteState }) => state[key];

export const getAllSprites = createSelector(
    getFeatureState,
    (state: IImageSpriteState) => state.spritesState.sprites
);

export const getFilteredSprites = createSelector(
    getFeatureState,
    (state: IImageSpriteState, filter: string) => matchSprites(state.spritesState.sprites, filter)
);

export const hasFetchedSprites = createSelector(
    getFeatureState,
    (state: IImageSpriteState) => state.spritesState.hasFetchedSprites
);

export const getActiveSprite = createSelector(
    getFeatureState,
    (state: IImageSpriteState) => state.activeSpriteState.activeSprite
);
