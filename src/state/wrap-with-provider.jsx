import React from "react";
import { createStore, combineReducers } from 'redux';
import { Provider } from "react-redux";
import auth from './reducers/authReducer';
import workspace from './reducers/workspaceReducer';
import workspaceLinks from './reducers/webLinksReducer';
import system from './reducers/mainLayoutReducer';
import appClock from './reducers/appClockReducer';
import appBarracksManagement from './reducers/appBarracksManagementReducer';


const myReducer = combineReducers({
  auth,
  workspace,
  workspaceLinks,
  system,
  appClock,
  appBarracksManagement
});

 const wrapWithProps = ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const preloadedState = window?.__PRELOADED_STATE__;
  const clientStore = createStore(myReducer, window?.__REDUX_DEVTOOLS_EXTENSION__ && window?.__REDUX_DEVTOOLS_EXTENSION__());
  return <Provider store={clientStore} serverState={preloadedState}>{element}</Provider>;
};

export const warapWithPropsSrv = ({ element }) => {
  const clientStore = createStore(myReducer);
  return <Provider store={clientStore}>{element}</Provider>;
};
export default wrapWithProps;