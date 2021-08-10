const logout = (req, res, next) => {
     req.session.destroy()
     console.log("Te-ai delogat")
     next()
}

module.exports = logout