import {
  SEND_QUERY_STARTED, SEND_QUERY_SUCCESS, SEND_QUERY_FAILURE, SAVE_QUERY_TO_STORE, SET_QUERY_MSG
} from "../actions/actionTypes";


// define initial state of PROPERTY
const initialState = {
  to: 'practicebook.in@gmail.com',
  email: '',
  msg: '',
  name: '',
  id: '',
  source: "contactus",
  number: null,
  data: null,
  loading: false,
  error: null
}

// update store based on type and payload and return the state
export default function common(state = initialState, action) {
  switch (action.type) {
    case SAVE_QUERY_TO_STORE:
      //console.log(action);
      //const { data } = action.payload;
      return {
        ...state,
        to: action.payload.data,
        loading: false
      }
    case SET_QUERY_MSG:
      return {
        ...state,
        msg: action.payload.msg
      }
    case SEND_QUERY_STARTED:
      return {
        ...state,
        loading: true
      }
    case SEND_QUERY_SUCCESS:
      const { data } = action.payload;
      //console.log(data);
      return {
        ...state,
        data,
        loading: false
      }
    case SEND_QUERY_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state
  }
}