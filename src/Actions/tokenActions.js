import * as api from '../API'
import TmbNotification from '../error-notification';
import {  TOKENLISTCREATE, TOKENSLIST, TOKENUPDATE, GETTOKENBYID, TOKENSTATUSUPDATE } from '../constants'
import { logOut } from './authActions';

const notify = new TmbNotification();




export const tokensListRequest = () => async (dispatch) => {
  try {
    const { data } = await api.tokenListRequestApi();
    if (data.status === 200) {
      await dispatch({ type: TOKENSLIST, payload: data })
   
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

export const tokenListCreate = (params) => async (dispatch) => {
  try {
    const { data } = await api.tokenList(params);

    if (data.status === 200) {
      notify.success("Token Successfully Created..");
      await dispatch({ type: TOKENLISTCREATE, payload: data })
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


export const tokenUpdateRequest = (tokenid,param) => async (dispatch) => {
  try {
    const  data  = await api.tokenUpdate(tokenid,param);
    if (data.status === 200) {
       notify.success("Token Successfully Updated..");
       await dispatch({ type: TOKENUPDATE, payload: data.data })
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
     notify.error(error)
  } 
}


/**
 * Get token by specific id
 */


export const gettokenbyid =  (tokedis) => async (dispatch) => {
  try {
    const { data } = await api.tokenGetById(tokedis)

    if (data.status === 200) {
      await dispatch({ type: GETTOKENBYID, payload: data })
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
     console.log('error')
  }
} 


export const tokenStatusUpdateRequest = (param) => async (dispatch) => {
  try {
    const { data } = await api.tokenStatusUpdate(param);

    if (data.status === 200) {
      await dispatch({ type: TOKENSTATUSUPDATE, payload: data })
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
