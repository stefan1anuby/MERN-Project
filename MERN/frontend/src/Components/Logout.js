import Data from "../getData"
import {useHistory} from "react-router-dom"

export default function Logout() {
     let history = useHistory()
     Data.logout()
          .then(() => {
               localStorage.clear()
               history.push('/')
               window.location.reload();
          }
     )
     .catch()
     return ("Logging out...")
}