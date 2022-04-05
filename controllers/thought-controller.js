const { Thought } = require(`..models/thought`);
const { userInfo } = require("os");
const User = require(`../models/User`);

//create a thought object
const thoughtController = {
    getThoughts(req, res) {
        Thought.find({})
        .then(thoughtData => res.json(thoughtData))
        .catch (err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

//get thought by id
getThoughtById({params}, res) {
    Thought.findOne({_id: params.thoughtId})
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json(err);
            return;
        } res.json(thoughtData)
    }) .catch (err => {
        console.log(err);
        res.status(400).json({message: `No thought found`})
    })
}, 
// add a thought
addThought({params, body}, res) {
    Thought.create(body)
    .then(({_id}) => {
        return userInfo.findOneAndUpdate(
            {_id: paramas.userId},
            {$push: {thoughts: _id}}, //pushing the new thought to the array
            {new: true} //show the new thought
        )
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: `No user found`})
                return;
            }
            res.json(userData)
        }) .catch(err => res.json(err))
    },
    // update a thought 
    updateThough({ params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true, runValidators: true}) //show the updated thought
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: `No thought found`})
                return;
            } res.json(thoughtData)
        }) .catch(err => res.status(400).json(err))
    },
    //delete a thought
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(deletedData => {
            if (!deletedData) {
                return res.status(404).json({message: `No thought found`})
            }
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thought: params.thoughtId}},
                {new: true}
            )
        }) .then(userData => {
            if(!userData) {
                res.status(404).json({message: `No user found`})
                return;
            } 
            res.json(userData)
        }) .catch(err => res.json(err))
    },
    // add a reaction
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$addToSet: {reactions: body}},
            {new: true, runValidators: true}
        ) .then(thoughtData => {
            if (!thoughtData) {
                return res.status(404).jaon({message: `No thought found`})
            }
            res.json(thoughtData)
        }) .catch(err => res.json(err))
    },
//delete reaction
deleteReaction({params}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$pull: {reactions: {reactionId: params.reactionId}}},
        {runValidators: true, new: true}
    ) .then(userData => res.json(userData))
    .catch(err => res.json(err))
    }

}

module.exports = thoughtController