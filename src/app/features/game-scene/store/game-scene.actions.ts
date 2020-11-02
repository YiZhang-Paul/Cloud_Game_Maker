import { createAction, props } from '@ngrx/store';

import { Scene } from '../../../core/data-model/scene/scene';

export const addScene = createAction('[Scene Manager] Add Scene', props<Scene>());
export const deleteScene = createAction('[Scene Manager] Delete Scene', props<Scene>());
