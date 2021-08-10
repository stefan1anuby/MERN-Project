import React, { useState } from 'react'
import Data from "../getData"

function Post(props) {

     const [showMore, setShowMore] = useState(false)
     const chLimit = 500
     const description = props.description.toString().slice(0, chLimit)
     const moreDescription = props.description.toString().slice(chLimit)

     const postedAt = new Date(props.date)
     const now = new Date()
     const diffTime = Math.abs(now - postedAt);
     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
     const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
     const diffMinutes = Math.ceil(diffTime / (1000 * 60));

     return (
          <div className="post">
               <div className="flex">
                    <img className="round-img" src={props.username.image} />
                    <div>
                         <a className="post-user" href={props.username.username}>
                              {props.username.username}
                         </a>
                         <div className="post-date">
                              {
                                   diffDays > 9 ? postedAt.toDateString() :
                                        diffHours > 23 ? ("Acum " + diffDays + " zile") :
                                             diffMinutes > 59 ? ("Acum " + diffHours + " ore") :
                                                  diffMinutes > 1 ? ("Acum " + diffMinutes + " minute") : "Chiar acum"
                              }
                         </div>
                    </div>
                    {localStorage.getItem("username") === props.username.username ? <div class="close"
                         onClick={() => { Data.deletePost(props.postID); window.location.reload(); }}>×</div> : ""}
               </div>
               {
                    props.image ? <img className="post-image" src={props.image} alt="" /> : ""
               }
               <div className="post-text">
                    <h2 className="post-title">{props.titleHeading}</h2>
                    <div className="post-description">{description}
                         <span> {showMore ? moreDescription : props.description.length > chLimit ? "..." : ""} </span>
                    </div>
                    {
                         props.description.length > chLimit ? <button className="post-button"
                              onClick={() => setShowMore(!showMore)}> Show {showMore ? "less" : "more"}</button> : ""
                    }
               </div>
          </div>
     )
}

export default Post;