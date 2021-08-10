const router = require('express').Router()
const multer = require('multer');

const User = require('../models/user')

const auth = require('../middleware/auth')
const logout = require('../middleware/logout')


const storage = multer.diskStorage(
     {
          destination: 'public/uploads/images/profile/',
          filename: function (req, file, cb) {
               cb(null, file.originalname + '-' + Date.now() + ".png");
          }
     });

const upload = multer({ // multer settings
     storage: storage
});

router.route('/').get((req, res) => {
     User.find()
          .then(users => res.json(users))
          .catch(err => res.status(400).json('Error' + err))
})

router.route('/add').post(upload.single('image'), (req, res) => {

     const { email, username, password, about, gender, admin } = req.body
     let image = ''
     if (!req.file) {
          console.log("No image profile received");
          image = req.protocol + "://" + req.hostname + ':5000/' + 'uploads/images/profile/' + gender + '.png'
     } else {
          image = req.protocol + "://" + req.hostname + ':5000/' + req.file.path.slice(7)
     }

     const newUser = new User({ email, username, password, about, gender, admin, image })

     newUser.save()
          .then(() => res.json('User added!'))
          .catch(err => {
               console.log(err.name)
               res.status(400)
               if (err.name === "ValidationError") res.json("Problema de validare")
               else if (err.name === "MongoError") res.json("Alegeti-va alt username")
               else res.json("Err:" + err)
          })
})


router.route('/search').post((req, res) => {

     const username = req.body.username
     const regEx = "^" + username
     if (username) User.find({ username: new RegExp(regEx, "i") }).select("-password")
          .then(users => res.json(users.slice(0,5))) /// primii 5 useri
          .catch(err => res.status(400).json('Error' + err))
     else res.json([])
})

router.route('/:username').get((req, res) => {
     const username = req.params.username
     User.find({ username }).select("-password")
          .then(users => res.json(users))
          .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id/edit').post((req, res) => {

})

router.route('/login').post(auth, (req, res) => {
     res.json("already logged")
})

router.route('/logout').post(logout, (req, res) => {
     res.json("logout")
})

module.exports = router