import { createSelector } from '@ngrx/store';

import { Scene } from '../../../core/data-model/scene/scene';

import { IGameSceneModuleState, key } from './state';

function matchScenes(scenes: Scene[], filter: string): Scene[] {
    return scenes.filter(_ => _.name.toLowerCase().includes(filter ?? ''));
}

export const getFeatureState = (state: { [key]: IGameSceneModuleState }) => state[key];

export const getAllScenes = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState) => state.scenesState.scenes
);

export const getFilteredScenes = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState, filter: string) => matchScenes(state.scenesState.scenes, filter)
);

export const hasFetchedScenes = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState) => state.scenesState.hasFetchedScenes
);

export const getActiveScene = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState) => state.activeSceneState.activeScene
);

export const getActiveScenes = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState) => state.activeSceneState.activeScenes
);
