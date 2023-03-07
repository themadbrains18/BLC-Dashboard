import * as api from '../API'
import { KYCLIST, KYCUPDATE } from '../constants'
import { logOut } from './authActions';
// /**
//  * Kyc List
//  * @param {*} formData 
//  * @returns 
//  */
export const kycListRequest = () => async (dispatch) => {
  try {
    const { data } = await api.kycListRequestApi();

    if (data.status === 200) {
      await dispatch({ type: KYCLIST, payload: data })
      return data;
    }
    else {
      if(data.data === "unauthorized user" && data.status === 404){
        await dispatch(logOut()); 
        return data;
      }
      else{
        return data;
      }
    }

  } catch (error) {

  }
}

export const kycStatusUpdateRequest = (userid,param) => async (dispatch) => {
  try {
    const { data } = await api.kycStatusUpdate(userid,param);

    if (data.status === 200) {
      await dispatch({ type: KYCUPDATE, payload: data })
      return data;
    }
    else {
      if(data.data === "unauthorized user" && data.status === 404){
        await dispatch(logOut()); 
        return data;
      }
      else{
        return data;
      }
    }

  } catch (error) {

  }
}


