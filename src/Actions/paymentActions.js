import * as api from '../API'
import TmbNotification from '../error-notification';
import { PAYMENTLISTCREATE, PAYMENTLIST } from '../constants'
import { logOut } from './authActions';

const notify = new TmbNotification();


export const paymentListCreate = (params) => async (dispatch) => {
  try {
    const { data } = await api.paymentListCreateApi(params);

    if (data.status === 200) {
      notify.success("Payment Method Successfully Created..");
      await dispatch({ type: PAYMENTLISTCREATE, payload: data })
      return data;
    }
    else {
      if (data.data === "unauthorized user" && data.status === 404) {
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
export const paymentListRequest = () => async (dispatch) => {
  try {
    const { data } = await api.paymentListRequestApi();
    if (data.status === 200) {
      await dispatch({ type: PAYMENTLIST, payload: data })
      return data;
    }
    else {
      if (data.data === "unauthorized user" && data.status === 404) {
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




