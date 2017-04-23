import { createStore, compose } from 'redux';
import rootReducers from './reducers';
import State from './state';

export default createStore(rootReducers, State, compose(
  typeof window === 'object'
  && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : (f) => f,
));