import * as api from '../API'
import { DEPOSITLIST } from '../constants'
import { logOut } from './authActions';
// /**
//  * Deposit List
//  * @param {*} formData 
//  * @returns 
//  */
export const depositListRequest = () => async (dispatch) => {
  try {
    const { data } = await api.depositListRequestApi();

    if (data.status === 200) {
      await dispatch({ type: DEPOSITLIST, payload: data })
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


