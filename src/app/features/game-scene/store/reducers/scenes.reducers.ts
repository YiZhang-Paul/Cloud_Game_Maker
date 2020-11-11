import { Action, createReducer, on } from '@ngrx/store';

import { IScenesState, initialScenesState } from '../state';
import { actions } from '../actions';
import { Scene } from '../../../../core/data-model/scene/scene';

function addScene(state: IScenesState, scene: Scene): IScenesState {
    return { ...state, scenes: [...state.scenes, scene] };
}

function deleteScene(state: IScenesState, scene: Scene): IScenesState {
    return { ...state, scenes: state.scenes.filter(_ => _.id !== scene.id) };
}

function setScenes(state: IScenesState, props: { payload: Scene[] }): IScenesState {
    return { ...state, scenes: props.payload };
}

function setHasFetchedScenes(state: IScenesState, props: { payload: boolean }): IScenesState {
    return { ...state, hasFetchedScenes: props.payload };
}

const _scenesReducer = createReducer(
    initialScenesState,
    on(actions.addScene, addScene),
    on(actions.deleteScene, deleteScene),
    on(actions.setScenes, setScenes),
    on(actions.setHasFetchedScenes, setHasFetchedScenes)
);

export function scenesReducer(state: IScenesState, action: Action): IScenesState {
    return _scenesReducer(state, action);
}
