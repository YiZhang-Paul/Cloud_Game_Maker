import { Action, createReducer, on } from '@ngrx/store';

import { IActiveSpriteState, initialActiveSpriteState } from '../state';
import { actions } from '../actions';
import { SpriteFile } from '../../../../core/data-model/sprite/sprite-file';

function setActiveSprite(state: IActiveSpriteState, sprite: SpriteFile): IActiveSpriteState {
    return { ...state, activeSprite: sprite };
}

function resetActiveSprite(state: IActiveSpriteState): IActiveSpriteState {
    return { ...state, activeSprite: null };
}

const _activeSpriteReducer = createReducer(
    initialActiveSpriteState,
    on(actions.setActiveSprite, setActiveSprite),
    on(actions.resetActiveSprite, resetActiveSprite)
);

export function activeSpriteReducer(state: IActiveSpriteState, action: Action): IActiveSpriteState {
    return _activeSpriteReducer(state, action);
}
