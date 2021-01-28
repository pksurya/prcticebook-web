import {
  getProjectListStarted, getProjectListSuccess, getProjectListFailure,
  getProjectDetailStarted, getProjectDetailSuccess, getProjectDetailFailure,
  getProjectGroupStarted, getProjectGroupSuccess, getProjectGroupFailure,
  getProjectCountStarted, getProjectCountSuccess, getProjectCountFailure,
  getHotProjectListStarted, getHotProjectListSuccess, getHotProjectListFailure,
} from "../actions/projectActions";
import { UpdateFilter } from '../actions/filterActions';
import { constant } from "../constant";
import { ConvertObjToQueryString, deepClone } from "../utility";

export const filterList = (filter: any) => async dispatch => {
  filter.page = 1;
  await dispatch(UpdateFilter(filter));
  await dispatch(getProjectList(filter));
}

export const resetList = (f) => async dispatch => {
  f.page = 1;
  await dispatch(UpdateFilter(f));
  await dispatch(getProjectList(f));
}

// get project list
export const getProjectList = (filter: any) => async dispatch => {
  let pg = deepClone(filter.page);
  filter.page = filter.page - 1;
  if (filter.page < 0) {
    filter.page = 0;
  }
  filter.size = "";
  filter.budget = "";
  let url = ConvertObjToQueryString(filter, `${constant.baseAPIurl}api/project/list`);
  if (pg <= 0) { pg = 1; }
  dispatch(getProjectListStarted());
  //`${constant.baseAPIurl}api/project/list?limit=${constant.blogsLimit}&page=${pg}&keyword=${keyword}`
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data == []) {
      dispatch(getProjectListSuccess(data, pg));
    }
    else {
      dispatch(getProjectListSuccess(data, pg));
    }

  } catch (err) {
    dispatch(getProjectListFailure(err.message));
  }
}


//get project Count
export const getProjectCount = (filter: any) => async dispatch => {
  dispatch(getProjectCountStarted());
  try {
    let url = ConvertObjToQueryString(filter, `${constant.baseAPIurl}api/project/count`);
    const res = await fetch(url);
    const count = await res.json();
    dispatch(getProjectCountSuccess(count));
  } catch (err) {
    dispatch(getProjectCountFailure(err.message));
  }
}


// get HOT project list
export const getHotProjectList = (filter: any) => async dispatch => {
  dispatch(getHotProjectListStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/project/list?limit=${constant.hotPropLimit}&page=0&view=-1&websites=${filter.websites}`);
    const data = await res.json();
    dispatch(getHotProjectListSuccess(data));
  } catch (err) {
    dispatch(getHotProjectListFailure(err.message));
  }
}


// get project Detail by slug
export const getProjectDetail = (slug) => async dispatch => {
  dispatch(getProjectDetailStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/project/list/${slug}`);
    const data = await res.json();   
    dispatch(getProjectDetailSuccess(data));
  } catch (err) {
    dispatch(getProjectDetailFailure(err.message));
  }
}


// get project Groups by city
export const getProjectGroups = (city) => async dispatch => {
  dispatch(getProjectGroupStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/projectgroup/data?city=${city}`);
    const data = await res.json();   
    dispatch(getProjectGroupSuccess(data));
  } catch (err) {
    dispatch(getProjectGroupFailure(err.message));
  }
}

