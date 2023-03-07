import { USERLIST, USERUPDATE } from '../constants/index'

const userList =(userList = [], action)=>{

  switch (action.type) {

    case USERLIST:
      if (action.payload.status === 200) {
        return action.payload.data
      }
    break
    case USERUPDATE :
      if(action.payload.status === 200){
        return userList = userList.map((d) => {
          if (d._id === action.payload.data[0]._id) {
            d.status = action.payload.data[0].statusType  
            return d 
          } else {
            return d
          }
        })
      }   
    break    
    default:
      return userList
  }

}

export default userList;