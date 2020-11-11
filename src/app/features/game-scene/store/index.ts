import * as state from './game-scene.state';
import * as selectors from './game-scene.selectors';
import * as actions from './game-scene.actions';
import * as reducers from './game-scene.reducers';
import { ScenesEffects } from './game-scene.effects';

export const store = {
    state,
    selectors,
    actions,
    reducers,
    effects: [ScenesEffects]
};
