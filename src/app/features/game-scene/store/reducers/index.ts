import { ActionReducerMap } from '@ngrx/store';

import { IGameSceneModuleState } from '../state';

import { scenesReducer } from './scenes.reducers';
import { activeSceneReducer } from './active-scene.reducers';

export const reducers: ActionReducerMap<IGameSceneModuleState> = {
    scenesState: scenesReducer,
    activeSceneState: activeSceneReducer
};
