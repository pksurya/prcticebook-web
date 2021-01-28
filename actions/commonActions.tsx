import {
  GET_CITY_LIST_STARTED, GET_CITY_LIST_SUCCESS, GET_CITY_LIST_FAILURE,
  GET_CATEGORY_LIST_STARTED, GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_LIST_FAILURE, GET_PLANS_LIST_SUCCESS
} from "./actionTypes";

// to get the list of Citys - started
export const getCityListStarted = () => {
  return {
    type: GET_CITY_LIST_STARTED
  }
}

// to get the list of Citys - success
export const getCityListSuccess = (data) => {
  return {
    type: GET_CITY_LIST_SUCCESS,
    payload: {
      data
    }
  }
}

// to get the list of Citys - failure
export const getCityListFailure = error => {
  return {
    type: GET_CITY_LIST_FAILURE,
    payload: {
      error
    }
  }
}


//---------------------------------CATEGORY LIST-----------------------------------

export const getCategoryListStarted = () => {
  return {
    type: GET_CATEGORY_LIST_STARTED
  }
}

export const getCategoryListSuccess = (data) => {
  return {
    type: GET_CATEGORY_LIST_SUCCESS,
    payload: {
      data
    }
  }
}

export const getCategoryListFailure = error => {
  return {
    type: GET_CATEGORY_LIST_FAILURE,
    payload: {
      error
    }
  }
}


//---------------------------------PLANS LIST-----------------------------------
export const getPlansListSuccess = (data) => {
  return {
    type: GET_PLANS_LIST_SUCCESS,
    payload: {
      data
    }
  }
}

