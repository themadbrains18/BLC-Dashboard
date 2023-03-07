import {  PAYMENTLIST } from '../constants/index'

const paymentList = (paymentList = [], action) => {

  switch (action.type) {
    case PAYMENTLIST:
      
      if (action.payload.status === 200) {
        return action.payload.result
      }
    break;

    default:
      return paymentList
  }

}

export default paymentList;