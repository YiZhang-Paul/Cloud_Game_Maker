import { IGameSceneState } from './game-scene.state';

export const selectTotalScenes = (state: IGameSceneState) => state.scenes.length;

export const selectFilteredScenes = (state: IGameSceneState, filter: string) => {
    return state.scenes.filter(_ => _.name.toLowerCase().includes(filter));
};
