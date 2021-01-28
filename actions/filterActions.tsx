import {
  UPDATE_FILTER,RESET_FILTER,GET_FILTERS_DATA_STARTED,GET_FILTERS_DATA_SUCCESS,GET_FILTERS_DATA_FAILURE
} from "./actionTypes";


export const UpdateFilter = (data) => {
  return {
    type: UPDATE_FILTER,
    payload: {
      data
    }
  }
}
export const ResetFilter = (idata) => {
  return {
    type: RESET_FILTER,
    payload: {
      idata
    }
  }
}

  //----------------------------Filters Data From API--------------------------------------

   
   export const getFiltersDataStarted = () => {
    return {
      type: GET_FILTERS_DATA_STARTED
    }
  }
  
  export const getFiltersDataSuccess = data => {
    return {
      type: GET_FILTERS_DATA_SUCCESS,
      payload: {
        data
      }
    }
  }
  
  export const getFiltersDataFailure = error => {
    return {
      type: GET_FILTERS_DATA_FAILURE,
      payload: {
        error
      }
    }
  }

