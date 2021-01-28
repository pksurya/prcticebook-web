import {
  UPDATE_SETTING,RESET_SETTING
} from "./actionTypes";


export const UpdateSetting = (data) => {
  return {
    type: UPDATE_SETTING,
    payload: {
      data
    }
  }
}
export const ResetSetting = () => {
  return {
    type: RESET_SETTING
  }
}

