import {
    GET_FILTERS_DATA_STARTED, GET_FILTERS_DATA_SUCCESS, GET_FILTERS_DATA_FAILURE
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
      case GET_FILTERS_DATA_STARTED:
        return {
          ...state,
          loading: true
        }
      case GET_FILTERS_DATA_SUCCESS:
        const { data } = action.payload;
        return {
          ...state,
          data,
          loading: false
        }
      case GET_FILTERS_DATA_FAILURE:
        const { error } = action.payload;
        return {
          ...state,
          error
        }
      default:
        return state
    }
  }