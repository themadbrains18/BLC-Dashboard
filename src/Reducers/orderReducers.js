import { ORDERLIST } from '../constants/index'

const orderList = (orderList = [], action) => {
    switch (action.type) {
        case ORDERLIST:    
            if (action.payload.status === 200) {
                return action.payload.data
            }
            break
        default:
            return orderList
    }

}

export default orderList;