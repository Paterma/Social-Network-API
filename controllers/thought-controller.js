const req = require("express/lib/request");
const Thought  = require(`../models/thought`);
const User = require(`../models/user`);

//create a thought object
const thoughtController = {
// add a thought
addThought(req, res) {
    Thought.create(req.body)
    .then((data) => {
        console.log(data)
        return User.findOneAndUpdate(
            {_id: req.params.userId},
            {$push: {thoughts: data._id}}, //pushing the new thought to the array
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
    // get thoughts
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
            
            return res.status(404).json({message: "thought not found"});
        } res.json(thoughtData)
    }) .catch (err => {
        console.log(err);
        res.status(400).json({message: `No thought found`})
    })
}, 
    // update a thought 
    updateThought({ params, body}, res) {
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
    addReaction(req, res) {
        console.log(req.body)
        Thought.findOneAndUpdate(   
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {new: true}
        ) .then(thoughtData => {
            console.log(thoughtData)
            if (!thoughtData) {
                return res.status(404).json({message: `No thought found`})
            }
            res.json(thoughtData)
        }) .catch(err => res.json(err))
    },
//delete reaction
deleteReaction({params}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$pull: {reactions: {reactionId: params.reactionId}}}, //_id
        {new: true}
    ) .then(userData => res.json(userData))
    .catch(err => res.json(err))
    }

}

module.exports = thoughtController