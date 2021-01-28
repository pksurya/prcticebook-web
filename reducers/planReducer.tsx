import { GET_PLANS_LIST_SUCCESS } from "../actions/actionTypes";

// define initial state of Website
const initialState = {
  data: null,
  loading: false,
  error: null
}

// update store based on type and payload and return the state
export default function common(state = initialState, action) {
  switch (action.type) {
    case GET_PLANS_LIST_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        data: data,
        loading: false
      }
    default:
      return state
  }
}