import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk';
import appReducer from '../reducers';
import { createStateSyncMiddleware } from 'redux-state-sync';
import persistState from 'redux-localstorage';
import session from 'redux-sessionstorage';
//, initMessageListener,initStateWithPrevTab
export const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0
}

export type BlogSortedState = {
  recentData: any,
  popularData: any,
  commentedData: any,
}

export type BlogDetailState = {
  description: string,
  listingDtae: string,
  metaDesc: string,
  metaKey: string,
  profilePic: string,
  slug: string,
  tags: any[]
  title: string,
  view: number
  __v: number
  _id: string,
}

const config = {
  channel: 'my_broadcast_channel',
  // // TOGGLE_TODO will not be triggered in other tabs
  // blacklist: ['TOGGLE_TODO'],
};
// const middlewares = [createStateSyncMiddleware(config)];
// const store = createStore(appReducer, {}, applyMiddleware(...middlewares));
// // this is used to pass store.dsipatch to the message listener
// initMessageListener(store);

const enhancer = compose(
  composeWithDevTools(applyMiddleware(thunkMiddleware, createStateSyncMiddleware(config))),
  //persistState(/*paths, config*/),
  persistState(['setting','auth']),
  session(['cities,filtersData'])
)

export function initializeStore(initialState = exampleInitialState) {
  const store = createStore(appReducer, initialState, enhancer)
  //initMessageListener(store);
  //initStateWithPrevTab(store);
  return store;
}
