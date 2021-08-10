import React, { useState } from "react";
import Data from "../getData"
import { useHistory } from 'react-router-dom'
import Footer from "./Footer"
import Navbar from "./Navbar"

export default function Login(props) {

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [rememberMe, setRememberMe] = useState(false);
     const [hasFailed, setHasFailed] = useState(false)

     let history = useHistory()


     function handleSubmit(event) {
          event.preventDefault();
          validateForm() ? sendRequest() : alert("Ceva nu ai pus bine")
     }


     function sendRequest() {
          Data.login(email, password)
               .then(res => {
                    if (res.id && res.username) {
                         localStorage.setItem("username", res.username)
                         localStorage.setItem("userID", res.id)
                         history.push('/')
                         window.location.reload();
                    }
                    else setHasFailed(true)
               })
               .catch(err => console.log("la naiba " + err))
     }

     function validateForm() {
          return email.length > 8 && password.length > 4
     }

     return (
          <div>
               <Navbar />
               <form className="login" onSubmit={handleSubmit}>
                    <div>
                         <div>Email adress</div>
                         <input type="email" placeholder="Username" value={email} autoFocus onChange={e => setEmail(e.target.value)} required />
                         <div>We'll never share your email with anyone else.</div>
                    </div>
                    <div>
                         <div>Password</div>
                         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div>
                         <input type="checkbox" value={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                         <label>Remember me</label>
                    </div>
                    <button onClick={validateForm}>Login</button>
                    <div>{hasFailed ? "Loggin Failled" : ""}</div>
               </form>
          </div>
     );

}