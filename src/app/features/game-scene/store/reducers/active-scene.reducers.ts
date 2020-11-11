import { Action, createReducer, on } from '@ngrx/store';

import { IActiveSceneState, initialActiveSceneState } from '../state';
import { actions } from '../actions';
import { Scene } from '../../../../core/data-model/scene/scene';

function setActiveScene(state: IActiveSceneState, scene: Scene): IActiveSceneState {
    return { ...state, activeScene: scene };
}

function addActiveScene(state: IActiveSceneState, scene: Scene): IActiveSceneState {
    if (state.activeScenes.some(_ => _.id === scene.id)) {
        return state;
    }

    return { ...state, activeScenes: [...state.activeScenes, scene] };
}

function deleteActiveScene(state: IActiveSceneState, scene: Scene): IActiveSceneState {
    const index = state.activeScenes.findIndex(_ => _.id === scene.id);

    if (index === -1) {
        return state;
    }

    const nextIndex = index ? index - 1 : 1;
    const activeScene = state.activeScenes.length === 1 ? null : state.activeScenes[nextIndex];
    const activeScenes = state.activeScenes.filter(_ => _.id !== scene.id);

    return { ...state, activeScene, activeScenes };
}

const _activeSceneReducer = createReducer(
    initialActiveSceneState,
    on(actions.setActiveScene, setActiveScene),
    on(actions.addActiveScene, addActiveScene),
    on(actions.deleteActiveScene, deleteActiveScene)
);

export function activeSceneReducer(state: IActiveSceneState, action: Action): IActiveSceneState {
    return _activeSceneReducer(state, action);
}
