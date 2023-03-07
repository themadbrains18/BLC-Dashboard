import * as api from '../API'
import { WITHDRAWLIST } from '../constants'
import { logOut } from './authActions';
// /**
//  * Withdraw List
//  * @param {*} formData 
//  * @returns 
//  */
export const withdrawListRequest = () => async (dispatch) => {
  try {
    const { data } = await api.withdrawListRequestApi();

    if (data.status === 200) {
      await dispatch({ type: WITHDRAWLIST, payload: data })
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


