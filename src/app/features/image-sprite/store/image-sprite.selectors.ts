import { createSelector } from '@ngrx/store';

import { IImageSpriteState, key } from './image-sprite.state';

export const getFeatureState = (state: { [key]: IImageSpriteState }) => state[key];

export const hasSprites = createSelector(
    getFeatureState,
    (state: IImageSpriteState) => state.sprites.length > 0
);

export const getAllSprites = createSelector(
    getFeatureState,
    (state: IImageSpriteState) => state.sprites
);

export const getActiveSprite = createSelector(
    getFeatureState,
    (state: IImageSpriteState) => state.activeSprite
);

export const isSpriteLoaded = createSelector(
    getFeatureState,
    (state: IImageSpriteState) => state.isSpriteLoaded
);

export const getFilteredSprites = createSelector(
    getFeatureState,
    (state: IImageSpriteState, filter: string) => {
        return state.sprites.filter(_ => _.name.toLowerCase().includes(filter ?? ''));
    }
);
