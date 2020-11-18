import { createAction, props } from '@ngrx/store';

const source = '[Scene Builder]';

export const setActiveSceneId = createAction(`${source} Set Active Scene Id`, props<{ payload: string | null }>());
export const addOpenedSceneId = createAction(`${source} Add Opened Scene Id`, props<{ payload: string }>());
export const deleteOpenedSceneId = createAction(`${source} Delete Opened Scene Id`, props<{ payload: string }>());
