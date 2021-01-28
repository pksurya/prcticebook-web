import {
  GET_CATEGORY_LIST_STARTED, GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_LIST_FAILURE
} from "../actions/actionTypes";
import { createDataTree } from "../utility";

// define initial state of BLOG
const initialState = {
  data: null,
  flat: null,
  loading: false,
  error: null
}

// update store based on type and payload and return the state
export default function common(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_LIST_STARTED:
      return {
        ...state,
        loading: true
      }
    case GET_CATEGORY_LIST_SUCCESS:
      const { data } = action.payload;
      let tree = createDataTree(data);
      return {
        ...state,
        data: tree,
        flat: data,
        loading: false
      }
    case GET_CATEGORY_LIST_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        error
      }
    default:
      return state
  }
}