import {
  GET_PROPERTY_LIST_STARTED, GET_PROPERTY_LIST_SUCCESS, GET_PROPERTY_LIST_FAILURE,
  GET_HOT_PROPERTY_LIST_STARTED, GET_HOT_PROPERTY_LIST_SUCCESS, GET_HOT_PROPERTY_LIST_FAILURE, GET_PROPERTY_COUNT_STARTED, GET_PROPERTY_COUNT_SUCCESS, GET_PROPERTY_COUNT_FAILURE
} from "../actions/actionTypes";


export type PropertyFilter = {
  page: number,
  limit: number,
  view: number,
  keyword: string
}


export type PropertyState = {
  data: any,
  loading: boolean,
  countLoading: boolean,
  count: number,
  error: any,
  currentPage: number,
  countError: any,
  keyword: string,
  hotPropLoading: boolean,
  hotPropList: any,
  hotPropError: any
}

// define initial state of PROPERTY
const initialState: PropertyState = {
  data: [],
  loading: false,
  countLoading: false,
  count: 0,
  error: null,
  countError: null,
  keyword: '',
  currentPage: 1,
  hotPropLoading: false,
  hotPropList: null,
  hotPropError: null
}

// update store based on type and payload and return the state
export default function common(state = initialState, action) {
  switch (action.type) {
    case GET_PROPERTY_LIST_STARTED:
      return {
        ...state,
        loading: true
      }
    case GET_PROPERTY_LIST_SUCCESS:
      const { data, page } = action.payload;
      let res: any = [];
      if (page == 1) {
        res = [...data];
      }
      else {
        res = [...state.data, ...data];
      }

      // const obj = {}
      // obj[page] = data;
      return {
        ...state,
        data: res,
        loading: false,
        currentPage: page,
      }
    case GET_PROPERTY_LIST_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        error
      }

    //---------------------------COUNT--------------------------------
    case GET_PROPERTY_COUNT_STARTED:
      return {
        ...state,
        countLoading: true
      }
    case GET_PROPERTY_COUNT_SUCCESS:
      const { count } = action.payload;
      return {
        ...state,
        data: (count == 0) ? [] : state.data,
        count: count,
        countLoading: false
      }
    case GET_PROPERTY_COUNT_FAILURE:
      const { countError } = action.payload;
      return {
        ...state,
        countError
      }
    //--------------HOT PROPS----------------------

    case GET_HOT_PROPERTY_LIST_STARTED:
      return {
        ...state,
        hotPropLoading: true
      }
    case GET_HOT_PROPERTY_LIST_SUCCESS:
      const { hotPropList } = action.payload;
      return {
        ...state,
        hotPropList: hotPropList,
        hotPropLoading: false
      }
    case GET_HOT_PROPERTY_LIST_FAILURE:
      const { hotPropError } = action.payload;
      return {
        ...state,
        hotPropError
      }
    default: return state
  }

}