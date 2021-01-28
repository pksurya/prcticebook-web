import {
  SEND_QUERY_STARTED, SEND_QUERY_SUCCESS, SEND_QUERY_FAILURE, SAVE_QUERY_TO_STORE, SET_QUERY_MSG
} from "./actionTypes";



export const saveQueryToStore = (data) => {
  return {
    type: SAVE_QUERY_TO_STORE,
    payload: {
      data
    }
  }
}

// to get the list of BLOGs - started
export const sendQueryStarted = () => {
  return {
    type: SEND_QUERY_STARTED
  }
}

// to get the list of BLOGs - success
export const sendQuerySuccess = (data) => {
  return {
    type: SEND_QUERY_SUCCESS,
    payload: {
      data
    }
  }
}

// to get the list of BLOGs - failure
export const sendQueryFailure = error => {
  return {
    type: SEND_QUERY_FAILURE,
    payload: {
      error
    }
  }
}

// to set contact msg
export const setQueryMsg = (msg) => {
  return {
    type: SET_QUERY_MSG,
    payload: {
      msg
    }
  }
}
