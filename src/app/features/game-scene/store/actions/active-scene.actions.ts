import { createAction, props } from '@ngrx/store';

import { Scene } from '../../../../core/data-model/scene/scene';

const source = '[Scene Builder]';

export const openActiveScene = createAction(`${source} Open Active Scene`, props<Scene>());
export const setActiveScene = createAction(`${source} Set Active Scene`, props<Scene>());
export const addActiveScene = createAction(`${source} Add Active Scene`, props<Scene>());
export const deleteActiveScene = createAction(`${source} Delete Active Scene`, props<Scene>());
