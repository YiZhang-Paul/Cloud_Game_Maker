import { Action, createReducer, on } from '@ngrx/store';

import { ISpritesState, initialSpritesState } from '../state';
import { actions } from '../actions';
import { Sprite } from '../../../../../engine/core/data-model/sprite/sprite';
import { GenericUtility } from '../../../../core/utility/generic-utility/generic.utility';

const addSprite = (state: ISpritesState, sprite: Sprite): ISpritesState => {
    return { ...state, sprites: [sprite, ...state.sprites] };
};

const updateSprite = (state: ISpritesState, sprite: Sprite): ISpritesState => {
    const index = state.sprites.findIndex(_ => _.id === sprite.id);

    return index === -1 ? state : updateSpriteByIndex(state, { payload: sprite, index });
};

const updateSpriteByIndex = (state: ISpritesState, props: { payload: Sprite; index: number }): ISpritesState => {
    const { payload, index } = props;

    return { ...state, sprites: GenericUtility.replaceAt(state.sprites, payload, index) };
};

const deleteSprite = (state: ISpritesState, sprite: Sprite): ISpritesState => {
    return { ...state, sprites: state.sprites.filter(_ => _.id !== sprite.id) };
};

const setSprites = (state: ISpritesState, props: { payload: Sprite[] }): ISpritesState => {
    return { ...state, sprites: props.payload };
};

const setHasFetchedSprites = (state: ISpritesState, props: { payload: boolean }): ISpritesState => {
    return { ...state, hasFetchedSprites: props.payload };
};

const _spritesReducer = createReducer(
    initialSpritesState,
    on(actions.addSprite, addSprite),
    on(actions.updateSprite, updateSprite),
    on(actions.updateSpriteByIndex, updateSpriteByIndex),
    on(actions.deleteSprite, deleteSprite),
    on(actions.setSprites, setSprites),
    on(actions.getSpritesRemote, _ => setHasFetchedSprites(_, { payload: false })),
    on(actions.setHasFetchedSprites, setHasFetchedSprites)
);

export const spritesReducer = (state: ISpritesState, action: Action): ISpritesState => {
    return _spritesReducer(state, action);
};
