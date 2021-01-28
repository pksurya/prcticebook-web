import {
  loginStarted, loginSuccess, loginFailure, logOutSuccess,
  regStarted, regSuccess, regFailure, loginReset, cpStarted, cpSuccess, cpFailure
} from "../actions/authActions";
import { constant, http } from "../constant";
import { btnClick, openModal, closePageAfterLogin, closePageAfterLogout } from "../utility";
import { updateMsg } from "./commonAsyncActions";
import { toast } from 'react-toastify';

//err.message

export const login = (obj: any, asPatth: string) => async dispatch => {
  dispatch(loginStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}login`
      , {
        method: 'post',
        headers: http.header,
        body: JSON.stringify(obj)
      });
    const data = await res.json();
    if (data && data.email == "User not found") {
      toast.error(constant.msg.invalidLogin);
      dispatch(loginFailure(constant.msg.invalidLogin));
    }
    else if (data && data.password == "Password incorrect") {
      toast.error(constant.msg.invalidLogin);
      dispatch(loginFailure(constant.msg.invalidLogin));
    }
    else {
      btnClick('loginClose');
      toast.success(`Hey ${data.user.name}, ${constant.msg.loginSuccess} !`)
      closePageAfterLogin(asPatth);
      dispatch(loginSuccess(data));
    }
  } catch (err) {
    toast.error(constant.error);
    dispatch(loginFailure(constant.error));
  }
}

export const resetLogin = () => async dispatch => {
  dispatch(loginReset());
}

export const reg = (obj: any) => async dispatch => {
  dispatch(regStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}api/users/add`
      , {
        method: 'post',
        headers: http.header,
        body: JSON.stringify(obj)
      });
    if (res.status == 200) {
      const data = await res.json();
      if (data) {
        toast.success(constant.msg.regSuccess);
        dispatch(regSuccess(data));
        btnClick('loginbtn');
        //await updateMsg({ msg: constant.msg.regSuccess, btnLogin: true });
        //openModal('msgbox');
      }
    }
    else {
      toast.error(constant.msg.emailExists);
      dispatch(regFailure(constant.msg.emailExists));
      //await updateMsg({ msg: constant.msg.emailExists, btnLogin: false });
      //openModal('msgbox');
    }
  } catch (err) {
    dispatch(regFailure(constant.msg.emailExists));
    toast.error(constant.msg.emailExists);
    // await updateMsg({ msg: constant.error, btnLogin: false });
    // openModal('msgbox');
  }
}


export const logout = () => async dispatch => {
  closePageAfterLogout();
  await dispatch(logOutSuccess(null));
}

export const cp = (obj: any, id: string) => async dispatch => {
  dispatch(cpStarted());
  try {
    const res = await fetch(`${constant.baseAPIurl}cp/${id}`
      , {
        method: 'put',
        headers: http.header,
        body: JSON.stringify(obj)
      });
    const data = await res.json();
    if (data.msg == "success") {
      await dispatch(logout());
      await dispatch(cpSuccess({ success: "Success" }));
      toast.success(constant.msg.cpSuccess);
      btnClick('loginbtn');
      // await updateMsg({ msg: constant.msg.cpSuccess, btnLogin: true });
      // openModal('msgbox');
    }
    else {
      await dispatch(cpFailure(constant.error));
      toast.error(constant.error);
      // await updateMsg({ msg: constant.error, btnLogin: false });
      // openModal('msgbox');
    }
  } catch (err) {
    await dispatch(cpFailure(err.message));
    toast.error(constant.error);
    // await updateMsg({ msg: constant.error, btnLogin: false });
    // openModal('msgbox');
  }
}

export const fp = (obj: any) => async dispatch => {
  try {
    const res = await fetch(`${constant.baseAPIurl}forgot`
      , {
        method: 'post',
        headers: http.header,
        body: JSON.stringify(obj)
      });
    const data = await res.json();
    toast.success(constant.msg.fpSuccess);
    // await updateMsg({ msg: constant.msg.fpSuccess, btnLogin: true });
    // openModal('msgbox');

  } catch (err) {
    toast.error(constant.error);
    // await updateMsg({ msg: constant.error, btnLogin: false });
    // openModal('msgbox');
  }
}


export const updateUser = (authData: any, user: any) => async dispatch => {
  try {
    const res = await fetch(`${constant.baseAPIurl}api/users/update/${user._id}`
      , {
        method: 'put',
        headers: http.header,
        body: JSON.stringify(user)
      });
    //const data = await res.json();
    authData.user = user;
    toast.success(constant.msg.updateUserSuccess);
    dispatch(loginSuccess(authData));
  } catch (err) {
    toast.error(constant.error);
    dispatch(loginSuccess(authData));
  }
}