import { ActionReducerMap } from '@ngrx/store';

import { IImageSpriteState } from '../state';

import { spritesReducer } from './sprites.reducers';
import { activeSpriteReducer } from './active-sprite.reducers';

export const reducers: ActionReducerMap<IImageSpriteState> = {
    spritesState: spritesReducer,
    activeSpriteState: activeSpriteReducer
};
