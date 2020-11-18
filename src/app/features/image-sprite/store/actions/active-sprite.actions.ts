import { createAction, props } from '@ngrx/store';

import { SpriteFile } from '../../../../core/data-model/sprite/sprite-file';

const source = '[Sprite Manager]';

export const setActiveSprite = createAction(`${source} Set Active Sprite`, props<SpriteFile>());
export const resetActiveSprite = createAction(`${source} Reset Active Sprite`);
export const setActiveSpriteLazyLoad = createAction(`${source} Set Active Sprite Lazy Load`, props<SpriteFile>());
