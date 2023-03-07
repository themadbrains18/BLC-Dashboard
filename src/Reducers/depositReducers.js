import { DEPOSITLIST } from '../constants/index'

const depositList = (depositList = [], action) => {
    switch (action.type) {
        case DEPOSITLIST:
            if (action.payload.status === 200) {
                return action.payload.data
            }
            break
        default:
            return depositList
    }

}

export default depositList;