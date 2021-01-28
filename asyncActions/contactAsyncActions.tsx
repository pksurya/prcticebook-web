import {
  sendQueryStarted, sendQuerySuccess, sendQueryFailure, setQueryMsg
} from "../actions/contactActions";
import { constant, http } from "../constant";
import { toast } from 'react-toastify';


export const setMsg = (msg: string) => async dispatch => {
  dispatch(setQueryMsg(msg));
}

// get Properties list
export const sendMessage = (obj: any) => async dispatch => {
  ////console.log(obj);
  dispatch(sendQueryStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/users/msg`
      , {
        method: 'post',
        headers: http.header,
        body: JSON.stringify(obj)
      });
    try {

      //const data = await res.json();
      toast.success(constant.contactAckMsg);
      dispatch(sendQuerySuccess({}));
      // const contactPopClose = window.document.getElementById("contactPopClose")!;
      // if (contactPopClose) {
      //   contactPopClose.click();
      // }
    }
    catch (err) {
      toast.success(constant.contactAckMsg);
      dispatch(sendQuerySuccess({}));
    }

  } catch (err) {
    toast.success(constant.error);
    dispatch(sendQueryFailure(err.message));
  }
}

//https://api.property.sale/api/users/msg

// email: "ps@gmail.com"
// id: ""
// msg: "TEST"
// name: "Prashant "
// number: 8745891014
// source: "contactus"
// to: "www.property.sale@gmail.com"



