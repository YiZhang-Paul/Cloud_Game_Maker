import { Action, createReducer, on } from '@ngrx/store';

import { Scene } from '../../../core/data-model/scene/scene';

import { IGameSceneState, initialState } from './game-scene.state';
import * as actions from './game-scene.actions';

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

function setScenes(state: IGameSceneState, props: { payload: Scene[] }): IGameSceneState {
    return { ...state, scenes: props.payload };
}

function setIsSceneLoaded(state: IGameSceneState, props: { payload: boolean }): IGameSceneState {
    return { ...state, isSceneLoaded: props.payload };
}

const _scenesReducer = createReducer(
    initialState,
    on(actions.addScene, addScene),
    on(actions.deleteScene, deleteScene),
    on(actions.addActiveScene, addActiveScene),
    on(actions.setActiveScene, setActiveScene),
    on(actions.setScenes, setScenes),
    on(actions.setIsSceneLoaded, setIsSceneLoaded)
);

export function scenesReducer(state: IGameSceneState, action: Action): IGameSceneState {
    return _scenesReducer(state, action);
}
