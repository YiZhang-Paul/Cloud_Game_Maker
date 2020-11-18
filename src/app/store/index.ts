import * as state from './state';
import * as selectors from './selectors';
import { actions } from './actions';
import { reducers } from './reducers';

export const store = {
    state,
    selectors,
    actions,
    reducers
};
