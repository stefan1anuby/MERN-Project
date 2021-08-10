const router = require('express').Router()
const multer = require('multer');

const auth = require('../middleware/auth')

const storage = multer.diskStorage(
     {
          destination: 'public/uploads/images/post/',
          filename: function (req, file, cb) {
               cb(null, file.originalname + '-' + Date.now() + ".png");
          }
     }
);

const upload = multer({ // multer settings
     storage: storage
});


const Post = require('../models/post')
const User = require('../models/user')

router.route('/').get((req, res) => {
     const filterBy = Object.keys(req.body).length ? req.body : null
     console.log(filterBy)
     Post.find(filterBy)
          .populate({ path: "userID", select: "username image" })
          .then(posts => { res.json(posts.reverse()) })
          .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id').delete(auth, (req, res) => {
     const _id = req.params.id
     Post.findById({ _id })
          .then(post => {
               console.log(post)
               post.username === req.session.username ?
                    Post.deleteOne(post).then(() => res.json("Succes")).catch(err => res.status(400).json("Something went wrong")) : res.status(400).json("You are not allowed to do that")
          })
          .catch(err => res.status(400).json('Error' + err))
})

router.route('/from/:username').get((req, res) => {
     const username = req.params.username
     Post.find({ username })
          .populate({ path: "userID", select: "username image" })
          .then(users => res.json(users.reverse()))
          .catch(err => res.status(400).json('Error' + err))
})

router.route('/add').post(auth, upload.single('image'), (req, res) => {
     const { description, title } = req.body
     const tags = JSON.parse(req.body.tags)
     const { username, userID } = req.session

     let image = ''
     if (!req.file) {
          console.log("No image received");
     } else {
          image = req.protocol + "://" + req.hostname + ':5000/' + req.file.path.slice(7)
     }
     const newPost = new Post({ username, userID, description, image, title, tags })

     newPost.save()
          .then(() => res.json("Post added !"))
          .catch(err => {
               console.log(err)
               res.status(400).json("Nu s-a putut posta" + err)
          })
})

module.exports = router