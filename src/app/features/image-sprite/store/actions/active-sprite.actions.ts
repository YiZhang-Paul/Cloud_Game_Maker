import { createAction, props } from '@ngrx/store';

import { Point } from '../../../../../engine/core/data-model/generic/point';
import { SpriteFile } from '../../../../core/data-model/sprite/sprite-file';

const source = '[Sprite Manager]';

export const setActiveSprite = createAction(`${source} Set Active Sprite`, props<SpriteFile>());
export const resetActiveSprite = createAction(`${source} Reset Active Sprite`);
export const setActiveSpriteLazyLoad = createAction(`${source} Set Active Sprite Lazy Load`, props<SpriteFile>());
export const setDraggedSprite = createAction(`${source} Set Dragged Sprite`, props<{ payload: SpriteFile | null }>());
export const setDraggedSpriteStartXY = createAction(`${source} Set Dragged Sprite Start XY`, props<{ payload: Point | null }>());
