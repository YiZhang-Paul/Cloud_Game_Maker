import { createSelector } from '@ngrx/store';

import { IGameSceneState, key } from './game-scene.state';

export const getFeatureState = (state: { [key]: IGameSceneState }) => state[key];

export const hasScenes = createSelector(
    getFeatureState,
    (state: IGameSceneState) => state.scenes.length > 0
);

export const getFilteredScenes = createSelector(
    getFeatureState,
    (state: IGameSceneState, filter: string) => {
        return state.scenes.filter(_ => _.name.toLowerCase().includes(filter ?? ''));
    }
);
