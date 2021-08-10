function About(props) {
     return (
          <div className="post">
               <img className="post-image , aboutMe-image"
                    src={props.picture}
                    alt="" />
               <div className="post-text">
                    <h2 className="post-title">{props.name}</h2>
                    <div className="post-description">{props.description}</div>
               </div>
          </div>
     )
}

export default About;