import {
  GET_PROPERTY_LIST_STARTED, GET_PROPERTY_LIST_SUCCESS, GET_PROPERTY_LIST_FAILURE,
  GET_PROPERTY_DETAIL_STARTED, GET_PROPERTY_DETAIL_SUCCESS, GET_PROPERTY_DETAIL_FAILURE,
  GET_PROPERTY_COUNT_STARTED, GET_PROPERTY_COUNT_SUCCESS, GET_PROPERTY_COUNT_FAILURE,
  GET_HOT_PROPERTY_LIST_STARTED, GET_HOT_PROPERTY_LIST_SUCCESS, GET_HOT_PROPERTY_LIST_FAILURE
} from "./actionTypes";

// to get the list of PROPERTYs - started
export const getPropertyListStarted = () => {
  return {
    type: GET_PROPERTY_LIST_STARTED
  }
}

// to get the list of PROPERTYs - success
export const getPropertyListSuccess = (data, page) => {
  return {
    type: GET_PROPERTY_LIST_SUCCESS,
    payload: {
      data, page
    }
  }
}

// to get the list of PROPERTYs - failure
export const getPropertyListFailure = error => {
  return {
    type: GET_PROPERTY_LIST_FAILURE,
    payload: {
      data:[],
      error
    }
  }
}

//----------------------------COUNT--------------------------------------

   // to get the COUNT of PROPERTY - started
   export const getPropertyCountStarted = () => {
    return {
      type: GET_PROPERTY_COUNT_STARTED
    }
  }
  
  // to get the COUNT of BLOG - success
  export const getPropertyCountSuccess = count => {
    return {
      type: GET_PROPERTY_COUNT_SUCCESS,
      payload: {
        count
      }
    }
  }
  
  // to get the COUNT of PROPERTY - failure
  export const getPropertyCountFailure = countError => {
    return {
      type: GET_PROPERTY_COUNT_FAILURE,
      payload: {
        countError
      }
    }
  }


//-----------------------------HOt Properties list------------------------

// to get the list of PROPERTYs - started
export const getHotPropertyListStarted = () => {
  return {
    type: GET_HOT_PROPERTY_LIST_STARTED
  }
}

// to get the list of PROPERTYs - success
export const getHotPropertyListSuccess = (hotPropList) => {
  return {
    type: GET_HOT_PROPERTY_LIST_SUCCESS,
    payload: {
      hotPropList
    }
  }
}

// to get the list of PROPERTYs - failure
export const getHotPropertyListFailure = hotPropError => {
  return {
    type: GET_HOT_PROPERTY_LIST_FAILURE,
    payload: {
      hotPropError
    }
  }
}

//------------------------------------DETAIL--------------------------------

   // to get the DETAIL of PROPERTY - started
   export const getPropertyDetailStarted = () => {
    return {
      type: GET_PROPERTY_DETAIL_STARTED
    }
  }
  
  // to get the DETAIL of PROPERTY - success
  export const getPropertyDetailSuccess = (data) => {
    return {
      type: GET_PROPERTY_DETAIL_SUCCESS,
      payload: {
        data        
      }
    }
  }
  
  // to get the DETAIL of PROPERTY - failure
  export const getPropertyDetailFailure = error => {
    return {
      type: GET_PROPERTY_DETAIL_FAILURE,
      payload: {
        error
      }
    }
  }

