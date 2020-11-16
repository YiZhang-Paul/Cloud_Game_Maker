import { Action, createReducer, on } from '@ngrx/store';

import { IActiveSpriteState, initialActiveSpriteState } from '../state';
import { actions } from '../actions';
import { Point } from '../../../../../engine/core/data-model/generic/point';
import { SpriteFile } from '../../../../core/data-model/sprite/sprite-file';

function setActiveSprite(state: IActiveSpriteState, sprite: SpriteFile): IActiveSpriteState {
    return { ...state, activeSprite: sprite };
}

function resetActiveSprite(state: IActiveSpriteState): IActiveSpriteState {
    return { ...state, activeSprite: null };
}

function setDraggedSprite(state: IActiveSpriteState, props: { payload: SpriteFile | null }): IActiveSpriteState {
    return { ...state, draggedSprite: props.payload };
}

function setDraggedSpriteStartXY(state: IActiveSpriteState, props: { payload: Point | null }): IActiveSpriteState {
    return { ...state, draggedSpriteStartXY: props.payload };
}

const _activeSpriteReducer = createReducer(
    initialActiveSpriteState,
    on(actions.setActiveSprite, setActiveSprite),
    on(actions.resetActiveSprite, resetActiveSprite),
    on(actions.setDraggedSprite, setDraggedSprite),
    on(actions.setDraggedSpriteStartXY, setDraggedSpriteStartXY)
);

export function activeSpriteReducer(state: IActiveSpriteState, action: Action): IActiveSpriteState {
    return _activeSpriteReducer(state, action);
}
