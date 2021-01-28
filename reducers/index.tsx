import { combineReducers } from 'redux';
import blog from './blogReducer';
import blogDetail from './blogDetailReducer';
import propertyDetail from './propertyDetailReducer';
import projectDetail from './projectDetailReducer';
import counter from './counterReducer';
import properties from './propertyReducer';
import projects from './projectReducer';
import contact from './contactReducer';
import filters from './filterReducer';
import cities from './cityReducer';
import category from './categoryReducer';
import routes from './routeReducer';
import auth from './authReducer';
import setting from './settingReducer';
import msg from './msgReducer';
import website from './websiteReducer';
import plan from './planReducer';
import filtersData from './filterDataReducer';
import { withReduxStateSync } from 'redux-state-sync';

// to combine all reducers together
const appReducer = combineReducers({
    msg, blog, counter, blogDetail, properties, propertyDetail,
    projects, projectDetail, contact, website, plan,
    filters, cities, setting, category, auth, routes, filtersData
});

export default withReduxStateSync(appReducer);;