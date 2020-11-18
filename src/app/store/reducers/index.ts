import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from '../state';

import { appImageSpritesReducer } from './app-image-sprites.reducers';

export const reducers: ActionReducerMap<IAppState> = {
    appImageSpriteState: appImageSpritesReducer
};
