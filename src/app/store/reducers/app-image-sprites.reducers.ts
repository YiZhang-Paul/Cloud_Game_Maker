import { Action, createReducer, on } from '@ngrx/store';

import { IAppImageSpritesState, initialAppImageSpritesState } from '../state';
import { actions } from '../actions';
import { Point } from '../../../engine/core/data-model/generic/point';
import { Sprite } from '../../../engine/core/data-model/sprite/sprite';

const setDraggedSprite = (state: IAppImageSpritesState, props: { payload: Sprite | null }): IAppImageSpritesState => {
    return { ...state, draggedSprite: props.payload };
};

const setDraggedSpriteStartXY = (state: IAppImageSpritesState, props: { payload: Point | null }): IAppImageSpritesState => {
    return { ...state, draggedSpriteStartXY: props.payload };
};

const _appImageSpritesReducer = createReducer(
    initialAppImageSpritesState,
    on(actions.setDraggedSprite, setDraggedSprite),
    on(actions.setDraggedSpriteStartXY, setDraggedSpriteStartXY)
);

export const appImageSpritesReducer = (state: IAppImageSpritesState, action: Action): IAppImageSpritesState => {
    return _appImageSpritesReducer(state, action);
};
