import * as state from './state';
import * as selectors from './selectors';
import { actions } from './actions';
import * as reducers from './game-scene.reducers';
import { ScenesEffects } from './effects';

export const store = {
    state,
    selectors,
    actions,
    reducers,
    effects: [ScenesEffects]
};
