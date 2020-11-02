import { Scene } from '../../../core/data-model/scene/scene';

export interface IGameSceneState {
    scenes: Scene[];
}

export const initialState: IGameSceneState = {
    scenes: []
};
