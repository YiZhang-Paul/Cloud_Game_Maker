import { Scene } from '../../../core/data-model/scene/scene';

export const key = 'gameScene';

export interface IScenesState {
    scenes: Scene[];
    hasFetchedScenes: boolean;
    canAddScene: boolean;
}

export interface IActiveSceneState {
    activeScene: Scene | null;
    activeScenes: Scene[];
}

export interface IGameSceneModuleState {
    scenesState: IScenesState;
    activeSceneState: IActiveSceneState;
}

export const initialScenesState: IScenesState = {
    scenes: [],
    hasFetchedScenes: false,
    canAddScene: true
};

export const initialActiveSceneState: IActiveSceneState = {
    activeScene: null,
    activeScenes: []
};
