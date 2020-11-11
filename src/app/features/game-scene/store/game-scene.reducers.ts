import { Action, createReducer, on } from '@ngrx/store';

import { Scene } from '../../../core/data-model/scene/scene';

import { IGameSceneState, initialState } from './state';
import { actions } from './actions';

function addScene(state: IGameSceneState, scene: Scene): IGameSceneState {
    return { ...state, scenes: [...state.scenes, scene] };
}

function deleteScene(state: IGameSceneState, scene: Scene): IGameSceneState {
    return { ...state, scenes: state.scenes.filter(_ => _.id !== scene.id) };
}

function addActiveScene(state: IGameSceneState, scene: Scene): IGameSceneState {
    if (state.activeScenes.some(_ => _.id === scene.id)) {
        return state;
    }

    return { ...state, activeScenes: [...state.activeScenes, scene] };
}

function setActiveScene(state: IGameSceneState, scene: Scene): IGameSceneState {
    return { ...state, activeScene: scene };
}

function deleteActiveScene(state: IGameSceneState, scene: Scene): IGameSceneState {
    const index = state.activeScenes.findIndex(_ => _.id === scene.id);

    if (index === -1) {
        return state;
    }

    const nextIndex = index ? index - 1 : 1;
    const activeScene = state.activeScenes.length === 1 ? null : state.activeScenes[nextIndex];
    const activeScenes = state.activeScenes.filter(_ => _.id !== scene.id);

    return { ...state, activeScene, activeScenes };
}

function setScenes(state: IGameSceneState, props: { payload: Scene[] }): IGameSceneState {
    return { ...state, scenes: props.payload };
}

function setHasFetchedScenes(state: IGameSceneState, props: { payload: boolean }): IGameSceneState {
    return { ...state, hasFetchedScenes: props.payload };
}

const _scenesReducer = createReducer(
    initialState,
    on(actions.addScene, addScene),
    on(actions.deleteScene, deleteScene),
    on(actions.addActiveScene, addActiveScene),
    on(actions.setActiveScene, setActiveScene),
    on(actions.deleteActiveScene, deleteActiveScene),
    on(actions.setScenes, setScenes),
    on(actions.setHasFetchedScenes, setHasFetchedScenes)
);

export function scenesReducer(state: IGameSceneState, action: Action): IGameSceneState {
    return _scenesReducer(state, action);
}
