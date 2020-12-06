import { createSelector } from '@ngrx/store';

import { SceneDescriptor } from '../../../core/data-model/descriptors/scene-descriptor';

import { IGameSceneModuleState, key } from './state';

const matchDescriptors = (descriptors: SceneDescriptor[], filter: string): SceneDescriptor[] => {
    return descriptors.filter(_ => _.name.toLowerCase().includes(filter ?? ''));
};

export const getFeatureState = (state: { [key]: IGameSceneModuleState }) => state[key];

export const getAllDescriptors = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState) => state.sceneManagerState.descriptors
);

export const getFilteredDescriptors = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState, filter: string) => matchDescriptors(state.sceneManagerState.descriptors, filter)
);

export const hasFetchedDescriptors = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState) => state.sceneManagerState.hasFetchedDescriptors
);

export const canAddScene = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState) => state.sceneManagerState.canAddScene
);

export const getActiveScene = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState) => state.activeSceneState.activeScene
);

export const getOpenedScenes = createSelector(
    getFeatureState,
    (state: IGameSceneModuleState) => state.activeSceneState.openedScenes
);
