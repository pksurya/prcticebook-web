import {
  LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILURE,
  REG_STARTED, REG_SUCCESS, REG_FAILURE,
  CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_STARTED, CHANGE_PASSWORD_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_RESET
} from "./actionTypes";



//---------------------------------LOGIN-----------------------------------

export const loginStarted = () => {
  return {
    type: LOGIN_STARTED
  }
}

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      data
    }
  }
}

export const logOutSuccess = (data) => {
  return {
    type: LOGOUT_SUCCESS,
    payload: {
      data
    }
  }
}

export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      error
    }
  }
}

export const loginReset = () => {
  return {
    type: LOGIN_RESET
  }
}

//---------------------------------REGISTRATION-----------------------------------

export const regStarted = () => {
  return {
    type: REG_STARTED
  }
}

export const regSuccess = (reg) => {
  return {
    type: REG_SUCCESS,
    payload: {
      reg
    }
  }
}

export const regFailure = regError => {
  return {
    type: REG_FAILURE,
    payload: {
      regError
    }
  }
}

//---------------------------------CP-----------------------------------

export const cpStarted = () => {
  return {
    type: CHANGE_PASSWORD_STARTED
  }
}

export const cpSuccess = (cpData) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: {
      cpData
    }
  }
}

export const cpFailure = cpError => {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    payload: {
      cpError
    }
  }
}


