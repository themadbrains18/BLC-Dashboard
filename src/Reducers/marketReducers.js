import { MARKETCOINLIST } from '../constants/index'

const marketCoinList = (marketCoinList = [], action) => {

  switch (action.type) {

    case MARKETCOINLIST:
      if (action.payload.status === 200) {
        return action.payload.data
      }
      break
   
       
    default:
      return marketCoinList
  }

}

export default marketCoinList;