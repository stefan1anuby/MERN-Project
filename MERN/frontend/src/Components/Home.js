import React from "react"
import Data from "../getData"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Post from "./Post"


export default class Home extends React.Component {
     constructor () {
          super()
          this.state = {
               posts: [],
               isLoading: true
          }
     }

     componentDidMount() {
          Data.getPosts()
               .then(posts => { console.log(posts); this.setState({ posts, isLoading: false }) })
               .catch(err => { console.log(err); alert("Nu s-a putut incarca "); })
     }

     render() {
          return (
               <div>
                    {!this.state.isLoading &&
                         <div>
                              <Navbar />
                              <div className="newsFeed">
                                   {
                                        this.state.posts.length &&
                                   this.state.posts.map((post) => <Post key={post._id} postID={post._id}
                                        image={post.image} titleHeading={post.titleHeading} date={post.createdAt}
                                        description={post.description} username={post.userID} />)
                                   }
                              </div>
                              <Footer />
                         </div>
                    }
               </div>
          )
     }
}