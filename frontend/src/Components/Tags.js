import React from 'react'

class Tags extends React.Component {
     constructor (props) {
          super(props)
          this.state = {
               activatedTags: new Set()
          }
          this.clickTagHandler = this.clickTagHandler.bind(this)
     }

     clickTagHandler(e) {

          let tag = e.target.innerHTML
          const isActivated = this.state.activatedTags.has(tag)

          this.setState(({ activatedTags }) => {

               let newState = new Set(activatedTags)

               if (isActivated) newState.delete(tag)
               else newState.add(tag)
               
               return {
                    activatedTags: newState
               }
          }, () => { this.props.sentToBodyActivatedTags(this.state.activatedTags)})
     }

     componentDidUpdate() {
     
     }

     render() {
          
          let tags = Array.from(this.props.tagsList).map((tag) => (
               <button className={`tag ${this.state.activatedTags.has(tag) === true ? 'tag-activated' : ''}`} onClick={this.clickTagHandler} key={tag}>{tag}</button>
          ))

          return (
               <div className="post">
                    <h2 id="tags">Tags</h2>
                    <div id="tags-container">
                         {tags}
                    </div>
               </div>
          )
     }
}

export default Tags;