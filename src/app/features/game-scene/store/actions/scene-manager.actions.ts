import { createAction, props } from '@ngrx/store';

import { Scene } from '../../../../../engine/core/data-model/scene/scene';
import { SceneDescriptor } from '../../../../../engine/core/data-model/scene/scene-descriptor';

const source = '[Scene Manager]';

export const setDescriptors = createAction(`${source} Set Descriptors`, props<{ payload: SceneDescriptor[] }>());
export const getDescriptorsRemote = createAction(`${source} Get Descriptors Remote`);
export const addDescriptor = createAction(`${source} Add Descriptor`, props<SceneDescriptor>());
export const updateDescriptor = createAction(`${source} Update Descriptor`, props<SceneDescriptor>());
export const deleteDescriptor = createAction(`${source} Delete Descriptor`, props<SceneDescriptor>());
export const openScene = createAction(`${source} Open Scene`, props<SceneDescriptor>());
export const addSceneRemote = createAction(`${source} Add Scene Remote`, props<Scene>());
export const updateSceneRemote = createAction(`${source} Update Scene Remote`, props<Scene>());
export const deleteSceneRemote = createAction(`${source} Delete Scene Remote`, props<SceneDescriptor>());
export const setHasFetchedDescriptors = createAction(`${source} Set Has Fetched Descriptors`, props<{ payload: boolean }>());
export const setCanAddScene = createAction(`${source} Set Can Add Scene`, props<{ payload: boolean }>());
