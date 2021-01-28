import { GET_WEBSITE_DETAIL_FAILURE, GET_WEBSITE_DETAIL_STARTED, GET_WEBSITE_DETAIL_SUCCESS } from "../actions/actionTypes";

// define initial state of Website
const initialState = {
  data: null,
  loading: false,
  error: null
}

// update store based on type and payload and return the state
export default function common(state = initialState, action) {
  switch (action.type) {
    case GET_WEBSITE_DETAIL_STARTED:
      return {
        ...state,
        loading: true
      }
    case GET_WEBSITE_DETAIL_SUCCESS:
      const { data } = action.payload;
      //data.text = setWebsiteTextByCode(data);
      return {
        ...state,
        data: data,
        loading: false
      }
    case GET_WEBSITE_DETAIL_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error
      }
    default:
      return state
  }
}