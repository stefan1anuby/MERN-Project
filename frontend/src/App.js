import './App.css';
import Footer from './Components/Footer'
import Blog from './Components/Blog'
import Home from './Components/Home'
import Logout from './Components/Logout'
import Login from './Components/Login'
import Register from './Components/Register'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"




function App() {
  
     return (
          <div className="App" >
               <div id="background"></div>
               <Router>
                    <Switch>                             
                         <Route path="/register">
                              <Register />
                         </Route>
                         <Route path="/login">
                              <Login />
                         </Route>
                         <Route path="/logout">
                              <Logout />
                         </Route>
                         <Route path="/:user">
                              <Blog/>
                         </Route>
                         <Route path="/">
                              <Home />
                         </Route>
                    </Switch>
               </Router>
          </div>
     )
}

export default App;
