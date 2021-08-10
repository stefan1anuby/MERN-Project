function Header(props) {
     let name = props.name || "unknown";
     return (
          <div id="header">
               <h1>MY BLOG</h1>
               <h3>Welcome to the blog of <span>{name}</span>
               </h3>              
          </div>
     );
}

export default Header;