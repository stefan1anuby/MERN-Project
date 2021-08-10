const auth = (req, res, next) => {
     if (!req.session.loggedIn) {

          const { email, password } = req.body

          const User = require('../models/user')

          User.findOne({ email, password }).exec()
               .then(user => {
                    if (user) {
                         req.session.loggedIn = true
                         req.session.email = email
                         req.session.username = user.username
                         req.session.userID=user._id
                         ///*if remember me : */req.session.cookie.expires = new Date(Date.now() + hour);
                         console.log("Userul cu id ul " + req.session.userID + " s a conectat")
                         
                         res.json({
                              id: req.session.userID,
                              username: req.session.username
                         })
                    }
                    else res.status(403).json("not logged")
               })
               .catch(err => res.status(400).json("A crapat ceva la auth"))
     }
     else next()
}

module.exports = auth