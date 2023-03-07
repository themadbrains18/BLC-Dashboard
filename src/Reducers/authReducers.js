import { LOGIN, LOGOUT } from "../constants"


const users = (users = {}, action) => {

  switch (action.type) {

    case LOGIN:
      if (action.payload.status === 200) {
        return action.payload
      }
    break   
    case LOGOUT:
      sessionStorage.removeItem('token')
      return action.payload
    
    default:
      return users
  }

}



export default users;
