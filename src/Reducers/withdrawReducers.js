import { WITHDRAWLIST } from '../constants/index'

const withdrawList = (withdrawList = [], action) => {
    switch (action.type) {
        case WITHDRAWLIST:
            if (action.payload.status === 200) {
                return action.payload.data
            }
            break
        default:
            return withdrawList
    }

}

export default withdrawList;