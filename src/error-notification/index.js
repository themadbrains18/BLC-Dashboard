
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class TmbNotification {
    
    constructor (settings ) {
      this.settings = {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }
    }

    /**
     * Warning notification
     */

    default = ( message) => {
       return toast(message, this.settings);
    }

    info = ( message) => {
        return toast.info(message, this.settings);
    }

    warn = ( message) => {
        return toast.warn(message, this.settings);
     }


     success = ( message) => {
        return toast.success(message, this.settings);
     }


     error = ( message) => {
        return toast.error(message, this.settings);
     }

}

export default TmbNotification