import { Scene } from '../../../core/data-model/scene/scene';

export const key = 'gameScene';

export interface IGameSceneState {
    scenes: Scene[];
    activeScene: Scene | null;
    activeScenes: Scene[];
    hasFetchedScenes: boolean;
}

export const initialState: IGameSceneState = {
    scenes: [],
    activeScene: null,
    activeScenes: [],
    hasFetchedScenes: true
};
