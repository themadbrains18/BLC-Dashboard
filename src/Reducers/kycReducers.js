import { KYCLIST, KYCUPDATE } from '../constants/index'

const kycList = (kycList = [], action) => {
  switch (action.type) {
    case KYCLIST:
      if (action.payload.status === 200) {
        return action.payload.data
      }
      break
    case KYCUPDATE:
      if (action.payload.status === 200) {
        return kycList = kycList.map((d) => {
          if (d.userid === action.payload.data[0].userid) {
            d.isVerified = action.payload.data[0].isVerified
            return d
          } else {
            return d
          }
        })
      }
      break
    default:
      return kycList
  }
}
export default kycList;