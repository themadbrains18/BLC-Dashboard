import {  TOKENSLIST, TOKENUPDATE, GETTOKENBYID, TOKENSTATUSUPDATE } from '../constants/index'

const tokenList = (tokenList = [], action) => {

  switch (action.type) {

    
    case TOKENSLIST:
      if (action.payload.status === 200) {
        return action.payload.data
      }
    break;

    case GETTOKENBYID : 
      if (action.payload.status === 200) {
        return action.payload.data
      }
    break;

    case TOKENUPDATE:
      if (action.payload.status === 200) {
        return tokenList = tokenList.map((d) => {
          if (d._id === action.payload.data[0]._id) {
            d.data = action.payload.data[0].data
            return d
          } else {
            return d
          }
        })
      }
      break

    case TOKENSTATUSUPDATE:
        if (action.payload.status === 200) {
          return tokenList = tokenList.map((d) => {
            if (d._id === action.payload.data[0]._id) {
              d.status = action.payload.data[0].status
              return d
            } else {
              return d
            }
          })
        }
        break  
    default:
      return tokenList
  }

}

export default tokenList;