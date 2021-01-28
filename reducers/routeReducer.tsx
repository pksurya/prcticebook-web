import {
  GET_ROUTES_SEO_STARTED, GET_ROUTES_SEO_SUCCESS, GET_ROUTES_SEO_FAILURE,
  GET_ROUTES_LIST_STARTED, GET_ROUTES_LIST_SUCCESS, GET_ROUTES_LIST_FAILURE
} from "../actions/actionTypes";

// define initial state of BLOG
const initialState = {
  data: null,
  list: null,
  loading: false,
  error: null,
  listLoading: false,
  listError: null
}

// update store based on type and payload and return the state
export default function common(state = initialState, action) {
  switch (action.type) {
    case GET_ROUTES_SEO_STARTED:
      return {
        ...state,
        loading: true
      }
    case GET_ROUTES_SEO_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        data,
        loading: false
      }
    case GET_ROUTES_SEO_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        error
      }
    case GET_ROUTES_LIST_STARTED:
      return {
        ...state,
        listLoading: true
      }
    case GET_ROUTES_LIST_SUCCESS:
      const { list } = action.payload;
      return {
        ...state,
        list,
        listLoading: false
      }
    case GET_ROUTES_LIST_FAILURE:
      const { listError } = action.payload;
      return {
        ...state,
        listError
      }
    default:
      return state
  }
}