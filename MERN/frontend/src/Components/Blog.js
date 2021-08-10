import Header from "./Header"
import Post from "./Post"
import About from "./About"
import Tags from "./Tags"
import React from 'react'
import CreatePost from "./CreatePost"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Data from '../getData'
import { Redirect } from 'react-router-dom'

class Blog extends React.Component {

     constructor (props) {
          super(props)
          this.state = {
               person: {
                    username: window.location.href.split('/').slice(-1)[0] /// ultimul cuvant din url
               },
               tagsList: new Set(),
               filters: new Set(),
               posts: [],
               filteredPosts: [],
               isLoading: true,
          }
          this.setFilters = this.setFilters.bind(this)
          this.getFilteredPosts = this.getFilteredPosts.bind(this)
     }


     componentDidMount() {
          let username = this.state.person.username
          Promise.all([Data.getUser(username), Data.getPostsFrom(username), Data.login("", "")])
               .then(values => {
                    console.log("Uite aici datele: ", values)
                    this.setState({
                         person: values[0][0],
                         posts: values[1],
                         isLoading: false,
                         isLogged: values[2] === "already logged" ? true : false,
                         tagsList: new Set([].concat(...values[1].map(post => post.tags)).filter(item => item !== null))
                    })
               })
               .catch(err => console.log("Nu s-a putut incarca profilul " + err))
          /// aici trebuie sa incarcam state ul cu posts si tags
          this.setState({ posts: this.getFilteredPosts() })
     }

     componentDidUpdate() {

     }

     setFilters(activatedTags) {
          this.setState({
               filters: activatedTags
          }, () => this.setState({ filteredPosts: this.getFilteredPosts() }))
     }

     getFilteredPosts() {
          if (this.state.filters.size === 0) return this.state.posts
          else return Array.from(this.state.posts).filter((post) => {
               let shouldRemain = true
               for (let filter of this.state.filters) if (post.tags === null || post.tags.includes(filter) === false) shouldRemain = false
               return shouldRemain
          })

     }

     render() {
          const posts = this.state.filters.size > 0 ? this.state.filteredPosts : this.state.posts;
          return (
               !this.state.isLoading ?
                    [
                         <Navbar isMyProfile={this.state.person.username === localStorage.getItem("username")}/>,
                         !this.state.isLogged ? <Redirect to='login' /> :
                              this.state.person ?
                                   (<div>
                                        <Header name={this.state.person.username} />
                                        <div id="body">
                                             <div id="left-feed">
                                                  {(this.state.person.username === localStorage.getItem("username")) ? <CreatePost avatar={this.state.person} /> : ""}
                                                  {
                                                       posts.length ?
                                                            Array.from(posts).map((post) => (<Post key={post._id} postID={post._id} image={post.image} titleHeading={post.titleHeading} date={post.createdAt} description={post.description} username={post.userID} />))
                                                            : <div>"Utilizatorul nu are postari inca"</div>
                                                  }
                                             </div>
                                             <div id="right-feed">
                                                  <About id="aboutMe" picture={this.state.person.image} name={this.state.person.username} description={this.state.person.about} />
                                                  <Tags tagsList={this.state.tagsList} sentToBodyActivatedTags={this.setFilters} />
                                             </div>
                                        </div>
                                   </div>)
                                   : <div>Acest user nu exista</div>
                         , <Footer />]
                    : <div>Se incarca...</div>
          )
     }
}

export default Blog;