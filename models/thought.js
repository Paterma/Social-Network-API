const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/seeds');
const reactionsSchema = require('./reaction');

//creating thoughts schema
const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required:true,
            minlength: 1,
            maxlength:280
        },
        createdAt: {
            type: Date,
            default:Date.now,
            // get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String, 
            required: true
        },
        reactions: [reactionsSchema]
    }
)
//retirieving lenght of thoughts array
thoughtsSchema.virtual(`reactionCount`).get(function () {
    return this.reactions.length
})
//creating user model
const Thought = model('Thought', thoughtsSchema)
//export
module.exports = { Thought }




// * `thoughtText`
//   * String
//   * Required
//   * Must be between 1 and 280 characters

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
//   * String
//   * Required

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`

// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
