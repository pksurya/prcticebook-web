import {
    GET_PROPERTY_DETAIL_STARTED, GET_PROPERTY_DETAIL_SUCCESS, GET_PROPERTY_DETAIL_FAILURE
  } from "../actions/actionTypes";
  
  // define initial state of PROPERTY
  const initialState = {
    data: null,
    loading: false,
    error: null
  }
  
  // update store based on type and payload and return the state
  export default function common(state = initialState, action) {
    switch (action.type) {
      case GET_PROPERTY_DETAIL_STARTED:
        return {
          ...state,
          loading: true
        }
      case GET_PROPERTY_DETAIL_SUCCESS:
        const { data } = action.payload;
        return {
          ...state,
          data,
          loading: false
        }
      case GET_PROPERTY_DETAIL_FAILURE:
        const { error } = action.payload;
        return {
          ...state,
          error
        }
      default:
        return state
    }
  }