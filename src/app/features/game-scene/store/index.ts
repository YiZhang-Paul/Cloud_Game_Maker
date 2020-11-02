import * as state from './game-scene.state';
import * as selectors from './game-scene.selectors';
import * as actions from './game-scene.actions';
import * as reducers from './game-scene.reducers';
import * as effects from './game-scene.effects';

export const store = {
    key: 'gameScene',
    state,
    selectors,
    actions,
    reducers,
    effects
};
