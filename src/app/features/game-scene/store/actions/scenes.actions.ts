import { createAction, props } from '@ngrx/store';

import { Scene } from '../../../../../engine/core/data-model/scene/scene';

const source = '[Scene Manager]';

export const openScene = createAction(`${source} Open Scene`, props<Scene>());
export const addScene = createAction(`${source} Add Scene`, props<Scene>());
export const updateScene = createAction(`${source} Update Scene`, props<Scene>());
export const deleteScene = createAction(`${source} Delete Scene`, props<Scene>());
export const setScenes = createAction(`${source} Set Scenes`, props<{ payload: Scene[] }>());
export const getScenesRemote = createAction(`${source} Get Scenes Remote`);
export const addSceneRemote = createAction(`${source} Add Scene Remote`, props<Scene>());
export const deleteSceneRemote = createAction(`${source} Delete Scene Remote`, props<Scene>());
export const setHasFetchedScenes = createAction(`${source} Set Has Fetched Scenes`, props<{ payload: boolean }>());
export const setCanAddScene = createAction(`${source} Set Can Add Scene`, props<{ payload: boolean }>());
