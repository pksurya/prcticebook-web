import {
  GET_PROJECT_LIST_STARTED, GET_PROJECT_LIST_SUCCESS, GET_PROJECT_LIST_FAILURE,
  GET_PROJECT_DETAIL_STARTED, GET_PROJECT_DETAIL_SUCCESS, GET_PROJECT_DETAIL_FAILURE,
  GET_PROJECT_GROUP_STARTED, GET_PROJECT_GROUP_SUCCESS, GET_PROJECT_GROUP_FAILURE,
  GET_PROJECT_COUNT_STARTED, GET_PROJECT_COUNT_SUCCESS, GET_PROJECT_COUNT_FAILURE,
  GET_HOT_PROJECT_LIST_STARTED, GET_HOT_PROJECT_LIST_SUCCESS, GET_HOT_PROJECT_LIST_FAILURE
} from "./actionTypes";

// to get the list of PROJECTs - started
export const getProjectListStarted = () => {
  return {
    type: GET_PROJECT_LIST_STARTED
  }
}

// to get the list of PROJECTs - success
export const getProjectListSuccess = (data, page) => {
  return {
    type: GET_PROJECT_LIST_SUCCESS,
    payload: {
      data, page
    }
  }
}

// to get the list of PROJECTs - failure
export const getProjectListFailure = error => {
  return {
    type: GET_PROJECT_LIST_FAILURE,
    payload: {
      error
    }
  }
}

//----------------------------COUNT--------------------------------------

   // to get the COUNT of PROJECT - started
   export const getProjectCountStarted = () => {
    return {
      type: GET_PROJECT_COUNT_STARTED
    }
  }
  
  // to get the COUNT of BLOG - success
  export const getProjectCountSuccess = count => {
    return {
      type: GET_PROJECT_COUNT_SUCCESS,
      payload: {
        count
      }
    }
  }
  
  // to get the COUNT of PROJECT - failure
  export const getProjectCountFailure = countError => {
    return {
      type: GET_PROJECT_COUNT_FAILURE,
      payload: {
        countError
      }
    }
  }


//-----------------------------HOt Properties list------------------------

// to get the list of PROJECTs - started
export const getHotProjectListStarted = () => {
  return {
    type: GET_HOT_PROJECT_LIST_STARTED
  }
}

// to get the list of PROJECTs - success
export const getHotProjectListSuccess = (hotPropList) => {
  return {
    type: GET_HOT_PROJECT_LIST_SUCCESS,
    payload: {
      hotPropList
    }
  }
}

// to get the list of PROJECTs - failure
export const getHotProjectListFailure = hotPropError => {
  return {
    type: GET_HOT_PROJECT_LIST_FAILURE,
    payload: {
      hotPropError
    }
  }
}

//------------------------------------DETAIL--------------------------------

   // to get the DETAIL of PROJECT - started
   export const getProjectDetailStarted = () => {
    return {
      type: GET_PROJECT_DETAIL_STARTED
    }
  }
  
  // to get the DETAIL of PROJECT - success
  export const getProjectDetailSuccess = (data) => {
    return {
      type: GET_PROJECT_DETAIL_SUCCESS,
      payload: {
        data        
      }
    }
  }
  
  // to get the DETAIL of PROJECT - failure
  export const getProjectDetailFailure = error => {
    return {
      type: GET_PROJECT_DETAIL_FAILURE,
      payload: {
        error
      }
    }
  }

  //----------------------------Group--------------------------------------

   // to get the COUNT of PROJECT - started
   export const getProjectGroupStarted = () => {
    return {
      type: GET_PROJECT_GROUP_STARTED
    }
  }
  
  // to get the Group of BLOG - success
  export const getProjectGroupSuccess = Group => {
    return {
      type: GET_PROJECT_GROUP_SUCCESS,
      payload: {
        Group
      }
    }
  }
  
  // to get the Group of PROJECT - failure
  export const getProjectGroupFailure = GroupError => {
    return {
      type: GET_PROJECT_GROUP_FAILURE,
      payload: {
        GroupError
      }
    }
  }
