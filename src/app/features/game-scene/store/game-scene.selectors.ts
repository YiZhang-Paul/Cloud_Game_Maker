import { createSelector } from '@ngrx/store';

import { IGameSceneState, key } from './game-scene.state';

export const getFeatureState = (state: { [key]: IGameSceneState }) => state[key];

export const getTotalScenes = createSelector(
    getFeatureState,
    (state: IGameSceneState) => state.scenes.length
);

export const getFilteredScenes = createSelector(
    getFeatureState,
    (state: IGameSceneState, filter: string) => {
        return state.scenes.filter(_ => _.name.toLowerCase().includes(filter ?? ''));
    }
);
