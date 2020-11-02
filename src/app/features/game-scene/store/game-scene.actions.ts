import { createAction, props } from '@ngrx/store';

import { Scene } from '../../../core/data-model/scene/scene';

const source = '[Scene Manager]';

export const loadScenesRemote = createAction(`${source} Load Scenes Remote`);
export const addScenes = createAction(`${source} Add Scenes`, props<{ payload: Scene[] }>());
export const addScene = createAction(`${source} Add Scene`, props<Scene>());
export const deleteScene = createAction(`${source} Delete Scene`, props<Scene>());
