const db = require('../data/connection')

module.exports = {
    findUsers,
    findUsersBy,
    findUserById,
    addNewUser
}

function findUsers() {
    return db('users')
        .select('id', 'username')
        .orderBy('id')
}

function findUsersBy(filter) {
    return db('users')
        .where(filter)
        .orderBy('id')
}

function findUserById(user_id) {
    return db('users')
        .where('id', '=', user_id)
        .first()
}

// async function add(user) { <-- async reference
//     try {
//       const [id] = await db("users").insert(user, "id");

//       return findById(id);
//     } catch (error) {
//       throw error;
//     }
//   }

function addNewUser(newUser) {
    return db('users')
        .insert(newUser, 'id')
        .then(([id]) => {
            return findUserById(id)
        })
}