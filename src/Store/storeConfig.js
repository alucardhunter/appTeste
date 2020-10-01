import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

import userReducer from '#/Store/Reducers/userReducers';
import bankReducer from '#/Store/Reducers/bankReducers';
import operationReducer from '#/Store/Reducers/operationReducers';

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['banks','operations','user']
}

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  blacklist: ['isLoading','isRegistering']
}

const reducers = combineReducers({
  user: persistReducer(userPersistConfig,userReducer),
  banks: bankReducer,
  operations: operationReducer
});

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);
