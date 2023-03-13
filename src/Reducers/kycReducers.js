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

        console.log('kyc new data', action.payload.data)
        return kycList = kycList.map((d) => {
          if (d.user_id == action.payload.data.user_id) {
            d.isVerified = action.payload.data.isVerified
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