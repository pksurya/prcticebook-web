import {
    GET_WEBSITE_DETAIL_FAILURE, GET_WEBSITE_DETAIL_STARTED, GET_WEBSITE_DETAIL_SUCCESS
} from "./actionTypes";

// to get the Website details - started
export const getWebsiteStarted = () => {
    return {
        type: GET_WEBSITE_DETAIL_STARTED
    }
}

// to get the Website details - success
export const getWebsiteSuccess = (data) => {
    return {
        type: GET_WEBSITE_DETAIL_SUCCESS,
        payload: {
            data
        }
    }
}

// to get the Website details - failure
export const getWebsiteFailure = error => {
    return {
        type: GET_WEBSITE_DETAIL_FAILURE,
        payload: {
            error
        }
    }
}