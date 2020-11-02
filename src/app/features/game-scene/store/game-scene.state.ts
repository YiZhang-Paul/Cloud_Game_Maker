import { Scene } from '../../../core/data-model/scene/scene';

export const key = 'gameScene';

export interface IGameSceneState {
    scenes: Scene[];
}

export const initialState: IGameSceneState = {
    scenes: []
};
