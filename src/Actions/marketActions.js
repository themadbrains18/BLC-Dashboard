import * as api from '../API'

import { MARKETCOINLIST } from '../constants'
import { logOut } from './authActions';


export const marketCoinListRequest = () => async (dispatch) => {
  try {
    const { data } = await api.marketCoinRequestAPI();

    if (data.status === 200) {
      await dispatch({ type: MARKETCOINLIST, payload: data })
      return data;
    }
    else {
      if(data.data === "unauthorized user" && data.status === 404){
        await dispatch(logOut()); 
        return data;
      }
    else {
      return data;
    }
  }
  } catch (error) {

  }
}

