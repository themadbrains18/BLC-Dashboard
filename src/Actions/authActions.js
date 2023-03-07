import * as api from '../API'
import { LOGIN, USERLIST, TOKENSLIST } from '../constants'

// /**
//  * Admin Login
//  * @param {*} formData 
//  * @returns 
//  */

export const loginRequest = (formData) => async (dispatch) => {
  try {
    const { data } = await api.loginRequestApi(formData);

    if (data.status === 200) {
      sessionStorage.setItem('token', data.access_token);
      await dispatch({ type: LOGIN, payload: data })
      return data;
    }
    else {
      return data;
    }

  } catch (error) {

  }
}

export const logOut=()=>async(dispatch)=>{
  sessionStorage.clear();
  await dispatch({ type: USERLIST, payload: {status : 200, data : []} });
  await dispatch({ type: LOGIN, payload: {status : 200, data : {} } });
  await dispatch({ type: TOKENSLIST, payload: {status : 200, data : [] } })
  return {status : 404 , data: {}}
}