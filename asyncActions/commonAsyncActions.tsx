import {
  getCityListStarted, getCityListSuccess, getCityListFailure,
  getCategoryListStarted, getCategoryListSuccess, getCategoryListFailure, getPlansListSuccess
} from "../actions/commonActions";
import {
  getRoutesSEOStarted, getRoutesSEOSuccess, getRoutesSEOFailure,
  getRouteListStarted, getRouteListSuccess, getRouteListFailure
} from '../actions/routesActions';
import {
  UpdateMsg
} from '../actions/msgActions';


import { constant, glink } from "../constant";
import { UpdateFilter, getFiltersDataStarted, getFiltersDataSuccess, getFiltersDataFailure } from "../actions/filterActions";
import { UpdateSetting } from "../actions/settingActions";
import { addOrRemoveInFIlter, loadOwl, deepClone } from "../utility";
import { getProjectList, getProjectGroups } from "./projectAsyncActions";
import { getPropertyList, getPropertyCount } from "./propertyAsyncActions";
import Router from "next/router";
import { getWebsiteStarted, getWebsiteSuccess, getWebsiteFailure } from "../actions/websiteActions";

// get Cities list
export const getCityList = () => async dispatch => {
  dispatch(getCityListStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/cities/list`);
    const data = await res.json();
    dispatch(getCityListSuccess(data));
  } catch (err) {
    dispatch(getCityListFailure(err.message));
  }
}

//--------------------Filters--------------------------------

export const updateFilter = (filters, key: string[], val: string[], multi, reload: number = 0, url: string = "") => async dispatch => {
  let f = addOrRemoveInFIlter(filters, key, val, multi);
  f.page = 1;

  await dispatch(updateAll(f));
  await dispatch(UpdateFilter(f));
}

//--------------------Setting--------------------------------

export const updateSetting = (obj, key: string[], val: string[], multi, url: string = "") => async dispatch => {
  let f = addOrRemoveInFIlter(obj, key, val, multi);
  await dispatch(UpdateSetting(f));
  //to refresh page content on proptype tab chnage
  // f.page = 1;
  // await dispatch(updateAll(f));
  //ends
  if (url) {
    window.location.href = url;
  }
}

export const updateAll = (filters) => async dispatch => {
  debugger;
  const { pathname } = Router;
  if (pathname == glink.href.home || pathname == glink.href.homeLocation) {
    try {
      dispatch(getProjectGroups(filters.location));
      dispatch(getProjectList(filters));
      await dispatch(getPropertyList(filters));
      loadOwl();
    }
    catch (err) {
      console.log(["Error at loadOwl in commonasync: ", err]);
    }
    // let f = deepClone(filters);
    // f.limit = 100;
    // f.propType = "All";
    //await dispatch(getProjectList(filters));

  }
  else if (pathname == glink.href.projects) {
    dispatch(getProjectList(filters));
  }
  else if (pathname == glink.href.properties) {
    dispatch(getPropertyCount(filters));
    dispatch(getPropertyList(filters));
  }
  else{
    dispatch(getProjectList(filters));
  }
}


//--------------------CATEGORY--------------------------------

export const getCategoryList = () => async dispatch => {
  dispatch(getCategoryListStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/category/list`);
    const data = await res.json();
    dispatch(getCategoryListSuccess(data));
  } catch (err) {
    dispatch(getCategoryListFailure(err.message));
  }
}


//--------------------------Routes List----------------------

export const getRouteList = (filters) => async dispatch => {
  dispatch(getRouteListStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/route/list?name=@${filters.location}@${filters.subArea}@properties@${filters.propType}&limit=60&keyword=${filters.keyword}&website=${filters.websites}`);
    const data = await res.json();
    dispatch(getRouteListSuccess(data));
  } catch (err) {
    dispatch(getRouteListFailure(err.message));
  }
}


//--------------------------Routes SEO DATA-----------------------

export const getRouteSEOData = (url, code: string = '') => async dispatch => {
  console.log([url, code]);
  dispatch(getRoutesSEOStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/route/list/${url}?website=${code}`);
    const data = await res.json();
    dispatch(getRoutesSEOSuccess(data));
  } catch (err) {
    dispatch(getRoutesSEOFailure(err.message));
  }
}

export const getRouteSEODataV2 = (url) => async dispatch => {
  const res = await fetch(`${constant.baseAPIurl}api/route/list/${url}`);
  const data = await res.json();
  return data;
}


//--------------------------Filters DATA-----------------------

export const getFiltersData = () => async dispatch => {
  dispatch(getFiltersDataStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}filters`);
    const data = await res.json();
    //console.log(data);
    dispatch(getFiltersDataSuccess(data));
  } catch (err) {
    dispatch(getFiltersDataFailure(err.message));
  }
}


// update msg
export const updateMsg = (data) => async dispatch => {
  dispatch(UpdateMsg(data));
}

export const upload = (formData) => async dispatch => {
  const res = await fetch(`${constant.baseAPIurl}upload`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  return data;
}


//--------------------------Website Details DATA-----------------------

export const getWebsiteData = (host) => async dispatch => {
  dispatch(getWebsiteStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/website/name/${host}`);
    const data = await res.json();
    dispatch(getWebsiteSuccess(data));
  } catch (err) {
    dispatch(getWebsiteFailure(err.message));
  }
}

//--------------------------PLANS DATA-----------------------

export const getPlansData = () => async dispatch => {
  try {
    const res = await fetch(`${constant.baseAPIurl}api/plan/list`);
    const data = await res.json();
    dispatch(getPlansListSuccess(data));
  } catch (err) {    
  }
}