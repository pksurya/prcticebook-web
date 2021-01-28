import {
  MSG_UPDATE
} from "../actions/actionTypes";

export const initState = {
  msg: "",
  btnLogin: false
}

export default function common(state = initState, action) {
  switch (action.type) {
    case MSG_UPDATE:
      const { data } = action.payload;
      return { ...data };
    default:
      return state
  }
}