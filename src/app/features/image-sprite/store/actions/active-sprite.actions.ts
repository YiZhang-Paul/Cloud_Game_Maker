import { createAction, props } from '@ngrx/store';

import { Sprite } from '../../../../../engine/core/data-model/sprite/sprite';

const source = '[Sprite Manager]';

export const setActiveSprite = createAction(`${source} Set Active Sprite`, props<Sprite>());
export const resetActiveSprite = createAction(`${source} Reset Active Sprite`);
export const setActiveSpriteLazyLoad = createAction(`${source} Set Active Sprite Lazy Load`, props<Sprite>());
