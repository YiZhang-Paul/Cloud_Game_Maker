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

export const canAddScene = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState) => state.scenesState.canAddScene
);

export const getActiveScene = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState) => {
        const scenes = state.scenesState.scenes;
        const id = state.activeSceneState.activeSceneId;

        return scenes.find(_ => _.id === id);
    }
);

export const getOpenedScenes = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState) => {
        const scenes = state.scenesState.scenes;
        const ids = new Set(state.activeSceneState.openedSceneIds);

        return scenes.filter(_ => ids.has(_.id));
    }
);
