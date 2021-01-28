import {
    GET_BLOG_LIST_STARTED, GET_BLOG_LIST_SUCCESS, GET_BLOG_LIST_FAILURE,
    GET_BLOG_DETAIL_STARTED, GET_BLOG_DETAIL_SUCCESS, GET_BLOG_DETAIL_FAILURE,
    GET_BLOG_COUNT_STARTED, GET_BLOG_COUNT_SUCCESS, GET_BLOG_COUNT_FAILURE,
    GET_POPULAR_BLOG_LIST_STARTED, GET_POPULAR_BLOG_LIST_SUCCESS, GET_POPULAR_BLOG_LIST_FAILURE,
  } from "./actionTypes";
  
  // to get the list of BLOGs - started
  export const getBLOGListStarted = () => {
    return {
      type: GET_BLOG_LIST_STARTED
    }
  }
  
  // to get the list of BLOGs - success
  export const getBLOGListSuccess = (data,page) => {
    return {
      type: GET_BLOG_LIST_SUCCESS,
      payload: {
        data,page
      }
    }
  }
  
  // to get the list of BLOGs - failure
  export const getBLOGListFailure = error => {
    return {
      type: GET_BLOG_LIST_FAILURE,
      payload: {
        error
      }
    }
  }

  //--------------------------------DETAILS-----------------------------

   // to get the DETAIL of BLOG - started
   export const getBlogDetailStarted = () => {
    return {
      type: GET_BLOG_DETAIL_STARTED
    }
  }
  
  // to get the DETAIL of BLOG - success
  export const getBlogDetailSuccess = (data) => {
    return {
      type: GET_BLOG_DETAIL_SUCCESS,
      payload: {
        data        
      }
    }
  }
  
  // to get the DETAIL of BLOG - failure
  export const getBlogDetailFailure = error => {
    return {
      type: GET_BLOG_DETAIL_FAILURE,
      payload: {
        error
      }
    }
  }

//count

   // to get the DETAIL of BLOG - started
   export const getBlogCountStarted = () => {
    return {
      type: GET_BLOG_COUNT_STARTED
    }
  }
  
  // to get the COUNT of BLOG - success
  export const getBlogCountSuccess = count => {
    return {
      type: GET_BLOG_COUNT_SUCCESS,
      payload: {
        count
      }
    }
  }
  
  // to get the COUNT of BLOG - failure
  export const getBlogCountFailure = countError => {
    return {
      type: GET_BLOG_COUNT_FAILURE,
      payload: {
        countError
      }
    }
  }


  //-------------------POPULAR BLOGS LIST---------------------------------------------

    // to get the list of BLOGs - started
    export const getPopularBlogListStarted = () => {
      return {
        type: GET_POPULAR_BLOG_LIST_STARTED
      }
    }
    
    // to get the list of BLOGs - success
    export const getPopularBlogListSuccess = (popularData) => {
      return {
        type: GET_POPULAR_BLOG_LIST_SUCCESS,
        payload: {
          popularData
        }
      }
    }
    
    // to get the list of BLOGs - failure
    export const getPopularBlogListFailure = error => {
      return {
        type: GET_POPULAR_BLOG_LIST_FAILURE,
        payload: {
          error
        }
      }
    }