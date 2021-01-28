import {
  getBLOGListStarted, getBLOGListSuccess, getBLOGListFailure,
  getBlogDetailStarted, getBlogDetailSuccess, getBlogDetailFailure,
  getBlogCountStarted, getBlogCountSuccess, getBlogCountFailure,
  getPopularBlogListStarted, getPopularBlogListSuccess, getPopularBlogListFailure
} from "../actions/blogActions";
import { constant } from "../constant";



// get BLOGs Count
export const getBlogCount = (keyword = '', code) => async dispatch => {
  dispatch(getBlogCountStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/blogs/count?keyword=${keyword}&website=${code}`);
    const count = await res.json();
    dispatch(getBlogCountSuccess(count));
  } catch (err) {
    dispatch(getBlogCountFailure(err.message));
  }
}


// get BLOG list
export const getBLOGList = (page = 1, keyword = '', code) => async dispatch => {
  let pg = page - 1;
  dispatch(getBLOGListStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/blogs/list?limit=${constant.blogsLimit}&page=${pg}&keyword=${keyword}&website=${code}`);
    const data = await res.json();
    dispatch(getBLOGListSuccess(data, page));
  } catch (err) {
    dispatch(getBLOGListFailure(err.message));
  }
}


// get BLOG list
export const getPopularBlogList = (code) => async dispatch => {
  dispatch(getPopularBlogListStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/blogs/list?limit=${constant.blogsLimit}&view=-1&website=${code}`);
    const data = await res.json();
    dispatch(getPopularBlogListSuccess(data));
  } catch (err) {
    dispatch(getPopularBlogListFailure(err.message));
  }
}


// // get Recent BLOG list
// export const getRecentBlogList = (page = 1, keyword = '') => async dispatch => {
//   let pg = page = page - 1;
//   dispatch(getBLOGListStarted());
//   try {
//     const res = await fetch(`${constant.baseAPIurl}api/blogs/list?limit=${constant.blogsLimit}&page=${pg}&keyword=${keyword}`);
//     const data = await res.json();
//     dispatch(getBLOGListSuccess(data, page));
//   } catch (err) {
//     dispatch(getBLOGListFailure(err.message));
//   }
// }


// get BLOG Detail by slug
export const getBlogDetail = (slug) => async dispatch => {
  dispatch(getBlogDetailStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/blogs/list/${slug}`);
    const data = await res.json();
    ////console.log(data);
    dispatch(getBlogDetailSuccess(data));
  } catch (err) {
    dispatch(getBlogDetailFailure(err.message));
  }
}