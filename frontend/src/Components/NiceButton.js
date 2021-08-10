
function NiceButton(props) {
     
     function clickHandler(e) {
         // e.preventDefault();
          /// resullt = props.onclick.then()...
          e.target.classList.add('animate');
          setTimeout(function () {
               if (localStorage.getItem("button") === "succes") {
                    e.target.classList.add('succes');
                    e.target.classList.remove('error');
                    console.log("succes")
               }
               else {
                    console.log("error")
                    e.target.classList.add('error');
                    e.target.classList.remove('succes');
               }
          }, 500)
          setTimeout(function () {
               localStorage.removeItem("button")
               e.target.classList.remove('animate');
               e.target.classList.contains("succes") ? window.location.reload() : e.target.classList.remove('error');
               
          }, 6500);
     }
     return (
          <button className={"button "} onClick={clickHandler}>Posteaza</button>
     )
}
export default NiceButton;