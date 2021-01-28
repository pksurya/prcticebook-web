import {
  GET_PROJECT_LIST_STARTED, GET_PROJECT_LIST_SUCCESS, GET_PROJECT_LIST_FAILURE,
  GET_PROJECT_GROUP_STARTED, GET_PROJECT_GROUP_SUCCESS, GET_PROJECT_GROUP_FAILURE,
  GET_HOT_PROJECT_LIST_STARTED, GET_HOT_PROJECT_LIST_SUCCESS, GET_HOT_PROJECT_LIST_FAILURE,
  GET_PROJECT_COUNT_STARTED, GET_PROJECT_COUNT_SUCCESS, GET_PROJECT_COUNT_FAILURE
} from "../actions/actionTypes";


export type ProjectFilter = {
  page: number,
  limit: number,
  view: number,
  keyword: string
}


export type ProjectState = {
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
  hotPropError: any,
  groupError: any,
  groupLoading: any,
  group: any
}

// define initial state of Project
const initialState: ProjectState = {
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
  hotPropError: null,
  groupError: null,
  groupLoading: null,
  group: null
}

// update store based on type and payload and return the state
export default function common(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_LIST_STARTED:
      return {
        ...state,
        loading: true
      }
    case GET_PROJECT_LIST_SUCCESS:
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
    case GET_PROJECT_LIST_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        error
      }

    //---------------------------COUNT--------------------------------
    case GET_PROJECT_COUNT_STARTED:
      return {
        ...state,
        countLoading: true
      }
    case GET_PROJECT_COUNT_SUCCESS:
      const { count } = action.payload;
      return {
        ...state,
        count: count,
        countLoading: false
      }
    case GET_PROJECT_COUNT_FAILURE:
      const { countError } = action.payload;
      return {
        ...state,
        countError
      }
    //--------------HOT PROPS----------------------

    case GET_HOT_PROJECT_LIST_STARTED:
      return {
        ...state,
        hotPropLoading: true
      }
    case GET_HOT_PROJECT_LIST_SUCCESS:
      const { hotPropList } = action.payload;
      return {
        ...state,
        hotPropList: hotPropList,
        hotPropLoading: false
      }
    case GET_HOT_PROJECT_LIST_FAILURE:
      const { hotPropError } = action.payload;
      return {
        ...state,
        hotPropError
      }

    //---------------------------GROUP--------------------------------
    case GET_PROJECT_GROUP_STARTED:
      return {
        ...state,
        groupLoading: true
      }
    case GET_PROJECT_GROUP_SUCCESS:
      const { Group } = action.payload;
      return {
        ...state,
        group: Group,
        groupLoading: false
      }
    case GET_PROJECT_GROUP_FAILURE:
      const { groupError } = action.payload;
      return {
        ...state,
        groupError
      }


    default: return state
  }

}