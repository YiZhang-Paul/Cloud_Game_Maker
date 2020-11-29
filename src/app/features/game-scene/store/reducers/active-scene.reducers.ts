import { Action, createReducer, on } from '@ngrx/store';

import { IActiveSceneState, initialActiveSceneState } from '../state';
import { actions } from '../actions';
import { Scene } from '../../../../../engine/core/data-model/scene/scene';
import { SceneDescriptor } from '../../../../core/data-model/descriptors/scene-descriptor';
import { GenericUtility } from '../../../../core/utility/generic-utility/generic.utility';

function setActiveScene(state: IActiveSceneState, props: { payload: Scene | null }): IActiveSceneState {
    return { ...state, activeScene: props.payload };
}

function updateActiveScene(state: IActiveSceneState, scene: Scene): IActiveSceneState {
    if (state.activeScene?.storageId !== scene.storageId) {
        return state;
    }

    return setActiveScene(state, { payload: scene });
}

function addOpenedScene(state: IActiveSceneState, scene: Scene): IActiveSceneState {
    if (state.openedScenes.some(_ => _.storageId === scene.storageId)) {
        return state;
    }

    return { ...state, openedScenes: [...state.openedScenes, scene] };
}

function updateOpenedScene(state: IActiveSceneState, scene: Scene): IActiveSceneState {
    const index = state.openedScenes.findIndex(_ => _.storageId === scene.storageId);

    if (index === -1) {
        return state;
    }

    return { ...state, openedScenes: GenericUtility.replaceAt(state.openedScenes, scene, index) };
}

function deleteOpenedScene(state: IActiveSceneState, scene: Scene | SceneDescriptor): IActiveSceneState {
    const index = state.openedScenes.findIndex(_ => _.storageId === scene.storageId);

    if (index === -1) {
        return state;
    }

    const nextIndex = index ? index - 1 : 1;
    const activeScene = state.openedScenes.length === 1 ? null : state.openedScenes[nextIndex];
    const openedScenes = state.openedScenes.filter(_ => _.storageId !== scene.storageId);

    return { ...state, activeScene, openedScenes };
}

const _activeSceneReducer = createReducer(
    initialActiveSceneState,
    on(actions.setActiveScene, setActiveScene),
    on(actions.updateActiveScene, updateActiveScene),
    on(actions.addOpenedScene, addOpenedScene),
    on(actions.updateOpenedScene, updateOpenedScene),
    on(actions.deleteOpenedScene, deleteOpenedScene)
);

export function activeSceneReducer(state: IActiveSceneState, action: Action): IActiveSceneState {
    return _activeSceneReducer(state, action);
}
