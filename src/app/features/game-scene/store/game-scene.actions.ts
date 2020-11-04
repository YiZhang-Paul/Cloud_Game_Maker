import { createAction, props } from '@ngrx/store';

import { Scene } from '../../../core/data-model/scene/scene';

const source = '[Scene Manager]';

export const addScenes = createAction(`${source} Add Scenes`, props<{ payload: Scene[] }>());
export const addScene = createAction(`${source} Add Scene`, props<Scene>());
export const deleteScene = createAction(`${source} Delete Scene`, props<Scene>());
export const startGetScenesRemote = createAction(`${source} Start Get Scenes Remote`);
export const getScenesRemote = createAction(`${source} Get Scenes Remote`);
export const addSceneRemote = createAction(`${source} Add Scene Remote`, props<Scene>());
export const deleteSceneRemote = createAction(`${source} Delete Scene Remote`, props<Scene>());
export const toggleIsSceneLoaded = createAction(`${source} Toggle Is Scene Loaded`);
