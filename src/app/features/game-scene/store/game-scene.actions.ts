import { createAction, props } from '@ngrx/store';

import { Scene } from '../../../core/data-model/scene/scene';

export const loadScenesRemote = createAction('[Scene Manager] Load Scenes Remote');
export const addScenes = createAction('[Scene Manager] Add Scenes', props<{ payload: Scene[] }>());
export const addScene = createAction('[Scene Manager] Add Scene', props<Scene>());
export const deleteScene = createAction('[Scene Manager] Delete Scene', props<Scene>());
