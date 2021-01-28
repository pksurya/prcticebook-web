import {
  MSG_UPDATE
} from "./actionTypes";


export const UpdateMsg = (data) => {
  return {
    type: MSG_UPDATE,
    payload: {
      data
    }
  }
}

