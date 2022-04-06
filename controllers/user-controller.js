const User = require('../models/user');

const userController = {
    //create new user
createUser({body}, res) {
    User.create(body)
    .then(userData => {
        console.log(userData)
        res.json(userData)
        console.log("Success")
    })
    .catch(err => res.status(400).json(err))
},
//find a user
    getUser(req, res) { //get all users
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
//get user by id
getUserById({params}, res) {
    User.findOne({_id: params.id})
    .populate(`thoughts`)
    .populate(`friends`)
    .select(`__v`)
    .then(userData => {
        if(!userData) {
            res.status(404).json({message: `No user found`})
            return
        } res.json(userData)
    }) .catch(err => {
        console.log(err)
        res.status(400).json(err)
    })
},
//update user by id
updateUser({params, body}, res) {
    User.findOneAndUpdate({_id: params.id}, body, {new:true, runValidators: true})
    .then(userData => {
        if(!userData) {
        res.status(404).json({message: `No user found`})
        return;
    } res.json(userData)
    }) .catch(err => res.status(400).json(err))
},
//delete a user
deleteUser({params}, res) {
    User.findOneAndDelete({_id: params.id})
    .then(userData => {
        if(!userData) {
            return res.status(404).json({message: `No user found`})
        }
    })
},
// add a friend 
addAFriend({params}, res) {
    User.findOneAndUpdate({_id: params.id}, 
        {$addToSet: {friends: params.friendsId}},
        {runValidators: true})
        .then(userData => {
        if (!userData) {
            res.status(404).json({message: `No user found`})
            return;
        } res.json(userData)
    }) .catch(err => res.status(400).json(err))
},
//delete a friend
deleteFriend({params}, res) {
    User.findOneAndUpdate({_id: params.id}, 
        {$pull: {friends:params.friendId}},
        {runValidators: true})
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: `No user found`})
                return
            } res.json(userData)
        }) .catch(err => res.status(400).json(err))
    
}
}

module.exports = userController;