import React, { useState } from "react";
import Data from "../getData"
import { useHistory } from 'react-router-dom'
import Navbar from "./Navbar";

export default function Register() {
     const [email, setEmail] = useState("");
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [repeatPassword, setRepeatPassword] = useState("");
     const [about, setAbout] = useState("");
     const [gender, setGender] = useState("");
     const [image, setImage] = useState(null);
     const admin = false

     let history = useHistory()


     function validateForm() {
          return email.length > 8 && password.length > 4 && password === repeatPassword
     }

     function handleSubmit(event) {
          validateForm() ? sendRequest() : alert("Ceva nu ai pus bine")
          event.preventDefault();
     }

     function sendRequest() {
          const data = new FormData()
          data.append('image', image)
          data.append("email", email)
          data.append("username", username)
          data.append("password", password)
          data.append("about", about)
          data.append("gender", gender)
          data.append("admin",admin)
          console.log({ email, username, password, about, gender, image ,admin})
     
          Data.register(data)
               .then(response => { alert("Te-ai inregistrat cu succes !"); history.push('/login')})
               .catch(error => alert("A fost o problema cu inregistrarea"))
     }

     return (
          <div>
               <Navbar/>
               <form onSubmit={handleSubmit} className="register">
                    <div>
                         <div>Email adress</div>
                         <input type="email" value={email} autoFocus onChange={e => setEmail(e.target.value)} required />
                         <div>We'll never share your email with anyone else.</div>
                    </div>
                    <div>
                         <div>Username</div>
                         <input value={username} autoFocus onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div>
                         <div>Password</div>
                         <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                         <div>Repeat the password</div>
                         <input type="password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} required />
                    </div>
                    <div>
                         <div>Say something about you</div>
                         <textarea value={about} onChange={e => setAbout(e.target.value)} required rows="4" cols="22"></textarea>
                    </div>
                    <div onChange={e => setGender(e.target.value)}>
                         <div>Please choose your gender</div>
                         <input required type="radio" id="male" name="gender" value="male"/>
                         <label for="male">Male</label>
                         <input type="radio" id="female" name="gender" value="female"/>
                         <label for="female">Female</label>
                    </div>
                    <div>
                         <div>Select your profile image</div>
                         <input type="file" id="image" name="image" accept="image/*" onChange={ e => setImage(e.target.files[0])}/>
                    </div>
                    <button onClick={validateForm}>Submit</button>
               </form>
          </div>
     );
}