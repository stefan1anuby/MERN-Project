import { useState, useEffect } from 'react'
import Data from "../getData"

function Navbar(props) {

     const [data, setData] = useState([])
     const [userImage, setUserImage] = useState("")

     const username = localStorage.getItem("username")

     useEffect(() => {
          const last_word_url = window.location.href.split('/').slice(-1)[0]
          try {
               if (props.isMyProfile === true) document.getElementById("myProfile").className = "active"
               switch (last_word_url) {
                    case "register":
                         document.getElementById("register").className = "active"
                         break;
                    case "logout":
                         document.getElementById("logout").className = "active"
                         break;
                    case "login":
                         document.getElementById("login").className = "active"
                         break;
                    case "":
                         document.getElementById("home").className = "active"
                         break;
                    case username:
                         document.getElementById("myProfile").className = "active"
                         break;
                    default:
               }
          }
          catch (err) { }
     })

     

     function fetchData(keyword) {
          Data.Search(keyword)
               .then(users => setData(users))
               .catch(err => { console.log(err); return []; })
     }

     const recomandations = data.map((person, index) =>
          <div className="search-dropdown-result" >
               <img src={person.image} />
               <a href={person.username}>{person.username}</a>
          </div>
     )
     return (
          <div className="topnav">
               <div className="goTo">

                    {
                         username ?
                              [<a href="/" id="home">Home</a>, <a href={username} id="myProfile">My Profile</a>, <a href="/logout" id="logout">Logout</a>]
                              :
                              [<a href="/register" id="register">Register</a>, <a href="/login" id="login">Login</a>]
                    }
               </div>
               {
                    username ?
                         [<div className="search-container">
                              <input list="search-dropdown" type="text" placeholder="Search..." onChange={(e) => { fetchData(e.target.value); }} name="search" />
                              {recomandations.length > 0 ?
                                   <div id="search-dropdown">
                                        {recomandations}
                                   </div>
                                   : ""
                              }
                         </div>,
                              <div id="navbarProfile">
                                   <a>{username}</a>
                              </div>] : ""
               }
          </div>
     )
}

export default Navbar;
