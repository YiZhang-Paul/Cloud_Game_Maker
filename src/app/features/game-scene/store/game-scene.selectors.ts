import { createSelector } from '@ngrx/store';

import { Scene } from '../../../core/data-model/scene/scene';

import { IGameSceneState } from './game-scene.state';

export const selectTotalScenes = (state: IGameSceneState) => state.scenes.length;

export const selectFilteredScenes = createSelector(
    (state: IGameSceneState) => state.scenes,
    (state: IGameSceneState) => state.sceneFilter,
    (scenes: Scene[], filter: string) => scenes.filter(_ => _.name.toLowerCase().includes(filter))
);
