import { createAction, props } from '@ngrx/store';

import { Scene } from '../../../../../engine/core/data-model/scene/scene';
import { SceneDescriptor } from '../../../../../engine/core/data-model/scene/scene-descriptor';

const source = '[Scene Builder]';

export const setActiveScene = createAction(`${source} Set Active Scene`, props<{ payload: Scene | null }>());
export const updateActiveScene = createAction(`${source} Update Active Scene`, props<Scene>());
export const addOpenedScene = createAction(`${source} Add Opened Scene`, props<Scene>());
export const updateOpenedScene = createAction(`${source} Update Opened Scene`, props<Scene>());
export const deleteOpenedScene = createAction(`${source} Delete Opened Scene`, props<Scene | SceneDescriptor>());
