import {
  UPDATE_SETTING, RESET_SETTING
} from "../actions/actionTypes";

export const initSettingState = {
  location: 'Noida',
  subArea:'All',
  propType: "All",
  category:"All",
  subCategory:"",
  reset: false,
  country:'in'
}

export default function common(state = initSettingState, action) {
  switch (action.type) {
    case UPDATE_SETTING:
      const { data } = action.payload;
      return { ...data };
    case RESET_SETTING:
      return { ...initSettingState };
    default:
      return state
  }
}