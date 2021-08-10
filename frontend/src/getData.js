import axios from "axios"

axios.defaults.withCredentials = true;

const host = "http://localhost:5000"

async function reqSomething(path, requestType, parameters = null) {

     let response
     if (requestType === "get") {
          await axios.get(host + path, parameters)
               .then(users => response = users.data)
               .catch(err => response = err)
     }
     else if (requestType === "post") {
          await axios.post(host + path, parameters)
               .then(users => response = users.data)
               .catch(err => response = err)
     }
     else if (requestType === "delete") {
          await axios.delete(host + path, parameters)
               .then(users => response = users.data)
               .catch(err => response = err)
     }
     return response
}

const Data = {
     getUsers: () => reqSomething("/users", "get"),
     getUser: (id) => reqSomething("/users/" + id, "get"),
     Search: (username) => reqSomething("/users/search", "post",{ username }),
     login: (email, password) => reqSomething("/users/login", "post", { email, password }),
     logout: () => reqSomething("/users/logout", "post"),
     register: (data) => reqSomething("/users/add", "post", data),
     getPosts: () => reqSomething("/posts/", "get"),
     getPost: (id) => reqSomething("/posts/"+id, "get"),
     getPostsFrom: (username) => reqSomething("/posts/from/" + username, "get"),
     post: (data) => reqSomething("/posts/add", "post", data),
     deletePost: (id) => reqSomething("/posts/"+id,"delete")
}
export default Data