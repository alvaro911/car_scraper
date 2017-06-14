import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import rootReducer from './allReducers';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
          applyMiddleware(thunk, createLogger()),
          window.devToolsExtension ? window.devToolsExtension() : f => f
        ),
    );
}
