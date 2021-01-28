import {
    GET_CITY_LIST_STARTED, GET_CITY_LIST_SUCCESS, GET_CITY_LIST_FAILURE
  } from "../actions/actionTypes";
  
  // define initial state of BLOG
  const initialState = {
    data: null,
    loading: false,
    error: null
  }
  
  // update store based on type and payload and return the state
  export default function common(state = initialState, action) {
    switch (action.type) {
      case GET_CITY_LIST_STARTED:
        return {
          ...state,
          loading: true
        }
      case GET_CITY_LIST_SUCCESS:
        const { data } = action.payload;
        return {
          ...state,
          data,
          loading: false
        }
      case GET_CITY_LIST_FAILURE:
        const { error } = action.payload;
        return {
          ...state,
          error
        }
      default:
        return state
    }
  }