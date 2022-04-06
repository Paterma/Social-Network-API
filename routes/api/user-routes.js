const router = require('express').Router();

const {
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    addAFriend,
    deleteFriend
} = require('../../controllers/user-controller');

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:id/friends/:friendId')
    .post(addAFriend)
    .delete(deleteFriend);

router
    .route('/')
    .get(getUser)
    .post(createUser);

module.exports = router;


