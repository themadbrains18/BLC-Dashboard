import * as api from '../API'
import { USERLIST, USERUPDATE } from '../constants'
import { logOut } from './authActions';

import TmbNotification from '../error-notification';
// /**
//  * Admin Login
//  * @param {*} formData 
//  * @returns 
//  */


const notify = new TmbNotification();
export const userListRequest = () => async (dispatch) => {

  try {
    const { data } = await api.userListRequestApi();
    if (data.status === 200) {
      await dispatch({ type: USERLIST, payload: data })
      return data;
    }
    else {
      if(data.data === "unauthorized user" && data.status === 404){   
        await dispatch(logOut()); 
        notify.error("Session Expired..");
        return data;
      }
    }

  } catch (error) {

  }
}

export const userStatusUpdateRequest = (param) => async (dispatch) => {
  try {
    const { data } = await api.userStatusUpdate(param);

    if (data.status === 200) {
      await dispatch({ type: USERUPDATE, payload: data })
      return data;
    }
    else {
      if(data.data === "unauthorized user" && data.status === 404){
        await dispatch(logOut()); 
        return data;
      }
    }

  } catch (error) {

  }
}
