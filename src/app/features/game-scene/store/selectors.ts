import { createSelector } from '@ngrx/store';

import { Scene } from '../../../../engine/core/data-model/scene/scene';

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
    getAllScenes,
    (state: IGameSceneModuleState, scenes: Scene[]) => scenes.find(_ => _.id === state.activeSceneState.activeSceneId)
);

export const getOpenedScenes = createSelector(
    getFeatureState,
    getAllScenes,
    (state: IGameSceneModuleState, scenes: Scene[]) => {
        const ids = new Set(state.activeSceneState.openedSceneIds);

        return scenes.filter(_ => ids.has(_.id));
    }
);
