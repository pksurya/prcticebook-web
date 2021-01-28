import {
  LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILURE,
  REG_STARTED, REG_SUCCESS, REG_FAILURE, LOGIN_RESET,
  CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_STARTED, CHANGE_PASSWORD_SUCCESS,
  LOGOUT_SUCCESS
} from "../actions/actionTypes";
import { constant } from "../constant";


// define initial state of BLOG
const initialState = {
  data: null,
  cpData: null,
  logined: false,
  remember: false,
  loading: false,
  reg: null,
  error: "",
  regLoading: false,
  cpLoading: false,
  regError: "",
  cpError:""
}

// update store based on type and payload and return the state
export default function common(state = initialState, action) {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        loading: true,
        error: ""
      }
    case LOGIN_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        data: data,
        logined: true,
        remember: false,
        loading: false
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        logined: false,
        remember: false,
        loading: false
      }
    case LOGIN_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        error,
        logined: false,
        loading: false
      }
    case LOGIN_RESET:
      return {
        ...state,
        loading: false,
        error: ""
      }

    //----------REG---------------------
    case REG_STARTED:
      return {
        ...state,
        regLoading: true,
        regError:""
      }
    case REG_SUCCESS:
      const { reg } = action.payload;
      return {
        ...state,
        reg: reg,
        regLoading: false,
        regError:""
      }
    case REG_FAILURE:
      const { regError } = action.payload;
      return {
        ...state,
        regError,
        regLoading: false
      }

    //----------CP---------------------
    case CHANGE_PASSWORD_STARTED:
      return {
        ...state,
        cpLoading: true
      }
    case CHANGE_PASSWORD_SUCCESS:
      const { cpData } = action.payload;
      return {
        ...state,
        cpData: cpData,
        cpLoading: false
      }
    case CHANGE_PASSWORD_FAILURE:
      const { cpError } = action.payload;
      return {
        ...state,
        cpError,
        cpLoading: false
      }

    default:
      return state
  }
}