module.exports = (req, res, next) => {
    if(req.session && req.session.loggedIn) {
        next()
    }else {
        res.status(401).json({You: 'shall not pass!', message: 'Must be logged in to grant access'})
    }
}