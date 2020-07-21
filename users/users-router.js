const router = require('express').Router()

const UsersModel = require('./users-model')

router.get('/', (req, res) => {
    UsersModel.findUsers()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})


module.exports = router