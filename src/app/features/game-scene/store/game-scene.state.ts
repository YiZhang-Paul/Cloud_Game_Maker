import { Scene } from '../../../core/data-model/scene/scene';

export interface IGameSceneState {
    scenes: Scene[];
    sceneFilter: string;
}

export const initialState: IGameSceneState = {
    scenes: [],
    sceneFilter: ''
};
