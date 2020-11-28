import { Scene } from '../../../../engine/core/data-model/scene/scene';
import { SceneDescriptor } from '../../../../engine/core/data-model/scene/scene-descriptor';

export const key = 'gameScene';

export interface ISceneManagerState {
    descriptors: SceneDescriptor[];
    hasFetchedDescriptors: boolean;
    canAddScene: boolean;
}

export interface IActiveSceneState {
    activeScene: Scene | null;
    openedScenes: Scene[];
}

export interface IGameSceneModuleState {
    sceneManagerState: ISceneManagerState;
    activeSceneState: IActiveSceneState;
}

export const initialScenesState: ISceneManagerState = {
    descriptors: [],
    hasFetchedDescriptors: false,
    canAddScene: true
};

export const initialActiveSceneState: IActiveSceneState = {
    activeScene: null,
    openedScenes: []
};
