import { Action, createReducer, on } from '@ngrx/store';

import { ISceneManagerState, initialScenesState } from '../state';
import { actions } from '../actions';
import { SceneDescriptor } from '../../../../core/data-model/descriptors/scene-descriptor';
import { GenericUtility } from '../../../../core/utility/generic-utility/generic.utility';

function setDescriptors(state: ISceneManagerState, props: { payload: SceneDescriptor[] }): ISceneManagerState {
    return { ...state, descriptors: props.payload };
}

function updateDescriptor(state: ISceneManagerState, descriptor: SceneDescriptor): ISceneManagerState {
    const index = state.descriptors.findIndex(_ => _.storageId === descriptor.storageId);

    if (index === -1) {
        return state;
    }

    return { ...state, descriptors: GenericUtility.replaceAt(state.descriptors, descriptor, index) };
}

function deleteDescriptor(state: ISceneManagerState, descriptor: SceneDescriptor): ISceneManagerState {
    return { ...state, descriptors: state.descriptors.filter(_ => _.storageId !== descriptor.storageId) };
}

function addDescriptor(state: ISceneManagerState, descriptor: SceneDescriptor): ISceneManagerState {
    return { ...state, descriptors: [...state.descriptors, descriptor] };
}

function setHasFetchedDescriptors(state: ISceneManagerState, props: { payload: boolean }): ISceneManagerState {
    return { ...state, hasFetchedDescriptors: props.payload };
}

function setCanAddScene(state: ISceneManagerState, props: { payload: boolean }): ISceneManagerState {
    return { ...state, canAddScene: props.payload };
}

const _sceneManagerReducer = createReducer(
    initialScenesState,
    on(actions.setDescriptors, setDescriptors),
    on(actions.getDescriptorsRemote, _ => setHasFetchedDescriptors(_, { payload: false })),
    on(actions.addDescriptor, addDescriptor),
    on(actions.updateDescriptor, updateDescriptor),
    on(actions.deleteDescriptor, deleteDescriptor),
    on(actions.addSceneRemote, _ => setCanAddScene(_, { payload: false })),
    on(actions.deleteSceneRemote, _ => setCanAddScene(_, { payload: false })),
    on(actions.setHasFetchedDescriptors, setHasFetchedDescriptors),
    on(actions.setCanAddScene, setCanAddScene)
);

export function sceneManagerReducer(state: ISceneManagerState, action: Action): ISceneManagerState {
    return _sceneManagerReducer(state, action);
}
