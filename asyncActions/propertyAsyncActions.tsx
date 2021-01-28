import {
  getPropertyListStarted, getPropertyListSuccess, getPropertyListFailure,
  getPropertyDetailStarted, getPropertyDetailSuccess, getPropertyDetailFailure,
  getPropertyCountStarted, getPropertyCountSuccess, getPropertyCountFailure,
  getHotPropertyListStarted, getHotPropertyListSuccess, getHotPropertyListFailure,
} from "../actions/propertyActions";
import { constant, http } from "../constant";
import { ConvertObjToQueryString, deepClone } from "../utility";
import { UpdateFilter } from '../actions/filterActions';


export const filterList = (filter: any, countOnly: boolean = false) => async dispatch => {
  filter.page = 1;
  if (countOnly) {
    await dispatch(getPropertyCount(filter));
  }
  else {
    await dispatch(UpdateFilter(filter));
    await dispatch(getPropertyCount(filter));
    await dispatch(getPropertyList(filter));
  }
}

export const resetList = (f, code) => async dispatch => {
  f.websites = code;
  f.page = 1;
  await dispatch(UpdateFilter(f));
  await dispatch(getPropertyCount(f));
  await dispatch(getPropertyList(f));
}

// get Properties list
export const getPropertyList = (filter: any) => async dispatch => {
  let pg = deepClone(filter.page);
  filter.page = filter.page - 1;
  if (filter.page < 0) {
    filter.page = 0;
  }
  if (pg <= 0) { pg = 1; }
  let url = ConvertObjToQueryString(filter, `${constant.baseAPIurl}api/properties/list`);
  dispatch(getPropertyListStarted());
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.length > 0) {
      try {
        dispatch(getPropertyListSuccess(data, pg));
      }
      catch (err) { }
    }
    else {
      dispatch(getPropertyListFailure("No records"));
    }
  } catch (err) {
    dispatch(getPropertyListFailure(err.message));
  }
}


//get Properties Count
export const getPropertyCount = (filter: any) => async dispatch => {
  dispatch(getPropertyCountStarted());
  try {
    let url = ConvertObjToQueryString(filter, `${constant.baseAPIurl}api/properties/count`);
    const res = await fetch(url);
    const count = await res.json();
    dispatch(getPropertyCountSuccess(count));
  } catch (err) {
    dispatch(getPropertyCountFailure(err.message));
  }
}


// get HOT Properties list
export const getHotPropertyList = (code: string = '') => async dispatch => {
  dispatch(getHotPropertyListStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/properties/list?limit=${constant.hotPropLimit}&page=0&view=-1&websites=${code}`);
    const data = await res.json();
    dispatch(getHotPropertyListSuccess(data));
  } catch (err) {
    dispatch(getHotPropertyListFailure(err.message));
  }
}


// get BLOG Detail by slug
export const getPropertyDetail = (slug) => async dispatch => {
  dispatch(getPropertyDetailStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/properties/list/${slug}`);
    const data = await res.json();
    dispatch(getPropertyDetailSuccess(data));
  } catch (err) {
    dispatch(getPropertyDetailFailure(err.message));
  }
}


//Add anew property
export const addProp = (obj: any) => async dispatch => {
  try {
    const res = await fetch(`${constant.baseAPIurl}api/properties/add`
      , {
        method: 'post',
        headers: http.header,
        body: JSON.stringify(obj)
      });
    if (res.status == 200) {
      const data = await res.json();
      if (data) {

      }
    }
    else {

    }
  } catch (err) {

  }
}
