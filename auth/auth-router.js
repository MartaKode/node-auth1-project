const bcryptjs = require('bcryptjs') //--> needed for authentication
const router = require('express').Router()

const UsersModel = require('../users/users-model')


router.post('/register', (req, res) => {
    const rounds = process.env.HASH_ROUNDS || 12

    const hash = bcryptjs.hashSync(req.body.password, rounds)

    req.body.password = hash

    UsersModel.addNewUser(req.body)
        .then(newUser => {
            console.log(newUser)
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json({ err: err.message })
        })
})



router.post('/login', (req, res) => {
    const { username, password } = req.body

    UsersModel.findUsersBy({ username })
        .then(users => {
            // console.log(users)
            const user = users[0]

            if (user && bcryptjs.compareSync(password, user.password)) {
                req.session.user= user.username
                req.session.loggedIn = true //store this info in database
               
                res.json({ message: `welcome ${user.username}`, session: req.session })
                res.cookie('userID', user.id)
            } else {
                res.status(401).json({you: 'shall not pass!', message: 'invalid login or username' })
            }
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({ error: err.message })
        })
})


router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({message: 'error logging out, please try later'})
            } else {
                res.status(204).end() //204 all good - no content to display, end 

            }
        }) //destroy the session -- can fail, make error function
    } else {
        res.status(200).json({ message: 'already logged out' })
    }

});

module.exports = router
