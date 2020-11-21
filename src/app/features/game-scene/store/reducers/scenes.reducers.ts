import { Action, createReducer, on } from '@ngrx/store';

import { IScenesState, initialScenesState } from '../state';
import { actions } from '../actions';
import { Scene } from '../../../../../engine/core/data-model/scene/scene';

function addScene(state: IScenesState, scene: Scene): IScenesState {
    return { ...state, scenes: [...state.scenes, scene] };
}

function updateScene(state: IScenesState, scene: Scene): IScenesState {
    const index = state.scenes.findIndex(_ => _.id === scene.id);

    if (index === -1) {
        return state;
    }

    const scenes = [...state.scenes.slice(0, index), scene, ...state.scenes.slice(index + 1)];

    return { ...state, scenes };
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

function setCanAddScene(state: IScenesState, props: { payload: boolean }): IScenesState {
    return { ...state, canAddScene: props.payload };
}

const _scenesReducer = createReducer(
    initialScenesState,
    on(actions.addScene, addScene),
    on(actions.updateScene, updateScene),
    on(actions.deleteScene, deleteScene),
    on(actions.getScenesRemote, _ => setHasFetchedScenes(_, { payload: false })),
    on(actions.addSceneRemote, _ => setCanAddScene(_, { payload: false })),
    on(actions.deleteSceneRemote, _ => setCanAddScene(_, { payload: false })),
    on(actions.setScenes, setScenes),
    on(actions.setHasFetchedScenes, setHasFetchedScenes),
    on(actions.setCanAddScene, setCanAddScene)
);

export function scenesReducer(state: IScenesState, action: Action): IScenesState {
    return _scenesReducer(state, action);
}
