import * as api from '../API'
import { ORDERLIST } from '../constants'
import { logOut } from './authActions';
// /**
//  * ORDER List
//  * @param {*} formData 
//  * @returns 
//  */
export const orderListRequest = () => async (dispatch) => {
  try {
    const { data } = await api.orderListRequestApi();
    if (data.status === 200) {
      await dispatch({ type: ORDERLIST, payload: data })
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


