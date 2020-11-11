import { createSelector } from '@ngrx/store';

import { IGameSceneState, key } from './state';

export const getFeatureState = (state: { [key]: IGameSceneState }) => state[key];

export const hasScenes = createSelector(
    getFeatureState,
    (state: IGameSceneState) => state.scenes.length > 0
);

export const getAllScenes = createSelector(
    getFeatureState,
    (state: IGameSceneState) => state.scenes
);

export const getFilteredScenes = createSelector(
    getFeatureState,
    (state: IGameSceneState, filter: string) => {
        return state.scenes.filter(_ => _.name.toLowerCase().includes(filter ?? ''));
    }
);

export const getActiveScene = createSelector(
    getFeatureState,
    (state: IGameSceneState) => state.activeScene
);

export const getActiveScenes = createSelector(
    getFeatureState,
    (state: IGameSceneState) => state.activeScenes
);

export const hasFetchedScenes = createSelector(
    getFeatureState,
    (state: IGameSceneState) => state.hasFetchedScenes
);
