import { useState } from "react"
import NiceButton from "./NiceButton"
import Data from "../getData"

function LaCeTeGandesti(props) { /// props avatar
     const [modalDisplay, setModalDisplay] = useState(false)
     const [image, setImage] = useState(null);
     const [description, setDescription] = useState("")
     const [buttonAnimation, setButtonAnimation] = useState()
     const [tags, setTags] = useState("")
     const [showTags, setShowTags] = useState(false)

     function handleClick(e) {
          if (e.target.className === "close" || e.target.className === "modal" || e.target.className === "create-post-LaCeTeGandesti")
               setModalDisplay(!modalDisplay)
     }

     function encodeImageFileAsURL(fileToLoad) {
          var fileReader = new FileReader();

          fileReader.onload = function () {
               setImage(fileToLoad)
               document.getElementById("gallery-option").src = fileReader.result;
          }
          fileReader.readAsDataURL(fileToLoad);
     }
     

     function validateForm() {
          return description.trim().length > 4
     }

     function handleSubmit(event) {
          if (validateForm()) sendRequest(); else { alert("Ceva nu ai pus bine"); setButtonAnimation("error"); }
          event.preventDefault();
     }

     function sendRequest() {
               
          const patt = /(\w+)/g;
          const data = new FormData()
          
          data.append('image', image)
          data.append("description", description)
          data.append("title", "TITLU RANDOM")
          data.append("tags", JSON.stringify(tags.match(patt)))

          console.log(tags.match(patt))

          console.log(data)

          Data.post(data)
               .then(response => { console.log("raspuns: " + response); localStorage.setItem("button", "succes"); })
               .catch(error => {
                    console.log("eroare: " + error);
                    localStorage.setItem("button", "error")
               })
     }

     return (
          <div className="post create-post">
               <div className="flex">
                    <img className="round-img" src={props.avatar.image} />
                    <div className="create-post-LaCeTeGandesti" onClick={handleClick}>La ce te gandesti , {props.avatar.username} ?</div>
               </div>
               {modalDisplay ?
                    (<div id="myModal" className="modal" onClick={handleClick}>
                         <form id="modal-content" onSubmit={handleSubmit}>
                              <div className="modal-header">
                                   <span className="close" onClick={handleClick}>&times;</span>
                                   <h2>Creeaza o postare</h2>
                              </div>
                              <div className="modal-body">
                                   <textarea onChange={e => setDescription(e.target.value)} value={description} placeholder="Scrie ce-ti doreste sufletelul" />
                              </div>
                              <div className="modal-footer">
                                   <div className="modal-footer-adauga">
                                        <div>Adauga in postare</div>
                                        <div class="add-options">
                                             <img src="tag-image.png" onClick={() => { setShowTags(!showTags); setTags("") }}></img>
                                             <img src="gallery.png" id="gallery-option" onClick={() => { document.getElementById("imageInput").click(); }} />
                                        </div>
                                   </div>
                                   {showTags ? <textarea id="modal-footer-tagInput" value={tags} onChange={e => setTags(e.target.value)} placeholder="Lista de taguri" /> : ""}
                                   <NiceButton result={buttonAnimation} />
                                   <input type="file" id="imageInput" name="image" accept="image/*" onChange={e => encodeImageFileAsURL(e.target.files[0])} />

                              </div>
                         </form>

                    </div>) : ""}

          </div>
     )
}

export default LaCeTeGandesti;