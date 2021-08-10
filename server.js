const express = require('express')
const mongoose = require('mongoose')
const morgan = require("morgan")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const session = require("express-session")
const path = require('path')
const MongoStore = require('connect-mongo').default;

require('dotenv').config()

const app = express()
const port = process.env.port || 5000
const uri = process.env.ATLAS_URI

app.use(express.static('public'))
app.use(cors({ credentials: true, origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE']}));
app.use(cookieParser("Shh , its a secret !"));
app.use(session({
     secret: "Shh , its a secret !",
     name: "uniqueSessionID",
     saveUninitialized: false,
     resave: true,
     cookie: { secure: false },
     store: new MongoStore({ mongoUrl: uri })
}))
app.use(morgan("dev"))
app.use(express.json());/// ca sa pot accesa req.body


mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology:true})
const connection = mongoose.connection
connection.once('open', () => {
     console.log("MongoDB database connection established successfully")
})

const auth = require("./middleware/auth")

/*app.get('/', auth, (req, res) => {
     if (req.session.views) { req.session.views++ }
     else {req.session.views = 1}
     console.log("Esti deja autentificat cand ai intrat in home", req.session.views)
     res.json("bina ba")
})*/

const logout = require("./middleware/logout")
app.use('/logout',logout)

const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')

app.use('/users', usersRouter)
app.use('/posts', postsRouter)


app.use(express.static(path.join(__dirname,"../frontend/build")))
app.use('/', (req, res) => { res.sendFile(path.join(__dirname, "../frontend/build/index.html")) })

app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`)
})