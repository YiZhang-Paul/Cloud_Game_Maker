import { ActionReducerMap } from '@ngrx/store';

import { IGameSceneModuleState } from '../state';

import { sceneManagerReducer } from './scene-manager.reducers';
import { activeSceneReducer } from './active-scene.reducers';

export const reducers: ActionReducerMap<IGameSceneModuleState> = {
    sceneManagerState: sceneManagerReducer,
    activeSceneState: activeSceneReducer
};
