import {
  GET_BLOG_LIST_STARTED, GET_BLOG_LIST_SUCCESS, GET_BLOG_LIST_FAILURE,
  GET_BLOG_COUNT_SUCCESS, GET_BLOG_COUNT_FAILURE, GET_BLOG_COUNT_STARTED,
  GET_POPULAR_BLOG_LIST_STARTED, GET_POPULAR_BLOG_LIST_SUCCESS, GET_POPULAR_BLOG_LIST_FAILURE
} from "../actions/actionTypes";


export type BlogsFilter = {
  page: number,
  limit: number,
  view: number,
  keyword: string
}


export type BlogState = {
  data: any,
  loading: boolean,
  countLoading: boolean,
  count: number,
  error: any,
  currentPage: number,
  countError: any,
  popularError: any,
  keyword: string,
  popular: any,
  recent: any
}

// define initial state of BLOG
const initialState = {
  data: {},
  loading: false,
  countLoading: false,
  count: 0,
  error: null,
  countError: null,
  popularError: null,
  keyword: '',
  popular: null,
  recent: null,
  currentPage: 1
}

// update store based on type and payload and return the state
export default function common(state:any = initialState, action:any) {
  switch (action.type) {
    case GET_BLOG_LIST_STARTED:
      return {
        ...state,
        loading: true
      }
    case GET_BLOG_LIST_SUCCESS:
      const { data, page } = action.payload;
      ////console.log([data,page]);
      // if (state.currentPage !== data[1]) {
      //   //console.log("added new page data");
      // }
      // else {
      //   //console.log("added old page data");
      // }

      let recent = state.recent || [];
      if (page == 1) {
        recent = data;
      }
      const obj = {}
      obj[page] = data;
      return {
        ...state,
        data: { ...state.data, ...obj },
        loading: false,
        currentPage: page,
        recent: recent
      }
    case GET_BLOG_LIST_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        error
      }
    //---------------------------COUNT--------------------------------
    case GET_BLOG_COUNT_STARTED:
      return {
        ...state,
        countLoading: true
      }
    case GET_BLOG_COUNT_SUCCESS:
      const { count } = action.payload;
      return {
        ...state,
        count: count,
        countLoading: false
      }
    case GET_BLOG_COUNT_FAILURE:
      const { countError } = action.payload;
      return {
        ...state,
        countError
      }

    //-------------------POPULAR---------------------------------
    case GET_POPULAR_BLOG_LIST_STARTED:
      return {
        ...state,
        loading: true
      }
    case GET_POPULAR_BLOG_LIST_SUCCESS:
      const { popularData } = action.payload;
      return {
        ...state,
        popular: popularData
      }
    case GET_POPULAR_BLOG_LIST_FAILURE:
      const { popularError } = action.payload;
      return {
        ...state,
        popularError
      }

    default:
      return state
  }
}