import * as state from './state';
import * as selectors from './selectors';
import { actions } from './actions';
import { reducers } from './reducers';
import { SpritesEffects } from './effects';

export const store = {
    state,
    selectors,
    actions,
    reducers,
    effects: [SpritesEffects]
};
