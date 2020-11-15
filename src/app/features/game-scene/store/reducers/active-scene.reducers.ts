import { Action, createReducer, on } from '@ngrx/store';

import { IActiveSceneState, initialActiveSceneState } from '../state';
import { actions } from '../actions';

function setActiveSceneId(state: IActiveSceneState, props: { payload: string | null }): IActiveSceneState {
    return { ...state, activeSceneId: props.payload };
}

function addOpenedSceneId(state: IActiveSceneState, props: { payload: string }): IActiveSceneState {
    if (state.openedSceneIds.some(_ => _ === props.payload)) {
        return state;
    }

    return { ...state, openedSceneIds: [...state.openedSceneIds, props.payload] };
}

function deleteOpenedSceneId(state: IActiveSceneState, props: { payload: string }): IActiveSceneState {
    const index = state.openedSceneIds.findIndex(_ => _ === props.payload);

    if (index === -1) {
        return state;
    }

    const nextIndex = index ? index - 1 : 1;
    const activeSceneId = state.openedSceneIds.length === 1 ? null : state.openedSceneIds[nextIndex];
    const openedSceneIds = state.openedSceneIds.filter(_ => _ !== props.payload);

    return { ...state, activeSceneId, openedSceneIds };
}

const _activeSceneReducer = createReducer(
    initialActiveSceneState,
    on(actions.setActiveSceneId, setActiveSceneId),
    on(actions.addOpenedSceneId, addOpenedSceneId),
    on(actions.deleteOpenedSceneId, deleteOpenedSceneId)
);

export function activeSceneReducer(state: IActiveSceneState, action: Action): IActiveSceneState {
    return _activeSceneReducer(state, action);
}
