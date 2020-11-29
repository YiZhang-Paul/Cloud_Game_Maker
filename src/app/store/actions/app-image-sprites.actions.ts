import { createAction, props } from '@ngrx/store';

import { Point } from '../../../engine/core/data-model/generic/point';
import { Sprite } from '../../../engine/core/data-model/sprite/sprite';

const source = '[Sprite Manager]';

export const setDraggedSprite = createAction(`${source} Set Dragged Sprite`, props<{ payload: Sprite | null }>());
export const setDraggedSpriteStartXY = createAction(`${source} Set Dragged Sprite Start XY`, props<{ payload: Point | null }>());
