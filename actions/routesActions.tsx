import {
  GET_ROUTES_SEO_STARTED, GET_ROUTES_SEO_SUCCESS, GET_ROUTES_SEO_FAILURE,
  GET_ROUTES_LIST_STARTED, GET_ROUTES_LIST_SUCCESS, GET_ROUTES_LIST_FAILURE
} from "./actionTypes";

// to get the list of Citys - started
export const getRoutesSEOStarted = () => {
  return {
    type: GET_ROUTES_SEO_STARTED
  }
}

// to get the list of Citys - success
export const getRoutesSEOSuccess = (data) => {
  return {
    type: GET_ROUTES_SEO_SUCCESS,
    payload: {
      data
    }
  }
}

// to get the list of Citys - failure
export const getRoutesSEOFailure = error => {
  return {
    type: GET_ROUTES_SEO_FAILURE,
    payload: {
      error
    }
  }
}

// to get the list of Citys - started
export const getRouteListStarted = () => {
  return {
    type: GET_ROUTES_LIST_STARTED
  }
}

// to get the list of Citys - success
export const getRouteListSuccess = (list) => {
  return {
    type: GET_ROUTES_LIST_SUCCESS,
    payload: {
      list
    }
  }
}

// to get the list of Citys - failure
export const getRouteListFailure = listError => {
  return {
    type: GET_ROUTES_LIST_FAILURE,
    payload: {
      listError
    }
  }
}

